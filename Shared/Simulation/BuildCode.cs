using ADArCWebApp.ComponentNamespace;
using ADArCWebApp.Pages;
using System.Text;
using System.Text.RegularExpressions;

namespace ADArCWebApp.Shared.Simulation
{
	public static class BuildCode
	{
		public static List<int> outputPins = new();

		public static string code => globalCode() + "\n\n" + setupCode() + "\n\n" + loopCode();


		private static string globalCode (){
			StringBuilder b = new StringBuilder();
			//Console.WriteLine("2: " + outputPins.Count);
			b.Append("char outputPins[] = {");
			for (int i = 0; i < outputPins.Count; i++) {
				b.Append(outputPins[i]);
				if (i != outputPins.Count -1) { b.Append(", "); }
			}

			b.AppendLine("};\n\n");


			//insert global vars from components
            foreach (ComponentInstance c in Pages.Index.comps.Values)
            {
                c.data.codeForGen.TryGetValue("global", out string? gC);

				if (gC != "")
				{
					b.AppendLine(gC);
				}

            }

            return b.ToString();
		}

		private static string setupCode() { 
			StringBuilder b = new StringBuilder();

			b.AppendLine("void setup() {");
			b.AppendLine("  Serial.begin(9600);");//keep an eye on
			b.AppendLine("  for (int i = 0; i < "+ outputPins.Count+ "; i++) {");
			b.AppendLine("    pinMode(outputPins[i], OUTPUT);");
			b.AppendLine("  }");
			b.AppendLine("}");

			return b.ToString();
		}
		

		private static string loopCode() {
			StringBuilder b = new StringBuilder();

			Dictionary<string, List<ComponentInstance>> usedTimes = new();

			//setup varying delay times in global var
            foreach (ComponentInstance c in Pages.Index.comps.Values)
            {
				var time = c.data.codeForGen["delayTime"];
				if (time != "" && !usedTimes.Keys.Contains(time))
				{
					b.AppendLine("long last" + usedTimes.Count + " = " + time + ";");

					usedTimes.Add(time, new() { c });
				}
				else if (time != "" && usedTimes.TryGetValue(time, out List<ComponentInstance>? members)) {
					members.Add(c);
				}
            }




            b.AppendLine("void loop() {");
			foreach (ComponentInstance c in Pages.Index.comps.Values) {
				b.Append(c.data.codeForGen["loopMain"]);
			}

			int i = 0;
			foreach(var kv in usedTimes) {	//this is technically wrong (keys not necessary in order), fix later probably

				b.AppendLine("  if (millis() - last" + i + " <= " + kv.Key+ ") {");
				b.AppendLine("    last" + i + " += " + kv.Key + ";");

				foreach (var v in kv.Value)
				{
					string prePin = v.data.codeForGen["delayLoop"];



					string after = Regex.Replace(prePin, "(~\"(.*)\")", m => {
						v.getConnection(m.Value[2..^1], out InstanceConnection? conn, out List<InstanceConnection>? all);
						return conn!.toId.ToString(); 
					});	//2..^1 is substring from 3rd char to end-1 char


                    b.AppendLine(after);
				}

				b.AppendLine("  }");
				i++;
			}

			b.AppendLine("}");
			return b.ToString();
		}

	}
}
