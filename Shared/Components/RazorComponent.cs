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
    protected IJSObjectReference? _controller;
    private DotNetObjectReference<RazorComponent>? _reference;

    [Inject] protected IJSRuntime JS { get; set; }

    [Parameter] public ComponentInstance? ComponentInstance { get; set; }

    // this must be checked before setting up a controller/listeners, otherwise all the card components will create a controller
    private bool IsCanvasComponent => ComponentInstance?.gsNode.localLabels.Count > 0;

    public async ValueTask DisposeAsync()
    {
        if (IsCanvasComponent)
            if (_controller is not null)
            {
                await _controller.InvokeVoidAsync("delete");
                await _controller.DisposeAsync();
                _reference?.Dispose();
            }
    }

    protected override void OnInitialized()
    {
        if (IsCanvasComponent) _reference = DotNetObjectReference.Create(this);
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (IsCanvasComponent && ComponentInstance != null && firstRender)
        {
            var jsIdentifier = GetType().Name.Replace("Razor", "");
            Dictionary<string, List<int>> pins = new();

            foreach (var pin in ComponentInstance.data.pins)
            {
                if (ComponentInstance.connMap.TryGetValue(pin.Value, out var connections))
                {
                    var pinIds = connections.Select(connection => connection.toId);
                    pins[pin.Key] = pinIds.ToList();
                }
                else
                {
                    pins[pin.Key] = new List<int>();
                }
            }

            _controller = await JS.InvokeAsync<IJSObjectReference>($"{jsIdentifier}.create", ComponentInstance.localId, pins, _reference);
        }
    }
}