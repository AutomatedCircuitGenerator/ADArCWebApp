namespace ADArCWebApp.Shared.Simulation
{
	public static class AvrCPU
	{
		public static int portB;//6, 8-13
		public static int portC;//6, 14-19
		public static int portD;//8, 0-7

		public static int maskable;

		private static Dictionary<int, List<(ComponentInstance actor, Action<ComponentInstance> action)>> pinListeners = new();

		public static void updateMasking() {
			int oldMask = maskable;
			maskable = 0;

			maskable |= portB << 8;
			maskable |= portC << 14;
			maskable |= portD;

			for (int i = 0; i < 20; i++)
			{
				if ((((1 << i) & oldMask) ^ ((1 << i) & maskable)) > 0) {
					updateComponents(i);
                    Pages.Index.app!.triggerRender();
                }
			}
		}


		public static void updateComponents(int pin) {
			foreach (var kv in pinListeners[pin]) {
				kv.action.Invoke(kv.actor);
			}
		}


		public static void addListener(int pin, ComponentInstance actor, Action<ComponentInstance> action) {
			if (pinListeners.TryGetValue(pin, out var values))
			{
				values.Add((actor, action));
			}
			else {
				pinListeners.Add(pin, new() { (actor, action) });
			}
		}

		public static bool getPinState(int index) {
			return (maskable & (1 << (index))) > 0;
		}
	}
}
