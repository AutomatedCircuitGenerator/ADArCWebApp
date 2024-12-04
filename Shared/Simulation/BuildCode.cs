using ADArCWebApp.Pages;
using System.Text;
using System.Text.RegularExpressions;

namespace ADArCWebApp.Shared.Simulation
{
	public static class BuildCode
	{
		public static List<int> outputPins = new();

		public static string code => includeCode() + "\n\n" + globalCode() + "\n\n" + setupCode() + "\n\n" + loopCode();

		private static string includeCode()
		{
            StringBuilder b = new StringBuilder();
            foreach (ComponentInstance c in Pages.Index.Comps.Values)
            {
                b.Append(parseProvidedCode(c, "include", true));

            }
			return b.ToString();
        }
		private static string globalCode() {
			StringBuilder b = new StringBuilder();
			//Console.WriteLine("2: " + outputPins.Count);
			// b.Append("char outputPins[] = {");
			// for (int i = 0; i < outputPins.Count; i++) {
			// 	b.Append(outputPins[i]);
			// 	if (i != outputPins.Count - 1) { b.Append(", "); }
			// }
			//
			// b.AppendLine("};\n\n");


			//insert global vars from components
			foreach (ComponentInstance c in Pages.Index.Comps.Values)
			{
				b.Append(parseProvidedCode(c, "global", true));

			}

			return b.ToString();
		}

		private static string setupCode() {
			StringBuilder b = new StringBuilder();

			b.AppendLine("void setup() {");
			// b.AppendLine("  Serial.begin(9600);");//keep an eye on
			// b.AppendLine("  for (int i = 0; i < " + outputPins.Count + "; i++) {");
			// b.AppendLine("    pinMode(outputPins[i], OUTPUT);");
			// b.AppendLine("  }");

            //insert global vars from components
            foreach (ComponentInstance c in Pages.Index.Comps.Values)
            {
                b.Append(parseProvidedCode(c, "setup", true));

            }
            b.AppendLine("}");

			return b.ToString();
		}


		private static string loopCode() {
			StringBuilder b = new();

			Dictionary<string, List<ComponentInstance>> usedTimes = new();

			//setup varying delay times in global var
			foreach (ComponentInstance c in Pages.Index.Comps.Values)
			{
				var time = parseProvidedCode(c, "delayTime", false);
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
			foreach (ComponentInstance c in Pages.Index.Comps.Values) {
				b.Append(parseProvidedCode(c, "loopMain", false));
			}

			int i = 0;
			foreach (var kv in usedTimes) { //this is technically wrong (keys not necessary in order), fix later probably

				b.AppendLine("  if (millis() - last" + i + " <= " + kv.Key + ") {");
				b.AppendLine("    last" + i + " += " + kv.Key + ";");

				foreach (var v in kv.Value)
				{
					b.Append(parseProvidedCode(v, "delayLoop", true));
				}

				b.AppendLine("  }");
				i++;
			}

			b.AppendLine("}");
			return b.ToString();
		}

		///<summary>
		///Handles removing sheet pin name formatting (~"name") and changes it to pin number.
		///Also warns if the component is missing code.
		///</summary>
		///<param name="addNewLine">If the code exists, adds a newline to the end if true. Use true if AppendLine needed, false for Append.</param>
		private static string parseProvidedCode(ComponentInstance c, string codeField, bool addNewLine) {
			string ret = "";
			string prePin = "";
			try
			{
				prePin = c.Data.codeForGen[codeField];
			}
			catch (NullReferenceException)
			{
				Console.WriteLine("Warn: " + c.Data.name + " component does not have \"" + codeField + "\"-type code. Be careful!");
			}

			ret = Regex.Replace(prePin, "(~\"(.*?)\")", m =>
			{
				c.GetConnection(m.Value[2..^1], out InstanceConnection? conn, out List<InstanceConnection>? all);
				return conn!.ToId.ToString();
			}); //2..^1 is substring from 3rd char to end-1 char. This is because the format is ~"pinName", so this extracts the pin properly.

			if (ret != "")
			{
				return ret + (addNewLine ? "\n" : "");
			}
			else { 
				return ret;
			}
		}



	}
}