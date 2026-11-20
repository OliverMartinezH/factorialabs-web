# Detiene y elimina los contenedores (los datos de SQL se conservan en el volumen).
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
docker compose --env-file .env down
