using Microsoft.JSInterop;

namespace ADArCWebApp.Shared;

public class LocalStorageService(IJSRuntime js)
{
    private readonly IJSRuntime _js = js;
    

    public async Task AddItem(string key, string value)
    {
        await _js.InvokeVoidAsync("localStorage.setItem", key, value);
    }

    public async Task RemoveItem(string key)
    {
        await _js.InvokeVoidAsync("localStorage.removeItem", key);
    }

    public async Task<string> GetItem(string key)
    {
        return await _js.InvokeAsync<string>("localStorage.getItem", key);
    }
}