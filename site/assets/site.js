(function(){
"use strict";
/* Endereços do app e da demonstração. Na versão publicada, ficam em assets/config.js. */
const CFG=window.ASSISTENCE||{app:"",demo:"#demonstracao",demoFile:"demonstracao/index.html",self:"https://claude.ai/artifact/Prx5LJGN2ijENAfjwY1ykH"};
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const tick='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m5 12 5 5 9-10"/></svg>';
const I=(d,s=13)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICO={home:'<path d="M3 11 12 3l9 8v10H3z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',task:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>',cal:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',tag:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5 7-5s7 1.5 7 5"/><circle cx="17" cy="7" r="2.5"/><path d="M17 13c3 0 5 1.3 5 4"/>',reply:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v5"/>',bell:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>',monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',link:'<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',money:'<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6v2M12 16v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',dots:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',doc:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5V14M12 17.5h.01"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'};

/* ---------- navegação ---------- */
const PAGES=[["inicio","Início"],["produto","Recursos"],["como-funciona","Como funciona"],["seguranca","Segurança"],["plataformas","Plataformas"],["sobre","Sobre"],["suporte","Suporte"]];
const TABS=[["inicio","Início","home"],["produto","Recursos","grid"],["como-funciona","Como funciona","bolt"],["seguranca","Segurança","shield"]];
const MORE=[["plataformas","Plataformas","monitor"],["sobre","Sobre o Assistence","info"],["suporte","Suporte","help"],["privacidade","Política de Privacidade","doc"],["termos","Termos de Uso","doc"]];
const FN={inicio:"index",produto:"recursos"};const href=k=>(FN[k]||k)+".html";
$("menu").innerHTML=PAGES.map(([k,l])=>`<a href="${href(k)}" data-v="${k}">${l}</a>`).join("");
$("tabbar").innerHTML=TABS.map(([k,l,i])=>`<a href="${href(k)}" data-v="${k}">${I(ICO[i],22)}<span>${l.replace("Como funciona","Funciona")}</span></a>`).join("")+`<button type="button" id="more-btn" aria-haspopup="dialog" aria-expanded="false">${I(ICO.dots,22)}<span>Mais</span></button>`;
$("sheet").innerHTML=`<div class="grab"></div><h4>Mais</h4>${MORE.map(([k,l,i])=>`<a href="${href(k)}" data-v="${k}">${I(ICO[i],20)}${l}</a>`).join("")}<div class="cta"><a class="btn sec" data-link="demo" href="acessar.html">Demonstração</a><a class="btn" data-link="app" href="acessar.html">Entrar</a></div>`;
const ALL=PAGES.map(p=>p[0]).concat(["acessar","privacidade","termos","demonstracao","app-demo","area"]);
function sheet(open){$("sheet").hidden=!open;$("sheet-bg").hidden=!open;$("more-btn").setAttribute("aria-expanded",String(open));const mb=$("more-btn");mb.classList.toggle("on",open||MORE.some(m=>m[0]===window.PAGE))}
$("more-btn").onclick=()=>sheet($("sheet").hidden);
$("sheet-bg").onclick=()=>sheet(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("sheet").hidden)sheet(false)});
$("sheet").addEventListener("click",e=>{if(e.target.closest("a"))sheet(false)});
function route(){document.querySelectorAll("[data-v]").forEach(a=>a.classList.toggle("on",a.dataset.v===window.PAGE));if(window.PAGE==="demonstracao"){document.body.classList.add("demo-mode");loadDemo()}}
document.querySelectorAll(".legal nav a[data-to]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const t=document.getElementById(a.dataset.to);if(t)t.scrollIntoView({behavior:"smooth",block:"start"})}));

/* ---------- ligações com o app e a demonstração ---------- */
document.querySelectorAll("[data-link]").forEach(a=>{
  const k=a.dataset.link;
  if(k==="demo"&&CFG.demo){a.href=CFG.demo}
  if(k==="app"&&CFG.app){a.href=CFG.app}
  if(k==="app-direct"){
    if(CFG.app){a.href=CFG.app}
    else{a.addEventListener("click",e=>{e.preventDefault();const n=$("app-note");n.innerHTML=`Na versão publicada, este botão abre o aplicativo. Por enquanto, <a href="${CFG.demo||"acessar.html"}">use a demonstração</a>.`;n.className="note err"})}
  }
});

/* ---------- tema ---------- */
$("theme").onclick=()=>{const r=document.documentElement;const cur=r.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");const nx=cur==="dark"?"light":"dark";r.dataset.theme=nx;try{localStorage.setItem("as-theme",nx)}catch(e){}};
try{const t=localStorage.getItem("as-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}

/* ---------- telas reais do app ---------- */
const SHOT={
  inicio:["app-celular-inicio.webp","Tela inicial do Assistence no celular, com o resumo do dia e as prioridades"],
  mensagens:["app-celular-mensagens.webp","Lista de mensagens do Assistence no celular"],
  tarefas:["app-celular-tarefas.webp","Tarefas do Assistence no celular, agrupadas por prazo"],
  dpainel:["app-computador-painel.webp","Painel do Assistence no computador, com indicadores, prioridades e a semana"],
  dmensagens:["app-computador-mensagens.webp","Mensagens do Assistence no computador, com a lista e a leitura lado a lado"],
  dtarefas:["app-computador-tarefas.webp","Quadro de tarefas do Assistence no computador, separado por prazo"]};
const img=(k,eager)=>{const [f,alt]=SHOT[k];const d=k[0]==="d";return `<img src="img/${f}" width="${d?1920:750}" height="${d?1200:1676}" alt="${alt}"${eager?"":' loading="lazy"'} decoding="async">`};
const phone=(k,eager)=>`<div class="phone"><div class="scr">${img(k,eager)}</div></div>`;
const laptop=(k,eager)=>`<div class="laptop"><div class="screen"><div class="chrome"><i></i><i></i><i></i><span class="url">${I(ICO.lock,10)}app.assistence</span></div>${img(k,eager)}</div><div class="base"></div></div>`;
const TOUR=[["painel","Painel","Seu dia e a sua semana",["Cinco indicadores: prioridades, ações, prazos de hoje, atrasadas e quanto pagar em 7 dias.","Tabela do que é mais importante agora, com prazo, valor e botão de concluir.","Resumo do dia e a semana dia a dia."]],
  ["mensagens","Mensagens","Lista e leitura lado a lado",["Cada linha mostra ação, categoria, prazo e valor.","Ao lado, o resumo e as informações identificadas.","Passe de uma mensagem para outra com ↑ e ↓."]],
  ["tarefas","Tarefas","O que fazer, por prazo",["Atrasadas, hoje, próximos 7 dias, depois e sem prazo.","Cada tarefa leva à conversa de origem.","Valores das contas a pagar sempre à vista."]]];
const MTOUR=[["inicio","Início","Resumo do dia e prioridades"],["mensagens","Mensagens","Toda a caixa, organizada"],["tarefas","Tarefas","Agrupadas por prazo"]];
function tourDesk(){return `<div class="tour-tabs" role="tablist">${TOUR.map((t,i)=>`<button role="tab" data-tour="${i}" class="${i?"":"on"}" aria-selected="${!i}">${t[1]}</button>`).join("")}</div>
  <div class="tour"><div class="tour-cap" id="tour-cap"></div><div id="tour-shot"></div></div>`}
function setTour(i){const t=TOUR[i];$("tour-cap").innerHTML=`<h3>${t[2]}</h3><ul>${t[3].map(x=>`<li>${tick}<span>${esc(x)}</span></li>`).join("")}</ul><div class="cta" style="margin-top:14px"><a class="btn sec" href="${CFG.demo||"acessar.html"}"${CFG.demo&&CFG.demo[0]!=="#"?' target="_blank" rel="noopener"':""}>Usar na demonstração</a></div>`;$("tour-shot").innerHTML=laptop("d"+t[0]);document.querySelectorAll("[data-tour]").forEach(b=>{const on=+b.dataset.tour===i;b.classList.toggle("on",on);b.setAttribute("aria-selected",String(on))})}
function tourMob(){return `<div class="carousel">${MTOUR.map(([k,t,s])=>`<figure>${phone(k)}<figcaption><b>${t}</b><span>${s}</span></figcaption></figure>`).join("")}</div><div class="dots">${MTOUR.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`}
const CH={gm:["c-gm","G"],ol:["c-ol","O"],wa:["c-wa","W"],ig:["c-ig","I"],tg:["c-tg","T"],sl:["c-sl","S"],tm:["c-tm","T"],sms:["c-sms","✉"]};
function plat(a){return a.map(([i,t,s])=>`<div class="card"><span class="ic">${I(ICO[i],20)}</span><h3 style="font-size:16.5px">${t}</h3><p style="font-size:14px">${s}</p><span class="st">Disponível</span></div>`).join("")}
const mocks={
  pair:()=>`${laptop("dpainel",true)}${phone("inicio",true)}`,
  "tour-desk":tourDesk,"tour-mob":tourMob,
  channels:()=>[["gm","Gmail"],["ol","Outlook"],["wa","WhatsApp"],["ig","Instagram"],["tg","Telegram"],["sl","Slack"],["tm","Teams"],["sms","SMS"]].map(([k,n])=>`<span class="chip"><span class="cdot ${CH[k][0]}">${CH[k][1]}</span>${n}</span>`).join(""),
  features:()=>[["star","Prioridade automática","Alta, média e baixa para cada mensagem, com o motivo e a confiança da análise."],["task","Tarefas a partir de mensagens","Pedidos e prazos viram tarefas com origem, responsável e prazo calculado."],["money","Contas a pagar","Boletos, guias e faturas somados por vencimento, cada conta contada uma vez."],["search","Busca inteligente","Encontre por nome, valor, prazo ou anexo, em toda a caixa."],["cal","Visão da semana","Os prazos de cada dia, da segunda ao domingo."],["sun","Resumo do dia","O que vence hoje, o mais urgente e quanto há em valores pendentes."],["tag","Categorias e regras","Clientes, fornecedores, financeiro e quantas categorias o seu negócio precisar."],["user","Contatos frequentes","Quem mais conversa com você, com as conversas que esperam resposta."],["reply","Respostas sugeridas","Modelos de resposta para as perguntas que se repetem."],["bolt","Aprendizado com correções","Cada ajuste seu melhora as próximas classificações."],["users","Caixas da equipe","Atribua conversas e acompanhe quem respondeu o quê."],["bell","Notificações inteligentes","Avisos só para o que é urgente. O resto espera o seu momento."]].map(([i,t,p])=>`<div><span class="ic">${I(ICO[i],20)}</span><h3>${t}</h3><p>${p}</p></div>`).join(""),
  security:()=>[["Somente leitura","O Assistence pede ao Google apenas a leitura do e-mail. Ele não envia, não apaga e não altera nenhuma mensagem."],["Login oficial do Google","OAuth 2.0 com PKCE e proteção contra login forjado. Sua senha nunca passa pelo Assistence."],["Criptografia","Autorizações e cópia das conversas cifradas com AES-256-GCM, separadas por usuário; conexões por HTTPS."],["Algoritmo próprio","As mensagens são analisadas pelo algoritmo do Assistence. Nenhum serviço de IA de terceiros recebe o seu conteúdo."],["Sessão protegida","Cookies seguros, que o código da página não consegue ler. Pedidos vindos de outros sites são recusados."],["Registros sem conteúdo","Os registros de erro nunca guardam e-mails, assuntos, textos, valores ou senhas."],["Exclusão de verdade","Excluir a conta apaga tudo e revoga o acesso no Google na hora."]].map(([b,s])=>`<li>${tick}<b>${b}</b><span>${s}</span></li>`).join(""),
  "plat-desk":()=>plat([["globe","Navegador","Chrome, Edge, Safari e Firefox"],["monitor","Mesa de trabalho","A partir de 1024 px de largura"],["bolt","Atalhos","/ busca, ↑ ↓ navegam, Esc fecha"]]),
  "plat-mob":()=>plat([["phone","iPhone","Safari, no navegador"],["phone","Android","Chrome, no navegador"],["bell","Resumo do dia","Prioridades logo na abertura"]]),
  topics:()=>[["link","Primeiros passos","Criar conta e conectar o e-mail","6 guias"],["star","Prioridades e categorias","Como a classificação funciona","7 guias"],["task","Tarefas e prazos","Datas, conclusão e correções","5 guias"],["money","Contas a pagar","Boletos, guias e comprovantes","4 guias"],["monitor","Computador e celular","Atalhos e sincronização","5 guias"],["shield","Conta e privacidade","Segurança, exclusão e LGPD","8 guias"]].map(([i,t,p,n])=>`<a class="card topic" href="#suporte"><span class="ic">${I(ICO[i],20)}</span><h3>${t}</h3><p>${p}</p><small>${n}</small></a>`).join("")
};
document.querySelectorAll("[data-mock]").forEach(el=>{const [k,arg]=el.dataset.mock.split(":");
  if(k==="phone")el.innerHTML=phone(arg,el.classList.contains("hero-phone"));
  else if(k==="laptop")el.innerHTML=laptop("d"+arg);
  else if(mocks[k])el.innerHTML=mocks[k]();
});
if($("tour-cap")){setTour(0);document.querySelectorAll("[data-tour]").forEach(b=>b.onclick=()=>setTour(+b.dataset.tour))}
document.querySelectorAll(".carousel").forEach(c=>{const dots=c.nextElementSibling.children;c.addEventListener("scroll",()=>{const w=c.firstElementChild.getBoundingClientRect().width+16;const i=Math.min(dots.length-1,Math.round(c.scrollLeft/w));[...dots].forEach((d,j)=>d.classList.toggle("on",j===i))},{passive:true})});

/* ---------- demonstração dentro do site ---------- */
let demoHtml=null,demoBusy=false;
function demoMsg(html){const m=$("frame-msg");if(!m)return;m.hidden=!html;if(html)m.innerHTML=`<div>${html}</div>`}
async function loadDemo(force){
  const fr=$("demo-frame");if(!fr||demoBusy)return;
  if(fr.dataset.ready&&!force)return;
  demoBusy=true;demoMsg('<div class="spin"></div><b>Abrindo a demonstração…</b>Carregando o aplicativo.');
  try{
    if(!demoHtml){const r=await fetch(CFG.demoFile||"demonstracao/index.html");if(!r.ok)throw new Error(r.status);demoHtml=await r.text()}
    fr.onload=()=>{demoMsg("");fr.dataset.ready="1"};
    fr.srcdoc=demoHtml;
  }catch(e){demoMsg('<b>Não foi possível abrir a demonstração.</b>Verifique a conexão e toque em Recomeçar.')}
  finally{demoBusy=false}
}
document.querySelectorAll("[data-size]").forEach(b=>b.onclick=()=>{
  const ph=b.dataset.size==="phone";$("frame-wrap").classList.toggle("as-phone",ph);
  document.querySelectorAll("[data-size]").forEach(x=>{const on=x===b;x.classList.toggle("on",on);x.setAttribute("aria-pressed",String(on))});
});
const TAB=CFG.self?CFG.self+"#app-demo":(CFG.tab||"");
if($("demo-tab")){if(TAB)$("demo-tab").href=TAB;else $("demo-tab").hidden=true}
if($("demo-full"))$("demo-full").onclick=async()=>{const w=$("frame-wrap");try{if(document.fullscreenElement)await document.exitFullscreen();else await w.requestFullscreen()}catch(e){if(TAB)window.open(TAB,"_blank","noopener")}};
if($("demo-reset"))$("demo-reset").onclick=()=>{const fr=$("demo-frame");delete fr.dataset.ready;loadDemo(true)};

/* ---------- perguntas frequentes ---------- */
const FAQ=[
 ["Geral","O que é o Assistence?","Um aplicativo que reúne as suas mensagens, identifica o que é importante e transforma pedidos, prazos e cobranças em tarefas organizadas, no computador e no celular."],
 ["Geral","Como o Assistence funciona?","Você entra com o Google e autoriza a leitura do e-mail. O algoritmo próprio do Assistence analisa cada conversa, atribui categoria e prioridade e cria as tarefas. Novas mensagens são organizadas sozinhas."],
 ["Geral","Posso experimentar antes de conectar meu e-mail?","Sim. A demonstração é o aplicativo de verdade com uma caixa de entrada de exemplo. Ela recebe mensagens novas enquanto você usa e não conecta nenhuma conta."],
 ["Geral","O Assistence substitui o Gmail?","Não. Ele trabalha junto com a sua conta: as mensagens continuam no Gmail, e o Assistence só lê para organizar."],
 ["Segurança","Meus dados estão seguros?","Sim. O acesso é feito pelo login oficial do Google, somente para leitura, com criptografia AES-256-GCM no armazenamento e HTTPS nas conexões, seguindo a LGPD."],
 ["Segurança","Vocês usam inteligência artificial de terceiros?","Não. A análise é feita pelo algoritmo próprio do Assistence. Suas mensagens não são enviadas a nenhum serviço de IA."],
 ["Segurança","Como apago minha conta e meus dados?","No aplicativo, em Configurações, toque em Excluir conta. Tudo é apagado e o acesso ao Google é revogado na hora. Se quiser só desconectar o e-mail, a cópia das conversas é apagada e a conta continua."],
 ["Uso","Posso corrigir uma classificação errada?","Sim. Abra a mensagem e toque no lápis ao lado do campo. O algoritmo aprende com a sua correção."],
 ["Uso","Funciona no computador e no celular?","Sim. No computador, o app vira uma mesa de trabalho com barra lateral; no celular, telas empilhadas com abas no rodapé. Os ajustes valem nos dois."],
 ["Uso","O Assistence paga meus boletos?","Não. Ele identifica e soma as contas a pagar, mas o pagamento é feito por você no seu banco. Um boleto nunca é tratado como comprovante."]];
const faqHtml=list=>list.map(f=>`<details><summary>${esc(f[1])}</summary><p>${esc(f[2])}</p></details>`).join("");
const fh=document.querySelector('[data-faq="home"]');if(fh)fh.innerHTML=faqHtml(FAQ.filter(f=>f[0]!=="Uso").slice(0,5));
const fs=document.querySelector('[data-faq="security"]');if(fs)fs.innerHTML=faqHtml(FAQ.filter(f=>f[0]==="Segurança"));
function renderFaq(q){
  const n=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
  const words=n(q||"").split(/\s+/).filter(Boolean);
  const hit=FAQ.filter(f=>words.every(w=>n(f[1]+" "+f[2]).includes(w)));
  const cats=[...new Set(hit.map(f=>f[0]))];
  $("faq-all").innerHTML=hit.length?cats.map((c,i)=>`<p class="fcat" style="${i?"":"margin-top:0"}">${c}</p><div class="faq">${faqHtml(hit.filter(f=>f[0]===c))}</div>`).join(""):`<div class="empty">Nenhuma resposta para “${esc(q)}”. Escreva para suporte@assistence.app.</div>`;
  $("faq-count").textContent=q?`${hit.length} resultado(s) para “${q}”.`:"As dúvidas mais comuns, organizadas por tema.";
}
if($("faq-all"))renderFaq("");
if($("help-form"))$("help-form").addEventListener("submit",e=>{e.preventDefault();renderFaq($("help-q").value.trim());$("faq-all").scrollIntoView({behavior:"smooth",block:"start"})});

/* ===================== SONS ===================== */
/* Sons gerados pelo próprio navegador (sem arquivos), curtos e discretos. Só tocam depois do primeiro toque ou clique. */
const SND={on:true,ctx:null,ready:false,last:0};
try{const v=localStorage.getItem("as-som");if(v!==null)SND.on=v==="1"}catch(e){}
function actx(){if(!SND.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{SND.ctx=new C()}catch(e){return null}}if(SND.ctx.state==="suspended")SND.ctx.resume().catch(()=>{});return SND.ctx}
function tone(c,f,t,d,type,v,f2){const o=c.createOscillator(),g=c.createGain(),n=c.currentTime+t;o.type=type||"sine";o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(0.0001,n);g.gain.exponentialRampToValueAtTime(v,n+0.008);g.gain.exponentialRampToValueAtTime(0.0001,n+d);o.connect(g).connect(c.destination);o.start(n);o.stop(n+d+0.02)}
function whoosh(c,d,f1,f2,v){const len=Math.floor(c.sampleRate*d),b=c.createBuffer(1,len,c.sampleRate),ch=b.getChannelData(0);for(let i=0;i<len;i++)ch[i]=Math.random()*2-1;const s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain(),n=c.currentTime;s.buffer=b;fl.type="bandpass";fl.Q.value=1.4;fl.frequency.setValueAtTime(f1,n);fl.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(0.0001,n);g.gain.exponentialRampToValueAtTime(v,n+d*0.35);g.gain.exponentialRampToValueAtTime(0.0001,n+d);s.connect(fl).connect(g).connect(c.destination);s.start(n);s.stop(n+d)}
const SFX={
  click:c=>{tone(c,1320,0,.05,"sine",.045);tone(c,660,0,.07,"triangle",.02)},
  hover:c=>tone(c,2400,0,.022,"sine",.008),
  tab:c=>{tone(c,660,0,.08,"triangle",.045);tone(c,990,.055,.1,"triangle",.04)},
  open:c=>{whoosh(c,.22,600,2600,.05);tone(c,520,0,.14,"sine",.025,780)},
  close:c=>{whoosh(c,.18,2400,500,.04);tone(c,700,0,.12,"sine",.02,460)},
  page:c=>{whoosh(c,.3,350,1900,.035);tone(c,880,.04,.12,"sine",.018)},
  toggle:c=>{tone(c,880,0,.09,"sine",.045);tone(c,1320,.07,.13,"sine",.04)},
  success:c=>[523.25,659.25,783.99].forEach((f,i)=>tone(c,f,i*.07,.24,"sine",.04)),
  error:c=>{tone(c,330,0,.12,"triangle",.04);tone(c,247,.1,.18,"triangle",.035)},
  on:c=>{tone(c,660,0,.1,"sine",.04);tone(c,990,.08,.16,"sine",.045)}
};
function play(n){if(!SND.on||!SND.ready)return;const c=actx();if(!c)return;try{SFX[n](c)}catch(e){}}
window.ASSISTENCE_SOM=play;
const sb=$("sound");
function syncSound(){if(sb){sb.setAttribute("aria-pressed",String(SND.on));sb.title=SND.on?"Sons ligados":"Sons desligados"}}
syncSound();
if(sb)sb.addEventListener("click",()=>{SND.on=!SND.on;try{localStorage.setItem("as-som",SND.on?"1":"0")}catch(e){}syncSound();if(SND.on){SND.ready=true;play("on")}});
function unlock(){SND.ready=true;actx()}
document.addEventListener("pointerdown",unlock,{once:true,capture:true});
document.addEventListener("keydown",unlock,{once:true,capture:true});
document.addEventListener("click",e=>{
  const el=e.target.closest("a,button,summary,[role=tab]");if(!el||el===sb)return;
  if(el.matches("summary")){play(el.parentElement.open?"close":"open");return}
  if(el.id==="theme"){play("toggle");return}
  if(el.id==="more-btn"){play($("sheet").hidden?"close":"open");return}
  if(el.matches("[data-tour],[data-size],[data-t],[data-f],.tour-tabs button,.seg button")){play("tab");return}
  if(el.matches("[data-tg]")){play(el.closest(".task")&&el.closest(".task").classList.contains("done")?"click":"success");return}
  if(el.matches(".del,[data-rm]")){play("close");return}
  play("click");
},true);
$("sheet-bg").addEventListener("click",()=>play("close"));
document.addEventListener("submit",e=>{const ok=e.target.checkValidity?e.target.checkValidity():true;play(ok?"success":"error")},true);
window.addEventListener("hashchange",()=>play("page"));
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  document.addEventListener("pointerover",e=>{const el=e.target.closest(".btn,.menu a,.card,.chip,.feat-list>div,.tour-tabs button,.seg button,.icb,.fgrid a");if(!el||el.contains(e.relatedTarget))return;const t=performance.now();if(t-SND.last<70)return;SND.last=t;play("hover")});
}

/* ===================== ANIMAÇÕES ===================== */
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
/* barra de progresso da rolagem */
const bar=$("progress");let ticking=false;
function prog(){ticking=false;if(!bar)return;const h=document.documentElement.scrollHeight-innerHeight;bar.style.setProperty("--p",h>0?Math.min(1,scrollY/h):0)}
addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(prog)}},{passive:true});prog();
/* palavra que gira no título */
const rot=$("rot");
if(rot&&!calm){const ws=[...rot.children];let k=0;setInterval(()=>{if(document.hidden)return;ws[k].classList.remove("on");ws[k].setAttribute("aria-hidden","true");k=(k+1)%ws.length;ws[k].classList.add("on");ws[k].removeAttribute("aria-hidden");rot.setAttribute("aria-label",ws[k].textContent)},2800)}
/* entrada ao rolar */
if(!calm&&"IntersectionObserver" in window){
  const SEL=".shead,.card,.flow>div,.pipe>div,.feat-list>div,.sec-list li,.timeline li,.faq details,.ticks li,.laptop,.specs tr,.stat-row>div,.final,.chip,.tour-tabs,.score,.signals span,.carousel figure,.access,.legal article>*";
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.12});
  function arm(root){root.querySelectorAll(SEL).forEach(el=>{if(el.closest(".hero")||el.classList.contains("rv"))return;const sib=[...el.parentElement.children].indexOf(el);el.style.setProperty("--d",(Math.min(sib,6)*70)+"ms");const r=el.getBoundingClientRect();if(r.width&&r.top<innerHeight*0.92&&r.bottom>0)return;el.classList.add("rv");io.observe(el)})}
  arm(document);
  addEventListener("hashchange",()=>requestAnimationFrame(()=>{const pg=document.querySelector(".page:not([hidden])");if(pg)pg.querySelectorAll(".rv:not(.in)").forEach(el=>{io.unobserve(el);io.observe(el)})}));
}
/* luz que acompanha o mouse nas faixas escuras e inclinação 3D das telas */
if(!calm&&matchMedia("(hover:hover) and (pointer:fine)").matches){
  document.querySelectorAll(".ink").forEach(sec=>sec.addEventListener("pointermove",e=>{const r=sec.getBoundingClientRect();sec.style.setProperty("--mx",(e.clientX-r.left)+"px");sec.style.setProperty("--my",(e.clientY-r.top)+"px")}));
  document.querySelectorAll(".devices,#tour-shot,.twin .shot,.split>.only-desk").forEach(box=>{
    box.addEventListener("pointermove",e=>{const t=box.querySelector(".screen")||box;t.classList.add("tilt");const r=box.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(1600px) rotateY(${x*6}deg) rotateX(${-y*5}deg)`});
    box.addEventListener("pointerleave",()=>{const t=box.querySelector(".screen")||box;t.style.transform=""});
  });
}
/* efeito de onda ao tocar nos botões */
document.addEventListener("pointerdown",e=>{const b=e.target.closest(".btn,.gbtn");if(!b||calm)return;const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.2,s=document.createElement("span");s.className="rip";s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;b.appendChild(s);setTimeout(()=>s.remove(),650)});
/* troca suave das telas no tour */
const _setTour=setTour;setTour=function(i){_setTour(i);["tour-shot","tour-cap"].forEach(id=>{const el=$(id);if(!el||calm)return;el.classList.remove("swap");void el.offsetWidth;el.classList.add("swap")})};
document.querySelectorAll("[data-tour]").forEach(b=>b.onclick=()=>setTour(+b.dataset.tour));
/* contagem do placar de exemplo */
document.querySelectorAll(".tot .mono").forEach(el=>{const m=el.textContent.match(/^(\d+)(.*)$/);if(!m||calm)return;const end=+m[1],rest=m[2];let done=false;const o=new IntersectionObserver(es=>{if(done||!es[0].isIntersecting)return;done=true;o.disconnect();const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1100),v=Math.round(end*(1-Math.pow(1-k,3)));el.textContent=v+rest;if(k<1)requestAnimationFrame(f)})(t0)});o.observe(el)});

route();
})();
