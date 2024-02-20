using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using ADArCWebApp;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Builder;
using SpawnDev.BlazorJS;
using SpawnDev.BlazorJS.WebWorkers;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddBlazorJSRuntime();
builder.Services.AddWebWorkerService();
builder.Services.AddSingleton<IDelayService, DelayService>();
builder.Services.AddSingleton<IMathsService, MathsService>();

var provider = new FileExtensionContentTypeProvider();
provider.Mappings.Add(".grxml", "application/grxml");
provider.Mappings.Add(".rsxml", "application/rsxml");
builder.Services.Configure<StaticFileOptions>(options => { options.ContentTypeProvider = provider; });
await builder.Build().BlazorJSRunAsync();
