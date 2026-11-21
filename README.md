# Assistence

Site do Assistence: organização inteligente de mensagens.

## Deploy automático (Netlify)
A Netlify está ligada a este repositório. **Toda mudança enviada para a branch `main` publica o site sozinha**, em cerca de 1 minuto.
A configuração fica em `netlify.toml`: a pasta publicada é `site/`.

## Pastas
- `site/`: o site publicado.
  - Páginas: `index.html`, `recursos.html`, `como-funciona.html`, `seguranca.html`, `plataformas.html`, `sobre.html`, `suporte.html`, `acessar.html`, `privacidade.html`, `termos.html`, `demonstracao.html`, `404.html`.
  - `demonstracao/`: cópia publicada da demonstração (gerada a partir da pasta `demonstracao/` da raiz).
  - `img/`: telas reais do app no computador e no celular.
  - `assets/config.js`: endereço do app real (campo `app`). É o único arquivo a mudar quando o app tiver endereço.
  - `_headers`: cabeçalhos de segurança e de cache lidos pela Netlify.
- `demonstracao/`: a demonstração interativa, **independente do aplicativo real**: dados fictícios próprios (`dados.js`), telas e interações (`app.js`). Não usa o motor, o backend nem as integrações do app (repositório `assistence-mvp`). Veja `demonstracao/LEIA-ME.md`.
- `fonte/`: a página única usada na prévia do Claude (`assistence-site.html`), as imagens do site (`img/`) e o script que gera o site (`make.py`). Não é publicada.

## Gerar o site de novo a partir da fonte
```
python3 fonte/make.py fonte/assistence-site.html site "https://ENDERECO-DO-SITE" / fonte/img demonstracao
```
Com o endereço final, o script também gera `sitemap.xml` e os links canônicos para o Google.
