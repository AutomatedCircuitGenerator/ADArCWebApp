namespace ADArCWebApp.Shared.Exceptions;

public class NodeNotFoundException : Exception
{
    public NodeNotFoundException() : base("No node was found.")
    {
    }

    public NodeNotFoundException(string message) : base(message)
    {
    }

    public NodeNotFoundException(string message, Exception inner) : base(message, inner)
    {
    }
}