namespace ADArCWebApp.Shared.Exceptions;

[Serializable]
public class NoConnectionsException : Exception
{
    public NoConnectionsException() : base("No connections were found for that component.")
    {
    }

    public NoConnectionsException(string message) : base(message)
    {
    }

    public NoConnectionsException(string message, Exception inner) : base(message, inner)
    {
    }
}