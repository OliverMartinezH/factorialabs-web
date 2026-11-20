# Levanta el stack (api + web) y muestra las URLs.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

docker compose up -d --build
if ($LASTEXITCODE -ne 0) { throw 'docker compose fallo' }

Write-Host ''
Write-Host '  Web  -> http://localhost:4200' -ForegroundColor Green
Write-Host '  API  -> http://localhost:5080/health' -ForegroundColor Green
Write-Host ''
