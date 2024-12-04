using GraphSynth.Representation;

namespace ADArCWebApp.Shared.Exceptions;

[Serializable]
public class NoConnectionsException : Exception
{
    public node FromNode { get; }
    public node ToNode { get; }
    
    public NoConnectionsException() : base("No connections were found for that component.")
    {
    }

    public NoConnectionsException(node fromNode, node toNode)
        : base($"No connections were found between the nodes with labels: {string.Join(", ", fromNode?.localLabels)} and {string.Join(", ", toNode?.localLabels)}")
    {
        FromNode = fromNode;
        ToNode = toNode;
    }

    public NoConnectionsException(string message, Exception inner) : base(message, inner)
    {
    }
}