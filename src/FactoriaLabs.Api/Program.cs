using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// TLS se termina en el reverse proxy (nginx) o en IIS.
// No forzamos HTTPS aquí para no romper el ruteo interno de Docker.

var version = Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "0.0.0";

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "factorialabs-api",
    version,
    timestamp = DateTimeOffset.UtcNow
}));

app.MapGet("/api/info", () => Results.Ok(new
{
    name = "FactoriaLabs API",
    version,
    framework = ".NET 11"
}));

app.Run();

// Expuesto para WebApplicationFactory en los tests de integración.
public partial class Program;
