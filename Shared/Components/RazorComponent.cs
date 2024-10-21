using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Components;

/*
 * class for managing interop for components with .js controllers. Controller classes should
 * have the same name as the Razor component without the Razor, otherwise the linking
 * will not work. For example:
 * RazorLED.razor -> LED class in controllers/led.js
 */
public abstract class RazorComponent : ComponentBase, IAsyncDisposable 
{
    private DotNetObjectReference<RazorComponent>? _reference;
    private IJSObjectReference? _controller;
    
    [Inject]
    protected IJSRuntime JS { get; set; }
    
    [Parameter] 
    public ComponentInstance? ComponentInstance { get; set; } 
    
    protected override void OnInitialized()
    {
        if (IsCanvasComponent)
        {
            _reference = DotNetObjectReference.Create(this);
        }
    }

    protected override async Task OnInitializedAsync()
    {
        if (IsCanvasComponent)
        {
            var jsIdentifier = GetType().Name.Replace("Razor", "");
            _controller = await JS.InvokeAsync<IJSObjectReference>($"{jsIdentifier}.getReference");
            await _controller.InvokeVoidAsync("setComponentReference", _reference);
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (IsCanvasComponent)
        {
            if (_controller is not null)
            {
                await _controller.InvokeVoidAsync("delete");
                await _controller.DisposeAsync();
                _reference?.Dispose();
            }
        }
    }
    
    // this must be checked before setting up a controller/listeners, otherwise all the card components will create a controller
    private bool IsCanvasComponent => ComponentInstance?.gsNode.localLabels.Count > 0;
}