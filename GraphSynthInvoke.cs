using ADArCWebApp;
using GraphSynth.Representation;
using GraphSynth.Search;
using Microsoft.AspNetCore.Components;
using System.Linq;
using System.Xml.Linq;

namespace ADArCWebApp
{
    public static class GraphSynthInvoke
    {


        //Dictionary<string, ruleSet> rulesets = new() {
        //    {"add", null },
        //    {"connect1", null}
        //};
        static Dictionary<string, ruleSet> rulesets = RuleSetMap.rulesets;

        //inputs from user selecting components
        public static List<string> inputs = new();

        static designGraph seed = new();


        public static void destroyGraph() {
            seed = new();
        }

        /// <summary>
        /// This function sets up the seed graph from the inputs.
        /// This system is not great.
        /// TODO: improve.
        /// </summary>
        /// <param name="Inputs">A list of graphsynth node names with their "user_" prefix missing.</param>
        public static void makeGraph(List<string> Inputs)
        {
            //designGraph Graph = new designGraph();
            inputs.AddRange(Inputs);
            for (int i = 0; i < Inputs.Count; i++)
            {
                node n = new();
                n.setLabel(0, "user_" + Inputs[i]);
                seed.addNode(n);
                //seed.nodes[i].setLabel(0, "user_"+inputs[i]);
            }
        }
        //apply the GraphSynth rules
        static public void recg_apply(List<string>? fInp = null)
        {
            if (fInp != null) { 
                makeGraph(fInp);
            }
            if (seed.nodes.Count == 0)
            {
                makeGraph(inputs);
            }
            ruleSet r = new();
            ruleSet connect = rulesets["CONNECT"];
            for(int i = 0; i < connect.rules.Count; i++)
            {
                for(int j = 0; j < inputs.Count; j++)
                {
                    //edit the names to avoid adding rules that have common words in their name
                    if (inputs[j].Contains("servo") && inputs[j].Contains("direct"))
                    {
                        inputs[j] = "servo";
                    }
                    else if (inputs[j].Contains("pca9685"))
                    {
                        inputs[j] = "pca9685";
                    }
                    else if (inputs[j].Contains("l298n"))
                    {
                        inputs[j] = "l298n";
                    }
                    else if (inputs[j].Contains("a4988"))
                    {
                        inputs[j] = "a4988";
                    }
                    else if (inputs[j].Contains("lm386"))
                    {
                        inputs[j] = "lm386";
                    }
                    else if (inputs[j].Contains("hx711"))
                    {
                        inputs[j] = "hx711";
                    }

                    if (connect.rules[i].name.Contains(inputs[j]))
                    {
                        if (!r.rules.Contains(connect.rules[i])){
                            r.Add(connect.rules[i]);
                            Console.WriteLine(connect.rules[i].name);
						}
                    }

				}
            }

            //Console.WriteLine(r.rules.Count);
            List<option> options = rulesets["ADD"].recognize(seed, true);
            //List<option> options = r.recognize(seed, true);

            while (options.Count > 0)
            {
                options[0].apply(seed, null);
                options = rulesets["ADD"].recognize(seed, true);
            }
            //Console.WriteLine(options.Count);
            
            foreach (var rule in r.rules)
            {
                foreach (var arc in rule.R.arcs)
                {
                    if (arc.localLabels.Contains("connection"))
                    {
                        bool isFromArduino = (arc.From.arcsFrom.Any(a => a.To.localLabels.Contains("arduino")) ||
                                              arc.From.arcsTo.Any(a => a.From.localLabels.Contains("arduino")));

                        var arduinoNode = isFromArduino ? arc.From : arc.To;
                        var componentNode = isFromArduino ? arc.To : arc.From;
                          
                        var arduinoNodeLabels = new HashSet<string>(arduinoNode.localLabels);
                        var componentNodeLabels = new HashSet<string>(componentNode.localLabels);
                        componentNodeLabels.Remove("connected");
                        arduinoNodeLabels.Remove("connected");
                        
                        Console.WriteLine("Arduino labels");
                        foreach (var label in arduinoNodeLabels)
                        {
                            Console.WriteLine(label);
                        }
                        Console.WriteLine("Component labels");
                        foreach (var label in componentNodeLabels) { Console.WriteLine(label); }

                        node matchedArduinoNode = null;
                        node matchedComponentNode = null;
                        foreach (var node in seed.nodes)
                        {
                            var nodeLabels = new HashSet<string>(node.localLabels);
                            if (nodeLabels.Contains("connected")) continue;
                            if (arduinoNodeLabels.IsSubsetOf(nodeLabels) && matchedArduinoNode == null &&
                                (node.arcsFrom.Any(a => a.To.localLabels.Contains("arduino")) ||
                                 node.arcsTo.Any(a => a.From.localLabels.Contains("arduino"))))
                            {
                                matchedArduinoNode = node;
                            } else if (componentNodeLabels.IsSubsetOf(nodeLabels) && matchedComponentNode == null)
                            {
                                matchedComponentNode = node;
                            }
                            
                            if (matchedArduinoNode != null && matchedComponentNode != null)
                            {
                                var newArc = new arc();
                                newArc.From = matchedComponentNode;
                                newArc.To = matchedArduinoNode;
                                newArc.localLabels = arc.localLabels;
                                seed.addArc(newArc, matchedComponentNode, matchedArduinoNode);
                                Console.WriteLine("Found one connection");
                                break;
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// This function removes the component from the seed graph.
        /// </summary>
        /// <param name="n">A node that belongs to the component being removed.</param>
        static public void removeComp(node n)
        {
            if (n == null) {
                return;
            }
			string localId = n.localLabels.Find(s => s.StartsWith("localId:"));
			foreach (var nodeToRemove in seed.nodes.Where(n => n.localLabels.Contains(localId)).ToList())
            {
                foreach (arc arcToRemove in nodeToRemove.arcs.ToList())
                {
                    arcToRemove.otherNode(nodeToRemove).localLabels.Remove("connected");
                    seed.removeArc(arcToRemove);
                }
				seed.removeNode(nodeToRemove);
			}
        }
        /// <summary>
		/// Returns the arcs of seed
		/// </summary>
		/// <returns>A list of arcs</returns>
        static public List<arc> GetArcs()
        {
            return seed.arcs;
        }
        /// <summary>
		/// Returns the nodes of seed
		/// </summary>
		/// <returns>A list of nodes</returns>
        static public List<node> GetNodes()
        {
            return seed.nodes;
        }
    }
}
