using ADArCWebApp.ComponentNamespace;
using ADArCWebApp.Shared.Simulation;
using Microsoft.JSInterop;
using SpawnDev.BlazorJS;
using SpawnDev.BlazorJS.JSObjects;
using System.Runtime.InteropServices.JavaScript;

namespace ADArCWebApp.Shared.Interop
{
	public static class AppInterop
	{
		public static IJSInProcessObjectReference jsModule;
		public static BlazorJSRuntime? runtime;

		[JSInvokable]
		public static void updateScreenRatios(int screenWidth, int screenHeight)
		{
			var r = ((double)screenWidth) / Pages.Index.defaultScreenWidth;

			Pages.Index.currentWidthRatio = r;

			var r2 = ((double)screenHeight) / Pages.Index.defaultScreenHeight;

			Pages.Index.currentHeightRatio = r2;
		}


		[JSInvokable]
		public static void sendVal(int data, int register) //0-B, 1-c, 2-d
		{
			//Console.WriteLine(register + " " + data);
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

		}

		[JSInvokable]
		public static void sendSerial(string text) {
			Pages.Index.codePane!.updateConsoleOutput(text, true);
		}

		public static int getWindowWidth() {
			int ret = runtime!.Get<int>("window.innerWidth");
			//Console.WriteLine("width: " + ret);
			return ret;
		}

		public static int getWindowHeight()
		{
			int ret =  runtime!.Get<int>("window.innerHeight");
			return ret;
		}

		
		public static IJSInProcessObjectReference getModuleWrapper() { 
			var module =runtime!.Call<IJSInProcessObjectReference>("window.interopManager.getInteropManager");
			//Console.WriteLine(module);
			return module;
		}

		public static async void startSimWrapper() {
			jsModule!.CallVoidAsync("startCodeLoop", DotNetObjectReference.Create(Pages.Index.app!));
		}

        public static void updateCodeWrapper()
        {
            jsModule!.CallVoid("updateCodeInPane", BuildCode.code);
        }
		
		public static void makeMonacoErrorWrapper(string message, int line, int column) {
			jsModule!.CallVoid("makeMonacoError", message, line, column);
		}
		public static void clearMonacoErrorsWrapper()
		{
			jsModule!.CallVoid("clearMonacoErrors");
		}

		public static string getCodeWrapper() {
			return jsModule!.Call<string>("getCodeInPane");
		}

		public static void stopWrapper() {
			jsModule!.CallVoid("stop");
			AvrCPU.portB = 0; AvrCPU.portC = 0;	AvrCPU.portD = 0;
			AvrCPU.updateMasking();

        }

        public static async Task<CompileResponse> compileWrapper()
        {
            var obj = await jsModule!.CallAsync<IJSInProcessObjectReference>("compile");

            var ret = new CompileResponse
            {
                stdout = obj.Get<string>("stdout"),
                stderr = obj.Get<string>("stderr")
            };

            return ret;
        }

		public class CompileResponse { 
			public string stdout {get;set;}
			public string stderr { get;set;}
		}

        public static void sendPinToArduino(int pin, bool value)
        {
            jsModule!.CallVoid("arduinoInput", pin, value);
        }

        public static void sendADCToArduino(int channel, double value)
        {
            jsModule!.CallVoid("arduinoADCInput", channel, value);
        }

		public static Task<bool> usDelay(int us) {
			Console.WriteLine("prejs");
			return jsModule!.CallAsync<bool>("delayus", us);
		}

		public static async void calibrate()
		{
            await jsModule!.CallVoidAsync("calibrateTiming");
		}
    }
}
