@echo off
setlocal
cd /d "%~dp0"

set "GIT=.tools\PortableGit\cmd\git.exe"
set "GH=.tools\GitHubCLI\bin\gh.exe"
set "GIT_DIR=.git-real"
set "REPO_NAME=finance-core"

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

"%GIT%" --git-dir="%GIT_DIR%" --work-tree="." push -u origin main
echo.
echo Publicado em: https://github.com/%GITHUB_USER%/%REPO_NAME%
