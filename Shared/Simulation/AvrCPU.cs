using ADArCWebApp.Shared.Interop;
using System.Reflection;

namespace ADArCWebApp.Shared.Simulation
{
	public static class AvrCPU
	{

		//extremely dangerous to rely on. delayed changes not reflected here!
		public static int portB;//6, 8-13
		public static int portC;//6, 14-19
		public static int portD;//8, 0-7

		public static int maskable;

		//avr pinId -> component
		public static Dictionary<int, List<(ComponentInstance actor, MethodInfo action)>> pinListeners = new();

		public static void updateMasking(int currCycles) {
			int oldMask = maskable;
			maskable = 0;

			maskable |= portB << 8;
			maskable |= portC << 14;
			maskable |= portD;

			for (int i = 0; i < 20; i++)
			{
				if ((((1 << i) & oldMask) ^ ((1 << i) & maskable)) > 0) {
					updateComponents(i, currCycles);
                    Pages.Index.app!.triggerRender();
                }
			}
		}


		public static void updateComponents(int pin, int cycles) {
			foreach (var kv in pinListeners[pin]) {
				kv.action.Invoke(kv.actor, [kv.actor, cycles]);
			}
		}


		public static void addListener(int pin, ComponentInstance actor, MethodInfo action) {
			if (pinListeners.TryGetValue(pin, out var values))
			{
				values.Add((actor, action));
			}
			else {
				pinListeners.Add(pin, [(actor, action)]);
			}
		}

		public static async Task<bool> getPinState(int index) {
			return await AppInterop.getPinValue(index);
		}
		
		public static async void setPinState(int originCycle, int index, bool state) { 
			int st = state ? 1 : 0;
			bool isOn = await getPinState(index);


			if (index < 8)
			{
				if (isOn)
				{
					portD &= (st << (index));
				}
				else
				{
					portD |= (st << (index));
				}
			}
			else if (index < 14)
			{
				if (isOn)
				{
					portB &= (st << (index - 8));
				}
				else
				{
					portB |= (st << (index - 8));
				}
			}
			else {
                if (isOn)
                {
                    portC &= (st << (index - 14));
                }
                else
                {
                    portC |= (st << (index - 14));
                }
            }

			//appinterop
			//dont update components, bad for important performance
			AppInterop.sendIntructionsToArduino(new (originCycle, new PinInstruction(index, state, 0)));//do it now

		}
	}
}
