using ADArCWebApp;
using GraphSynth.Representation;
using GraphSynth.Search;
using Microsoft.AspNetCore.Components;

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
                Graph.nodes[i].setLabel(0, inputs[i]);
            }
            return Graph;
        }
        //
        public void recg_apply()
        {
            seed = makeSeed(inputs);


            List<option> options = rulesets["BIG1"].recognize(seed, true);
            

            while (options.Count > 0)
            {
                options[0].apply(seed, null);
                options = rulesets["BIG1"].recognize(seed, true);

            }
            //options = rulesets["connect1"].recognize(seed, true);
            //while (options.Count > 0)
            //{
            //    options[0].apply(seed, null);
            //    options = rulesets["connect1"].recognize(seed, true);

            //}
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
