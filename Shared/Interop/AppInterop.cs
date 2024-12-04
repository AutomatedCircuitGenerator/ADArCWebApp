using ADArCWebApp.Shared.Simulation;
using Microsoft.JSInterop;
using System.Text.Json;

namespace ADArCWebApp.Shared.Interop
{
	public static class AppInterop
	{
		public static IJSObjectReference? JsModule;
		public static IJSRuntime? Runtime;

		/// <summary>
		/// Invoked by JS when the screen is resized. Generally used to set the size of the components in the palette.
		/// </summary>
		/// <param name="screenWidth">The width of the window.</param>
		/// <param name="screenHeight">The height of the window (up to the browser toolbar, but not including.)</param>
		[JSInvokable]
		public static void UpdateScreenRatios(int screenWidth, int screenHeight)
		{
			var r = ((double)screenWidth) / Pages.Index.DefaultScreenWidth;

			Pages.Index.CurrentWidthRatio = r;

			var r2 = ((double)screenHeight) / Pages.Index.DefaultScreenHeight;

			Pages.Index.CurrentHeightRatio = r2;
		}

		/// <summary>
		/// Used exclusively by JS to send an updated pin register after a change.
		/// </summary>
		/// <param name="data">the updated register.</param>
		/// <param name="originCycle">what cycle the Arduino CPU is currently on.</param>
		/// <param name="register">What register is being updated. 0-B, 1-c, 2-d</param>
		/// <exception cref="Exception"></exception>
		[JSInvokable]
		public static void SendVal(int data, long originCycle, int register)
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

			AvrCPU.updateMasking(originCycle);

		}

		/// <summary>
		/// Used exclusively by JS to send Arduino serial bus data.
		/// </summary>
		/// <param name="text">the data sent by the arduino.</param>
		[JSInvokable]
		public static void SendSerial(string text) {
			Pages.Index.CodePane!.UpdateConsoleOutput(text, true);
		}
		/// <summary>
		/// Gets the window height similar for updateScreenRatios.
		/// </summary>
		/// <returns>the height of the window.</returns>
		public static async Task<int> GetWindowWidth() {
			int ret = await JsModule!.InvokeAsync<int>("getWindowWidth");
			return ret;
		}

		/// <summary>
		/// Gets the width of the window similar for updateScreenRatios.
		/// </summary>
		/// <returns>The width of the window.</returns>
		public static async Task<int> GetWindowHeight()
		{
			int ret = await JsModule!.InvokeAsync<int>("getWindowHeight");
			return ret;
		}

		/// <summary>
		/// Registers an absolute pin index as requiring a reponse from the sensor.
		/// The Arduino will pause until it gets a reponse after this is used.
		/// </summary>
		/// <param name="absoluteIndex">The absolute index of the pin to affect.</param>
		public static async void RegisterResponseRequired(int absoluteIndex) {
			await JsModule!.InvokeVoidAsync("addResponseReqFlag", absoluteIndex);
		}

		/// <summary>
		/// Undos registerResponseRequired.
		/// </summary>
		/// <param name="absoluteIndex">The absolute index of the pin to affect.</param>
		public static async void UnregisterResponseRequired(int absoluteIndex)
		{
			await JsModule!.InvokeVoidAsync("removeResponseReqFlag", absoluteIndex);
		}

		/// <summary>
		/// Gets the interopManager object attached to the window for further use.
		/// This must be called before other AppInterop functions!
		/// See main.ts for the function being called.
		/// </summary>
		/// <returns>The interopManager object used to call all other functions in this file.</returns>
		public static async Task<IJSObjectReference> GetModuleWrapper() {
			return await Runtime!.InvokeAsync<IJSObjectReference>("interopManager.getInteropManager");
		}

		/// <summary>
		/// Asks JS to start the simulation.
		/// </summary>
		public static async void StartSimWrapper() {
			await JsModule!.InvokeVoidAsync("startCodeLoop");
		}

		/// <summary>
		/// Asks JS to update the code in the Monaco editor with a new value.
		/// </summary>
		public static async void UpdateCodeWrapper()
		{
			await JsModule!.InvokeVoidAsync("updateCodeInPane", BuildCode.code);
		}

		/// <summary>
		/// Asks JS to create a Monaco error message.
		/// </summary>
		/// <param name="message">The text of the the error message.</param>
		/// <param name="line">The line the error occurs on.</param>
		/// <param name="column">The column the error occurs on.</param>
		public static async void MakeMonacoErrorWrapper(string message, int line, int column) {
			await JsModule!.InvokeVoidAsync("makeMonacoError", message, line, column);
		}
		/// <summary>
		/// Asks JS to remove all monaco errors.
		/// </summary>
		public static async void ClearMonacoErrorsWrapper()
		{
			await JsModule!.InvokeVoidAsync("clearMonacoErrors");
		}
		/// <summary>
		/// Asks JS for all current code in the Monaco editor.
		/// </summary>
		/// <returns>The code in the editor.</returns>
		public static async Task<string> GetCodeWrapper() {
			return await JsModule!.InvokeAsync<string>("getCodeInPane");
		}
		/// <summary>
		/// Asks JS to set the code in the pane to something other than the constructed code.
		/// </summary>
		/// <param name="code">the code to set the editor to.</param>
		public static async void SetCodeWrapper(string code)
		{
			await JsModule!.InvokeVoidAsync("updateCodeInPane", code);
		}
		/// <summary>
		/// Asks JS to stop the simulation and cleans up the C# side of the CPU.
		/// </summary>
		public static async void StopWrapper() {
			await JsModule!.InvokeVoidAsync("stop");
			AvrCPU.portB = 0; AvrCPU.portC = 0; AvrCPU.portD = 0;
			AvrCPU.updateMasking(0);

		}
		/// <summary>
		/// Asks JS to compile the code in the pane. Takes a long time!
		/// </summary>
		/// <returns>A CompileRespone object comprised of the stdout and stderr portions of the compiler output.</returns>
		public static async Task<CompileResponse> CompileWrapper()
		{
			return await JsModule!.InvokeAsync<CompileResponse>("compile");
		}

		public class CompileResponse {
			public string stdout { get; set; }
			public string stderr { get; set; }
		}
		/// <summary>
		/// Sends pin updates to the Arduino.
		/// </summary>
		/// <param name="pkt">The instructions to send.</param>
		public static async void SendInstructionsToArduino(TimingPacket pkt)
		{
			await JsModule!.InvokeVoidAsync("arduinoInput", pkt);
		}
		/// <summary>
		/// Sends an ADC value to the arduino.
		/// </summary>
		/// <param name="channel">The channel (pin?) to affect.</param>
		/// <param name="value">The value to set the channel to. (0-5 as voltage)</param>
		public static async void SendAdcToArduino(int channel, double value)
		{
			await JsModule!.InvokeVoidAsync("arduinoADCInput", channel, value);
		}
		/// <summary>
		/// Gets an accurate pin state from the arduino.
		/// </summary>
		/// <param name="pinInd">The absolute index of the pin to check.</param>
		/// <returns></returns>
		public static async Task<bool> GetPinValue(int pinInd) {
			return await JsModule!.InvokeAsync<bool>("getPinState", pinInd);
		}
		/// <summary>
		/// Asks JS to download the provided file.
		/// </summary>
		/// <param name="fileName">What to name the downloaded file.</param>
		/// <param name="content">The file data to download.</param>
		public static async void DownloadFile(string fileName, DotNetStreamReference content) {
			await JsModule!.InvokeVoidAsync("downloadFile", fileName, content);
			content.Dispose();
		}

		public static async void SetBoard(Board board)
		{
			await JsModule!.InvokeVoidAsync("setBoard", board);
		}
    }
}
