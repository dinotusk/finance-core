$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$gh = Join-Path $projectRoot ".tools\GitHubCLI\bin\gh.exe"

if (-not (Test-Path -LiteralPath $gh)) {
  Write-Host "GitHub CLI nao encontrado em:" -ForegroundColor Red
  Write-Host $gh
  exit 1
}

& $gh auth login --hostname github.com --git-protocol https --web
