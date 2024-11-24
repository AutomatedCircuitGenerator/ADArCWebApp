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
        int numLoaded;

        RuleSetMap()
        {
            Rulesets = new Dictionary<string, ruleSet>();
            //Setup set of rules which need to be modified
            //Inherited from BOGLWeb, probably not necessary
            modifiedRules = ImmutableHashSet.Create(
                "BIG1");
            numLoaded = 0;
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

        public async Task<int> LoadRuleSet(string name, NavigationManager navigationManager, Pages.Index main,
            int current, int total)
        {
            if (Rulesets.ContainsKey(name))
            {
                Console.WriteLine("Rule " + name + " already loaded.");
                return 0;
            }

            HttpClient client = new HttpClient();
            client.BaseAddress = new(navigationManager.BaseUri + "rules/");

            // Load the ruleset, parse file contents rules, and save them for iteration to download individually
            HttpResponseMessage ruleSetResponse =
                await client.GetAsync(name + ".rsxml");
            XmlSerializer ruleDeserializer = new(typeof(ruleSet));
            Stream ruleSetFileContent = await ruleSetResponse.Content.ReadAsStreamAsync();
            var ruleReader = new StreamReader(ruleSetFileContent);
            Rulesets.Add(name, (ruleSet)ruleDeserializer.Deserialize(ruleReader));

            List<string> ruleFileNames = Rulesets[name].ruleFileNames;

            List<grammarRule> rules = new();
            numLoaded = 0;

            List<Task> loadTasks = new();

            foreach (string rulePath in ruleFileNames)
            {
                loadTasks.Add(LoadRuleFile(client, rulePath, rules, main, current, total));
            }

            await Task.WhenAll(loadTasks);

            Rulesets[name].rules = rules;

            return numLoaded;
        }

        private async Task LoadRuleFile(HttpClient client, string rulePath, List<grammarRule> rules, Pages.Index main,
            int current, int total)
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
            Interlocked.Increment(ref numLoaded);
            main.LoadingProgress = (double)(numLoaded + current) / total * 100;
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
