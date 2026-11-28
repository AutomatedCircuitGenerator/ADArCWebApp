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

			if (Pages.Index.Comps?.Values == null)
			{
				Console.WriteLine("Comps.Values is null or empty. Returning empty include code.");
				return string.Empty;
			}

			foreach (ComponentInstance c in Pages.Index.Comps.Values)
			{
				if (c.Data?.codeForGen == null || !c.Data.codeForGen.ContainsKey(CodeType.Include))
				{
					Console.WriteLine($"Skipping component: {c} due to missing 'include' data.");
					continue;
				}

				var include = regex.Matches(GetProvidedCode(c, CodeType.Include)).Select(m => m.Groups[1].Value).ToList();
				var output = regex.Matches(b.ToString()).Cast<Match>().Select(m => m.Groups[1].Value).ToList();

				foreach (var inc1 in include)
				{
					if (!output.Contains(inc1))
					{
						Console.WriteLine(inc1);
						b.Append(parseInclude(inc1, true));
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
				b.Append(parseProvidedCode(c, CodeType.Global, true));

			}
			

			return b.ToString();
		}

		private static string setupCode() {
			StringBuilder b = new StringBuilder();

			b.AppendLine("void setup() {");
			
			b.AppendLine("\t// Initialize serial communication - allows printing to the console for debugging.");
			b.AppendLine("\tSerial.begin(9600);");

            //insert global vars from components
            foreach (ComponentInstance c in Pages.Index.Comps.Values)
            {
                b.Append(parseProvidedCode(c, CodeType.Setup, true));

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
				var time = parseProvidedCode(c, CodeType.DelayTime, false);
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
				b.Append(parseProvidedCode(c, CodeType.LoopMain, false));
			}

			int i = 0;
			foreach (var kv in usedTimes) { //this is technically wrong (keys not necessary in order), fix later probably

				b.AppendLine("  if (millis() - last" + i + " <= " + kv.Key + ") {");
				b.AppendLine("    last" + i + " += " + kv.Key + ";");

				foreach (var v in kv.Value)
				{
					b.Append(parseProvidedCode(v, CodeType.DelayLoop, true));
				}

				b.AppendLine("  }");
				i++;
			}
			
			b.AppendLine("\n}");
			return b.ToString();
		}

		private static string functionsCode()
		{
			StringBuilder b = new StringBuilder();
			b.AppendLine(" ");
			foreach (ComponentInstance c in Pages.Index.Comps.Values)
			{
				b.Append(parseProvidedCode(c, CodeType.Functions, false));
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
		/// <summary>
		/// Resolves a component's effective code snippet for a given section, accounting for per-instance
		/// settings such as switching DE2120 between SoftwareSerial and Hardware Serial.
		/// </summary>
		private static string GetProvidedCode(ComponentInstance c, CodeType codeType)
		{
			string code = c.Data?.codeForGen?.GetValueOrDefault(codeType) ?? "";
			if (string.IsNullOrEmpty(code)) return "";

			if (c.CompParams.TryGetValue("serialmode", out var modeParam) &&
				string.Equals(modeParam?.GetValue()?.ToString(), "Hardware Serial", StringComparison.OrdinalIgnoreCase))
			{
				string hwPort = "Serial";
				try
				{
					c.GetConnection("txd", out InstanceConnection? txConn, out _);
					if (txConn != null)
					{
						hwPort = txConn.ToId switch
						{
							18 or 19 => "Serial1",
							16 or 17 => "Serial2",
							14 or 15 => "Serial3",
							_ => "Serial"
						};
					}
				}
				catch (KeyNotFoundException)
				{
					// Fall back to default Serial if pin isn't bound yet
				}

				if (codeType == CodeType.Include)
				{
					code = Regex.Replace(code, @"#include\s+<SoftwareSerial\.h>\r?\n?", "");
				}
				else if (codeType == CodeType.Global)
				{
					code = Regex.Replace(code, @"SoftwareSerial\s+[^;]+;\r?\n?", "");
				}
				else if (codeType == CodeType.Setup)
				{
					if (hwPort == "Serial")
					{
						code = Regex.Replace(code, @"\t?de2120Serial@\.begin\(9600\);\r?\n?", "");
					}
					code = code.Replace("de2120Serial@", hwPort);
				}
			}

			return code;
		}

		///<summary>
		///Handles removing sheet pin name formatting (~"name") and changes it to pin number.
		///Also warns if the component is missing code.
		///Also updates the componentInstance with local Id.
		///</summary>
		///<param name="addNewLine">If the code exists, adds a newline to the end if true. Use true if AppendLine needed, false for Append.</param>
		private static string parseProvidedCode(ComponentInstance c, CodeType codeType, bool addNewLine) {
			string ret = "";
			string prePin = "";
			try
			{
				prePin = GetProvidedCode(c, codeType);
			}
			catch (NullReferenceException)
			{
				Console.WriteLine("Warn: " + c.Data.name + " component does not have \"" + codeType + "\"-type code. Be careful!");
			}
			
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
			else
			{
				ret = Regex.Replace(prePin, "(~\"(.*?)\")", m =>
				{
					try
					{
						c.GetConnection(m.Value[2..^1], out InstanceConnection? conn,
							out List<InstanceConnection>? all);
						return conn!.ToId.ToString();
					}
					catch (KeyNotFoundException e)
					{
						Console.WriteLine("Your code uses \'" + m + "\' but that is not a valid pin!");
						throw e;//I dont care about CA2200, the only way we get here is the above msg
					}

				});
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