# Como usar no iPhone

## Opção recomendada agora: PWA

O projeto já está preparado para funcionar como app instalável no iOS.

Para instalar no iPhone:

1. Publique a pasta do projeto em um endereço HTTPS.
2. Abra o link pelo Safari no iPhone.
3. Toque no botão de compartilhar.
4. Escolha `Adicionar à Tela de Início`.
5. Abra pelo ícone `Finance Core`.

No iOS, isso abre em tela cheia e se comporta como app.

## Onde publicar

Opções simples:

- Vercel;
- Netlify;
- GitHub Pages;
- hospedagem própria.

Como o projeto é estático, basta publicar estes arquivos:

- `index.html`;
- `styles.css`;
- `app.js`;
- `manifest.webmanifest`;
- `sw.js`;
- pasta `assets`.

## Limite dessa opção

Essa versão ainda salva os dados no próprio navegador do aparelho. Para usar em vários dispositivos ou integrar WhatsApp de verdade, o próximo passo é ligar Supabase/PostgreSQL.

## Opção App Store

Para publicar na App Store, o caminho recomendado é:

```text
Finance Core web
  ↓
Capacitor
  ↓
Projeto iOS
  ↓
Xcode
  ↓
App Store Connect
```

Isso exige Mac, Xcode e conta Apple Developer.
