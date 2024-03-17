using Microsoft.VisualBasic;

namespace ADArCWebApp;

/// <summary>
/// Used to mark a component property as having environmental settings that are numbers.
/// </summary>
[System.AttributeUsage((System.AttributeTargets.Property | System.AttributeTargets.Field))]

public class ValueSetting : System.Attribute  {
    public string Label { get; set; }
    public int DefaultValue { get; set; }
    public int MinValue { get; set; }
    public int MaxValue { get; set; }

    public ValueSetting(string label, int defaultValue, int minValue, int maxValue)
    {
        this.Label = label;
        this.DefaultValue = defaultValue;
        this.MinValue = minValue;
        this.MaxValue = maxValue;
    }
}

/// <summary>
/// Used to mark a component property as having multiple acceptable environmental values.
/// Strings only.
/// </summary>
[System.AttributeUsage((System.AttributeTargets.Property | System.AttributeTargets.Field))]
public class DropdownSetting : System.Attribute {
    public List<string> dropdownList { get; set; }

    public DropdownSetting(string[] dropdownList) {
        this.dropdownList = dropdownList.ToList();
    }
}
    

