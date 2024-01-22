using ADArCWebApp.Shared.Components;

namespace ADArCWebApp.Shared
{
	public class ComponentData
	{
        public string name;
        public bool enabled;
        public string directoryPath;
        public string paneHoverText = "";
        public Dictionary<string, string> codeForGen = new();
        public double rightOffset;
        public double cardScaleFactor;
        public double bottomOffset;
		public Dictionary<string, int> pins;
		public List<string> pinNames => pins.Keys.ToList();
		public string? nodeName;
		public ElementPin[] pinInfo;
        public Type compType;

        public Dictionary<string,object> compParams = new Dictionary<string,object>();
		public List<string> pinsToListen = new();

		public ComponentData(ComponentDataBuilder builder) {
			compParams = builder.properties;
			name = builder.name;
			enabled = builder.enabled;
			directoryPath = builder.directoryPath;
			paneHoverText = builder.paneHoverText;
			codeForGen = builder.codeForGen;

			rightOffset = builder.rightOffset;
			cardScaleFactor = builder.cardScaleFactor;
			bottomOffset = builder.bottomOffset;
			compType = builder.compType;
			pins = builder.pins;
			nodeName = builder.nodeName;
			pinsToListen = builder.pinsToListen;
			pinInfo = builder.pinInfo;
		}

    }

	public class ComponentDataBuilder
	{
		public Dictionary<string, object> properties = new();
		public string name;
		public bool enabled;
		public string directoryPath;
		public string paneHoverText = "";
		public Dictionary<string, string> codeForGen = new();
		public double rightOffset;
		public double cardScaleFactor;
		public double bottomOffset;

		public Type compType;
		public Dictionary<string, int> pins = new();
		public List<string> pinsToListen = new();
		public string? nodeName;

		public ElementPin[] pinInfo;
		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(string name, bool enabled, string directoryPath, double cardScaleFactor, double rightOff, double bottomOff, Type compType = null, string paneHoverText = "", Dictionary<string, string> codeForGen = null, List<string>? pins = null, List<string>? listenOn = null, string gsNodeName = "") {
			this.name = name;
			this.enabled = enabled;
			this.directoryPath = directoryPath;
			this.paneHoverText = paneHoverText;
			this.codeForGen = codeForGen;
			this.compType = compType ?? typeof(InvalidComponent);
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
			if (listenOn != null) {
				pinsToListen = listenOn;
			}
			this.nodeName = gsNodeName;

			if (compType != typeof(InvalidComponent)) {
				try {
					var p_i = compType!.GetProperty("pinInfo");
					if (p_i != null)
					{
						this.pinInfo = (ElementPin[])p_i.GetValue(compType.GetConstructors()[0].Invoke(new object[] { }));
					}
				}
				catch {
					Console.WriteLine(name + " pinInfo setup failed!");
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
