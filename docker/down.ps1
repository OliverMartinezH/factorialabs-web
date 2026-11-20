# Detiene y elimina los contenedores.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
docker compose down
