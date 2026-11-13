using System.Diagnostics;
using ADArCWebApp;
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
        public Dictionary<CodeType, string> codeForGen = new();
        public double rightOffset;
        public double cardScaleFactor;
        public double bottomOffset;
		public Dictionary<string, int> pins;
		public List<string> pinNames => pins.Keys.ToList();
		public string? nodeName;
		public ElementPin[] pinInfo;
		public readonly bool LivesOnBreadBoard;
		public readonly double BreadboardOffsetX, BreadboardOffsetY, Width;
		public List<(int, int)> BreadboardPinData;
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
			BreadboardPinData = builder.BreadboardPins;
			
		}

    }

	public class ComponentDataBuilder
	{
		public Dictionary<string, IComponentParameter> properties = new();
		public string name;
		public bool enabled;
		public string directoryPath;
		public string paneHoverText = "";
		public Dictionary<CodeType, string> codeForGen = new();
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

		public List<(int, int)> BreadboardPins = new ();
		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(Type compType = null)
		{
			this.paneHoverText = paneHoverText;
			this.compType = compType ?? typeof(InvalidComponent);

			foreach (CodeType type in Enum.GetValues(typeof(CodeType)))
			{
				codeForGen[type] = "";
			}
			
			if (compType != typeof(InvalidComponent) && compType != null) {
				List<ElementPin> pinsAttrs = new List<ElementPin>();
				foreach (var attribute in Attribute.GetCustomAttributes(compType))
				{
					if (attribute is ComponentAttribute cA)
					{
						this.name = cA.Name;
						this.enabled = cA.Enabled;
						this.directoryPath = cA.Path;
						this.bottomOffset = cA.BottomOff;
						this.rightOffset = cA.RightOff;
						this.cardScaleFactor = cA.CardScaleFactor;
						this.nodeName = cA.GsNodeName;
						this.paneHoverText = cA.PaneHoverText;
					}
					else if (attribute is BreadboardOffset BBOA)//CANNOT BE SWITCH! sorry
					{
						BreadboardOffsetX = BBOA.LeftOffset;
						BreadboardOffsetY = BBOA.TopOffset;
						Width = BBOA.Width;
						LivesOnBreadBoard = true;
					}
					else if (attribute is BreadboardPin BPA)
					{
						BreadboardPins.Add((BPA.PinOffset, BPA.PinNumber));
					}
					else if (attribute is ComponentPin pin)
					{
						pinsAttrs.Add(new ElementPin(pin.Name, pin.X, pin.Y, description: pin.Description, number: pin.Number, noBreadboard: pin.NoBreadboard));
						try
						{
							this.pins.Add(pin.gsName, this.pins.Count);
						}
						catch (ArgumentException e)
						{
							Console.WriteLine(e.Message);
							Console.WriteLine(e.StackTrace);
							Console.WriteLine($"Component {name} has duplicate gsPin: {pin.gsName}, This is an error.");
						}
					}
					else if (attribute is ComponentCode cC)
					{
						codeForGen[cC.Type] = cC.Code;
					}
					else if (attribute is ComponentProperty CPA)
					{
						properties[CPA.Name.ToLower()] = new ComponentParameter(CPA.Type, CPA.Data);
					}
					else if (attribute is ComponentEnviormentSettingsType CEST)
					{
						this.EnvironmentalSettingsType = CEST.Type;
					}
					else if (attribute is ComponentPinsToListen CPTL)
					{
						pinsToListen = CPTL.pins;
					}
					else if (attribute is ComponentWarning CW)
					{
						Warning = CW.warn;
					}
				}
				this.pinInfo = pinsAttrs.ToArray();
			}
		}

		public ComponentData Finish()
		{
			return new ComponentData(this);
		}
	}
}


public class ComponentAttribute(string name, string path, string gsNodeName, bool enabled = true, double cardScaleFactor = 1, double rightOff = 0, double bottomOff = 0, string paneHoverText = "") : Attribute
{
	public bool Enabled = enabled;
	public string Name = name;
	public string Path = path;
	public string GsNodeName = gsNodeName;
	public double CardScaleFactor = cardScaleFactor;
	public double RightOff = rightOff;
	public double BottomOff = bottomOff;
	public string PaneHoverText = paneHoverText;
}

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class ComponentProperty(string name, object data, Type type) : Attribute
{
	public string Name = name;
	public object Data = data;
	public Type Type = type;
}

public class BreadboardOffset(double leftOffset, double topOffset, double width) : Attribute
{
	public double LeftOffset = leftOffset;
	public double TopOffset = topOffset;
	public double Width = width;
}

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class BreadboardPin(int offset, int number, string name)
	: Attribute
{
	public int PinOffset = offset;
	public int PinNumber = number;
	public string Name = name;
}

public enum CodeType
{
	Include,
	Global,
	Setup,
	LoopMain,
	Functions,
	DelayLoop,
	DelayTime
}


[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class ComponentCode(CodeType type, string code) : Attribute
{
	public CodeType Type = type;
	public string Code = code;
}

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class ComponentPin(string name, string gsName, double x, double y, int number = 0, string description = "", bool noBreadboard = false)
	: Attribute
{
	public string Name = name;
	public string gsName = gsName;
	public string Description = description;
	public double X = x, Y = y;
	public int Number = number;
	public bool NoBreadboard = noBreadboard;
}

public class ComponentEnviormentSettingsType(Type? type) : Attribute
{
	public Type? Type = type;
}

public class ComponentPinsToListen(string pins) : Attribute
{
	public List<string> pins = [pins];
}

public class ComponentWarning(string warning) : Attribute
{
	public string warn = warning;
}