using ADArCWebApp.Shared.Interop;
using System.Diagnostics;

namespace ADArCWebApp
{

	public interface IDelayService {
		Task<bool> delay(int usec);
	}

	public class DelayService : IDelayService
	{
		public async Task<bool> delay(int usec)
		{


			return await AppInterop.usDelay(usec);

		}
	}
}
