# Arquitetura do Assistente Financeiro

## Produto

Um assistente financeiro pessoal que entende mensagens, comprovantes e perguntas. O objetivo é reduzir o trabalho de controlar dinheiro: a pessoa registra pelo painel, WhatsApp ou outro canal, e o sistema organiza tudo em um banco central.

## MVP

Primeira versão:

- painel web para registrar despesas e receitas;
- captura por texto;
- upload de comprovante com confirmação manual;
- categorias automáticas simples;
- metas mensais;
- resumo por mês e categoria;
- exportação CSV.

## Núcleo

```text
Entrada
  ↓
Normalização
  ↓
Transação financeira
  ↓
Banco principal
  ↓
Indicadores
  ↓
Resposta ou dashboard
```

## Canais

O sistema pode receber dados por:

- painel web;
- WhatsApp;
- Telegram;
- e-mail;
- upload manual;
- áudio;
- integração bancária futura.

Todos os canais devem gravar no mesmo banco.

## Banco recomendado

Supabase/PostgreSQL como fonte principal.

Google Sheets deve entrar como:

- backup;
- exportação;
- visualização simples;
- integração rápida no começo.

## Fases

1. Diário de gastos: registrar tudo sem abrir planilha.
2. IA de categorização: aprender hábitos.
3. Consultas financeiras: responder perguntas.
4. Receitas: registrar entradas e saldo.
5. Dashboard: gráficos e tendências.
6. Metas: avisos de orçamento.
7. IA financeira: análise e recomendações.
8. Memória: contexto de vida, Uber, casa, empresa.
9. Planejamento: projeções e metas de lucro.
10. Multi-centros: casa, Uber, empresa, investimentos.

## Diferencial

A maioria dos concorrentes termina no registro. Este produto deve continuar:

```text
Recebe comprovante
  ↓
Entende
  ↓
Salva
  ↓
Calcula indicadores
  ↓
Aprende hábitos
  ↓
Avisa riscos
  ↓
Recomenda ações
```
