using ADArCWebApp.Pages;
using System.Text;
using System.Text.RegularExpressions;

namespace ADArCWebApp.Shared.Simulation
{
	public static class BuildCode
	{
		public static List<int> outputPins = new();

		public static string code => includeCode() + "\n\n" + globalCode() + "\n\n" + setupCode() + "\n\n" + loopCode() + "\n\n" + functionsCode();

		private static string includeCode()
		{
            StringBuilder b = new StringBuilder();
            var regex = new Regex(@"(#include\s+<[^>]+>)");
            foreach (ComponentInstance c in Pages.Index.Comps.Values)
            { 
	            var include = regex.Matches(c.Data.codeForGen["include"]).Cast<Match>().Select(m => m.Groups[1].Value).ToList();
	            var output = regex.Matches(b.ToString()).Cast<Match>().Select(m => m.Groups[1].Value).ToList();

	            foreach (var inc1 in include)
	            {
		            if (!output.Contains(inc1))
		            {
			            Console.WriteLine(inc1);
			            b.Append(parseInclude(inc1.ToString(), true));
		            }
	            }
            }

			return b.ToString();
        }
		private static string globalCode()
		{
			StringBuilder b = new StringBuilder();

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

		private static string functionsCode()
		{
			StringBuilder b = new StringBuilder();
			b.AppendLine(" ");
			foreach (ComponentInstance c in Pages.Index.Comps.Values)
			{
				b.Append(parseProvidedCode(c, "functions", false));
			}
			return b.ToString();
		}
		
		/// <summary>
		/// Handles the #includes for a circuit. Appends a line for each new #include.
		/// </summary>
		/// <param name="c"></param>
		/// <param name="addNewLine"></param>
		/// <returns></returns>
		private static string parseInclude(string c, bool addNewLine)
		{
			string ret = c;
			
			if (ret != "")
			{
				return ret + (addNewLine ? "\n" : "");
			}
			else { 
				return ret;
			}
		}
		///<summary>
		///Handles removing sheet pin name formatting (~"name") and changes it to pin number.
		///Also warns if the component is missing code.
		///Also updates the componentInstance with local Id.
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

			//This Regex is for replacing (~"name") on pins in the ComponentNamespace to their pin connection.
			if (Regex.IsMatch(prePin, "(~\"(.*?)\")") || Regex.IsMatch(prePin, "@"))
			{
				if (Regex.IsMatch(prePin, "@"))
				{
					ret = Regex.Replace(prePin, "@", c.localId.ToString());
					if (Regex.IsMatch(ret, "(~\"(.*?)\")"))
					{
						ret = Regex.Replace(ret, "(~\"(.*?)\")", m =>
						{
							c.GetConnection(m.Value[2..^1], out InstanceConnection? conn, out List<InstanceConnection>? all);
							return conn!.ToId.ToString();
						});
					}
				}
				else if (Regex.IsMatch(prePin, "(~\"(.*?)\")"))
				{
					ret = Regex.Replace(prePin, "(~\"(.*?)\")", m =>
					{
						c.GetConnection(m.Value[2..^1], out InstanceConnection? conn, out List<InstanceConnection>? all);
						return conn!.ToId.ToString();
					});
				}
			}

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