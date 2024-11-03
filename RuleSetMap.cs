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
        private static RuleSetMap? instance;
        private static readonly object padlock = new();

        public static Dictionary<string, ruleSet> rulesets;
        private readonly ImmutableHashSet<string> modifiedRules;
        int numLoaded;

        RuleSetMap()
        {
            rulesets = new Dictionary<string, ruleSet>();
            //Setup set of rules which need to be modified
            //Inherited from BOGLWeb, probably not necessary
            this.modifiedRules = ImmutableHashSet.Create(
                "BIG1");
            this.numLoaded = 0;
        }

        /// <summary>
        /// Returns the singleton instance of the RuleSetMap
        /// </summary>
        /// <returns>An instance of RuleSetMap</returns>
        public static RuleSetMap GetInstance()
        {
            lock (padlock)
            {
                return instance ??= new RuleSetMap();
            }
        }

        public async Task<int> LoadRuleSet(string name, NavigationManager navigationManager, Pages.Index main,
            int current, int total)
        {
            if (rulesets.ContainsKey(name))
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
            rulesets.Add(name, (ruleSet)ruleDeserializer.Deserialize(ruleReader));

            List<string> ruleFileNames = rulesets[name].ruleFileNames;

            List<grammarRule> rules = new();
            numLoaded = 0;

            List<Task> loadTasks = new();

            foreach (string rulePath in ruleFileNames)
            {
                loadTasks.Add(LoadRuleFile(client, rulePath, rules, main, current, total));
            }

            await Task.WhenAll(loadTasks);

            rulesets[name].rules = rules;

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
                openRule = DeSerializeRuleFromXML(RemoveXAMLns(RemoveIgnorablePrefix(temp.ToString())));
            }

            removeNullWhiteSpaceEmptyLabels(openRule.L);
            removeNullWhiteSpaceEmptyLabels(openRule.R);

            lock (rules)
            {
                rules.Add(openRule);
            }

            Console.WriteLine(rulePath + " Loaded");
            Interlocked.Increment(ref numLoaded);
            main.loadingProgress = (double)(numLoaded + current) / total * 100;
            main.StateChanged();
        }

        /// <summary>
        /// Returns the number of loaded rules
        /// </summary>
        /// <returns>number of loaded rules as an int</returns>
        public int GetNumRules()
        {
            return rulesets.Count;
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
                return rulesets[name];
            }

            foreach (grammarRule rule in rulesets[name].rules)
            {
                rule.TransformNodePositions = false;
                rule.Rotate = GraphSynth.transfromType.Prohibited;
            }

            return rulesets[name];
        }

        //Helper methods from BoGL Desktop
        private grammarRule DeSerializeRuleFromXML(string xmlString)
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
        private string RemoveXAMLns(string str)
        {
            return str.Replace("xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"", "");
        }

        private static string RemoveIgnorablePrefix(string str)
        {
            return str.Replace("GraphSynth:", "").Replace("xmlns=\"ignorableUri\"", "");
        }

        private void removeNullWhiteSpaceEmptyLabels(designGraph g)
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

// while (this.numLoaded < ruleFileNames.Count)
// {
//     string rulePath = ruleFileNames[this.numLoaded];
//     Console.WriteLine(rulePath + " loaded");
//     //Get the rule files from GitHub 
//     HttpResponseMessage ruleResponse =
//         await client.GetAsync(rulePath);
//     //await client.GetAsync(rulePath.Substring(rulePath.LastIndexOf("\\") + 1));
//
//     string ruleText = await ruleResponse.Content.ReadAsStringAsync();
//     //var f = File.OpenText(rulePath);
//     //string ruleText = f.ReadToEnd();
//
//     XElement xeRule = XElement.Parse(ruleText);
//     XElement? temp = xeRule.Element("{ignorableUri}" + "grammarRule");
//     grammarRule openRule = new();
//     //Deserialize the rule XML using GraphSynth
//     if (temp != null)
//     {
//         openRule = this.DeSerializeRuleFromXML(this.RemoveXAMLns(RemoveIgnorablePrefix(temp.ToString())));
//     }
//
//     this.removeNullWhiteSpaceEmptyLabels(openRule.L);
//     this.removeNullWhiteSpaceEmptyLabels(openRule.R);
//
//     object ruleObj = new object[] { openRule, rulePath };
//     switch (ruleObj)
//     {
//         case grammarRule obj:
//             rules.Add(obj);
//             break;
//         case object[] obj:
//         {
//             rules.AddRange(obj.OfType<grammarRule>());
//             break;
//         }
//     }
//
//     this.numLoaded++;
//     main.loadingProgress = (double)(numLoaded + current) / total * 100;
//     //Console.WriteLine(main.loadingProgress);
//     main.StateChanged();
// }
//
// rulesets[name].rules = rules;
//
// return numLoaded;