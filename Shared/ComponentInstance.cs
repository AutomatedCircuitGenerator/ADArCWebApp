using MinAVR.ComponentNamespace;

namespace MinAVR.Shared
{
	public class ComponentInstance
	{
		public ComponentData data;

		public int globalId;
		public double x;

		public double y;

		public object mainValue;

		public ComponentInstance(int globalId, object mainValueInitial, double x = 10.0, double y = 10.0) {
			this.globalId = globalId;
			data = ComponentDeclarations.components[globalId];
			this.x = x;
			this.y = y;
			mainValue = mainValueInitial;

		}
	}
}
