namespace ADArCWebApp
{
	/// <summary>
	/// Used by MainCanvas.razor to track changes affecting all components.
	/// </summary>
	public class Transform
	{
		public (double x, double y) translate = (0,0);

		public double scale = 1;
	}
}
