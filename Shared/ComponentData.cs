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
        public double workbenchScaleFactor = 1.0;
        public double bottomOffset;
		public Dictionary<string, int> pins;
		public List<string> pinNames => pins.Keys.ToList();
		public string? nodeName;
		public ElementPin[] pinInfo;
		public readonly bool LivesOnBreadBoard;
		public readonly double BreadboardOffsetX, BreadboardOffsetY, Width;
		public List<(int, int)> BreadboardPinData;
		public List<(int offset, int number, string name)> BreadboardPinInfos;
		public List<(double minX, double minY, double maxX, double maxY)> BreadboardBodies;
		public BreadboardMountAttribute? BreadboardMountAttr;
		public BreadboardMountLayout? MountLayout;
		public double MeasuredSvgWidth { get; private set; }
		public double MeasuredSvgHeight { get; private set; }

		public void UpdateMeasuredSvgSize(double width, double height)
		{
			if (width <= 1 || height <= 1) return;
			if (Math.Abs(MeasuredSvgWidth - width) < 0.5 && Math.Abs(MeasuredSvgHeight - height) < 0.5) return;
			MeasuredSvgWidth = width;
			MeasuredSvgHeight = height;
			if (BreadboardMountAttr != null && pinInfo != null)
			{
				MountLayout = BreadboardMountLayout.Compute(BreadboardMountAttr, pinInfo, width, height);
			}
		}

		public static BreadboardPinRole GetPinPowerRole(string? pinName)
		{
			if (string.IsNullOrWhiteSpace(pinName)) return BreadboardPinRole.Signal;
			string norm = pinName.Trim().ToUpperInvariant();
			return norm switch
			{
				"VCC" or "VDD" or "5V" or "+5V" or "VIN" or "3V3" or "+3V3" or "3.3V" or "3VO" or "V+" or "POS" or "POWER"
					=> BreadboardPinRole.Power,
				"GND" or "VSS" or "GROUND" or "CATHODE" or "COM" or "PWR_GND" or "BROWN" or "GND.1" or "GND.2" or "GND.3" or "V-" or "NEG"
					=> BreadboardPinRole.Ground,
				_ when norm.StartsWith("GND") => BreadboardPinRole.Ground,
				_ when norm.Contains("VCC") || norm.Contains("5V") || norm.Contains("3V3") => BreadboardPinRole.Power,
				_ => BreadboardPinRole.Signal
			};
		}
        public Type compType;
        public readonly Type? EnvironmentalSettingsType;
        public string? Warning;

        /// <summary>
        /// Relative path or absolute URL pointing to this component's documentation page.
        /// Extracted from <see cref="ComponentDocumentation"/> on the component's Razor class.
        /// </summary>
        public string? DocumentationPath;

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
			workbenchScaleFactor = builder.workbenchScaleFactor;
			bottomOffset = builder.bottomOffset;
			compType = builder.compType;
			EnvironmentalSettingsType = builder.EnvironmentalSettingsType;
			Warning = builder.Warning;
			DocumentationPath = builder.DocumentationPath;
			pins = builder.pins;
			nodeName = builder.nodeName;
			pinsToListen = builder.pinsToListen;
			pinInfo = builder.pinInfo;
			LivesOnBreadBoard = builder.LivesOnBreadBoard;
			BreadboardOffsetX = builder.BreadboardOffsetX;
			BreadboardOffsetY = builder.BreadboardOffsetY;
			Width = builder.Width;
			BreadboardPinData = builder.BreadboardPins;
			BreadboardPinInfos = builder.BreadboardPinInfos;
			BreadboardBodies = builder.BreadboardBodies;
			BreadboardMountAttr = builder.BreadboardMountAttr;
			if (BreadboardMountAttr != null && pinInfo != null)
			{
				MeasuredSvgWidth = BreadboardMountAttr.SvgWidth;
				MeasuredSvgHeight = BreadboardMountAttr.SvgHeight;
				MountLayout = BreadboardMountLayout.Compute(BreadboardMountAttr, pinInfo, MeasuredSvgWidth, MeasuredSvgHeight);
			}
			
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
		public double workbenchScaleFactor = 1.0;
		public double bottomOffset;

		public Type compType;
		public Type? EnvironmentalSettingsType;
		public string? Warning;

		/// <summary>
		/// Relative path or absolute URL pointing to this component's documentation page.
		/// </summary>
		public string? DocumentationPath;
		public Dictionary<string, int> pins = new();
		public List<string> pinsToListen = new();
		public string? nodeName;

		public ElementPin[] pinInfo;

		public bool LivesOnBreadBoard = false;
		public double BreadboardOffsetX, BreadboardOffsetY, Width;

		public List<(int, int)> BreadboardPins = new ();
		public List<(int offset, int number, string name)> BreadboardPinInfos = new ();
		public List<(double minX, double minY, double maxX, double maxY)> BreadboardBodies = new ();
		public BreadboardMountAttribute? BreadboardMountAttr;
		/* needs more later, good enough for now.*/
		public ComponentDataBuilder(Type compType = null)
		{
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
						this.workbenchScaleFactor = cA.WorkbenchScaleFactor;
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
						BreadboardPinInfos.Add((BPA.PinOffset, BPA.PinNumber, BPA.Name));
					}
					else if (attribute is BreadboardBody BBA)
					{
						BreadboardBodies.Add((BBA.MinX, BBA.MinY, BBA.MaxX, BBA.MaxY));
					}
					else if (attribute is BreadboardMountAttribute BMA)
					{
						BreadboardMountAttr = BMA;
						LivesOnBreadBoard = true;
					}
					else if (attribute is ComponentPin pin)
					{
						pinsAttrs.Add(new ElementPin(pin.Name, pin.X, pin.Y, description: pin.Description, number: pin.Number, noBreadboard: pin.NoBreadboard, gsName: pin.gsName));
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
					else if (attribute is ComponentDocumentation CD)
					{
						DocumentationPath = CD.Path;
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


public class ComponentAttribute(string name, string path, string gsNodeName, bool enabled = true, double cardScaleFactor = 1, double rightOff = 0, double bottomOff = 0, string paneHoverText = "", double workbenchScaleFactor = 1.0) : Attribute
{
	public bool Enabled = enabled;
	public string Name = name;
	public string Path = path;
	public string GsNodeName = gsNodeName;
	public double CardScaleFactor = cardScaleFactor;
	public double RightOff = rightOff;
	public double BottomOff = bottomOff;
	public string PaneHoverText = paneHoverText;
	public double WorkbenchScaleFactor = workbenchScaleFactor;
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

/// <summary>
/// Declares a physical body bounding box (in unrotated breadboard coordinates relative to the component's row offset)
/// so wire routing and breadboard hole selection treat the component body as an obstacle.
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
public class BreadboardBody(double minX, double minY, double maxX, double maxY) : Attribute
{
	public double MinX = minX;
	public double MinY = minY;
	public double MaxX = maxX;
	public double MaxY = maxY;
}

public enum BreadboardPinRole
{
	Signal,
	Power,
	Ground
}

[AttributeUsage(AttributeTargets.Class)]
public class BreadboardMountAttribute(
	char col = 'f',
	int extraRotation = 0,
	bool allowOppositeStrip = true,
	double maxScale = 2.8,
	double svgWidth = 0,
	double svgHeight = 0,
	char col2 = '\0') : Attribute
{
	public char Col { get; } = char.ToLowerInvariant(col);
	public char Col2 { get; } = col2 == '\0' ? '\0' : char.ToLowerInvariant(col2);
	public int ExtraRotation { get; } = ((extraRotation % 4) + 4) % 4;
	public bool AllowOppositeStrip { get; } = allowOppositeStrip;
	public double MaxScale { get; } = maxScale;
	public double SvgWidth { get; } = svgWidth;
	public double SvgHeight { get; } = svgHeight;
}

public sealed class BreadboardMountLayout
{
	public char Col { get; init; }
	public char Col2 { get; init; }
	public int ExtraRotation { get; init; }
	public bool AllowOppositeStrip { get; init; }
	public double Scale { get; init; }
	public int PinRowSpan { get; init; }
	public Dictionary<int, int> PinRowOffsets { get; init; } = new();
	public Dictionary<int, char> PinCols { get; init; } = new();
	public double AnchorLocalX { get; init; }
	public double AnchorLocalY { get; init; }
	public double RelMinX { get; init; }
	public double RelMaxX { get; init; }
	public double RelMinY { get; init; }
	public double RelMaxY { get; init; }
	public int LeftOverhangRows { get; init; }
	public int RightReachRows { get; init; }
	public bool HasMeasuredBody { get; init; }

	public static (double x, double y) RotateVec(int rot, double x, double y)
	{
		return (((rot % 4) + 4) % 4) switch
		{
			1 => (-y, x),
			2 => (-x, -y),
			3 => (y, -x),
			_ => (x, y)
		};
	}

	public static char FlipColAcrossTrough(char col) => char.ToLowerInvariant(col) switch
	{
		'a' => 'j',
		'b' => 'i',
		'c' => 'h',
		'd' => 'g',
		'e' => 'f',
		'f' => 'e',
		'g' => 'd',
		'h' => 'c',
		'i' => 'b',
		'j' => 'a',
		_ => col
	};

	private static double ComputeBasePitch(List<double> deltas, double span, int count)
	{
		if (deltas.Count == 0) return 10.0;
		var sorted = deltas.OrderBy(d => d).ToList();
		double minDelta = sorted[0];
		double maxDelta = sorted[^1];
		double refDelta = sorted[(sorted.Count - 1) / 2];
		if (maxDelta <= refDelta * 1.45 && minDelta >= refDelta * 0.65 && count > 1 && span > 0)
			return span / (count - 1);

		var stepDeltas = sorted.Where(d => d <= refDelta * 1.45).ToList();
		return stepDeltas.Count > 0 ? stepDeltas.Average() : minDelta;
	}

	public static BreadboardMountLayout? Compute(
		BreadboardMountAttribute attr,
		ElementPin[] pinInfo,
		double svgWidth = 0,
		double svgHeight = 0,
		int? extraRotOverride = null,
		char? colOverride = null)
	{
		if (pinInfo == null || pinInfo.Length == 0) return null;
		int rot = extraRotOverride.HasValue ? ((extraRotOverride.Value % 4) + 4) % 4 : attr.ExtraRotation;
		char col = char.ToLowerInvariant(colOverride ?? attr.Col);
		char col2 = attr.Col2;

		var rotatedPins = new List<(int idx, double rx, double ry)>();
		for (int i = 0; i < pinInfo.Length; i++)
		{
			if (pinInfo[i].NoBreadboard) continue;
			var (rx, ry) = RotateVec(rot, pinInfo[i].x, pinInfo[i].y);
			rotatedPins.Add((i, rx, ry));
		}
		if (rotatedPins.Count == 0) return null;

		var rowOffsets = new Dictionary<int, int>();
		var pinCols = new Dictionary<int, char>();
		double minRxAll = rotatedPins.Min(p => p.rx);
		double maxRxAll = rotatedPins.Max(p => p.rx);
		double minRyAll = rotatedPins.Min(p => p.ry);
		double maxRyAll = rotatedPins.Max(p => p.ry);

		double basePitch = 10.0;
		double scale;
		int pinRowSpan;
		int anchorIdx;

		if (col2 != '\0' && (maxRyAll - minRyAll) > 20.0)
		{
			// Dual-row DIP-style module straddling two columns (col and col2).
			// Match component minRy/maxRy to col/col2 using actual breadboard Y ordering.
			double colY1 = ADArCWebApp.Shared.BreadboardHoleCoordinates.GetCenter($"{col}1").y;
			double colY2 = ADArCWebApp.Shared.BreadboardHoleCoordinates.GetCenter($"{col2}1").y;
			bool colIsSmallerY = colY1 <= colY2;
			double primaryTargetRy = colIsSmallerY ? minRyAll : maxRyAll;

			var primaryRow = new List<(int idx, double rx, double ry)>();
			var secondaryRow = new List<(int idx, double rx, double ry)>();
			foreach (var p in rotatedPins)
			{
				if (Math.Abs(p.ry - minRyAll) <= Math.Abs(p.ry - maxRyAll))
				{
					if (colIsSmallerY) primaryRow.Add(p);
					else secondaryRow.Add(p);
				}
				else
				{
					if (colIsSmallerY) secondaryRow.Add(p);
					else primaryRow.Add(p);
				}
			}
			if (primaryRow.Count == 0)
			{
				primaryRow = rotatedPins;
				secondaryRow.Clear();
			}

			var deltas = new List<double>();
			var spans = new List<(double span, int count)>();
			foreach (var group in new[] { primaryRow, secondaryRow })
			{
				if (group.Count < 2) continue;
				var gSorted = group.OrderBy(p => p.rx).ToList();
				spans.Add((gSorted[^1].rx - gSorted[0].rx, gSorted.Count));
				for (int k = 0; k < gSorted.Count - 1; k++)
				{
					double d = gSorted[k + 1].rx - gSorted[k].rx;
					if (d > 3.5) deltas.Add(d);
				}
			}

			var primarySorted = primaryRow.OrderBy(p => p.rx).ThenBy(p => p.ry).ToList();
			var secondarySorted = secondaryRow.OrderBy(p => p.rx).ThenBy(p => p.ry).ToList();
			basePitch = ComputeBasePitch(
				deltas,
				primarySorted.Count > 1 ? primarySorted[^1].rx - primarySorted[0].rx : maxRxAll - minRxAll,
				primarySorted.Count > 1 ? primarySorted.Count : rotatedPins.Count);
			scale = Math.Clamp(15.5 / basePitch, 0.5, attr.MaxScale);

			int maxOffset = 0;
			foreach (var (group, gCol) in new[] { (primarySorted, col), (secondarySorted, col2) })
			{
				int prevOffset = -1;
				foreach (var p in group)
				{
					int offset = (int)Math.Round((p.rx - minRxAll) / basePitch);
					if (offset <= prevOffset) offset = prevOffset + 1;
					rowOffsets[p.idx] = offset;
					pinCols[p.idx] = gCol;
					prevOffset = offset;
					if (offset > maxOffset) maxOffset = offset;
				}
			}

			pinRowSpan = Math.Max(1, maxOffset + 1);
			// Anchor at col edge row offset 0 (adjust local X back to minRxAll if primary row starts at offset > 0)
			anchorIdx = primarySorted[0].idx;
			int anchorOffset = rowOffsets[anchorIdx];
			double anchorLocalX = pinInfo[anchorIdx].x;
			double anchorLocalY = pinInfo[anchorIdx].y;
			if (anchorOffset > 0)
			{
				// Shift unrotated anchor to align with row offset 0 on primary strip
				var deltaZero = RotateVec((4 - rot) % 4, minRxAll - primarySorted[0].rx, 0);
				anchorLocalX += deltaZero.x;
				anchorLocalY += deltaZero.y;
			}

			bool hasSvgDual = svgWidth > 1 && svgHeight > 1;
			double dMinX = hasSvgDual ? 25.0 : pinInfo.Min(p => p.x) - 10.0;
			double dMaxX = hasSvgDual ? 25.0 + svgWidth : pinInfo.Max(p => p.x) + 10.0;
			double dMinY = hasSvgDual ? 25.0 : pinInfo.Min(p => p.y) - 10.0;
			double dMaxY = hasSvgDual ? 25.0 + svgHeight : pinInfo.Max(p => p.y) + 10.0;

			var dCorners = new[]
			{
				RotateVec(rot, (dMinX - anchorLocalX) * scale, (dMinY - anchorLocalY) * scale),
				RotateVec(rot, (dMaxX - anchorLocalX) * scale, (dMinY - anchorLocalY) * scale),
				RotateVec(rot, (dMinX - anchorLocalX) * scale, (dMaxY - anchorLocalY) * scale),
				RotateVec(rot, (dMaxX - anchorLocalX) * scale, (dMaxY - anchorLocalY) * scale)
			};

			double dRelMinX = dCorners.Min(c => c.x);
			double dRelMaxX = dCorners.Max(c => c.x);
			double dRelMinY = dCorners.Min(c => c.y);
			double dRelMaxY = dCorners.Max(c => c.y);

			return new BreadboardMountLayout
			{
				Col = col,
				Col2 = col2,
				ExtraRotation = rot,
				AllowOppositeStrip = false,
				Scale = scale,
				PinRowSpan = pinRowSpan,
				PinRowOffsets = rowOffsets,
				PinCols = pinCols,
				AnchorLocalX = anchorLocalX,
				AnchorLocalY = anchorLocalY,
				RelMinX = dRelMinX,
				RelMaxX = dRelMaxX,
				RelMinY = dRelMinY,
				RelMaxY = dRelMaxY,
				LeftOverhangRows = Math.Max(0, (int)Math.Ceiling(Math.Max(0.0, -dRelMinX - 8.5) / 15.5)),
				RightReachRows = Math.Max(pinRowSpan - 1, (int)Math.Ceiling(Math.Max(0.0, dRelMaxX - 8.5) / 15.5)),
				HasMeasuredBody = hasSvgDual
			};
		}

		var sorted = rotatedPins.OrderBy(p => p.rx).ThenBy(p => p.ry).ToList();
		double minRx = sorted[0].rx;
		double maxRx = sorted[^1].rx;

		var singleDeltas = new List<double>();
		for (int k = 0; k < sorted.Count - 1; k++)
		{
			double d = sorted[k + 1].rx - sorted[k].rx;
			if (d > 3.5) singleDeltas.Add(d);
		}

		basePitch = ComputeBasePitch(singleDeltas, maxRx - minRx, sorted.Count);
		scale = Math.Clamp(15.5 / basePitch, 0.5, attr.MaxScale);

		int prevSingleOffset = -1;
		foreach (var p in sorted)
		{
			int offset = (int)Math.Round((p.rx - minRx) / basePitch);
			if (offset <= prevSingleOffset) offset = prevSingleOffset + 1;
			rowOffsets[p.idx] = offset;
			pinCols[p.idx] = col;
			prevSingleOffset = offset;
		}
		pinRowSpan = Math.Max(1, prevSingleOffset + 1);
		anchorIdx = sorted[0].idx;

		var anchorPin = pinInfo[anchorIdx];
		double anchorX = anchorPin.x;
		double anchorY = anchorPin.y;

		bool hasSvg = svgWidth > 1 && svgHeight > 1;
		double localMinX = hasSvg ? 25.0 : pinInfo.Min(p => p.x) - 10.0;
		double localMaxX = hasSvg ? 25.0 + svgWidth : pinInfo.Max(p => p.x) + 10.0;
		double localMinY = hasSvg ? 25.0 : pinInfo.Min(p => p.y) - 10.0;
		double localMaxY = hasSvg ? 25.0 + svgHeight : pinInfo.Max(p => p.y) + 10.0;

		var corners = new[]
		{
			RotateVec(rot, (localMinX - anchorX) * scale, (localMinY - anchorY) * scale),
			RotateVec(rot, (localMaxX - anchorX) * scale, (localMinY - anchorY) * scale),
			RotateVec(rot, (localMinX - anchorX) * scale, (localMaxY - anchorY) * scale),
			RotateVec(rot, (localMaxX - anchorX) * scale, (localMaxY - anchorY) * scale)
		};

		double relMinX = corners.Min(c => c.x);
		double relMaxX = corners.Max(c => c.x);
		double relMinY = corners.Min(c => c.y);
		double relMaxY = corners.Max(c => c.y);

		int leftOverhang = Math.Max(0, (int)Math.Ceiling(Math.Max(0.0, -relMinX - 8.5) / 15.5));
		int rightReach = Math.Max(pinRowSpan - 1, (int)Math.Ceiling(Math.Max(0.0, relMaxX - 8.5) / 15.5));

		return new BreadboardMountLayout
		{
			Col = col,
			Col2 = '\0',
			ExtraRotation = rot,
			AllowOppositeStrip = attr.AllowOppositeStrip,
			Scale = scale,
			PinRowSpan = pinRowSpan,
			PinRowOffsets = rowOffsets,
			PinCols = pinCols,
			AnchorLocalX = anchorX,
			AnchorLocalY = anchorY,
			RelMinX = relMinX,
			RelMaxX = relMaxX,
			RelMinY = relMinY,
			RelMaxY = relMaxY,
			LeftOverhangRows = leftOverhang,
			RightReachRows = rightReach,
			HasMeasuredBody = hasSvg
		};
	}
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

/// <summary>
/// Associates a relative or absolute documentation URL with a component class.
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class ComponentDocumentation(string path) : Attribute
{
	public string Path = path;
}