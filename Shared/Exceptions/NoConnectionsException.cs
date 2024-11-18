namespace ADArCWebApp.Shared.Exceptions;

[Serializable]
public class NoConnectionsException : Exception
{
    public NoConnectionsException() : base("No connections were found.")
    {
    }

    public NoConnectionsException(string message) : base(message)
    {
    }

    public NoConnectionsException(string message, Exception inner) : base(message, inner)
    {
    }
}