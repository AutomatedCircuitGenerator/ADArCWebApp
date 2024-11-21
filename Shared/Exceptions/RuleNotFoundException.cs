namespace ADArCWebApp.Shared.Exceptions;

public class RuleNotFoundException : Exception
{
    public RuleNotFoundException() : base("No connection rule was found.")
    {
    }

    public RuleNotFoundException(string message) : base(message)
    {
    }

    public RuleNotFoundException(string message, Exception inner) : base(message, inner)
    {
    }
}