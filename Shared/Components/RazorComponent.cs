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
    public IJSObjectReference? Controller;
    private DotNetObjectReference<RazorComponent>? _reference;

    [Inject] protected IJSRuntime _js { get; set; }

    [Inject] protected BoardService _boardService { get; set; }

    [Parameter] public ComponentInstance? ComponentInstance { get; set; }

    // this must be checked before setting up a controller/listeners, otherwise all the card components will create a controller
    private bool IsCanvasComponent => ComponentInstance?.GsNode.localLabels.Count > 0;

    public async ValueTask DisposeAsync()
    {
        if (IsCanvasComponent)
            if (Controller is not null)
            {
                await Controller.InvokeVoidAsync("delete");
                await Controller.DisposeAsync();
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
            // Canonical pin name: "SO", to absolute pin indexes it is connected to
            Dictionary<string, List<int>> pins = new();

            foreach (var pin in ComponentInstance.Data.pins)
            {
                if (ComponentInstance.ConnMap.TryGetValue(pin.Value, out var connections))
                {
                    //one pin on a component can be connected to many pins on the arduino
                    var pinIds = connections.Select(connection => connection.ToId);

                    pins[pin.Key] = pinIds.ToList();
                }
                else
                {
                    pins[pin.Key] = [];
                }
            }

            Controller = await _js.InvokeAsync<IJSObjectReference>($"{jsIdentifier}.create", ComponentInstance.localId,
                pins, _reference);
        }
    }

    protected override bool ShouldRender()
    {
        return false;
    }
}