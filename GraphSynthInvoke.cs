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

        private static List<node>? _arduinoNodes;

        public static void destroyGraph()
        {
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
        public static void recg_apply(List<string>? fInp = null)
        {
            if (fInp != null)
            {
                makeGraph(fInp);
            }

            if (seed.nodes.Count == 0)
            {
                makeGraph(inputs);
            }

            ruleSet r = new();
            ruleSet connect = rulesets["CONNECT"];
            for (int i = 0; i < connect.rules.Count; i++)
            {
                for (int j = 0; j < inputs.Count; j++)
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
                        if (!r.rules.Contains(connect.rules[i]))
                        {
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

            if (_arduinoNodes == null) // Arduino nodes have not been cached
            { 
                var arduinoNode = seed.nodes.Find(n => n.localLabels.Contains("arduino"));

                if (arduinoNode == null)
                {
                    Console.WriteLine("No arduino node was found");
                    return;
                }
                _arduinoNodes = arduinoNode.arcsTo.Select(arc => arc.From)
                    .Concat(arduinoNode.arcsFrom.Select(arc => arc.To))
                    .ToList();
            }

            node? userNode = null;
            // iteration is done in reverse - new components are likely to be added to the end of the nodes list
            for (var i = seed.nodes.Count - 1; i >= 0; i--) 
            {
                var labels = seed.nodes[i].localLabels;
                if  (labels.Any(l => l.Contains("user_")) && !labels.Any(l => l.Contains("localId:")))
                {
                    userNode = seed.nodes[i];
                    break;
                }
            }

            if (userNode == null)
            {
                Console.WriteLine("No user_ node for the new component was found");
                return;
            }
            
            var componentNode = userNode.arcsTo.Count > 0 ? userNode.arcsTo[0].From : userNode.arcsFrom[0].To;
            var componentNodes = new List<node>();

            // Start BFS from the component node
            var visited = new HashSet<node>();
            var queue = new Queue<node>();
            queue.Enqueue(componentNode);
            visited.Add(componentNode);

            while (queue.Count > 0)
            {
                var currentNode = queue.Dequeue();
                componentNodes.Add(currentNode);

                // Get all connected nodes (both arcsTo and arcsFrom)
                var connectedNodes = currentNode.arcsTo.Select(arc => arc.From)
                    .Concat(currentNode.arcsFrom.Select(arc => arc.To));

                foreach (var connectedNode in connectedNodes)
                {
                    if (visited.Add(connectedNode))
                    {
                        queue.Enqueue(connectedNode);
                    }
                }
            }

            foreach (var rule in r.rules)
            {
                foreach (var arc in rule.R.arcs)
                {
                    if (!arc.localLabels.Contains("connection")) continue;
                    var isFromArduino = (arc.From.arcsFrom.Any(a => a.To.localLabels.Contains("arduino")) ||
                                         arc.From.arcsTo.Any(a => a.From.localLabels.Contains("arduino")));

                    var ruleArduinoNode = isFromArduino ? arc.From : arc.To;
                    var ruleComponentNode = isFromArduino ? arc.To : arc.From;

                    var ruleArduinoNodeLabels = new HashSet<string>(ruleArduinoNode.localLabels);
                    var ruleComponentNodeLabels = new HashSet<string>(ruleComponentNode.localLabels);
                    ruleComponentNodeLabels.Remove("connected");
                    ruleArduinoNodeLabels.Remove("connected");

                    var matchedArduinoNode = _arduinoNodes.Find(n =>
                        ruleArduinoNodeLabels.IsSubsetOf(n.localLabels) && !n.localLabels.Contains("connected"));
                    var matchedComponentNode = componentNodes.Find(n =>
                        ruleComponentNodeLabels.IsSubsetOf(n.localLabels) && !n.localLabels.Contains("connected"));

                    if (matchedArduinoNode != null && matchedComponentNode != null)
                    {
                        var newArc = new arc();
                        newArc.From = matchedComponentNode;
                        newArc.To = matchedArduinoNode;
                        newArc.localLabels = arc.localLabels;
                        seed.addArc(newArc, matchedComponentNode, matchedArduinoNode);
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
            if (n == null)
            {
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