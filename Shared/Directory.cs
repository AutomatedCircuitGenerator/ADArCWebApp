using ADArCWebApp.Shared;

namespace ADArCWebApp
{
    /// <summary>
    /// Representation of a directory structure for use in the Component Palette.
    /// </summary>
    public class Directory
    {
        public readonly List<Directory> SubDirectories = [];
        public readonly List<ComponentCard> Contents = [];
        public readonly string Name;
        public bool IsHidden = true;

        public Directory(string name, List<Directory> sub, List<ComponentCard> content)
        {
            Name = name;
            SubDirectories = sub;
            Contents = content;
        }

        public Directory(string name, List<Directory> sub)
        {
            Name = name;
            SubDirectories = sub;
        }

        public Directory(string name, List<ComponentCard> content)
        {
            Name = name;
            Contents = content;
        }
    }
}