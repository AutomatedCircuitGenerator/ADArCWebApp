using ADArCWebApp;
using GraphSynth.Representation;
using GraphSynth.Search;
using Microsoft.AspNetCore.Components;
using System.Linq;

namespace ADArCWebApp
{
    public class GraphSynthInvoke
    {


        //Dictionary<string, ruleSet> rulesets = new() {
        //    {"add", null },
        //    {"connect1", null}
        //};
        Dictionary<string, ruleSet> rulesets = RuleSetMap.rulesets;

        //inputs from user selecting components
        List<string> inputs;

        designGraph seed = new();
        
        public GraphSynthInvoke(List<string> inputs)
        {
            this.inputs = inputs;
        }
        private designGraph makeSeed(List<string> Inputs)
        {
            designGraph Graph = new designGraph();
            for (int i = 0; i < Inputs.Count; i++)
            {
                Graph.addNode();
                Graph.nodes[i].setLabel(0, "user_"+inputs[i]);
            }
            return Graph;
        }
        //
        public void recg_apply()
        {
            seed = makeSeed(inputs);
            ruleSet r = new();
            for(int i = 0; i < rulesets["CONNECT"].rules.Count; i++)
            {
                for(int j = 0; j < inputs.Count; j++)
                {
                    if (rulesets["CONNECT"].rules[i].name.Contains(inputs[j]))
                    {
                        if (!r.rules.Contains(rulesets["CONNECT"].rules[i])){
                            r.Add(rulesets["CONNECT"].rules[i]);
                            Console.WriteLine(rulesets["CONNECT"].rules[i].name);
						}
                    }

				}
            }

            Console.WriteLine(r.rules.Count);
            List<option> options = rulesets["ADD"].recognize(seed, true);
            //List<option> options = r.recognize(seed, true);

            while (options.Count > 0)
            {
                options[0].apply(seed, null);
                options = rulesets["ADD"].recognize(seed, true);
            }
            //Console.WriteLine(options.Count);
            Console.WriteLine("adding ends");
            options = r.recognize(seed, true);
            while (options.Count > 0)
            {
                options[0].apply(seed, null);
				options = r.recognize(seed, true);

            }
			Console.WriteLine("connecting ends");
		}

        public List<arc> GetArcs()
        {
            return seed.arcs;
        }

        public List<node> GetNodes()
        {
            return seed.nodes;
        }
        }
}
