using System.Text.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Components;

public abstract class RazorComponent : ComponentBase
{
    [Parameter] public IJSObjectReference? Controller { get; set; }
    [Parameter] public ComponentInstance? Component { get; set; }

    /**
     * Updates controller state after the first render of the component. This is important
     * for environmental settings deserialization to apply the changes correctly.
     */
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (Controller == null || Component == null || !firstRender) return;
        var options = new JsonSerializerOptions{IncludeFields = true};
        options.Converters.Add(new ParamToStateSerializer());
        var json = JsonSerializer.Serialize(Component.CompParams, options);
        await Controller.InvokeVoidAsync("send", json);
    }
}