@echo off
setlocal
cd /d "%~dp0"
".tools\GitHubCLI\bin\gh.exe" auth login --hostname github.com --git-protocol https --web
