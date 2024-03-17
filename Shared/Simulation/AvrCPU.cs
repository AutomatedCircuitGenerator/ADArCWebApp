using ADArCWebApp.Shared.Interop;
using System.Reflection;

namespace ADArCWebApp.Shared.Simulation
{
	public static class AvrCPU
	{

		//these are used to trigger translation functions when the arduino reports changes.
		//extremely dangerous to rely on for accuracy as delayed changes (ie TimingPackets) not reflected here!
		public static int portB;//6, 8-13
		public static int portC;//6, 14-19
		public static int portD;//8, 0-7
		/// <summary>
		/// Combines all port registers.
		/// </summary>
		public static int maskable;

		//avr pinId -> List of tuples. Tuple has instance and translation function.
		//might be able to remove the translation function if components are appropriately standardized.
		//TODO: review removing "action" here.
		public static Dictionary<int, List<(ComponentInstance actor, MethodInfo action)>> pinListeners = new();

		/// <summary>
		/// Receives pin changes from the CPU and tells components to update if necessary.
		/// </summary>
		/// <param name="currCycles">The CPU cycle the pin change came on.</param>
		public static void updateMasking(long currCycles) {
			int oldMask = maskable;
			maskable = 0;

			maskable |= portB << 8;
			maskable |= portC << 14;
			maskable |= portD;

			for (int i = 0; i < 20; i++)
			{
				//bitshift magic to check if a pin has changed.
				if ((((1 << i) & oldMask) ^ ((1 << i) & maskable)) > 0) {
					updateComponents(i, currCycles);
                    Pages.Index.app!.triggerRender();
                }
			}
		}

		/// <summary>
		/// Invokes all translation functions for a specific pin.
		/// </summary>
		/// <param name="pin">Which pin to invoke.</param>
		/// <param name="cycles">The cycle the pin change came in on.</param>
		public static void updateComponents(int pin, long cycles) {
			foreach (var (actor, action) in pinListeners[pin]) {
				action.Invoke(actor, [actor, cycles]);
			}
		}

		/// <summary>
		/// Creates a new pinlistener to invoke a function on an instance when a pin changes.
		/// </summary>
		/// <param name="pin">What pin to listen on.</param>
		/// <param name="actor">What component instance to affect.</param>
		/// <param name="action">What function to execute.</param>
		public static void addListener(int pin, ComponentInstance actor, MethodInfo action) {
			//if a list exists for that pin, add the listener directly, else create a new list.
			if (pinListeners.TryGetValue(pin, out var values))
			{
				values.Add((actor, action));
			}
			else {
				pinListeners.Add(pin, [(actor, action)]);//square brackets define new list
			}
		}

		/// <summary>
		/// Gets the current state of a pin as a bool.
		/// </summary>
		/// <param name="index">the absolute pin index to get the state of.</param>
		/// <returns>true if the pin is high, else false.</returns>
		public static async Task<bool> getPinState(int index) {
			return await AppInterop.getPinValue(index);
		}
		
		/// <summary>
		/// Sets the state of a single pin immediately (on the current cycle).
		/// </summary>
		/// <param name="originCycle">the original cycle that the pin change that trigger this response
		/// came in on. If this is used outside this context, 0 can be used.
		/// TODO: remove this parameter and change to 0.
		/// </param>
		/// <param name="index">The absolute pin index of the pin to affect.</param>
		/// <param name="state">The on/off state to change the pin to.</param>
		public static async void setPinState(long originCycle, int index, bool state) { 
			int st = state ? 1 : 0;
			bool isOn = await getPinState(index);

			//keep the portRegisters in some semblance of accuracy so as not to retrigger translation functions when
			//ports are reported.
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
