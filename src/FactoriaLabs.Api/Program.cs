using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("web", policy => policy
        .WithOrigins(
            builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
            ?? ["http://localhost:4200"])
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// TLS se termina en el reverse proxy (nginx) o en IIS.
// No forzamos HTTPS aquí para no romper el ruteo interno de Docker.
app.UseCors("web");

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

app.MapPost("/api/contact", (ContactRequest request, ILogger<Program> logger) =>
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Trim().Length < 2)
    {
        errors["name"] = ["El nombre es obligatorio."];
    }

    if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
    {
        errors["email"] = ["El email no es válido."];
    }

    if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Trim().Length < 12)
    {
        errors["message"] = ["El mensaje es demasiado corto."];
    }

    if (errors.Count > 0)
    {
        return Results.ValidationProblem(errors);
    }

    // TODO: persistir en SQL Server cuando exista el modelo de leads.
    logger.LogInformation(
        "Lead recibido: {Name} <{Email}> · empresa: {Company} · sistema: {System}",
        request.Name,
        request.Email,
        request.Company ?? "-",
        request.CurrentSystem ?? "-");

    return Results.Created("/api/contact", new { received = true });
});

app.Run();

public record ContactRequest(
    string Name,
    string Email,
    string? Company,
    string? CurrentSystem,
    string Message);

// Expuesto para WebApplicationFactory en los tests de integración.
public partial class Program;
