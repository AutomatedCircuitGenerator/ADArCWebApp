using System.Diagnostics;
using ADArCWebApp.Shared.Components;

namespace ADArCWebApp.Shared
{

	/// <summary>
	/// Primary data class. Extremely bloated. Stores template data about a type of component.
	/// TODO: try to improve system to avoid this class. Component parent class?
	/// </summary>
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
		public bool LivesOnBreadBoard;
		public double BreadboardOffsetX, BreadboardOffsetY, Width;
        public Type compType;
        public readonly Type? EnvironmentalSettingsType;
        public string? Warning;

        public Dictionary<string,IComponentParameter> templateParams = new Dictionary<string,IComponentParameter>();
		public List<string> pinsToListen = new();

		public ComponentData(ComponentDataBuilder builder) {
			templateParams = builder.properties;
			name = builder.name;
			enabled = builder.enabled;
			directoryPath = builder.directoryPath;
			paneHoverText = builder.paneHoverText;
			codeForGen = builder.codeForGen;

			rightOffset = builder.rightOffset;
			cardScaleFactor = builder.cardScaleFactor;
			bottomOffset = builder.bottomOffset;
			compType = builder.compType;
			EnvironmentalSettingsType = builder.EnvironmentalSettingsType;
			Warning = builder.Warning;
			pins = builder.pins;
			nodeName = builder.nodeName;
			pinsToListen = builder.pinsToListen;
			pinInfo = builder.pinInfo;
			LivesOnBreadBoard = builder.LivesOnBreadBoard;
			BreadboardOffsetX = builder.BreadboardOffsetX;
			BreadboardOffsetY = builder.BreadboardOffsetY;
			Width = builder.Width;
		}

    }

	public class ComponentDataBuilder
	{
		public Dictionary<string, IComponentParameter> properties = new();
		public string name;
		public bool enabled;
		public string directoryPath;
		public string paneHoverText = "";
		public Dictionary<string, string> codeForGen = new();
		public double rightOffset;
		public double cardScaleFactor;
		public double bottomOffset;

		public Type compType;
		public Type? EnvironmentalSettingsType;
		public string? Warning;
		public Dictionary<string, int> pins = new();
		public List<string> pinsToListen = new();
		public string? nodeName;

		public ElementPin[] pinInfo;

		public bool LivesOnBreadBoard = false;
		public double BreadboardOffsetX, BreadboardOffsetY, Width;
		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(string name, bool enabled, string directoryPath, double cardScaleFactor, double rightOff, double bottomOff, Type compType = null, string paneHoverText = "", Dictionary<string, string> codeForGen = null, List<string>? pins = null, List<string>? listenOn = null, string gsNodeName = "", Type environmentalSettingsType = null, string warning = null)
		{
			
			this.name = name;
			this.enabled = enabled;
			this.directoryPath = directoryPath;
			this.paneHoverText = paneHoverText;
			this.codeForGen = codeForGen;
			this.compType = compType ?? typeof(InvalidComponent);
			this.EnvironmentalSettingsType = environmentalSettingsType;
			Warning = warning;
			this.rightOffset = rightOff;
			this.bottomOffset = bottomOff;
			this.cardScaleFactor = cardScaleFactor;
			if (pins != null)//create pin ids
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

			//quick hack to get the pinInfo from a component without having to setup a field in the namespace file.
			//TODO: fix!
			if (compType != typeof(InvalidComponent) && compType != null) {
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
				try {
					var l_o_b = compType!.GetProperty("LivesOnBreadboard");
					if ( l_o_b != null)
					{
						this.LivesOnBreadBoard = (bool)l_o_b.GetValue(compType.GetConstructors()[0].Invoke(new object[] { }));
					}
					else
					{
						this.LivesOnBreadBoard = false;
					}
				}
				catch(Exception E) {
					Console.WriteLine(E.ToString());
					this.LivesOnBreadBoard = false;
				}
				Console.WriteLine("Lives on BreadBoard: {0}", this.LivesOnBreadBoard);
				
				
				foreach (var attribute in Attribute.GetCustomAttributes(compType))
				{
					if (attribute is BreadboardOffsetAttribute BBOA)//CANNOT BE SWITCH! sorry
					{
						BreadboardOffsetX = BBOA.leftOffset;
						BreadboardOffsetY = BBOA.topOffset;
						Width = BBOA.Width;
					}
				}
			}
		}


		public ComponentDataBuilder Property<T>(string name, T data)
		{
			properties[name] = new ComponentParameter<T?>(data);
			return this;
		}


		public ComponentData Finish()
		{
			return new ComponentData(this);
		}
	}
}

public class BreadboardOffsetAttribute : Attribute
{
	public double leftOffset;
	public double topOffset;
	public double Width;
	
	public BreadboardOffsetAttribute(double leftOffset, double topOffset, double Width)
	{
		this.leftOffset = leftOffset;
		this.topOffset = topOffset;
		this.Width = Width;
	}
}
