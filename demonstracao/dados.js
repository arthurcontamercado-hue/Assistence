/* =====================================================================
   ASSISTENCE · DEMONSTRAÇÃO · BASE DE DADOS FICTÍCIOS
   ---------------------------------------------------------------------
   Tudo aqui é inventado para a demonstração. Nada vem de contas reais,
   nada é enviado a lugar nenhum e nada passa pelo motor do aplicativo.
   Os resultados (categoria, prioridade, prazos, valores, tarefas) já vêm
   definidos aqui, para a demonstração ser sempre estável e coerente.

   Datas relativas ao dia em que a demonstração é aberta:
     prazo:{d:0,h:"15:00"}  -> hoje às 15h    d:1 -> amanhã    d:-1 -> ontem
     t:{min:-35}            -> recebida há 35 minutos
   Nos textos, {dia:+2} vira o dia da semana e {data:+2} vira a data (dd/mm).
   ===================================================================== */
window.DEMO_DADOS = {
  versao: 2,
  empresa: "Estúdio Camila Rocha · Arquitetura de Interiores",

  equipe: [
    { id: "camila", nome: "Camila Rocha", papel: "Sócia · você", cor: "#4f46e5" },
    { id: "rafael", nome: "Rafael Lima", papel: "Projetos", cor: "#0e9f6e" },
    { id: "julia",  nome: "Júlia Martins", papel: "Financeiro e atendimento", cor: "#d97706" }
  ],

  canais: [
    { id: "gmail",    nome: "Gmail",            conta: "Caixa pessoal do estúdio", cor: "#d93025" },
    { id: "outlook",  nome: "Outlook",          conta: "E-mail corporativo",       cor: "#0f6cbd" },
    { id: "whatsapp", nome: "WhatsApp Business", conta: "Número comercial",        cor: "#1fa855" },
    { id: "instagram", nome: "Instagram Direct", conta: "Perfil do estúdio",         cor: "#c13584" },
    { id: "telegram", nome: "Telegram",          conta: "Grupo da obra",             cor: "#229ed9" },
    { id: "slack",    nome: "Slack",             conta: "Espaço da equipe",          cor: "#4a154b" },
    { id: "teams",    nome: "Microsoft Teams",   conta: "Cliente corporativo",       cor: "#5059c9" },
    { id: "sms",      nome: "SMS",               conta: "Celular do estúdio",        cor: "#64748b" }
  ],

  categorias: ["Clientes", "Fornecedores", "Financeiro", "Reuniões", "Equipe", "Marketing", "Notificações"],

  contatos: [
    { id: "sergio",   nome: "Sérgio Alves",          org: "Cliente · Apto Vila Mariana",  tipo: "Cliente",     email: "sergio.alves@example.com" },
    { id: "marina",   nome: "Marina Costa",          org: "Cliente · Casa Alphaville",    tipo: "Cliente",     email: "marina.costa@example.com" },
    { id: "juliana",  nome: "Juliana Prado",         org: "Nova cliente",                 tipo: "Cliente",     email: "juliana.prado@example.com" },
    { id: "ricardo",  nome: "Ricardo Nunes",         org: "Cliente · Escritório Paulista", tipo: "Cliente",    email: "ricardo.nunes@example.com" },
    { id: "fiorini",  nome: "Elétrica Fiorini",      org: "Fornecedor · Paulo",           tipo: "Fornecedor",  email: "financeiro@example.com" },
    { id: "pedra",    nome: "Marmoraria Pedra Nobre", org: "Fornecedor",                  tipo: "Fornecedor",  email: "vendas@example.com" },
    { id: "cortinas", nome: "Cortinas Leve",         org: "Fornecedor",                   tipo: "Fornecedor",  email: "" },
    { id: "aurora",   nome: "Móveis Aurora",         org: "Fornecedor",                   tipo: "Fornecedor",  email: "pedidos@example.com" },
    { id: "exata",    nome: "Contábil Exata",        org: "Contabilidade · Renata",       tipo: "Serviço",     email: "renata@example.com" },
    { id: "banco",    nome: "Banco Fictício",        org: "Banco",                        tipo: "Serviço",     email: "avisos@example.com" },
    { id: "condo",    nome: "Condomínio Ed. Aurora", org: "Administração predial",        tipo: "Serviço",     email: "sindico@example.com" },
    { id: "revista",  nome: "Revista Casa & Projeto", org: "Newsletter",                  tipo: "Serviço",     email: "news@example.com" },
    { id: "nfse",     nome: "Sistema de Notas",      org: "Nota fiscal eletrônica",       tipo: "Serviço",     email: "nfse@example.com" },
    { id: "casabela", nome: "Loja Casa Bela",        org: "Fornecedor · tintas",          tipo: "Fornecedor",  email: "pedidos@example.com" },
    { id: "equipe",   nome: "Equipe Estúdio",        org: "Grupo interno · Rafael",       tipo: "Equipe",      email: "" },
    { id: "livia",    nome: "Lívia Andrade",         org: "Nova cliente · Instagram",     tipo: "Cliente",     email: "" },
    { id: "trama",    nome: "Ateliê Trama",          org: "Marca de tecidos",             tipo: "Fornecedor",  email: "" },
    { id: "antonio",  nome: "Obra Vila Mariana",     org: "Grupo · Antônio, mestre de obras", tipo: "Fornecedor", email: "" },
    { id: "slproj",   nome: "#projetos",             org: "Canal da equipe · Slack",      tipo: "Equipe",      email: "" },
    { id: "slfin",    nome: "#financeiro",           org: "Canal da equipe · Slack",      tipo: "Equipe",      email: "" },
    { id: "patricia", nome: "Patrícia Gomes",        org: "Escritório Paulista",          tipo: "Cliente",     email: "" },
    { id: "energia",  nome: "Companhia de Energia",  org: "Conta de luz do estúdio",      tipo: "Serviço",     email: "" },
    { id: "transp",   nome: "Transportadora Rápida", org: "Entregas",                     tipo: "Serviço",     email: "" }
  ],

  conversas: [
    { id: "w1", canal: "whatsapp", contato: "sergio", assunto: "Planta elétrica para o eletricista",
      cat: "Clientes", pri: "alta", tipo: "Pedido", conf: 96, lida: false, aguardando: true, resp: "rafael",
      acao: "Enviar a planta elétrica atualizada", prazo: { d: 0, h: "15:00" }, valor: null,
      resumo: "O eletricista precisa da planta elétrica atualizada hoje à tarde para começar amanhã.",
      motivos: ["Cliente com obra em andamento", "Prazo para hoje", "Pedido explícito", "Bloqueia o trabalho de outro fornecedor"],
      anexos: [], tarefas: ["t1"],
      sugestoes: ["Oi, Sérgio! O Rafael está finalizando a planta e envia até as 15h.", "Sérgio, envio a planta ainda hoje à tarde. Te aviso assim que sair."],
      msgs: [
        { de: "sergio", t: { min: -95 }, txt: "Bom dia, Camila!" },
        { de: "sergio", t: { min: -94 }, txt: "O eletricista precisa da planta elétrica atualizada hoje à tarde, senão ele não consegue começar amanhã cedo." },
        { de: "sergio", t: { min: -93 }, txt: "Consegue me mandar até umas 15h?" }
      ] },

    { id: "w5", canal: "whatsapp", contato: "equipe", assunto: "Tomada da ilha da cozinha",
      cat: "Equipe", pri: "alta", tipo: "Pergunta", conf: 88, lida: false, aguardando: true, resp: "camila",
      acao: "Responder ao Rafael sobre a tomada da ilha", prazo: { d: 0, h: "14:00" }, valor: null,
      resumo: "O Rafael pergunta se inclui a mudança da tomada da ilha na mesma planta elétrica do Sérgio.",
      motivos: ["Ligada à tarefa de hoje do Sérgio", "Pergunta direta da equipe", "Sem resposta há 1 hora"],
      anexos: [], tarefas: ["t1"],
      sugestoes: ["Pode incluir na mesma planta, Rafa. Obrigada!", "Inclui sim, mas destaca a mudança em vermelho para o Sérgio ver."],
      msgs: [
        { de: "equipe", autor: "Rafael Lima", t: { min: -70 }, txt: "Camila, o Sérgio pediu também para mudar a tomada da ilha da cozinha." },
        { de: "equipe", autor: "Rafael Lima", t: { min: -69 }, txt: "Atualizo na mesma planta que vai para o eletricista?" }
      ] },

    { id: "o1", canal: "outlook", contato: "marina", assunto: "Proposta revisada — Casa Alphaville",
      cat: "Clientes", pri: "alta", tipo: "Proposta", conf: 92, lida: false, aguardando: true, resp: "camila",
      acao: "Enviar a proposta revisada com o novo layout da sala", prazo: { d: 1, h: "18:00" }, valor: null,
      resumo: "Marina aprovou a ideia do novo layout da sala e pede a proposta revisada até amanhã.",
      motivos: ["Cliente ativa", "Prazo: amanhã", "Pedido explícito", "Anexo de projeto"],
      anexos: [{ nome: "planta-baixa-sala-v3.pdf", tipo: "pdf", tam: "2,4 MB" }], tarefas: ["t3"],
      sugestoes: ["Marina, obrigada! Envio a proposta revisada amanhã até o fim do dia."],
      msgs: [
        { de: "marina", t: { min: -180 }, txt: "Olá, Camila, tudo bem?\n\nConversei com o Henrique e gostamos muito da ideia de integrar a sala de jantar com a varanda. Você consegue me mandar a proposta revisada com esse novo layout até amanhã? Queremos fechar ainda esta semana.\n\nSegue em anexo a planta com as medidas que você pediu.\n\nAbraços,\nMarina" }
      ] },

    { id: "o6", canal: "outlook", contato: "marina", assunto: "Re: Escolha dos revestimentos do banheiro",
      cat: "Clientes", pri: "alta", tipo: "Pedido", conf: 90, lida: true, aguardando: true, resp: "camila",
      acao: "Enviar as opções de revestimento do banheiro", prazo: { d: -1, h: "18:00" }, valor: null,
      resumo: "Marina cobra as opções de revestimento que deveriam ter sido enviadas ontem.",
      motivos: ["Prazo vencido ontem", "Cobrança da cliente", "Cliente ativa"],
      anexos: [], tarefas: ["t6"],
      sugestoes: ["Marina, me desculpe pelo atraso! Envio as três opções ainda hoje."],
      msgs: [
        { de: "voce", t: { d: -3, h: "11:20" }, txt: "Marina, até {dia:-1} te mando três opções de revestimento para o banheiro da suíte." },
        { de: "marina", t: { min: -300 }, txt: "Oi, Camila! Ainda aguardo as opções de revestimento do banheiro que você ficou de mandar ontem. A obra precisa fazer o pedido até o fim da semana. Obrigada!" }
      ] },

    { id: "g1", canal: "gmail", contato: "sergio", assunto: "Aprovação do orçamento da marcenaria",
      cat: "Clientes", pri: "alta", tipo: "Aprovação", conf: 95, lida: false, aguardando: true, resp: "julia",
      acao: "Emitir o boleto da entrada de 30% (R$ 5.520,00)", prazo: { d: 2, h: null }, valor: { v: 5520, sentido: "receber" },
      resumo: "Sérgio aprovou o orçamento da marcenaria (R$ 18.400,00) e pede o boleto da entrada de 30%.",
      motivos: ["Aprovação de orçamento", "Valor a receber", "Prazo: {dia:+2}", "Cliente com obra em andamento"],
      anexos: [{ nome: "orcamento-marcenaria-assinado.pdf", tipo: "pdf", tam: "640 KB" }], tarefas: ["t2"],
      sugestoes: ["Sérgio, obrigada pela aprovação! A Júlia envia o boleto da entrada hoje mesmo."],
      msgs: [
        { de: "sergio", t: { d: -1, h: "19:42" }, txt: "Camila,\n\nSegue aprovado o orçamento da marcenaria, no valor de R$ 18.400,00. Pode emitir o boleto da entrada de 30% (R$ 5.520,00) com vencimento na {dia:+2}?\n\nO orçamento assinado vai em anexo.\n\nSérgio" }
      ] },

    { id: "g3", canal: "gmail", contato: "pedra", assunto: "Sinal da bancada em quartzo branco",
      cat: "Financeiro", pri: "alta", tipo: "Cobrança", conf: 93, lida: false, aguardando: false, resp: "julia",
      acao: "Pagar o sinal da bancada (R$ 2.200,00)", prazo: { d: 1, h: null }, valor: { v: 2200, sentido: "pagar" },
      resumo: "A marmoraria só inicia o corte da bancada da cozinha do Sérgio depois do sinal, que vence amanhã.",
      motivos: ["Boleto com vencimento amanhã", "Fornecedor de obra em andamento", "Valor a pagar"],
      anexos: [{ nome: "boleto-sinal-bancada.pdf", tipo: "boleto", tam: "88 KB" }], tarefas: ["t7"],
      sugestoes: ["Recebido, obrigada! O pagamento sai até amanhã."],
      msgs: [
        { de: "pedra", t: { d: -1, h: "10:05" }, txt: "Prezada Camila,\n\nSegue o boleto do sinal da bancada em quartzo branco (cozinha — Apto Vila Mariana), no valor de R$ 2.200,00, com vencimento em {data:+1}.\n\nO corte é agendado assim que o pagamento for confirmado.\n\nAtenciosamente,\nMarmoraria Pedra Nobre" }
      ] },

    { id: "w2", canal: "whatsapp", contato: "fiorini", assunto: "Boleto do material elétrico",
      cat: "Financeiro", pri: "media", tipo: "Cobrança", conf: 91, lida: false, aguardando: false, resp: "julia",
      acao: "Pagar o material elétrico (R$ 2.180,00)", prazo: { d: 3, h: null }, valor: { v: 2180, sentido: "pagar" },
      resumo: "Boleto do material elétrico da obra Vila Mariana. A mesma conta também chegou por e-mail.",
      motivos: ["Boleto anexado", "Fornecedor recorrente", "Vence em 3 dias"],
      anexos: [{ nome: "boleto-material-eletrico.pdf", tipo: "boleto", tam: "92 KB" }], tarefas: ["t4"],
      sugestoes: ["Recebido, Paulo! Pagamos até o vencimento."],
      msgs: [
        { de: "fiorini", t: { min: -240 }, txt: "Boa tarde, Camila! Aqui é o Paulo, da Elétrica Fiorini." },
        { de: "fiorini", t: { min: -239 }, txt: "Segue o boleto do material elétrico da obra da Vila Mariana: R$ 2.180,00, vencimento {data:+3}." }
      ] },

    { id: "g2", canal: "gmail", contato: "fiorini", assunto: "Boleto — material elétrico obra Vila Mariana",
      cat: "Financeiro", pri: "media", tipo: "Cobrança", conf: 91, lida: true, aguardando: false, resp: "julia",
      acao: "Pagar o material elétrico (R$ 2.180,00)", prazo: { d: 3, h: null }, valor: { v: 2180, sentido: "pagar" },
      resumo: "Mesmo boleto enviado pelo WhatsApp. O Assistence juntou as duas mensagens em uma conta só.",
      motivos: ["Mesmo boleto já recebido pelo WhatsApp", "Fornecedor recorrente"],
      anexos: [{ nome: "boleto-material-eletrico.pdf", tipo: "boleto", tam: "92 KB" }], tarefas: ["t4"],
      sugestoes: [],
      msgs: [
        { de: "fiorini", t: { min: -230 }, txt: "Prezada cliente,\n\nSegue em anexo o boleto referente ao material elétrico da obra Vila Mariana. Valor: R$ 2.180,00. Vencimento: {data:+3}.\n\nElétrica Fiorini" }
      ] },

    { id: "o2", canal: "outlook", contato: "exata", assunto: "Guia do DAS disponível",
      cat: "Financeiro", pri: "media", tipo: "Cobrança", conf: 94, lida: false, aguardando: false, resp: "julia",
      acao: "Pagar a guia do DAS (R$ 1.284,90)", prazo: { d: 4, h: null }, valor: { v: 1284.90, sentido: "pagar" },
      resumo: "A contabilidade enviou a guia do DAS do mês, com vencimento em {data:+4}.",
      motivos: ["Imposto com vencimento", "Remetente: contabilidade", "Regra: guias vão para Financeiro"],
      anexos: [{ nome: "DAS-guia.pdf", tipo: "boleto", tam: "120 KB" }], tarefas: ["t5"],
      sugestoes: ["Obrigada, Renata! Pagamos até o vencimento."],
      msgs: [
        { de: "exata", t: { d: -1, h: "09:12" }, txt: "Olá, Camila!\n\nSegue a guia do DAS deste mês, no valor de R$ 1.284,90, com vencimento em {data:+4}.\n\nQualquer dúvida, estou à disposição.\n\nRenata · Contábil Exata" }
      ] },

    { id: "w3", canal: "whatsapp", contato: "juliana", assunto: "Orçamento para projeto da sala",
      cat: "Clientes", pri: "media", tipo: "Pergunta", conf: 84, lida: false, aguardando: true, resp: "camila",
      acao: "Responder com a faixa de valores e propor uma visita", prazo: { d: 0, h: null }, valor: null,
      resumo: "Possível nova cliente quer saber se o estúdio faz projeto só da sala e quanto custa.",
      motivos: ["Novo contato com intenção de compra", "Pergunta direta", "Sem resposta há 1 dia"],
      anexos: [], tarefas: ["t8"],
      sugestoes: ["Oi, Juliana! Fazemos, sim. Um projeto de sala fica entre R$ 3.500 e R$ 6.000, conforme o tamanho. Podemos marcar uma visita sem compromisso?", "Oi, Juliana, obrigada pelo contato! Posso te ligar hoje à tarde para entender melhor o espaço?"],
      msgs: [
        { de: "juliana", t: { d: -1, h: "21:14" }, txt: "Oi, Camila! Vi o trabalho de vocês no Instagram e amei 😍" },
        { de: "juliana", t: { d: -1, h: "21:15" }, txt: "Vocês fazem projeto só da sala? Quanto custa mais ou menos?" }
      ] },

    { id: "o3", canal: "outlook", contato: "ricardo", assunto: "Reunião de alinhamento — escritório",
      cat: "Reuniões", pri: "media", tipo: "Reunião", conf: 89, lida: true, aguardando: true, resp: "camila",
      acao: "Confirmar a reunião de {dia:+2} às 10h", prazo: { d: 2, h: "10:00" }, valor: null,
      resumo: "Ricardo propõe uma reunião na {dia:+2} às 10h para alinhar o layout do escritório.",
      motivos: ["Data e horário propostos", "Cliente ativo", "Aguarda confirmação"],
      anexos: [], tarefas: ["t9"],
      sugestoes: ["Ricardo, confirmado para {dia:+2} às 10h. Até lá!", "Ricardo, às 10h não consigo. Pode ser às 14h?"],
      msgs: [
        { de: "ricardo", t: { d: -1, h: "16:30" }, txt: "Camila, boa tarde.\n\nPodemos fazer uma reunião na {dia:+2}, às 10h, para alinhar o layout das estações de trabalho? Pode ser aqui no escritório.\n\nAbraço,\nRicardo" }
      ] },

    { id: "w4", canal: "whatsapp", contato: "cortinas", assunto: "Instalação das cortinas — Casa Alphaville",
      cat: "Fornecedores", pri: "media", tipo: "Compromisso", conf: 86, lida: true, aguardando: true, resp: null,
      acao: "Definir quem acompanha a instalação", prazo: { d: 5, h: "09:00" }, valor: null,
      resumo: "Instalação das cortinas confirmada para {dia:+5} às 9h. O fornecedor pergunta quem acompanha.",
      motivos: ["Compromisso com data marcada", "Pergunta sem dono na equipe"],
      anexos: [], tarefas: ["t10"],
      sugestoes: ["Perfeito! O Rafael acompanha a instalação."],
      msgs: [
        { de: "cortinas", t: { d: -1, h: "14:48" }, txt: "Bom dia! A instalação das cortinas da Casa Alphaville está confirmada para {dia:+5}, às 9h." },
        { de: "cortinas", t: { d: -1, h: "14:49" }, txt: "Alguém da equipe vai acompanhar?" }
      ] },

    { id: "o4", canal: "outlook", contato: "aurora", assunto: "Nova data de entrega do sofá",
      cat: "Fornecedores", pri: "media", tipo: "Informativo", conf: 82, lida: false, aguardando: false, resp: "camila",
      acao: "Avisar a Marina sobre o novo prazo do sofá", prazo: null, valor: null,
      resumo: "A entrega do sofá da Casa Alphaville foi remarcada para {data:+12}, por atraso na fábrica.",
      motivos: ["Afeta a entrega de uma cliente", "Mudança de data"],
      anexos: [], tarefas: ["t11"],
      sugestoes: ["Obrigada pelo aviso. Vou alinhar com a cliente."],
      msgs: [
        { de: "aurora", t: { d: -2, h: "11:02" }, txt: "Prezada Camila,\n\nInformamos que, por atraso na fábrica, a entrega do sofá do pedido da Casa Alphaville foi remarcada para {data:+12}.\n\nPedimos desculpas pelo transtorno.\n\nMóveis Aurora" }
      ] },

    { id: "g4", canal: "gmail", contato: "banco", assunto: "Fatura do cartão empresarial",
      cat: "Financeiro", pri: "media", tipo: "Cobrança", conf: 97, lida: true, aguardando: false, resp: "julia",
      acao: "Pagar a fatura do cartão (R$ 7.312,45)", prazo: { d: 6, h: null }, valor: { v: 7312.45, sentido: "pagar" },
      resumo: "Fatura do cartão empresarial fechada, com vencimento em {data:+6}.",
      motivos: ["Fatura com vencimento", "Remetente: banco"],
      anexos: [{ nome: "fatura-cartao.pdf", tipo: "boleto", tam: "210 KB" }], tarefas: ["t12"],
      sugestoes: [],
      msgs: [
        { de: "banco", t: { d: -2, h: "07:30" }, txt: "Sua fatura do cartão empresarial fechou.\n\nValor: R$ 7.312,45\nVencimento: {data:+6}\n\nEste é um e-mail automático." }
      ] },

    { id: "g7", canal: "gmail", contato: "condo", assunto: "Autorização de obra — documentos pendentes",
      cat: "Clientes", pri: "media", tipo: "Documento", conf: 80, lida: true, aguardando: false, resp: "rafael",
      acao: "Enviar a ART e o cronograma ao condomínio", prazo: { d: 9, h: null }, valor: null,
      resumo: "O condomínio do Sérgio pede a ART e o cronograma da obra para liberar a segunda etapa.",
      motivos: ["Documentos solicitados", "Prazo em {data:+9}"],
      anexos: [{ nome: "regulamento-de-obras.pdf", tipo: "pdf", tam: "1,1 MB" }], tarefas: ["t13"],
      sugestoes: ["Prezados, enviaremos a ART e o cronograma até {data:+9}."],
      msgs: [
        { de: "condo", t: { d: -3, h: "15:10" }, txt: "Prezada arquiteta,\n\nPara liberar a segunda etapa da obra do apartamento 82, precisamos da ART e do cronograma atualizado até {data:+9}.\n\nSegue o regulamento de obras do condomínio.\n\nAdministração" }
      ] },

    { id: "g6", canal: "gmail", contato: "casabela", assunto: "Seu pedido saiu para entrega",
      cat: "Notificações", pri: "baixa", tipo: "Informativo", conf: 98, lida: true, aguardando: false, resp: null,
      acao: "Nenhuma ação necessária", prazo: null, valor: null,
      resumo: "As tintas da obra Vila Mariana saíram para entrega, com previsão para amanhã.",
      motivos: ["Aviso automático", "Sem pedido de ação"],
      anexos: [], tarefas: [], sugestoes: [],
      msgs: [
        { de: "casabela", t: { min: -400 }, txt: "Seu pedido nº 48213 saiu para entrega. Previsão: {data:+1}." }
      ] },

    { id: "o5", canal: "outlook", contato: "nfse", assunto: "Nota fiscal emitida nº 1.284",
      cat: "Notificações", pri: "baixa", tipo: "Informativo", conf: 99, lida: true, aguardando: false, resp: null,
      acao: "Nenhuma ação necessária", prazo: null, valor: null,
      resumo: "Comprovante de emissão da nota fiscal do projeto do escritório.",
      motivos: ["Aviso automático", "Documento fiscal arquivado"],
      anexos: [{ nome: "nfse-1284.pdf", tipo: "pdf", tam: "56 KB" }], tarefas: [], sugestoes: [],
      msgs: [
        { de: "nfse", t: { d: -2, h: "18:01" }, txt: "Nota fiscal de serviço nº 1.284 emitida com sucesso. O PDF está em anexo." }
      ] },

    { id: "sl1", canal: "slack", contato: "slproj", assunto: "Planta elétrica v3 para revisão",
      cat: "Equipe", pri: "alta", tipo: "Pedido", conf: 90, lida: false, aguardando: true, resp: "camila",
      acao: "Revisar a planta elétrica v3 antes do envio", prazo: { d: 0, h: "14:30" }, valor: null,
      resumo: "O Rafael subiu a versão 3 da planta elétrica do Sérgio e pede revisão antes de enviar.",
      motivos: ["Ligada à tarefa de hoje do Sérgio", "Pedido da equipe", "Prazo para hoje"],
      anexos: [{ nome: "planta-eletrica-v3.pdf", tipo: "pdf", tam: "1,8 MB" }], tarefas: ["t1"],
      sugestoes: ["Vou olhar agora, Rafa.", "Revisado! Pode mandar para o Sérgio."],
      msgs: [
        { de: "slproj", autor: "Rafael Lima", t: { min: -40 }, txt: "Subi a versão 3 da planta elétrica do apê da Vila Mariana na pasta do projeto, já com a tomada da ilha." },
        { de: "slproj", autor: "Rafael Lima", t: { min: -39 }, txt: "@Camila consegue revisar antes de eu mandar pro Sérgio?" }
      ] },

    { id: "tg1", canal: "telegram", contato: "antonio", assunto: "Porcelanato entregue errado",
      cat: "Fornecedores", pri: "alta", tipo: "Pedido", conf: 91, lida: false, aguardando: true, resp: "rafael",
      acao: "Resolver a troca do porcelanato com a loja", prazo: { d: 0, h: "17:00" }, valor: null,
      resumo: "Chegou porcelanato 60×60 em vez de 90×90 na obra da Vila Mariana. O assentamento começa amanhã.",
      motivos: ["Erro de entrega em obra em andamento", "Prazo para hoje", "Bloqueia o trabalho da obra"],
      anexos: [{ nome: "foto-caixas.jpg", tipo: "img", tam: "1,2 MB" }], tarefas: ["t17"],
      sugestoes: ["Antônio, obrigado pelo aviso! O Rafael já está falando com a loja para trocar hoje."],
      msgs: [
        { de: "antonio", autor: "Antônio · mestre de obras", t: { min: -55 }, txt: "Pessoal, chegou o porcelanato 60x60, mas o projeto pede 90x90." },
        { de: "antonio", autor: "Antônio · mestre de obras", t: { min: -54 }, txt: "Mandei foto das caixas. Amanhã cedo a gente começa a assentar, consegue resolver a troca hoje?" }
      ] },

    { id: "tm1", canal: "teams", contato: "patricia", assunto: "Aprovação do mobiliário — Escritório Paulista",
      cat: "Clientes", pri: "media", tipo: "Documento", conf: 88, lida: false, aguardando: true, resp: "camila",
      acao: "Assinar e devolver a ficha de mobiliário", prazo: { d: 1, h: "12:00" }, valor: null,
      resumo: "Patrícia, do Escritório Paulista, precisa da ficha de mobiliário assinada até amanhã ao meio-dia.",
      motivos: ["Documento para assinatura", "Prazo: amanhã", "Cliente ativo"],
      anexos: [{ nome: "ficha-mobiliario.xlsx", tipo: "doc", tam: "84 KB" }], tarefas: ["t19"],
      sugestoes: ["Patrícia, envio assinada até amanhã cedo."],
      msgs: [
        { de: "patricia", autor: "Patrícia Gomes", t: { min: -150 }, txt: "Oi, Camila! O Ricardo aprovou quase tudo. Só falta a ficha de mobiliário assinada por você." },
        { de: "patricia", autor: "Patrícia Gomes", t: { min: -149 }, txt: "Consegue me devolver até amanhã ao meio-dia? Deixei a planilha aqui." }
      ] },

    { id: "ig1", canal: "instagram", contato: "livia", assunto: "Consultoria para quarto de bebê",
      cat: "Clientes", pri: "media", tipo: "Pergunta", conf: 83, lida: false, aguardando: true, resp: "camila",
      acao: "Enviar os valores da consultoria online", prazo: { d: 1, h: null }, valor: null,
      resumo: "Nova seguidora quer uma consultoria online para o quarto do bebê, que nasce em três meses.",
      motivos: ["Novo contato com intenção de compra", "Pergunta direta", "Sem resposta há 3 horas"],
      anexos: [], tarefas: ["t16"],
      sugestoes: ["Oi, Lívia! Que alegria! A consultoria online sai a partir de R$ 890. Posso te mandar os detalhes?"],
      msgs: [
        { de: "livia", t: { min: -190 }, txt: "Oi! Amo os projetos de vocês 💛" },
        { de: "livia", t: { min: -189 }, txt: "Vocês fazem consultoria online? Queria ajuda com o quarto do bebê, ele nasce em 3 meses." }
      ] },

    { id: "sl2", canal: "slack", contato: "slfin", assunto: "Notas fiscais pendentes do mês",
      cat: "Financeiro", pri: "media", tipo: "Pedido", conf: 86, lida: true, aguardando: false, resp: "julia",
      acao: "Pedir as notas fiscais da Marmoraria e da Fiorini", prazo: { d: 3, h: null }, valor: null,
      resumo: "A Júlia avisa que faltam duas notas de fornecedores para fechar o mês com a contabilidade.",
      motivos: ["Fechamento do mês", "Pedido da equipe"],
      anexos: [], tarefas: ["t18"],
      sugestoes: ["Pode pedir, Ju. Obrigada!"],
      msgs: [
        { de: "slfin", autor: "Júlia Martins", t: { d: -1, h: "17:20" }, txt: "Fechamento do mês: faltam as notas da Marmoraria Pedra Nobre e da Elétrica Fiorini." },
        { de: "slfin", autor: "Júlia Martins", t: { d: -1, h: "17:21" }, txt: "Peço para eles até {dia:+3}?" }
      ] },

    { id: "sms1", canal: "sms", contato: "energia", assunto: "Conta de luz do estúdio",
      cat: "Financeiro", pri: "media", tipo: "Cobrança", conf: 95, lida: true, aguardando: false, resp: "julia",
      acao: "Pagar a conta de energia (R$ 386,20)", prazo: { d: 5, h: null }, valor: { v: 386.20, sentido: "pagar" },
      resumo: "Conta de energia do estúdio com vencimento em {data:+5}.",
      motivos: ["Conta com vencimento", "Remetente: concessionária"],
      anexos: [], tarefas: ["t20"], sugestoes: [],
      msgs: [
        { de: "energia", t: { d: -1, h: "08:10" }, txt: "Sua fatura de energia de R$ 386,20 vence em {data:+5}. Pague pelo app ou com o código de barras da conta." }
      ] },

    { id: "ig2", canal: "instagram", contato: "trama", assunto: "Proposta de parceria",
      cat: "Marketing", pri: "baixa", tipo: "Proposta", conf: 81, lida: true, aguardando: false, resp: null,
      acao: "Avaliar a parceria quando houver tempo", prazo: null, valor: null,
      resumo: "Marca de tecidos propõe uma parceria de conteúdo com envio de amostras.",
      motivos: ["Proposta comercial sem prazo", "Contato de marketing"],
      anexos: [], tarefas: [], sugestoes: ["Obrigada pelo convite! Vamos avaliar e retornamos em breve."],
      msgs: [
        { de: "trama", t: { d: -2, h: "13:30" }, txt: "Olá! Somos o Ateliê Trama e adoraríamos enviar nossas amostras de linho para o estúdio. Toparia uma parceria de conteúdo?" }
      ] },

    { id: "sms2", canal: "sms", contato: "transp", assunto: "Entrega agendada",
      cat: "Notificações", pri: "baixa", tipo: "Informativo", conf: 97, lida: true, aguardando: false, resp: null,
      acao: "Nenhuma ação necessária", prazo: null, valor: null,
      resumo: "Aviso automático: as tintas chegam amanhã entre 8h e 12h.",
      motivos: ["Aviso automático", "Sem pedido de ação"],
      anexos: [], tarefas: [], sugestoes: [],
      msgs: [
        { de: "transp", t: { min: -380 }, txt: "Transportadora Rápida: seu pedido 48213 será entregue em {data:+1}, entre 8h e 12h." }
      ] },

    { id: "g5", canal: "gmail", contato: "revista", assunto: "Tendências de cores para o próximo verão",
      cat: "Marketing", pri: "baixa", tipo: "Newsletter", conf: 99, lida: false, aguardando: false, resp: null,
      acao: "Ler quando tiver tempo", prazo: null, valor: null,
      resumo: "Newsletter semanal com tendências de cores e materiais.",
      motivos: ["Newsletter", "Regra: newsletters com prioridade baixa"],
      anexos: [], tarefas: [], sugestoes: [],
      msgs: [
        { de: "revista", t: { d: -1, h: "06:00" }, txt: "Terracota suave, verde-sálvia e madeira clara: as apostas dos arquitetos para o próximo verão. Leia a edição completa." }
      ] }
  ],

  tarefas: [
    { id: "t1",  titulo: "Enviar a planta elétrica atualizada ao Sérgio", origens: ["w1", "w5", "sl1"], prazo: { d: 0, h: "15:00" }, resp: "rafael", pri: "alta", valor: null },
    { id: "t8",  titulo: "Responder a Juliana e propor uma visita",       origens: ["w3"], prazo: { d: 0, h: null },    resp: "camila", pri: "media", valor: null },
    { id: "t6",  titulo: "Enviar opções de revestimento à Marina",        origens: ["o6"], prazo: { d: -1, h: "18:00" }, resp: "camila", pri: "alta", valor: null },
    { id: "t3",  titulo: "Enviar a proposta revisada da Casa Alphaville", origens: ["o1"], prazo: { d: 1, h: "18:00" },  resp: "camila", pri: "alta", valor: null },
    { id: "t7",  titulo: "Pagar o sinal da bancada",                      origens: ["g3"], prazo: { d: 1, h: null },     resp: "julia",  pri: "alta", valor: { v: 2200, sentido: "pagar" } },
    { id: "t2",  titulo: "Emitir o boleto da entrada da marcenaria",      origens: ["g1"], prazo: { d: 2, h: null },     resp: "julia",  pri: "alta", valor: { v: 5520, sentido: "receber" } },
    { id: "t9",  titulo: "Confirmar a reunião com o Ricardo",             origens: ["o3"], prazo: { d: 2, h: "10:00" },  resp: "camila", pri: "media", valor: null },
    { id: "t4",  titulo: "Pagar o material elétrico",                     origens: ["w2", "g2"], prazo: { d: 3, h: null }, resp: "julia", pri: "media", valor: { v: 2180, sentido: "pagar" } },
    { id: "t5",  titulo: "Pagar a guia do DAS",                           origens: ["o2"], prazo: { d: 4, h: null },     resp: "julia",  pri: "media", valor: { v: 1284.90, sentido: "pagar" } },
    { id: "t10", titulo: "Definir quem acompanha a instalação das cortinas", origens: ["w4"], prazo: { d: 5, h: "09:00" }, resp: null, pri: "media", valor: null },
    { id: "t12", titulo: "Pagar a fatura do cartão empresarial",          origens: ["g4"], prazo: { d: 6, h: null },     resp: "julia",  pri: "media", valor: { v: 7312.45, sentido: "pagar" } },
    { id: "t13", titulo: "Enviar a ART e o cronograma ao condomínio",     origens: ["g7"], prazo: { d: 9, h: null },     resp: "rafael", pri: "media", valor: null },
    { id: "t11", titulo: "Avisar a Marina sobre o novo prazo do sofá",    origens: ["o4"], prazo: null,                  resp: "camila", pri: "media", valor: null },
    { id: "t17", titulo: "Resolver a troca do porcelanato com a loja",   origens: ["tg1"], prazo: { d: 0, h: "17:00" }, resp: "rafael", pri: "alta", valor: null },
    { id: "t16", titulo: "Enviar os valores da consultoria à Lívia",      origens: ["ig1"], prazo: { d: 1, h: null },    resp: "camila", pri: "media", valor: null },
    { id: "t19", titulo: "Assinar a ficha de mobiliário da Patrícia",     origens: ["tm1"], prazo: { d: 1, h: "12:00" }, resp: "camila", pri: "media", valor: null },
    { id: "t18", titulo: "Pedir as notas fiscais da Marmoraria e da Fiorini", origens: ["sl2"], prazo: { d: 3, h: null }, resp: "julia", pri: "media", valor: null },
    { id: "t20", titulo: "Pagar a conta de energia do estúdio",           origens: ["sms1"], prazo: { d: 5, h: null },   resp: "julia",  pri: "media", valor: { v: 386.20, sentido: "pagar" } },
    { id: "t14", titulo: "Enviar as medidas da cozinha à marmoraria",     origens: [],     prazo: { d: -2, h: null },    resp: "rafael", pri: "media", valor: null, feita: true }
  ],

  regras: [
    { id: "r1", nome: "Boletos, guias e faturas vão para Financeiro", ativa: true },
    { id: "r2", nome: "Clientes com obra em andamento recebem prioridade alta", ativa: true },
    { id: "r3", nome: "Mensagens do grupo Equipe Estúdio vão para Equipe", ativa: true },
    { id: "r4", nome: "Newsletters recebem prioridade baixa", ativa: true },
    { id: "r5", nome: "Avisos automáticos não geram tarefa", ativa: true }
  ],

  /* Números da semana anterior usados nos relatórios (fictícios) */
  relatorio: {
    volume: { gmail: 46, outlook: 31, whatsapp: 88, instagram: 24, telegram: 19, slack: 52, teams: 12, sms: 9 },
    resposta: { gmail: "3h10", outlook: "2h40", whatsapp: "38 min", instagram: "5h20", telegram: "25 min", slack: "18 min", teams: "1h05", sms: "—" },
    tempoPoupado: "4h20"
  }
};
