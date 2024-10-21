using ADArCWebApp.ComponentNamespace;
using GraphSynth.Representation;
using System.Numerics;
using System.Text.Json;
using System.Text.Json.Serialization;
using ADArCWebApp.Shared.Components;

namespace ADArCWebApp.Shared
{
	/// <summary>
	/// Stores actual data about a single, specific component.
	/// </summary>
	public class ComponentInstance
	{
		[JsonIgnore] public ComponentData data;

		public int globalId;
		public double x;
		public double y;

		public double zoomedX;
		public double zoomedY;

		[JsonIgnore]public Dictionary<int, List<InstanceConnection>> connMap = new(); //this.pinId -> connection
		[JsonIgnore]public node gsNode;
		public int midSignal;
		public int counter;
		public int Wbuffer;
		public int RegAddr;
		public int byteIndex;
		public long timer;
		public Dictionary<string, IComponentParameter> compParams = new();

		public ComponentInstance(int globalId, node gsNode, double x = 10.0, double y = 10.0) {
			this.globalId = globalId;
			data = ComponentDeclarations.components[globalId];
            foreach (var kv in data.templateParams)
            {
				compParams.Add(kv.Key, kv.Value.copy());
            }
            this.x = x;
			this.y = y;
			zoomedX = x;
			zoomedY = y;
			this.gsNode = gsNode;
		}
		/// <summary>
		/// Transfers the property array to the format needed by DynamicComponent in VaryingComponent.razor.
		/// </summary>
		/// <returns>The property dictionary as <string, object>.</returns>
		public Dictionary<string, object> getPropsAsParams() {
			Dictionary<string, object> ret = [];

			foreach (var kv in compParams) { 
				ret.Add(kv.Key, kv.Value.getValue());
			}

			if (data.compType.IsSubclassOf(typeof(RazorComponent)))
			{
				ret.Add("ComponentInstance", this);
			}

			return ret;
		}

		private static Dictionary<string, string> colorMap = new()
		{
			{ "BK", "black" },
			{ "RD", "red"},
			{ "LB", "lightblue"},
			{ "DB", "#000435"},
			{ "GN", "green"},
			{ "VT", "violet"},
			{ "OG", "orange"}
		};

		/// <summary>
		/// Creates visual lines and sets up the connection map for this component.
		/// </summary>
		/// <param name="i1">my localId.</param>
		/// <param name="to">the component to connect to to.</param>
		/// <param name="i2">the localID of to.</param>
		/// <param name="arc">the Graphsynth arc between the two components.</param>
		public void addConnection(int i1, ComponentInstance to, int i2, arc arc) {
			InstanceConnection toAdd = new(this, i1, i2, to, colorMap[arc.localLabels.Find(colorMap.ContainsKey) ?? "BK"]);

			if (connMap.ContainsKey(i1)) {

				if (globalId != 1)
				{
					if (connMap[i1].Contains(toAdd)) {
						Console.WriteLine("Connection already exists from " + data.name + " pin " + i1 + " to external pin id " + i2 + ". Ignoring...");
						return;
					}
					Console.WriteLine("WARNING: Pin list extended for " + data.name + " component. This is probably an error!");
				}
				connMap[i1].Add(toAdd);

				if (globalId != 1)
				{
					Pages.Index.buildCanvas!.connLines.Add(toAdd);

				}
			}
			else
			{
				connMap[i1] = new() { toAdd };

				if (globalId != 1)
				{
					Pages.Index.buildCanvas!.connLines.Add(toAdd);

				}
			}
		}

		/// <summary>
		/// Gets the pin id of the (Arduino?) pin connected to the given pin name.
		/// </summary>
		/// <param name="pinName">the name of the pin to get a connection of.</param>
		/// <param name="conn">a place to store a connection if there is exactly one.</param>
		/// <param name="all">A place to store connections if there are more than one.</param>
		/// <returns>-1 if unconnected, 0 if exactly one connection, 1 if more than 1.</returns>
		public int getConnection(string pinName, out InstanceConnection? conn, out List<InstanceConnection>? all) {
			var conns = connMap[data.pins[pinName]];

			if (conns == null)
			{
				conn = null;
				all = null;
				return -1;
			}
			else if (conns.Count == 1)
			{
				conn = conns[0];
				all = null;
				return 0;
			}
			else {
				conn = null;
				all = conns;
				return 1;
			}
		}
	}


	public class InstanceConnection {

		public ComponentInstance from;
		public int fromId;
		public int toId;
		public ComponentInstance to;
		public string color;

		public InstanceConnection(ComponentInstance from, int fromId, int toId, ComponentInstance to, string color) { 
			this.from = from;
			this.fromId = fromId;
			this.to = to;
			this.toId = toId;
			this.color = color;
		}


		public override bool Equals(object? obj)
		{
			if (obj is not InstanceConnection c)
			{
				return false;
			}
			else if (c == null)
			{
				return false;
			}
			else { 
				return from.Equals(c.from) && to.Equals(c.to) & fromId == c.fromId && toId == c.toId;
			}
		}
	}


}
