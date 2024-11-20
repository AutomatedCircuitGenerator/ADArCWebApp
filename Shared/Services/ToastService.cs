namespace ADArCWebApp.Shared;

public class ToastService
{
    public event Action<Toast>? ToastAdded;

    public void AddToast(string message, Variant variant)
    {
        ToastAdded?.Invoke(new Toast(message, variant));
    }
}

public enum Variant
{
    Error,
    Warning,
    Info,
}

public record Toast(string Message, Variant Variant);