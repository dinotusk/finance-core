# Finance Core

MVP de assistente financeiro pessoal inspirado na ideia da conversa compartilhada: um núcleo central para registrar gastos e receitas, com WhatsApp como canal opcional de entrada.

## Como abrir

Abra o arquivo `index.html` no navegador.

O app já funciona sem instalação:

- registra gastos por mensagem simples, como `Gastei 45 no almoço`;
- permite anexar o nome/texto de um comprovante;
- salva lançamentos no navegador;
- mostra dashboard mensal, categorias, últimos 7 dias e metas;
- responde perguntas simples no assistente;
- exporta CSV para usar no Google Sheets.

## Como usar no iPhone

O projeto já está preparado como PWA. Para virar app no iOS, publique a pasta em um link HTTPS, abra pelo Safari e use `Compartilhar > Adicionar à Tela de Início`.

Detalhes em `docs/ios-app.md`.

## Ideia central

O WhatsApp não deve ser o coração do projeto. Ele deve ser apenas uma entrada.

Arquitetura sugerida:

```text
Painel web / WhatsApp / E-mail / Upload
        ↓
API central
        ↓
Banco principal
        ↓
Motor de IA financeira
        ↓
Dashboard / Google Sheets / Respostas
```

## Próximos passos

1. Conectar um banco real, de preferência Supabase/PostgreSQL.
2. Criar endpoint para receber mensagens do WhatsApp via EVO API ou provedor similar.
3. Usar IA/OCR para ler comprovantes de verdade.
4. Sincronizar Google Sheets como backup/exportação.
5. Evoluir o assistente para responder com base no banco.

## Arquivos de apoio

- `docs/arquitetura.md`: visão do produto e fases.
- `docs/n8n-whatsapp-evo-api.md`: fluxo sugerido no n8n.
- `docs/ios-app.md`: como instalar no iPhone.
- `docs/github-pages.md`: como publicar pelo GitHub Pages.
- `docs/git-local.md`: como usar o Git portátil instalado neste projeto.
- `docs/supabase-schema.sql`: estrutura inicial de banco.
