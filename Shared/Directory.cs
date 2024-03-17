using ADArCWebApp.Shared;

namespace ADArCWebApp
{
	/// <summary>
	/// Representation of a directory structure for use in the Component Palette.
	/// </summary>
	public class Directory
	{
		public List<Directory> subDirectories = new List<Directory>();

		public List<ComponentCard> contents = new List<ComponentCard>();

		public string name;
		public bool isHidden = true;


		public Directory(string name, List<Directory> sub, List<ComponentCard> content)
		{
			this.name = name;
			subDirectories = sub;
			contents = content;
		}

		public Directory(string name, List<Directory> sub)
		{
			this.name = name;
			subDirectories = sub;
		}

		public Directory(string name, List<ComponentCard> content)
		{
			this.name = name;
			contents = content;
		}
	}
}
