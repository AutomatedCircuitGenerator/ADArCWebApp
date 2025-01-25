using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Components;

/*
 * class for managing interop for components with .js controllers. Controller classes should
 * have the same name as the Razor component without the Razor, otherwise the linking
 * will not work. For example:
 * RazorLED.razor -> LED class in controllers/led.js
 */
public abstract class RazorComponent : ComponentBase
{
    public IJSObjectReference? Controller;
    private DotNetObjectReference<RazorComponent>? _reference;

    [Inject] protected IJSRuntime _js { get; set; }

    [Inject] protected BoardService _boardService { get; set; }

    [Parameter] public ComponentInstance? ComponentInstance { get; set; }
    
}