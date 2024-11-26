using Microsoft.AspNetCore.Components;

namespace ADArCWebApp.Shared;

public class ToastService
{
    public event Action<Toast>? ToastAdded;

    public void AddToast(string message, Variant variant, IEnumerable<ComponentInstance>? components = null)
    {
        ToastAdded?.Invoke(new Toast(message, variant, components));
    }
}

public enum Variant
{
    Error,
    Warning,
    Info,
}

public record Toast(string Message, Variant Variant, IEnumerable<ComponentInstance>? Components = null);