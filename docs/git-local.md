# Git local neste projeto

O ambiente nao tinha Git instalado globalmente, entao foi instalada uma versao portatil dentro de:

```text
.tools/PortableGit
```

Tambem foi instalado o GitHub CLI portatil em:

```text
.tools/GitHubCLI
```

## Usar Git neste projeto

Como a pasta `.git` original esta bloqueada para escrita, os metadados do Git foram criados em `.git-real`.

Use os comandos assim:

```powershell
.\.tools\PortableGit\cmd\git.exe --git-dir=".git-real" --work-tree="." status
```

## Usar GitHub CLI

```powershell
.\.tools\GitHubCLI\bin\gh.exe auth login
```

Depois do login:

```powershell
.\.tools\GitHubCLI\bin\gh.exe repo create finance-core --public --description "Assistente financeiro pessoal PWA"
```

Depois rode o push com o Git portatil:

```powershell
$user = .\.tools\GitHubCLI\bin\gh.exe api user --jq .login
.\.tools\PortableGit\cmd\git.exe --git-dir=".git-real" --work-tree="." remote add origin "https://github.com/$user/finance-core.git"
.\.tools\PortableGit\cmd\git.exe --git-dir=".git-real" --work-tree="." push -u origin main
```
