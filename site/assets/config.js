/* Ligações do site com o aplicativo. É o ÚNICO arquivo que precisa mudar quando o endereço do app mudar.
   app:  endereço do aplicativo do Assistence (o Worker da Cloudflare), terminando em "/".
         Exemplo: "https://assistence-mvp.SUA-CONTA.workers.dev/"  ou, com domínio próprio, "https://app.assistence.com.br/".
         Enquanto estiver vazio, os botões "Entrar" levam à página Entrar, que oferece a demonstração.
   demo: página do site que mostra a demonstração (modo computador ou celular).
   demoSrc e tab: a demonstração em si (pasta demonstracao/, com dados fictícios próprios), aberta dentro da página
         e no botão "Abrir em nova aba". Ela não usa o motor nem as integrações do aplicativo real. */
window.ASSISTENCE={
  app:"",
  demo:"demonstracao.html",
  demoSrc:"demonstracao/",
  tab:"demonstracao/"
};
