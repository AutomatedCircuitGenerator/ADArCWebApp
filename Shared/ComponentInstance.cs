using ADArCWebApp.ComponentNamespace;
using GraphSynth.Representation;

namespace ADArCWebApp.Shared
{
	public class ComponentInstance
	{
		public ComponentData data;

		public int globalId;
		public double x;

		public double y;

		public double zoomedX;
		public double zoomedY;

		public object mainValue;

		public Dictionary<int, List<InstanceConnection>> connMap = new(); //this.pinId -> connection
		public node gsNode;
		public int midSignal;
		public Dictionary<string, object> moreData = new Dictionary<string, object>();

		public ComponentInstance(int globalId, object mainValueInitial, node gsNode, double x = 10.0, double y = 10.0) {
			this.globalId = globalId;
			data = ComponentDeclarations.components[globalId];
			this.x = x;
			this.y = y;
			zoomedX = x;
			zoomedY = y;
			mainValue = mainValueInitial;
			this.gsNode = gsNode;
		}


		public void addConnection(int i1, ComponentInstance to, int i2) {
			InstanceConnection toAdd = new(this, i1, i2, to);

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
			}
			else
			{
				connMap[i1] = new() { toAdd };
			}
		}


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

		public InstanceConnection(ComponentInstance from, int fromId, int toId, ComponentInstance to) { 
			this.from = from;
			this.fromId = fromId;
			this.to = to;
			this.toId = toId;
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
