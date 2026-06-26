# Fluxo n8n para WhatsApp

## Objetivo

Receber mensagem, imagem, áudio ou PDF pelo WhatsApp e enviar para a API central do Finance Core.

## Fluxo

```text
Webhook EVO API
  ↓
Identificar tipo de mensagem
  ↓
Baixar mídia, se houver
  ↓
Transcrever áudio ou ler comprovante
  ↓
Extrair JSON financeiro
  ↓
Enviar para API central
  ↓
Responder confirmação no WhatsApp
```

## Payload recebido

```json
{
  "channel": "whatsapp",
  "phone": "5561999999999",
  "sender_name": "Junio",
  "message": "Gastei 120,50 no Posto Shell via Pix",
  "attachment_url": "https://exemplo.com/comprovante.jpg",
  "received_at": "2026-06-25T22:00:00.000Z"
}
```

## JSON esperado da IA

```json
{
  "type": "expense",
  "date": "2026-06-25",
  "amount": 120.5,
  "category": "Combustível",
  "merchant": "Posto Shell",
  "description": "Abastecimento",
  "payment_method": "Pix",
  "context": "Uber",
  "confidence": 0.91
}
```

## Resposta no WhatsApp

```text
Gasto registrado.
R$ 120,50 em Combustível.
Total de combustível no mês: R$ 485,00.
```

## Observação importante

O n8n deve chamar a API central. Ele não deve virar o banco do projeto. Assim o painel web, o WhatsApp e futuras integrações continuam usando a mesma fonte de dados.
