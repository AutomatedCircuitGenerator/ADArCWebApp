namespace ADArCWebApp.Shared.Simulation
{
	public static class AvrCPU
	{
		public static int portB;//6, 0-5
		public static int portC;//6, 6-11
		public static int portD;//8, 12-19

		public static int maskable;

		private static List<Action> listeners = new List<Action>();

		public static void updateMasking() {
			maskable = 0;

			maskable |= portB << 14;
			maskable |= portC << 8;
			maskable |= portD;
			//Console.WriteLine(Convert.ToString(portB, 2));
			//Console.WriteLine(Convert.ToString(portC, 2));
			//Console.WriteLine(Convert.ToString(portD, 2));
			//Console.WriteLine("combi:" +Convert.ToString(maskable, 2));
		}


		public static void updateComponents() {
			listeners.ForEach(a => a.Invoke());
		}


		public static bool getPinState(int index) {
			//TODO: subtract from index when pins added!
			return (maskable & (1 << (19-index))) > 0;
		}
	}
}
