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

		public ComponentInstance(int globalId, object mainValueInitial, double x = 10.0, double y = 10.0) {
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
