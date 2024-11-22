using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using ADArCWebApp;
using ADArCWebApp.Shared;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Builder;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
//maybe prevent caching? idk why the thing in js doesnt work but oh well.
// builder.Services.Configure<StaticFileOptions>(options =>
// {
//     options.ContentTypeProvider = new FileExtensionContentTypeProvider();
//     options.OnPrepareResponse = ctx =>
//     {
//         // Set headers to prevent caching
//         ctx.Context.Response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
//         ctx.Context.Response.Headers.Add("Pragma", "no-cache");
//         ctx.Context.Response.Headers.Add("Expires", "0");
//     };
// });


var provider = new FileExtensionContentTypeProvider();
provider.Mappings.Add(".grxml", "application/grxml");
provider.Mappings.Add(".rsxml", "application/rsxml");
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.Configure<StaticFileOptions>(options => { options.ContentTypeProvider = provider; });
builder.Services.AddSingleton<BoardService>();
builder.Services.AddSingleton<ToastService>();
await builder.Build().RunAsync();
