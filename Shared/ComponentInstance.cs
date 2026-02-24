using System.Text.Json;
using GraphSynth.Representation;
using System.Text.Json.Serialization;
using ADArCWebApp.Shared.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared
{
    /// <summary>
    /// Stores actual data about a single, specific component.
    /// </summary>
    public class ComponentInstance : IAsyncDisposable
    {
        // Note: any changes here need to be reflected in unserialized strings, like in BoardService
        [JsonIgnore] public readonly ComponentData Data;

        public int localId { get; set; }

        public readonly int GlobalId;
        public double X;
        public double Y;
        
        public Variant? Highlight {get; set;}

        public double zoomedX;
        public double zoomedY;

        [JsonIgnore]
        public readonly Dictionary<int, List<InstanceConnection>> ConnMap = new(); //this.pinId -> connection

        [JsonIgnore] public node GsNode;
        public int midSignal;
        public int counter;
        public int Wbuffer;
        public int RegAddr;
        public int byteIndex;
        public long timer;
        public Dictionary<string, IComponentParameter> CompParams = new();
        [JsonIgnore]
        public IJSObjectReference? Controller { get; set; }
        
        public async ValueTask DisposeAsync()
        {
            if (Controller is not null)
            {
                await Controller.InvokeVoidAsync("delete");
                await Controller.DisposeAsync();
            }
        }
        
        public async Task LinkController(IJSRuntime js)
        {
            var jsIdentifier = Data.compType.Name.Replace("Razor", "");
            // Canonical pin name: "SO", to absolute pin indexes it is connected to
            Dictionary<string, List<int>> pins = new();

            foreach (var pin in Data.pins)
            {
                if (ConnMap.TryGetValue(pin.Value, out var connections))
                {
                    //one pin on a component can be connected to many pins on the arduino
                    var pinIds = connections.Select(connection => connection.ToId);

                    pins[pin.Key] = pinIds.ToList();
                }
                else
                {
                    pins[pin.Key] = [];
                }
            }

            Controller = await js.InvokeAsync<IJSObjectReference>($"{jsIdentifier}.create", localId, pins);
        }

        public ComponentInstance(int globalId, node gsNode, double x = 829.0, double y = 219.0)
        {
            GlobalId = globalId;
            Data = ComponentDeclarations.Components[globalId];
            foreach (var kv in Data.templateParams)
            {
                CompParams.Add(kv.Key, kv.Value.Copy());
            }

            X = x;
            Y = y;
            zoomedX = x;
            zoomedY = y;
            GsNode = gsNode;
        }

        /// <summary>
        /// Transfers the property array to the format needed by DynamicComponent in VaryingComponent.razor.
        /// </summary>
        /// <returns>The property dictionary as <string, object>.</returns>
        public Dictionary<string, object?> GetPropsAsParams()
        {
            Dictionary<string, object?> ret = [];

            foreach (var kv in CompParams)
            {
                ret.Add(kv.Key, kv.Value.GetValue());
            }

            if (Data.compType.IsSubclassOf(typeof(RazorComponent)))
            {
                ret.Add("Controller", Controller);
                ret.Add("Component", this);
            }
            
            return ret;
        }

        private static readonly Dictionary<string, string> ColorMap = new()
        {
            { "BK", "black" },
            { "RD", "red" },
            { "LB", "lightblue" },
            { "DB", "darkblue" },
            { "GN", "lime" },
            { "VT", "violet" },
            { "OG", "orange" }
        };

        /// <summary>
        /// Creates visual lines and sets up the connection map for this component.
        /// </summary>
        /// <param name="i1">my localId.</param>
        /// <param name="to">the component to connect to.</param>
        /// <param name="i2">the localID of to.</param>
        /// <param name="arc">the Graphsynth arc between the two components.</param>
        public void AddConnection(int i1, ComponentInstance to, int i2, arc arc)
        {
            InstanceConnection toAdd = new(this, i1, i2, to,
                ColorMap[arc.localLabels.Find(ColorMap.ContainsKey) ?? "BK"]);

            if (ConnMap.TryGetValue(i1, out List<InstanceConnection>? value))
            {
                if (!IsArduino())
                {
                    if (value.Contains(toAdd))
                    {
                        Console.WriteLine("Connection already exists from " + Data.name + " pin " + i1 +
                                          " to external pin id " + i2 + ". Ignoring...");
                        return;
                    }

                    Console.WriteLine("WARNING: Pin list extended for " + Data.name +
                                      " component. This is probably an error!");
                }

                value.Add(toAdd);
            }
            else
            {
                ConnMap[i1] = [toAdd];
            }

            if (!IsArduino())
            {
                Pages.Index.BuildCanvas!.ConnLines.Add(toAdd);
            }
        }

        /// <summary>
        /// Gets the pin id of the (Arduino?) pin connected to the given pin name.
        /// </summary>
        /// <param name="pinName">the name of the pin to get a connection of.</param>
        /// <param name="conn">a place to store a connection if there is exactly one.</param>
        /// <param name="all">A place to store connections if there are more than one.</param>
        /// <returns>-1 if unconnected, 0 if exactly one connection, 1 if more than 1.</returns>
        public int GetConnection(string pinName, out InstanceConnection? conn, out List<InstanceConnection>? all)
        {
            var instanceConnections = ConnMap[Data.pins[pinName]];

            if (instanceConnections.Count == 1)
            {
                conn = instanceConnections[0];
                all = null;
                return 0;
            }

            conn = null;
            all = instanceConnections;
            return 1;
        }

        public bool IsArduino()
        {
            return GlobalId is 1 or 2;
        }
    }


    public class InstanceConnection(ComponentInstance from, int fromId, int toId, ComponentInstance to, string color)
    {
        public readonly ComponentInstance From = from;
        public readonly int FromId = fromId;
        public readonly int ToId = toId;
        public readonly ComponentInstance To = to;
        public readonly string Color = color;

        protected bool Equals(InstanceConnection other)
        {
            return From.Equals(other.From) && FromId == other.FromId && ToId == other.ToId && To.Equals(other.To);
        }
    }
}