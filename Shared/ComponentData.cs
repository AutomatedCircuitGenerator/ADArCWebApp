namespace ADArCWebApp.Shared
{
	public class ComponentData
	{
        public string name;
        public bool enabled;
        public string directoryPath;
        public string paneHoverText = "";
        public string codeForGen = "";
        public double rightOffset;
        public double cardScaleFactor;
        public double bottomOffset;
		public Dictionary<string, int> pins;
        public object? defaultVal;

        public Action<ComponentInstance>? translate;

        public Dictionary<string,object> extraProperties = new Dictionary<string,object>();

		public ComponentData(ComponentDataBuilder builder) {
			extraProperties = builder.properties;
			name = builder.name;
			enabled = builder.enabled;
			directoryPath = builder.directoryPath;
			paneHoverText = builder.paneHoverText;
			codeForGen = builder.codeForGen;

			rightOffset = builder.rightOffset;
			cardScaleFactor = builder.cardScaleFactor;
			bottomOffset = builder.bottomOffset;
			defaultVal = builder.defaultVal;
			translate = builder.translate;
			pins = builder.pins;
		}

    }

	public class ComponentDataBuilder
	{
		public Dictionary<string, object> properties = new();
		public string name;
		public bool enabled;
		public string directoryPath;
		public string paneHoverText = "";
		public string codeForGen = "";
		public double rightOffset;
		public double cardScaleFactor;
		public double bottomOffset;

		public object? defaultVal;

		public Action<ComponentInstance>? translate;
		public Dictionary<string, int> pins = new();
		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(string name, bool enabled, string directoryPath, double cardScaleFactor, double rightOff, double bottomOff, object? defaultVal = null, Action<ComponentInstance>? translate = null, string paneHoverText = "", string codeForGen = "", List<string>? pins = null, string gsNodeName = "") {
			this.name = name;
			this.enabled = enabled;
			this.directoryPath = directoryPath;
			this.paneHoverText = paneHoverText;
			this.codeForGen = codeForGen;
			this.translate = translate;
			this.defaultVal = defaultVal;
			this.rightOffset = rightOff;
			this.bottomOffset = bottomOff;
			this.cardScaleFactor = cardScaleFactor;
			if (pins != null)
			{
				for (int i = 0; i < pins.Count; i++)
				{
					this.pins.Add(pins[i], i);
				}
			}

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
