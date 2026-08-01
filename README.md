# 🦖 QRex

**Cole um link, ganhe um QR bonitão.**

QRex é um gerador de QR Code simples, rápido e 100% gratuito. Sem cadastro, sem letrinha miúda: cole a URL, aperte o botão e baixe o PNG pronto para imprimir ou compartilhar.

**Demo ao vivo:** https://mickeiascharles.github.io/QRex/

## Como funciona

1. **Cole o link** — qualquer URL: cardápio, portfólio, playlist da festa...
2. **Aperte o botão** — o QR code é gerado na hora, direto no navegador.
3. **Baixe e cole por aí** — PNG pronto para imprimir, postar ou compartilhar.

## Tecnologias

- [Angular 20](https://angular.dev) — standalone components, zoneless change detection e signals
- [qrcode](https://www.npmjs.com/package/qrcode) — geração do QR Code 100% no navegador (client-side, sem backend)
- GitHub Actions + GitHub Pages para build e deploy contínuo

## Estrutura do projeto

```
QRex/
├── frontend/           # Aplicação Angular (site do QRex)
│   ├── src/
│   │   ├── app/        # Componente principal (lógica + template + estilos)
│   │   └── index.html
│   └── public/         # Favicon e assets estáticos
├── gerar_qrcode.py     # Script Python original (CLI) que deu origem ao projeto
└── .github/workflows/  # Pipeline de deploy para o GitHub Pages
```

## Rodando localmente

Pré-requisitos: Node.js 22+.

```bash
cd frontend
npm install
npm start
```

A aplicação sobe em `http://localhost:4200`.

### Build de produção

```bash
cd frontend
npm run build
```

Os arquivos gerados ficam em `frontend/dist/qrex-frontend/browser`.

## Deploy

O deploy é automático: todo push na branch `main` dispara a Action em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que builda o app Angular e publica no GitHub Pages.

## Versão original em Python

O projeto nasceu de um script simples em Python ([`gerar_qrcode.py`](gerar_qrcode.py)) que gera um QR Code via linha de comando usando a biblioteca [`qrcode`](https://pypi.org/project/qrcode/):

```bash
pip install qrcode[pil]
python gerar_qrcode.py
```

---

*QRex © 2026 · Nenhum dinossauro foi ferido na geração destes códigos.*
