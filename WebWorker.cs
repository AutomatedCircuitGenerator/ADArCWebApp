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
			var sw = new Stopwatch();
			sw.Start();

			while (sw.ElapsedMilliseconds > 0) {
				await Task.Delay(1);
			}

			return;
		}
	}
}
