using System.Reflection;
using ADArCWebApp.Shared.Components;
using ADArCWebApp.Shared.EnvironmentalSettings;

namespace ADArCWebApp.Shared
{
    
    public static class ComponentDeclarations
    {
        public static Dictionary<int, ComponentData> Components = new();

        public static void GenComponentList()
        {
            Components.Clear();
            Components.Add(1, new ComponentDataBuilder(typeof(RazorArduinoUno)).Finish());
            Components.Add(2, new ComponentDataBuilder(typeof(RazorArduinoMega)).Finish());

            int index = 3;

            Type[] ComponentRazorClasses = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.GetCustomAttribute(typeof(ComponentAttribute)) != null).ToArray();

            foreach (Type type in ComponentRazorClasses)
            {
                Components.Add(index, new ComponentDataBuilder(type).Finish());
                index++;
            }
            
        }
    }
}
