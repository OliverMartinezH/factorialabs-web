using System.Text.Json;

namespace FactoriaLabs.Api.Leads;

public sealed record Lead(
    string Name,
    string Email,
    string? Company,
    string? CurrentSystem,
    string Message,
    DateTimeOffset ReceivedAt);

/// <summary>
/// Persistencia simple en un archivo JSON. Pensada para bajo volumen:
/// una escritura por lead, con exclusión mutua y reemplazo atómico del archivo.
/// </summary>
public sealed class LeadStore
{
    private static readonly JsonSerializerOptions Options = new() { WriteIndented = true };

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly string _path;

    public LeadStore(IConfiguration configuration)
    {
        _path = configuration["Leads:FilePath"]
            ?? Path.Combine(AppContext.BaseDirectory, "data", "leads.json");
    }

    public async Task SaveAsync(Lead lead, CancellationToken cancellationToken)
    {
        await _gate.WaitAsync(cancellationToken);

        try
        {
            var directory = Path.GetDirectoryName(_path);
            if (!string.IsNullOrEmpty(directory))
            {
                Directory.CreateDirectory(directory);
            }

            var leads = new List<Lead>();

            if (File.Exists(_path))
            {
                await using var read = File.OpenRead(_path);
                leads = await JsonSerializer.DeserializeAsync<List<Lead>>(read, Options, cancellationToken)
                    ?? [];
            }

            leads.Add(lead);

            var temp = _path + ".tmp";
            await using (var write = File.Create(temp))
            {
                await JsonSerializer.SerializeAsync(write, leads, Options, cancellationToken);
            }

            File.Move(temp, _path, overwrite: true);
        }
        finally
        {
            _gate.Release();
        }
    }
}
