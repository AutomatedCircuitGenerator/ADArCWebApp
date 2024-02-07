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
                "BeforeBG-VerifyDirRuleSet",
                "BIG1");
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
		public async Task<int> loadRuleSet(string name, NavigationManager navigationManager, Pages.Index main, int current, int total)
        {
            //Ensure that we only load each rule once
            if (rulesets.ContainsKey(name))
            {
                Console.WriteLine("Rule " + name + " already loaded.");
                return 0;
            }

			////Setup HTTP client that we will use to load the file
			HttpClient client = new HttpClient();
            client.BaseAddress = new(navigationManager.BaseUri + "rules/");
            ////Load the file as plain text from GitHub
            HttpResponseMessage ruleSetResponse =
                await client.GetAsync(name + ".rsxml");
            XmlSerializer ruleDeserializer = new(typeof(ruleSet));
            Stream ruleSetFileContent = await ruleSetResponse.Content.ReadAsStreamAsync();


            //var filename = "rules/BIG1.rsxml";
            //var filename = new Uri("pack://application:,,,/Rules/BondGraphRuleset.rsxml");
            //var filename = FileStore.Resource1.BondGraphRuleset.ToString();
            //System.Windows.Resources.StreamResourceInfo info = Application.GetResourceStream(filename);
            //var filename = extractPath1 + "\\BondGraphRuleset.rsxml";
            //var filename = Encoding.ASCII.GetString(FileStore.Resource1.BondGraphRuleset);
            //Stream stream = new FileStream(filename,FileMode.Open);
            var ruleReader = new StreamReader(ruleSetFileContent);

            //Deserialize the ruleset
            rulesets.Add(name, (ruleSet)ruleDeserializer.Deserialize(ruleReader));
            Console.WriteLine("1");
            //Load rules for the ruleset
            List<string> ruleFileNames = rulesets[name].ruleFileNames;

            //Load all rules in a ruleset
            List<grammarRule> rules = new();
            this.numLoaded = 0;
            while (this.numLoaded < ruleFileNames.Count)
            {
                string rulePath = ruleFileNames[this.numLoaded];
                Console.WriteLine(rulePath + " loaded");
                //Get the rule files from GitHub 
                HttpResponseMessage ruleResponse =
                    await client.GetAsync(rulePath);
				    //await client.GetAsync(rulePath.Substring(rulePath.LastIndexOf("\\") + 1));

				string ruleText = await ruleResponse.Content.ReadAsStringAsync();
                //var f = File.OpenText(rulePath);
                //string ruleText = f.ReadToEnd();

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
                main.loadingProgress = (double)(numLoaded + current) / total *100;
                //Console.WriteLine(main.loadingProgress);
                main.StateChanged();
            }

            rulesets[name].rules = rules;
            
            return numLoaded;
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


