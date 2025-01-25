using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Components;

/*
 * This is a remnant of the old RazorComponent class. This used to handle linking controller instances throuhg
 * lifecycle methods (OnAfterRenderAsync) but we found that these were not reliably called upon, especially
 * during deserialization from JSON. As such, it now just exists to pass Controller from ComponentInstance
 * to Razor components that need it.
 */
public abstract class RazorComponent : ComponentBase
{
    [Parameter] public IJSObjectReference? Controller { get; set; }
}