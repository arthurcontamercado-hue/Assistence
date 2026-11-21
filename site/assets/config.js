/* Ligações do site com o aplicativo. É o ÚNICO arquivo que precisa mudar quando o endereço do app mudar.
   app:  endereço do aplicativo do Assistence (o Worker da Cloudflare), terminando em "/".
         Exemplo: "https://assistence-mvp.SUA-CONTA.workers.dev/"  ou, com domínio próprio, "https://app.assistence.com.br/".
         Enquanto estiver vazio, os botões "Entrar" levam à página Entrar, que oferece a demonstração.
   demo: a demonstração, uma página própria (pasta demonstracao/, com dados fictícios). Ela não usa o motor
         nem as integrações do aplicativo real. */
window.ASSISTENCE={
  app:"",
  demo:"demonstracao/"
};
