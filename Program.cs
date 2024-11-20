using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using ADArCWebApp;
using ADArCWebApp.Shared;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Builder;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
//debug
// builder.Services.AddLogging(logging =>
// {
//     logging.SetMinimumLevel(LogLevel.Debug);
// });

var provider = new FileExtensionContentTypeProvider();
provider.Mappings.Add(".grxml", "application/grxml");
provider.Mappings.Add(".rsxml", "application/rsxml");
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.Configure<StaticFileOptions>(options => { options.ContentTypeProvider = provider; });
builder.Services.AddSingleton<BoardService>();
await builder.Build().RunAsync();
