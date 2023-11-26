using GraphSynth.Representation;
using System.Collections.Immutable;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace ADArCWebApp
{
    public class RuleSetMap
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
            this.modifiedRules = ImmutableHashSet.Create("BondGraphRuleset",
                "SimplificationRuleset",
                "DirRuleset",
                "newDirectionRuleSet_2",
                "DirRuleset3",
                "Simplification2",
                "NewCausalityMethodRuleset",
                "NewCausalityMethodRuleset_2",
                "NewCausalityMethodRuleset_3",
                "INVDMarkerRules",
                "INVDMarkerRules_2",
                "CalibrationNewRuleset",
                "CalibrationNewRuleset_2",
                "RFlagCleanRuleset",
                "ICFixTotalRuleset",
                "TransformerFlipRuleset",
                "TransformerFlipRuleset2",
                "Clean23Ruleset",
                "BeforeBG-VerifyDirRuleSet");
            this.numLoaded = 0;
        }

		/// <summary>
		/// Returns the singleton instance of the RuleSetMap
		/// </summary>
		/// <returns>An instance of RuleSetMap</returns>
		public static RuleSetMap getInstance()
		{
			lock (padlock)
			{
				return instance ??= new RuleSetMap();
			}
		}
		public async Task loadRuleSet(string name)
        {
            //Ensure that we only load each rule once
            if (rulesets.ContainsKey(name))
            {
                Console.WriteLine("Rule " + name + " already loaded.");
                return;
            }

            //Setup HTTP client that we will use to load the file
            HttpClient client = new HttpClient();

            //Load the file as plain text from GitHub
            HttpResponseMessage ruleSetResponse =
                await client.GetAsync("https://boglweb.github.io/rules-and-examples/Rules/" + name + ".rsxml");
            XmlSerializer ruleDeserializer = new(typeof(ruleSet));
            Stream ruleSetFileContent = await ruleSetResponse.Content.ReadAsStreamAsync();

            //Deserialize the ruleset
            rulesets.Add(name, (ruleSet)ruleDeserializer.Deserialize(ruleSetFileContent));

            //Load rules for the ruleset
            List<string> ruleFileNames = rulesets[name].ruleFileNames;

            //Load all rules in a ruleset
            List<grammarRule> rules = new();
            this.numLoaded = 0;
            while (this.numLoaded < ruleFileNames.Count)
            {
                string rulePath = "/Rules/" + ruleFileNames[this.numLoaded];

                //Get the rule files from GitHub 
                HttpResponseMessage ruleResponse =
                    await client.GetAsync("https://boglweb.github.io/rules-and-examples/" + rulePath);
                string ruleText = await ruleResponse.Content.ReadAsStringAsync();

                XElement xeRule = XElement.Parse(ruleText);
                XElement? temp = xeRule.Element("{ignorableUri}" + "grammarRule");
                grammarRule openRule = new();
                //Deserialize the rule XML using GraphSynth
                if (temp != null)
                {
                    openRule = this.DeSerializeRuleFromXML(this.RemoveXAMLns(RemoveIgnorablePrefix(temp.ToString())));
                }

                this.removeNullWhiteSpaceEmptyLabels(openRule.L);
                this.removeNullWhiteSpaceEmptyLabels(openRule.R);

                object ruleObj = new object[] { openRule, rulePath };
                switch (ruleObj)
                {
                    case grammarRule obj:
                        rules.Add(obj);
                        break;
                    case object[] obj:
                        {
                            rules.AddRange(obj.OfType<grammarRule>());
                            break;
                        }
                }

                this.numLoaded++;
            }

            rulesets[name].rules = rules;
        }
        /// <summary>
        /// Returns the number of loaded rules
        /// </summary>
        /// <returns>number of loaded rules as an int</returns>
        public int getNumRules()
        {
            return rulesets.Count;
        }

        /// <summary>
        /// Returns a ruleset
        /// </summary>
        /// <param name="name">The name of the ruleset</param>
        /// <returns>A ruleset</returns>
        public ruleSet getRuleSet(string name)
        {
            if (!this.modifiedRules.Contains(name))
            {
                return rulesets[name];
            }

            foreach (grammarRule rule in rulesets[name].rules)
            {
                rule.TransformNodePositions = false;
                rule.Rotate = false;
            }
            return rulesets[name];
        }

        //Helper methods from BoGL Desktop
        private grammarRule DeSerializeRuleFromXML(string xmlString)
        {
            StringReader stringReader = new StringReader(xmlString);
            XmlSerializer ruleDeserializer = new XmlSerializer(typeof(grammarRule));
            grammarRule? newGrammarRule = (grammarRule)ruleDeserializer.Deserialize(stringReader);
            if (newGrammarRule.L == null)
            {
                newGrammarRule.L = new designGraph();
            }
            else
            {
                newGrammarRule.L.internallyConnectGraph();
            }

            if (newGrammarRule.R == null)
            {
                newGrammarRule.R = new designGraph();
            }
            else
            {
                newGrammarRule.R.internallyConnectGraph();
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


