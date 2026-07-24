using GraphSynth.Representation;
using Microsoft.AspNetCore.Components;
using System.Collections.Immutable;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace ADArCWebApp
{
    public sealed class RuleSetMap
    {
        //Singleton Setup
        private static RuleSetMap? _instance;
        private static readonly object Padlock = new();

        public static Dictionary<string, ruleSet> Rulesets;
        private readonly ImmutableHashSet<string> modifiedRules;
        private readonly HashSet<string> loadedRuleSets;

        // Total rule count across every registered ruleset, and how many have loaded so far.
        // RegisterRuleSet must be called for every ruleset before LoadRuleSet starts downloading
        // rule files, so this denominator is fixed up front and progress reporting never regresses.
        private int totalRuleCount;
        private int totalLoaded;

        // True once the first LoadRuleSet call has started. RegisterRuleSet refuses to run after
        // this point, since registering more rulesets mid-load would change totalRuleCount and
        // make progress reporting regress or become inconsistent.
        private bool loadingStarted;

        RuleSetMap()
        {
            Rulesets = new Dictionary<string, ruleSet>();
            //Setup set of rules which need to be modified
            //Inherited from BOGLWeb, probably not necessary
            modifiedRules = ImmutableHashSet.Create(
                "BIG1");
            loadedRuleSets = new HashSet<string>();
            totalRuleCount = 0;
            totalLoaded = 0;
            loadingStarted = false;
        }

        /// <summary>
        /// Returns the singleton instance of the RuleSetMap
        /// </summary>
        /// <returns>An instance of RuleSetMap</returns>
        public static RuleSetMap GetInstance()
        {
            lock (Padlock)
            {
                return _instance ??= new RuleSetMap();
            }
        }

        /// <summary>
        /// Fetches a ruleset's manifest (its list of rule file names) without downloading the
        /// individual rule files themselves. Must be called for every ruleset that will be
        /// loaded before the first call to LoadRuleSet, so that the total rule count used for
        /// progress reporting is known up front and doesn't grow mid-load.
        /// </summary>
        public async Task RegisterRuleSet(string name, NavigationManager navigationManager)
        {
            if (loadingStarted)
            {
                throw new InvalidOperationException(
                    "Cannot register ruleset " + name + " after rule loading has already started.");
            }

            if (Rulesets.ContainsKey(name))
            {
                return;
            }

            HttpClient client = new HttpClient();
            client.BaseAddress = new(navigationManager.BaseUri + "rules/");

            // Load the ruleset, parse file contents rules, and save them for iteration to download individually
            var manifestRequest = new HttpRequestMessage(HttpMethod.Get, name + ".rsxml");
            manifestRequest.Headers.CacheControl = new System.Net.Http.Headers.CacheControlHeaderValue { NoCache = true };
            HttpResponseMessage ruleSetResponse = await client.SendAsync(manifestRequest);
            XmlSerializer ruleDeserializer = new(typeof(ruleSet));
            Stream ruleSetFileContent = await ruleSetResponse.Content.ReadAsStreamAsync();
            var ruleReader = new StreamReader(ruleSetFileContent);
            Rulesets.Add(name, (ruleSet)ruleDeserializer.Deserialize(ruleReader));

            totalRuleCount += Rulesets[name].ruleFileNames.Count;
        }

        public async Task<int> LoadRuleSet(string name, NavigationManager navigationManager, Pages.Index main)
        {
            loadingStarted = true;

            if (!Rulesets.ContainsKey(name))
            {
                throw new InvalidOperationException(
                    "Ruleset " + name + " must be registered via RegisterRuleSet before it can be loaded.");
            }

            if (!loadedRuleSets.Add(name))
            {
                Console.WriteLine("Rule " + name + " already loaded.");
                return 0;
            }

            HttpClient client = new HttpClient();
            client.BaseAddress = new(navigationManager.BaseUri + "rules/");

            List<string> ruleFileNames = Rulesets[name].ruleFileNames;

            List<grammarRule> rules = new();

            List<Task> loadTasks = new();

            foreach (string rulePath in ruleFileNames)
            {
                loadTasks.Add(LoadRuleFile(client, rulePath, rules, main));
            }

            await Task.WhenAll(loadTasks);

            Rulesets[name].rules = rules;

            return rules.Count;
        }

        private async Task LoadRuleFile(HttpClient client, string rulePath, List<grammarRule> rules, Pages.Index main)
        {
            HttpResponseMessage ruleResponse = await client.GetAsync(rulePath);
            Console.WriteLine(rulePath + " Fetched");
            string ruleText = await ruleResponse.Content.ReadAsStringAsync();

            XElement xeRule = XElement.Parse(ruleText);
            XElement? temp = xeRule.Element("{ignorableUri}" + "grammarRule");
            grammarRule openRule = new();

            if (temp != null)
            {
                openRule = DeSerializeRuleFromXml(RemoveXamLns(RemoveIgnorablePrefix(temp.ToString())));
            }

            RemoveNullWhiteSpaceEmptyLabels(openRule.L);
            RemoveNullWhiteSpaceEmptyLabels(openRule.R);

            lock (rules)
            {
                rules.Add(openRule);
            }

            Console.WriteLine(rulePath + " Loaded");
            int loaded = Interlocked.Increment(ref totalLoaded);
            main.LoadingProgress = totalRuleCount == 0 ? 100 : (double)loaded / totalRuleCount * 100;
            main.StateChanged();
        }

        /// <summary>
        /// Returns the number of loaded rules
        /// </summary>
        /// <returns>number of loaded rules as an int</returns>
        public int GetNumRules()
        {
            return Rulesets.Count;
        }

        /// <summary>
        /// Returns a ruleset
        /// </summary>
        /// <param name="name">The name of the ruleset</param>
        /// <returns>A ruleset</returns>
        public ruleSet GetRuleSet(string name)
        {
            if (!this.modifiedRules.Contains(name))
            {
                return Rulesets[name];
            }

            foreach (grammarRule rule in Rulesets[name].rules)
            {
                rule.TransformNodePositions = false;
                rule.Rotate = GraphSynth.transfromType.Prohibited;
            }

            return Rulesets[name];
        }

        //Helper methods from BoGL Desktop
        private static grammarRule DeSerializeRuleFromXml(string xmlString)
        {
            //xmlString = xmlString.Replace("XYZIndependent", "BothIndependent");
            //xmlString = xmlString.Replace("OnlyZ", "false");
            StringReader stringReader = new StringReader(xmlString);
            XmlSerializer ruleDeserializer = new XmlSerializer(typeof(grammarRule));
            grammarRule? newGrammarRule = (grammarRule)ruleDeserializer.Deserialize(stringReader);
            if (newGrammarRule.L == null)
            {
                newGrammarRule.L = new designGraph();
            }
            else
            {
                newGrammarRule.L.RepairGraphConnections();
            }

            if (newGrammarRule.R == null)
            {
                newGrammarRule.R = new designGraph();
            }
            else
            {
                newGrammarRule.R.RepairGraphConnections();
            }

            return newGrammarRule;
        }

        //Start functions for cleaning up rule/ruleset xml
        private static string RemoveXamLns(string str)
        {
            return str.Replace("xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"", "");
        }

        private static string RemoveIgnorablePrefix(string str)
        {
            return str.Replace("GraphSynth:", "").Replace("xmlns=\"ignorableUri\"", "");
        }

        private static void RemoveNullWhiteSpaceEmptyLabels(designGraph g)
        {
            g.globalLabels.RemoveAll(string.IsNullOrWhiteSpace);
            foreach (arc a in g.arcs)
            {
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
            }

            foreach (node a in g.nodes)
            {
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
            }

            foreach (hyperarc a in g.hyperarcs)
            {
                a.localLabels.RemoveAll(string.IsNullOrWhiteSpace);
            }
        }
        //End functions for cleaning up rule/ruleset xml
    }
}
