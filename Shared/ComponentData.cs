using MinAVR.Shared.Components;
using System.Reflection;

namespace MinAVR.Shared
{
	public class ComponentData
	{
		public string name;
		public string imagePath;
		public Type? type;
		public bool enabled;
		public string directoryPath;
		public PropertyInfo? mainValue = null;
		public Type? mainValueType = null;
		public string paneHoverText = "";
		string codeForGen = "";
		public Dictionary<string,object> extraProperties = new Dictionary<string,object>();

		public ComponentData(ComponentDataBuilder builder) {
			extraProperties = builder.properties;
			name = builder.name;
			imagePath = builder.imagePath;
			type = builder.type;
			enabled = builder.enabled;
			directoryPath = builder.directoryPath;
			mainValue = builder.mainValue;
			mainValueType = builder.mainValueType;
			paneHoverText = builder.paneHoverText;
			codeForGen = builder.codeForGen;
		}

    }

	public class ComponentDataBuilder
	{

		public Dictionary<string, object> properties = new Dictionary<string, object>();
		public string name;
		public string imagePath;
		public Type? type;
		public bool enabled;
		public string directoryPath;
		public PropertyInfo? mainValue = null;
		public Type? mainValueType = null;
		public string paneHoverText = "";
		public string codeForGen = "";

		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(string name, string imagePath, Type? type, bool enabled, string directoryPath, PropertyInfo? mainValue = null, Type? mainValueType = null, string paneHoverText = "", string codeForGen = "") {
			this.name = name;
			this.imagePath = imagePath;
			this.type = type;
			this.enabled = enabled;
			this.directoryPath = directoryPath;
			this.mainValue = mainValue;
			this.mainValueType = mainValueType;
			this.paneHoverText = paneHoverText;
			this.codeForGen = codeForGen;

		}


		public ComponentDataBuilder Property(string name, object data)
		{
			properties[name] = data;
			return this;
		}


		public ComponentData Finish()
		{
			return new ComponentData(this);
		}
	}
}
