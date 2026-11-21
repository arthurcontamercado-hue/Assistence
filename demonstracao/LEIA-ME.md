# Demonstração do Assistence

Demonstração interativa e **independente** do aplicativo real.

- **Não usa** o motor de análise, o backend, a autenticação nem as integrações do aplicativo real (repositório `assistence-mvp`).
- Usa só a base fictícia de `dados.js`: um estúdio de interiores com equipe de 3 pessoas e conversas de **Gmail, Outlook e WhatsApp**, todas marcadas como **conexões demonstrativas**.
- Categoria, prioridade, prazos, valores, tarefas e respostas sugeridas já vêm definidos nos dados. Cada ação da pessoa produz um resultado programado. Nada é aleatório.
- As datas são relativas ao dia em que a demonstração é aberta (`d: 0` é hoje, `d: 1` amanhã etc.), para a demonstração parecer sempre atual.
- O estado fica só na aba do navegador (`sessionStorage`, chave `assistence-demo:v1`). Nada é enviado nem misturado com dados reais.

## Arquivos
- `index.html`: página da demonstração.
- `estilo.css`: aparência (computador a partir de 1024 px; celular abaixo disso).
- `dados.js`: base de dados fictícios. Para mudar conversas, tarefas ou o roteiro de "Simular nova mensagem", edite aqui.
- `app.js`: telas e interações.

## Telas
Painel, Caixa unificada (lista, conversa e informações identificadas), Prioridades, Tarefas (quadro por prazo), Contas a pagar, Contatos, Relatórios, Busca e Configurações (canais demonstrativos, regras e notificações).
No celular: abas no rodapé (Início, Caixa, Tarefas, Contas, Mais), conversa em tela própria e janelas que sobem de baixo.

## Publicação
O gerador do site (`fonte/make.py`) copia esta pasta para `site/demonstracao/`.
