using ADArCWebApp.ComponentNamespace;

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

		public Dictionary<int, int> connMap = new Dictionary<int, int>(); //comp->arduino
		public Pages.Index.node? gsNode;
		public int midSignal;
		public Dictionary<string, object> moreData = new Dictionary<string, object>();

		public ComponentInstance(int globalId, object mainValueInitial, /*node gsNode,*/double x = 10.0, double y = 10.0) {
			this.globalId = globalId;
			data = ComponentDeclarations.components[globalId];
			this.x = x;
			this.y = y;
			zoomedX = x;
			zoomedY = y;
			mainValue = mainValueInitial;

		}
	}
}
