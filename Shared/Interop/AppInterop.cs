using ADArCWebApp.ComponentNamespace;
using ADArCWebApp.Shared.Simulation;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Interop
{
	public static class AppInterop
	{
		public static IJSObjectReference? jsModule;
		public static IJSRuntime? runtime;

		[JSInvokable]
		public static void updateScreenWidthRatio(int screenWidth)
		{
			var r = ((double)screenWidth) / Pages.Index.defaultScreenWidth;

			Pages.Index.currentRatio = r;

			Console.WriteLine("screen resized! new ratio: " + r);
		}


		[JSInvokable]
		public static void sendVal(int data, int register) //0-B, 1-c, 2-d
		{
			switch (register)
			{
				case 0:
					AvrCPU.portB = data; break;
				case 1:
					AvrCPU.portC = data; break;
				case 2:
					AvrCPU.portD = data; break;
				default:
					throw new Exception("invalid portRegister ID detected!");
			}

			AvrCPU.updateMasking();
			AvrCPU.updateComponents();
		}

		public static async Task<int> getWindowWidth() {
			int ret = await jsModule!.InvokeAsync<int>("getWindowWidth");
			return ret;
		}


		public static async Task<IJSObjectReference> getModuleWrapper() { 
			return await runtime!.InvokeAsync<IJSObjectReference>("interopManager.getInteropManager");
		}

		public static async void startSimWrapper() {
			await jsModule!.InvokeVoidAsync("startCodeLoop", DotNetObjectReference.Create(Pages.Index.app!));
		}

	}
}
