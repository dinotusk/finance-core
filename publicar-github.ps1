$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$git = Join-Path $projectRoot ".tools\PortableGit\cmd\git.exe"
$gh = Join-Path $projectRoot ".tools\GitHubCLI\bin\gh.exe"
$gitDir = Join-Path $projectRoot ".git-real"
$repoName = "finance-core"

if (-not (Test-Path -LiteralPath $git)) {
  Write-Host "Git portatil nao encontrado." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path -LiteralPath $gh)) {
  Write-Host "GitHub CLI nao encontrado." -ForegroundColor Red
  exit 1
}

Push-Location $projectRoot
try {
  & $gh auth status
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Faça login primeiro com .\login-github.ps1" -ForegroundColor Yellow
    exit 1
  }

  $user = & $gh api user --jq .login
  $repoUrl = "https://github.com/$user/$repoName.git"

  & $gh repo view "$user/$repoName" *> $null
  if ($LASTEXITCODE -ne 0) {
    & $gh repo create $repoName --public --description "Assistente financeiro pessoal PWA"
  }

  $existingRemote = & $git --git-dir="$gitDir" --work-tree="$projectRoot" remote
  if ($existingRemote -notcontains "origin") {
    & $git --git-dir="$gitDir" --work-tree="$projectRoot" remote add origin $repoUrl
  } else {
    & $git --git-dir="$gitDir" --work-tree="$projectRoot" remote set-url origin $repoUrl
  }

  & $git --git-dir="$gitDir" --work-tree="$projectRoot" push -u origin main
  Write-Host "Publicado em: https://github.com/$user/$repoName" -ForegroundColor Green
} finally {
  Pop-Location
}
