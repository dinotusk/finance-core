@echo off
setlocal
cd /d "%~dp0"

set "GIT=.tools\PortableGit\cmd\git.exe"
set "GH=.tools\GitHubCLI\bin\gh.exe"
set "GIT_DIR=.git-real"
set "REPO_NAME=finance-core"
set "TEMP_TOKEN_FILE=%TEMP%\finance-core-gh-token.txt"
set "TEMP_AUTH_FILE=%TEMP%\finance-core-gh-auth.txt"

"%GH%" auth status
if errorlevel 1 (
  echo.
  echo Faca login primeiro executando login-github.cmd
  exit /b 1
)

for /f "usebackq delims=" %%u in (`"%GH%" api user --jq .login`) do set "GITHUB_USER=%%u"
set "REPO_URL=https://github.com/%GITHUB_USER%/%REPO_NAME%.git"

"%GH%" repo view "%GITHUB_USER%/%REPO_NAME%" >nul 2>nul
if errorlevel 1 (
  "%GH%" repo create "%REPO_NAME%" --public --description "Assistente financeiro pessoal PWA"
)

"%GIT%" --git-dir="%GIT_DIR%" --work-tree="." remote get-url origin >nul 2>nul
if errorlevel 1 (
  "%GIT%" --git-dir="%GIT_DIR%" --work-tree="." remote add origin "%REPO_URL%"
) else (
  "%GIT%" --git-dir="%GIT_DIR%" --work-tree="." remote set-url origin "%REPO_URL%"
)

if exist "%TEMP_TOKEN_FILE%" del /f /q "%TEMP_TOKEN_FILE%" >nul 2>nul
if exist "%TEMP_AUTH_FILE%" del /f /q "%TEMP_AUTH_FILE%" >nul 2>nul

"%GH%" auth token > "%TEMP_TOKEN_FILE%"
for /f "usebackq delims=" %%t in ("%TEMP_TOKEN_FILE%") do set "GH_TOKEN=%%t"

if not defined GH_TOKEN (
  echo.
  echo Nao consegui ler o token do GitHub CLI.
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$pair='x-access-token:' + $env:GH_TOKEN; $bytes=[System.Text.Encoding]::ASCII.GetBytes($pair); [Convert]::ToBase64String($bytes)" > "%TEMP_AUTH_FILE%"
for /f "usebackq delims=" %%a in ("%TEMP_AUTH_FILE%") do set "GH_AUTH=%%a"

if not defined GH_AUTH (
  echo.
  echo Nao consegui preparar a autenticacao para o push.
  exit /b 1
)

"%GIT%" --git-dir="%GIT_DIR%" --work-tree="." -c "http.https://github.com/.extraheader=AUTHORIZATION: Basic %GH_AUTH%" push -u origin main

if exist "%TEMP_TOKEN_FILE%" del /f /q "%TEMP_TOKEN_FILE%" >nul 2>nul
if exist "%TEMP_AUTH_FILE%" del /f /q "%TEMP_AUTH_FILE%" >nul 2>nul

echo.
echo Publicado em: https://github.com/%GITHUB_USER%/%REPO_NAME%
