using ADArCWebApp.Shared.Interop;
using System.Diagnostics;

namespace ADArCWebApp
{

	public interface IDelayService {
		Task delay(int millisec);
	}

	public class DelayService : IDelayService
	{
		public async Task delay(int millisec)
		{


			await AppInterop.usDelay(millisec);

			return;
		}
	}
}
