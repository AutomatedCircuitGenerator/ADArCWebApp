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

    [Inject] protected IJSRuntime js { get; set; }

    [Parameter] public ComponentInstance? ComponentInstance { get; set; }

    // this must be checked before setting up a controller/listeners, otherwise all the card components will create a controller
    private bool IsCanvasComponent => ComponentInstance?.gsNode.localLabels.Count > 0;

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
            // Canonical pin name: "SO", to absolute pin, port, and relative pin port: 13, B, 6
            Dictionary<string, List<Tuple<int, string, int>>> pins = new();

            foreach (var pin in ComponentInstance.data.pins)
            {
                if (ComponentInstance.connMap.TryGetValue(pin.Value, out var connections))
                {
                    //one pin on a component can be connected to many pins on the arduino
                    var pinIds = connections.Select(connection => connection.toId);

                    var tuples = new List<Tuple<int, string, int>>();
                    foreach (var pinId in pinIds)
                    {
                        AbsoluteUnoPinToPortAndRelativePin(pinId, out var port, out var relativePin);
                        tuples.Add(new Tuple<int, string, int>(pinId, port, relativePin));
                    }

                    pins[pin.Key] = tuples;
                }
                else
                {
                    pins[pin.Key] = new List<Tuple<int, string, int>>();
                }
            }

            Controller = await js.InvokeAsync<IJSObjectReference>($"{jsIdentifier}.create", ComponentInstance.localId,
                pins, _reference);
        }
    }

    private void AbsoluteUnoPinToPortAndRelativePin(int absolutePin, out string portName, out int relativePin)
    {
        switch (absolutePin)
        {
            case >= 8 and <= 13:
                portName = "B";
                relativePin = absolutePin - 8;
                break;
            case >= 0 and <= 7:
                portName = "D";
                relativePin = absolutePin;
                break;
            case >= 14 and <= 19:
                //also has reset port on arduino as 7, wont work for that
                portName = "C";
                relativePin = absolutePin - 14;
                break;
            default:
                portName = "Null";
                relativePin = -1;
                break;
        }
    }
}