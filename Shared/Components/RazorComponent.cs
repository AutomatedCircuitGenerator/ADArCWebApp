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
    protected IJSObjectReference? Controller;
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

    private static readonly Dictionary<int, (string PortName, int RelativePin)> _arduinoUnoPinMap = new()
    {
        { 0, ("D", 0) },
        { 1, ("D", 1) },
        { 2, ("D", 2) },
        { 3, ("D", 3) },
        { 4, ("D", 4) },
        { 5, ("D", 5) },
        { 6, ("D", 6) },
        { 7, ("D", 7) },

        { 8, ("B", 0) },
        { 9, ("B", 1) },
        { 10, ("B", 2) },
        { 11, ("B", 3) },
        { 12, ("B", 4) },
        { 13, ("B", 5) },

        { 14, ("C", 0) },
        { 15, ("C", 1) },
        { 16, ("C", 2) },
        { 17, ("C", 3) },
        { 18, ("C", 4) },
        { 19, ("C", 5) }
    };

    private static readonly Dictionary<int, (string PortName, int RelativePin)> _arduinoMegaPinMap = new()
    {
        { 0, ("E", 0) },
        { 1, ("E", 1) },
        { 2, ("E", 4) },
        { 3, ("E", 5) },
        { 4, ("G", 5) },
        { 5, ("E", 3) },
        { 6, ("H", 3) },
        { 7, ("H", 4) },

        { 8, ("H", 5) },
        { 9, ("H", 6) },
        { 10, ("B", 4) },
        { 11, ("B", 5) },
        { 12, ("B", 6) },
        { 13, ("B", 7) },

        { 14, ("J", 1) },
        { 15, ("J", 0) },
        { 16, ("H", 1) },
        { 17, ("H", 0) },
        { 18, ("D", 3) },
        { 19, ("D", 2) },
        { 20, ("D", 1) },
        { 21, ("D", 0) },

        { 22, ("A", 0) },
        { 23, ("A", 1) },
        { 24, ("A", 2) },
        { 25, ("A", 3) },
        { 26, ("A", 4) },
        { 27, ("A", 5) },
        { 28, ("A", 6) },
        { 29, ("A", 7) },
        { 30, ("C", 7) },
        { 31, ("C", 6) },
        { 32, ("C", 5) },
        { 33, ("C", 4) },
        { 34, ("C", 3) },
        { 35, ("C", 2) },
        { 36, ("C", 1) },
        { 37, ("C", 0) },
        { 38, ("D", 7) },
        { 39, ("G", 2) },
        { 40, ("G", 1) },
        { 41, ("G", 0) },
        { 42, ("L", 7) },
        { 43, ("L", 6) },
        { 44, ("L", 5) },
        { 45, ("L", 4) },
        { 46, ("L", 3) },
        { 47, ("L", 2) },
        { 48, ("L", 1) },
        { 49, ("L", 0) },
        { 50, ("B", 3) },
        { 51, ("B", 2) },
        { 52, ("B", 1) },
        { 53, ("B", 0) },

        { 54, ("F", 0) },
        { 55, ("F", 1) },
        { 56, ("F", 2) },
        { 57, ("F", 3) },
        { 58, ("F", 4) },
        { 59, ("F", 5) },
        { 60, ("F", 6) },
        { 61, ("F", 7) },

        { 62, ("K", 0) },
        { 63, ("K", 1) },
        { 64, ("K", 2) },
        { 65, ("K", 3) },
        { 66, ("K", 4) },
        { 67, ("K", 5) },
        { 68, ("K", 6) },
        { 69, ("K", 7) }
    };
}