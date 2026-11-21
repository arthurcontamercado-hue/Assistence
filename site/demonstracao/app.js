/* =====================================================================
   ASSISTENCE · DEMONSTRAÇÃO INTERATIVA
   ---------------------------------------------------------------------
   Aplicativo de demonstração independente: usa somente a base fictícia
   de dados.js. Não usa o motor de análise, o backend, a autenticação nem
   as integrações do aplicativo real. Toda ação produz um resultado
   programado. O estado fica só nesta aba do navegador (sessionStorage,
   chave "assistence-demo:*") e nunca se mistura com dados reais.
   ===================================================================== */
(function () {
"use strict";
const D = window.DEMO_DADOS;
if (!D) { document.body.textContent = "Não foi possível carregar os dados da demonstração."; return; }

const KEY = "assistence-demo:v" + D.versao;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- datas relativas ---------------- */
const NOW = new Date();
const T0 = new Date(NOW); T0.setHours(0, 0, 0, 0);
const WD = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const WDC = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const WDS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const dayDate = d => { const x = new Date(T0); x.setDate(x.getDate() + d); return x; };
const p2 = n => String(n).padStart(2, "0");
const ddmm = d => { const x = dayDate(d); return p2(x.getDate()) + "/" + p2(x.getMonth() + 1); };
const fill = s => String(s == null ? "" : s).replace(/\{(dia|data):([+-]?\d+)\}/g, (m, k, n) => k === "dia" ? WD[dayDate(+n).getDay()] : ddmm(+n));
function tsOf(t) {
  if (!t) return NOW.getTime();
  if (t.min != null) return NOW.getTime() + t.min * 60000;
  const x = dayDate(t.d || 0); const [h, m] = (t.h || "09:00").split(":"); x.setHours(+h, +m); return x.getTime();
}
function dayOf(ts) { const x = new Date(ts); x.setHours(0, 0, 0, 0); return Math.round((x - T0) / 864e5); }
const hm = ts => { const x = new Date(ts); return p2(x.getHours()) + ":" + p2(x.getMinutes()); };
function when(ts) { const d = dayOf(ts); if (d === 0) return hm(ts); if (d === -1) return "Ontem"; if (d > -7 && d < 0) return WDS[new Date(ts).getDay()]; return ddmm(d); }
function prazoTxt(p, longo) {
  if (!p) return "Sem prazo";
  const d = p.d; let s;
  if (d < -1) s = `Atrasada há ${-d} dias`; else if (d === -1) s = longo ? "Venceu ontem" : "Ontem";
  else if (d === 0) s = "Hoje"; else if (d === 1) s = "Amanhã";
  else if (d < 7) s = WDC[dayDate(d).getDay()]; else s = ddmm(d);
  if (p.h) s += " · " + p.h.replace(":00", "h").replace(":", "h");
  return s;
}
const prazoCls = p => !p ? "" : p.d < 0 ? "hi" : p.d === 0 ? "me" : "";
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const curto = v => v >= 1000 ? "R$ " + (v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + " mil" : brl(v);

/* ---------------- ícones ---------------- */
const P = {
  home: '<path d="M3 11 12 3l9 8v10H3z"/>', inbox: '<path d="M3 13h5l2 3h4l2-3h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>', task: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>',
  money: '<rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/><path d="M6 10v.01M18 15v.01"/>', users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5 7-5s7 1.5 7 5"/><circle cx="17" cy="7" r="2.5"/><path d="M17 13c3 0 5 1.3 5 4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', reply: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v5"/>', check: '<path d="m5 12 5 5 9-10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', back: '<path d="M15 18 9 12l6-6"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  clip: '<path d="m21 11-8.5 8.5a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L15 7"/>', file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  barcode: '<path d="M4 6v12M7 6v12M10 6v12M14 6v12M17 6v12M20 6v12"/>', edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  arrow: '<path d="m9 18 6-6-6-6"/>', link: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>', send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>', warn: '<path d="M12 3 2 21h20z"/><path d="M12 10v5M12 18h.01"/>'
};
const I = (k, s = 16, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[k] || ""}</svg>`;
const LOGO = '<svg width="16" height="15" viewBox="0 0 26 24" fill="currentColor" aria-hidden="true"><path d="M13 1 1 23h6.2L13 12.4 18.8 23H25z"/></svg>';
const CHI = { gmail: "mail", outlook: "mail", whatsapp: "chat" };
const chIcon = (c, sm) => `<span class="ch ${c}${sm ? " sm" : ""}" title="${esc(canal(c).nome)} (demonstrativo)">${I(CHI[c], sm ? 10 : 13, 2.4)}</span>`;

/* ---------------- dados de apoio ---------------- */
const canal = id => D.canais.find(c => c.id === id) || { nome: id };
const contato = id => D.contatos.find(c => c.id === id) || { nome: id, org: "" };
const membro = id => D.equipe.find(m => m.id === id);
const iniciais = n => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const avatar = (id, cls = "") => { const m = membro(id); if (!m) return `<span class="av ${cls}" style="--c:var(--bd2)" title="Sem responsável">?</span>`; return `<span class="av ${cls}" style="--c:${m.cor}" title="${esc(m.nome)}">${iniciais(m.nome)}</span>`; };
const cAvatar = (id, cls = "") => { const c = contato(id); const h = [...c.nome].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 360; return `<span class="av ${cls}" style="--c:hsl(${h} 45% 46%)">${iniciais(c.nome)}</span>`; };
const PRI = { alta: ["hi", "Alta"], media: ["me", "Média"], baixa: ["lo", "Baixa"] };
const priPill = p => `<span class="pill ${PRI[p][0]}"><span class="dot ${PRI[p][0]}"></span>${PRI[p][1]}</span>`;
const valPill = v => v ? `<span class="pill ${v.sentido === "pagar" ? "pay" : "rec"} num">${v.sentido === "pagar" ? "Pagar " : "Receber "}${brl(v.v)}</span>` : "";

/* ---------------- estado (somente nesta aba) ---------------- */
function fresh() {
  const s = { v: D.versao, conv: clone(D.conversas), tasks: clone(D.tarefas), regras: clone(D.regras), roteiro: 0, correcoes: 0, prefs: { alta: true, resumo: true, equipe: true }, notifs: [], seq: 100 };
  s.conv.forEach(c => { c.msgs.forEach(m => { m.ts = tsOf(m.t); delete m.t; }); c.resolvida = false; });
  s.tasks.forEach(t => { t.feita = !!t.feita; });
  s.notifs = s.conv.filter(c => c.pri === "alta" && !c.lida).map(c => ({ id: "n" + c.id, conv: c.id, titulo: contato(c.contato).nome, txt: fill(c.acao), ts: last(c), lida: false }));
  return s;
}
function last(c) { return Math.max.apply(null, c.msgs.map(m => m.ts)); }
let S;
try { const raw = sessionStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o && o.v === D.versao) S = o; } } catch (e) { }
const voltou = !!S;
if (!S) S = fresh();
function save() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

const ui = { view: "painel", sel: null, canal: "todos", filtro: "todas", cat: null, contato: null, tview: "equipe", q: "", prev: "painel", s2: null, modal: null, pop: false, kb: -1 };

const C = id => S.conv.find(c => c.id === id);
const T = id => S.tasks.find(t => t.id === id);
const openTasks = () => S.tasks.filter(t => !t.feita);
const tasksOf = c => c.tarefas.map(T).filter(Boolean);
function bucket(t) { if (!t.prazo) return "sem"; const d = t.prazo.d; return d < 0 ? "atrasadas" : d === 0 ? "hoje" : d <= 7 ? "semana" : "depois"; }
const priW = { alta: 0, media: 1, baixa: 2 };
const sortPrazo = (a, b) => (a.prazo ? a.prazo.d : 99) - (b.prazo ? b.prazo.d : 99) || (a.prazo && a.prazo.h || "99").localeCompare(b.prazo && b.prazo.h || "99");

function kpis() {
  const op = openTasks();
  const pagar = op.filter(t => t.valor && t.valor.sentido === "pagar" && t.prazo && t.prazo.d <= 7);
  return {
    altas: S.conv.filter(c => c.pri === "alta" && !c.resolvida).length,
    acoes: op.length,
    hoje: op.filter(t => t.prazo && t.prazo.d === 0).length,
    atrasadas: op.filter(t => t.prazo && t.prazo.d < 0).length,
    pagar: pagar.reduce((a, t) => a + t.valor.v, 0), nPagar: pagar.length,
    naoLidas: S.conv.filter(c => !c.lida && !c.resolvida).length
  };
}

/* ---------------- filtros da caixa ---------------- */
function convList(forPri) {
  let l = S.conv.slice();
  if (ui.canal !== "todos") l = l.filter(c => c.canal === ui.canal);
  if (ui.cat) l = l.filter(c => c.cat === ui.cat);
  if (ui.contato) l = l.filter(c => c.contato === ui.contato);
  const f = forPri ? "prioritarias" : ui.filtro;
  if (f === "resolvidas") l = l.filter(c => c.resolvida); else l = l.filter(c => !c.resolvida);
  if (f === "naolidas") l = l.filter(c => !c.lida);
  if (f === "prioritarias") l = l.filter(c => c.pri === "alta");
  if (f === "aguardando") l = l.filter(c => c.aguardando);
  if (f === "anexo") l = l.filter(c => c.anexos.length);
  l.sort(forPri ? ((a, b) => priW[a.pri] - priW[b.pri] || sortPrazo(a, b) || last(b) - last(a)) : ((a, b) => last(b) - last(a)));
  return l;
}

/* ---------------- avisos ---------------- */
function toast(titulo, txt, act) {
  const box = $("#toasts"); if (!box) return;
  const el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status");
  el.innerHTML = `<div><b>${esc(titulo)}</b>${txt ? `<span>${esc(txt)}</span>` : ""}</div>${act ? `<button class="t-act">${esc(act.label)}</button>` : ""}`;
  if (act) el.querySelector(".t-act").onclick = () => { act.fn(); dismiss(); };
  box.appendChild(el);
  while (box.children.length > 3) box.firstElementChild.remove();
  let gone = false; function dismiss() { if (gone) return; gone = true; el.classList.add("hide"); setTimeout(() => el.remove(), 260); }
  setTimeout(dismiss, act ? 6000 : 4200);
}

/* ---------------- modo: computador ou celular ---------------- */
const isDesk = () => innerWidth >= 1024;
let mode = null;
function shell() {
  mode = isDesk() ? "desk" : "mob";
  document.body.classList.toggle("is-mob", mode === "mob");
  const app = $("#app");
  if (mode === "desk") {
    app.innerHTML = `<div class="desk">
      <aside class="side" aria-label="Navegação">
        <div class="side-top"><div class="brand"><i>${LOGO}</i>Assistence</div><span class="demo-tag" title="Esta é uma demonstração com dados fictícios. Nenhuma conta real está conectada.">${I("info", 12, 2.4)}Demo · dados fictícios</span></div>
        <nav class="side-scroll" id="side"></nav>
        <div class="side-foot"><button class="nav-i" data-a="go" data-v="config">${I("gear")}Configurações</button>
          <div class="me-card">${avatar("camila")}<div><b>Camila Rocha</b><small>${esc(D.empresa.split("·")[0].trim())}</small></div></div></div>
      </aside>
      <div class="main">
        <header class="topbar">
          <label class="search">${I("search")}<input id="q" type="search" placeholder="Buscar por nome, valor, prazo, anexo…" autocomplete="off" aria-label="Buscar"><span class="kbd">/</span></label>
          <div class="top-r">
            <button class="btn sec" data-a="sim" id="simbtn">${I("spark", 15)}Simular nova mensagem</button>
            <button class="icb" data-a="pop" id="bell" aria-label="Notificações">${I("bell", 18)}<span class="badge" id="bellN" hidden></span></button>
            ${top === window ? `<a class="btn ghost" href="../" title="Voltar ao site do Assistence">${I("link", 15)}Site</a>` : ""}
          </div>
        </header>
        <section class="view" id="view" tabindex="-1"></section>
      </div></div>`;
    const q = $("#q");
    q.addEventListener("input", () => { ui.q = q.value; if (ui.q.trim()) { if (ui.view !== "busca") ui.prev = ui.view; ui.view = "busca"; } else if (ui.view === "busca") ui.view = ui.prev; ui.kb = -1; render(true); });
  } else {
    app.innerHTML = `<div class="mob">
      <header class="mtop"><button class="icb" data-a="mback" id="mback" aria-label="Voltar" hidden>${I("back", 20)}</button><h1 id="mtitle"></h1>
        <button class="icb" data-a="go" data-v="busca" aria-label="Buscar">${I("search", 19)}</button>
        <button class="icb" data-a="pop" aria-label="Notificações">${I("bell", 19)}<span class="badge" id="bellN" hidden></span></button></header>
      <div class="mview" id="view"></div>
      <nav class="mtabs" id="mtabs" aria-label="Seções"></nav></div>`;
  }
  render();
}

/* ---------------- renderização geral ---------------- */
function render(soft) {
  if (mode === "desk") { side(); } else { mtabs(); }
  const v = $("#view"); if (!v) return;
  const html = mode === "desk" ? deskView() : mobView();
  v.innerHTML = html;
  if (!soft && !calm) { v.firstElementChild && v.firstElementChild.classList.add("v-in"); }
  const k = kpis(); const unread = S.notifs.filter(n => !n.lida).length;
  document.querySelectorAll("#bellN").forEach(b => { b.hidden = !unread; b.textContent = unread; });
  const sb = $("#simbtn"); if (sb) { const fim = S.roteiro >= D.roteiro.length; sb.disabled = fim; sb.title = fim ? "Todas as mensagens programadas da demonstração já chegaram" : "Recebe uma mensagem programada da demonstração"; }
  if (ui.view === "busca" && mode === "mob") { const mi = $("#mq"); if (mi && document.activeElement !== mi) { mi.value = ui.q; } }
  save();
  return k;
}

/* ---------------- barra lateral (computador) ---------------- */
function side() {
  const k = kpis();
  const navs = [["painel", "Painel", "home", ""], ["caixa", "Caixa unificada", "inbox", k.naoLidas], ["prioridades", "Prioridades", "star", k.altas, true], ["tarefas", "Tarefas", "task", k.acoes], ["contas", "Contas a pagar", "money", k.nPagar], ["contatos", "Contatos", "users", ""], ["relatorios", "Relatórios", "chart", ""]];
  const cur = ui.view === "busca" ? ui.prev : ui.view;
  const chn = D.canais.map(c => { const n = S.conv.filter(x => x.canal === c.id && !x.lida && !x.resolvida).length; const on = cur === "caixa" && ui.canal === c.id && !ui.cat && !ui.contato; return `<button class="nav-i${on ? " on" : ""}" data-a="canal" data-c="${c.id}">${chIcon(c.id, true)}${esc(c.nome)}<span class="n">${n || ""}</span></button>`; }).join("");
  const cats = D.categorias.map(cat => { const n = S.conv.filter(x => x.cat === cat && !x.resolvida).length; const on = cur === "caixa" && ui.cat === cat; return `<button class="nav-i${on ? " on" : ""}" data-a="cat" data-c="${esc(cat)}"><span class="dot" style="background:${catColor(cat)}"></span>${esc(cat)}<span class="n">${n || ""}</span></button>`; }).join("");
  $("#side").innerHTML = navs.map(([v, l, i, n, red]) => { const on = cur === v && !(v === "caixa" && (ui.canal !== "todos" || ui.cat || ui.contato)); return `<button class="nav-i${on ? " on" : ""}" data-a="go" data-v="${v}">${I(i)}${l}${n ? `<span class="n${red ? " red" : ""}">${n}</span>` : ""}</button>`; }).join("")
    + `<div class="side-lbl"><span>Canais</span><span title="Conexões demonstrativas">demo</span></div>${chn}<div class="side-lbl"><span>Categorias</span></div>${cats}`;
}
const CATC = { Clientes: "#4f46e5", Fornecedores: "#0e9f6e", Financeiro: "#dc3545", "Reuniões": "#7c3aed", Equipe: "#0891b2", Marketing: "#db2777", "Notificações": "#64748b" };
const catColor = c => CATC[c] || "#64748b";

/* ---------------- vistas do computador ---------------- */
function deskView() {
  switch (ui.view) {
    case "caixa": return inbox(false);
    case "prioridades": return inbox(true);
    case "tarefas": return tarefasDesk();
    case "contas": return `<div class="pad">${contasView()}</div>`;
    case "contatos": return `<div class="pad">${contatosView()}</div>`;
    case "relatorios": return `<div class="pad">${relatoriosView()}</div>`;
    case "config": return `<div class="pad">${configView()}</div>`;
    case "busca": return buscaView();
    default: return painelDesk();
  }
}
function saudacao() { const h = NOW.getHours(); return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"; }
function hojeLongo() { const x = NOW; return `${WDC[x.getDay()]}, ${x.getDate()} de ${MES[x.getMonth()]}`; }
function resumoTxt() {
  const k = kpis(); const op = openTasks().filter(t => t.prazo && t.prazo.d <= 0).sort(sortPrazo);
  const urg = op.find(t => t.prazo.d === 0) || op[0];
  let s = `Você tem <b>${k.altas} conversas de prioridade alta</b> e <b>${k.acoes} ações pendentes</b> na equipe.`;
  if (k.atrasadas) s += ` <b>${k.atrasadas} ${k.atrasadas > 1 ? "tarefas estão atrasadas" : "tarefa está atrasada"}</b>.`;
  if (urg) s += ` O mais urgente de hoje: “${esc(urg.titulo)}”${urg.prazo.h ? ` até as ${urg.prazo.h.replace(":00", "h")}` : ""}.`;
  if (k.pagar) s += ` Há <b>${brl(k.pagar)}</b> em contas a pagar nos próximos 7 dias.`;
  return s;
}
function painelDesk() {
  const k = kpis();
  const top = S.conv.filter(c => !c.resolvida && c.pri !== "baixa").sort((a, b) => priW[a.pri] - priW[b.pri] || sortPrazo(a, b)).slice(0, 7);
  return `<div class="pad">
    <div class="page-h"><div><h1>${saudacao()}, Camila</h1><p>${hojeLongo()} · ${S.conv.length} conversas de 3 canais demonstrativos organizadas pelo Assistence</p></div>
      <div class="chips">${D.canais.map(c => `<span class="pill">${chIcon(c.id, true)}${esc(c.nome)}</span>`).join("")}</div></div>
    <div class="kpis">
      ${kpi("prioridades", "star", "Prioridade alta", k.altas, "red", "conversas abertas")}
      ${kpi("tarefas", "task", "Ações pendentes", k.acoes, "ac", "na equipe")}
      ${kpi("tarefas", "clock", "Prazos de hoje", k.hoje, "", "tarefas vencem hoje")}
      ${kpi("tarefas", "warn", "Atrasadas", k.atrasadas, k.atrasadas ? "red" : "", "precisam de atenção")}
      ${kpi("contas", "money", "A pagar em 7 dias", brl(k.pagar), "", `${k.nPagar} contas`)}
    </div>
    <div class="dash">
      <div class="card"><div class="sec-h"><h3>${I("star", 15)}Mais importantes agora</h3><button class="link" data-a="go" data-v="prioridades">Ver todas</button></div>
        <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Remetente</th><th>Ação</th><th>Prazo</th><th>Valor</th><th></th></tr></thead><tbody>
        ${top.map(c => `<tr data-a="open" data-id="${c.id}"><td><div class="who">${chIcon(c.canal, true)}<span class="dot ${PRI[c.pri][0]}"></span><div style="min-width:0"><b>${esc(contato(c.contato).nome)}</b><small>${esc(c.cat)}</small></div></div></td>
          <td class="act">${esc(fill(c.acao))}</td><td><span class="pill ${prazoCls(c.prazo)}">${prazoTxt(c.prazo)}</span></td><td class="val">${c.valor ? brl(c.valor.v) : "—"}</td><td>${avatar(c.resp, "sm")}</td></tr>`).join("")}
        </tbody></table></div></div>
      <div style="display:grid;gap:16px">
        <div class="card resume"><h3>${I("spark", 15)}Resumo do dia</h3><p>${resumoTxt()}</p></div>
        <div class="card"><div class="sec-h"><h3>${I("clock", 15)}Esta semana</h3><button class="link" data-a="go" data-v="tarefas">Quadro</button></div>${semana()}</div>
        <div class="card"><div class="sec-h"><h3>${I("layers", 15)}Conversas por canal</h3></div>${porCanal()}</div>
      </div>
    </div></div>`;
}
const kpi = (v, i, l, n, cls, sub) => `<button class="card kpi" data-a="go" data-v="${v}"><span>${I(i, 14)}${l}</span><b class="${cls}">${n}</b><small>${sub}</small></button>`;
function semana() {
  const op = openTasks();
  let h = '<ul class="week">';
  for (let d = 0; d < 7; d++) {
    const its = op.filter(t => t.prazo && t.prazo.d === d).sort(sortPrazo);
    const dt = dayDate(d);
    h += `<li class="${d === 0 ? "today" : ""}"><div class="wd">${d === 0 ? "hoje" : WDS[dt.getDay()]}<b>${dt.getDate()}</b></div><div class="its">${its.length ? its.map(t => `<button class="it" data-a="topen" data-id="${t.id}"><span class="dot ${PRI[t.pri][0]}"></span><span>${esc(t.titulo)}</span></button>`).join("") : '<span class="mu" style="font-size:12.5px">Nada marcado</span>'}</div></li>`;
  }
  return h + "</ul>";
}
function porCanal() {
  const tot = S.conv.length;
  return `<div class="chbar">${D.canais.map(c => { const n = S.conv.filter(x => x.canal === c.id).length; return `<div><span class="lbl">${chIcon(c.id, true)}${esc(c.nome.replace(" Business", ""))}</span><span class="b"><i style="width:${Math.round(n / tot * 100)}%;background:${c.cor}"></i></span><b class="num">${n}</b></div>`; }).join("")}</div>`;
}

/* caixa unificada / prioridades */
function inbox(forPri) {
  const l = convList(forPri);
  if (ui.sel && !l.find(c => c.id === ui.sel) && !C(ui.sel)) ui.sel = null;
  const sel = ui.sel ? C(ui.sel) : null;
  const filt = [["todas", "Todas"], ["naolidas", "Não lidas"], ["prioritarias", "Prioritárias"], ["aguardando", "Aguardando resposta"], ["anexo", "Com anexo"], ["resolvidas", "Resolvidas"]];
  const extra = ui.cat ? `<button class="chip on" data-a="clearf" title="Remover filtro">${esc(ui.cat)} ${I("x", 12)}</button>` : ui.contato ? `<button class="chip on" data-a="clearf" title="Remover filtro">${esc(contato(ui.contato).nome)} ${I("x", 12)}</button>` : "";
  return `<div class="inbox${sel ? " with-info" : ""}">
    <div class="list-col">
      <div class="list-h"><h2>${forPri ? "Prioridades" : "Caixa unificada"} <span class="mu num" style="font-size:13px;font-weight:500">${l.length} conversas</span></h2>
        ${chSeg()}
        ${forPri ? `<p class="mu" style="font-size:12.5px">Conversas de prioridade alta, da mais urgente para a menos urgente.</p>${extra ? `<div class="chips">${extra}</div>` : ""}` : `<div class="chips">${extra}${filt.map(([k, t]) => `<button class="chip${ui.filtro === k ? " on" : ""}" data-a="filtro" data-f="${k}">${t}</button>`).join("")}</div>`}
      </div>
      <div class="list" id="list" role="listbox" aria-label="Conversas">${l.length ? l.map(c => row(c)).join("") : `<div class="empty">Nenhuma conversa neste filtro.</div>`}</div>
    </div>
    <div class="read-col">${sel ? reading(sel) : `<div class="blank"><div>${I("inbox", 44, 1.5)}<b style="display:block;color:var(--tx);margin-bottom:4px">Selecione uma conversa</b>Use <span class="kbd">↑</span> <span class="kbd">↓</span> para navegar e <span class="kbd">/</span> para buscar.</div></div>`}</div>
    ${sel ? `<aside class="info-col p-in" aria-label="Informações identificadas">${infoPanel(sel)}</aside>` : ""}
  </div>`;
}
function chSeg() {
  const opts = [["todos", "Todos", ""]].concat(D.canais.map(c => [c.id, c.nome.replace(" Business", ""), chIcon(c.id, true)]));
  return `<div class="chseg" role="tablist" aria-label="Canal">${opts.map(([k, t, ic]) => `<button role="tab" aria-selected="${ui.canal === k}" class="${ui.canal === k ? "on" : ""}" data-a="canal" data-c="${k}">${ic}${t}</button>`).join("")}</div>`;
}
function rowTags(c) {
  const t = [];
  if (!c.resolvida) t.push(priPill(c.pri));
  t.push(`<span class="pill">${esc(c.cat)}</span>`);
  if (c.prazo && !c.resolvida) t.push(`<span class="pill ${prazoCls(c.prazo)}">${I("clock", 11, 2.4)}${prazoTxt(c.prazo)}</span>`);
  if (c.valor) t.push(valPill(c.valor));
  if (c.anexos.length) t.push(`<span class="pill">${I("clip", 11, 2.4)}${c.anexos.length}</span>`);
  return t.join("");
}
function row(c) {
  const lm = c.msgs[c.msgs.length - 1];
  return `<button class="row${c.id === ui.sel ? " sel" : ""}${!c.lida ? " unread" : ""}${c.resolvida ? " done" : ""}${c._new ? " row-new" : ""}" role="option" aria-selected="${c.id === ui.sel}" data-a="open" data-id="${c.id}">${chIcon(c.canal)}
    <span class="l1"><b>${esc(contato(c.contato).nome)}</b><time>${when(last(c))}</time></span>
    <span class="l2"><b style="font-weight:600;color:var(--tx)">${esc(fill(c.assunto))}</b> · ${esc(fill(lm.txt).replace(/\n+/g, " "))}</span>
    <span class="l3">${rowTags(c)}</span></button>`;
}
function thread(c) {
  if (c.canal === "whatsapp") {
    return `<div class="wa">${c.msgs.map(m => { const out = m.de === "voce"; return `<div class="bub${out ? " out" : ""}">${m.autor ? `<span class="au">${esc(m.autor)}</span>` : ""}${esc(fill(m.txt))}<small>${hm(m.ts)}${out ? " ✓✓" : ""}</small></div>${m.sim ? '<div class="sent-note">Resposta simulada · nada foi enviado de verdade</div>' : ""}`; }).join("")}</div>`;
  }
  return c.msgs.map((m, i) => { const out = m.de === "voce"; const who = out ? "Você" : contato(m.de).nome; return `<article class="mail${out ? " out" : ""}"><div class="mh">${out ? avatar("camila", "sm") : cAvatar(m.de, "sm")}<b>${esc(who)}</b>${!out && contato(m.de).email ? `<span class="mu">&lt;${esc(contato(m.de).email)}&gt;</span>` : ""}<time>${when(m.ts) === hm(m.ts) ? "Hoje, " + hm(m.ts) : when(m.ts) + ", " + hm(m.ts)}</time></div><p>${esc(fill(m.txt))}</p>${i === c.msgs.length - 1 && !out && c.anexos.length ? attach(c) : ""}${m.sim ? '<div class="sent-note" style="text-align:left">Resposta simulada · nada foi enviado de verdade</div>' : ""}</article>`; }).join("");
}
const attach = c => `<div class="att">${c.anexos.map(a => `<span class="${a.tipo}">${I(a.tipo === "boleto" ? "barcode" : "file", 14)}${esc(a.nome)} <span class="mu">${esc(a.tam)}</span></span>`).join("")}</div>`;
function reading(c) {
  const ct = contato(c.contato); const ts = tasksOf(c); const tk = ts.find(t => !t.feita);
  return `<div class="read-h p-in"><div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><h2>${esc(fill(c.assunto))}</h2><button class="icb" data-a="close" aria-label="Fechar conversa (Esc)">${I("x", 18)}</button></div>
    <div class="from">${cAvatar(c.contato, "sm")}<b>${esc(ct.nome)}</b><span class="mu">${esc(ct.org)}</span><span class="pill">${chIcon(c.canal, true)}via ${esc(canal(c.canal).nome)} · demonstrativo</span></div>
    <div class="read-tools">
      ${c.sugestoes.length || c.canal ? `<button class="btn" data-a="reply" data-id="${c.id}">${I("reply", 15)}Responder</button>` : ""}
      ${tk ? `<button class="btn sec" data-a="topen" data-id="${tk.id}">${I("task", 15)}Ver tarefa</button>` : `<button class="btn sec" data-a="mktask" data-id="${c.id}">${I("plus", 15)}Criar tarefa</button>`}
      <button class="btn sec" data-a="assign" data-id="${c.id}">${avatar(c.resp, "xs")}${c.resp ? esc(membro(c.resp).nome.split(" ")[0]) : "Atribuir"}</button>
      <button class="btn ${c.resolvida ? "sec" : "ghost"}" data-a="resolve" data-id="${c.id}">${I("check", 15)}${c.resolvida ? "Reabrir" : "Resolver"}</button>
    </div></div>
    <div class="thread" id="thread"><details class="info-inline"${ui.infoInline === false ? "" : " open"}><summary>${I("spark", 15)}Informações identificadas<span class="mu" style="font-weight:500;margin-left:auto">${PRI[c.pri][1]} · ${esc(c.cat)}${c.prazo ? " · " + prazoTxt(c.prazo) : ""}</span></summary>${infoPanel(c)}</details>${thread(c)}</div>`;
}
function infoPanel(c) {
  const ts = tasksOf(c);
  const dup = ts.find(t => t.origens.length > 1);
  return `<div class="info">
    <h3 class="info-title">${I("spark", 15)}Informações identificadas</h3>
    <p class="sum">${esc(fill(c.resumo))}</p>
    <div class="facts">
      ${fact("Tipo", esc(c.tipo), "tipo", c)}
      ${fact("Prioridade", priPill(c.pri), "pri", c)}
      ${fact("Categoria", `<span class="pill" style="color:${catColor(c.cat)}">${esc(c.cat)}</span>`, "cat", c)}
      ${fact("Prazo", c.prazo ? `<span class="pill ${prazoCls(c.prazo)}">${prazoTxt(c.prazo, true)}</span>` : '<span class="mu">Sem prazo</span>', "prazo", c)}
      ${fact("Valor", c.valor ? valPill(c.valor) : '<span class="mu">—</span>', null, c)}
      ${fact("Ação sugerida", `<b>${esc(fill(c.acao))}</b>`, null, c)}
      ${fact("Responsável", c.resp ? `<span style="display:inline-flex;gap:6px;align-items:center">${avatar(c.resp, "xs")}${esc(membro(c.resp).nome)}</span>` : '<span class="mu">Ninguém</span>', "resp", c)}
      <div class="fact"><span>Confiança</span><span class="conf"><span class="b"><i style="width:${c.conf}%"></i></span><b class="num">${c.conf}%</b></span><span></span></div>
    </div>
    <details class="why"><summary>Por que essa classificação?</summary><ul>${c.motivos.map(m => `<li>${esc(fill(m))}</li>`).join("")}</ul></details>
    ${ts.length ? `<div class="linked"><h3>${I("task", 15)}Tarefas desta conversa</h3>${ts.map(t => `<button data-a="topen" data-id="${t.id}"><span class="check${t.feita ? " on" : ""}">${t.feita ? I("check", 12, 3) : ""}</span><span style="flex:1;min-width:0">${esc(t.titulo)}<small class="mu" style="display:block">${prazoTxt(t.prazo)}${t.origens.length > 1 ? ` · pedida em ${t.origens.length} conversas` : ""}</small></span></button>`).join("")}</div>` : ""}
    ${dup ? `<p class="note">${I("layers", 14)}<span>${dup.valor ? "Esta conta" : "Este pedido"} também aparece em ${dup.origens.filter(o => o !== c.id).map(o => `${esc(contato(C(o).contato).nome)} (${esc(canal(C(o).canal).nome.replace(" Business", ""))})`).join(", ")}. O Assistence juntou tudo em uma tarefa só.</span></p>` : ""}
  </div>`;
}
const fact = (l, v, f, c) => `<div class="fact"><span>${l}</span><span>${v}</span>${f ? `<button class="edit" data-a="edit" data-id="${c.id}" data-f="${f}" aria-label="Corrigir ${l.toLowerCase()}" title="Corrigir">${I("edit", 13)}</button>` : "<span></span>"}</div>`;

/* tarefas */
const COLS = [["atrasadas", "Atrasadas"], ["hoje", "Hoje"], ["semana", "Próximos 7 dias"], ["depois", "Depois"], ["sem", "Sem prazo"]];
function tasksFiltered() { let l = S.tasks.slice(); if (ui.tview === "minhas") l = l.filter(t => t.resp === "camila"); return l; }
function tkCard(t) {
  const o = t.origens.map(C).filter(Boolean);
  return `<div class="tk${t.feita ? " done" : ""}" data-tid="${t.id}"><div class="t1"><button class="check${t.feita ? " on" : ""}" data-a="ttoggle" data-id="${t.id}" aria-label="${t.feita ? "Reabrir" : "Concluir"} tarefa">${t.feita ? I("check", 12, 3) : ""}</button><b>${esc(t.titulo)}</b></div>
    <div class="t2">${priPill(t.pri)}${t.prazo ? `<span class="pill ${prazoCls(t.prazo)}">${prazoTxt(t.prazo)}</span>` : ""}${t.valor ? valPill(t.valor) : ""}</div>
    <div class="t2">${o.length ? o.map(c => `<button class="orig" data-a="open" data-id="${c.id}" title="Abrir conversa de origem">${chIcon(c.canal, true)}${esc(contato(c.contato).nome.split(" ")[0])}</button>`).join("") : '<span>Criada manualmente</span>'}${avatar(t.resp, "xs")}</div></div>`;
}
function tarefasDesk() {
  const l = tasksFiltered(); const op = l.filter(t => !t.feita); const done = l.filter(t => t.feita);
  return `<div class="pad"><div class="page-h"><div><h1>Tarefas</h1><p>Encontradas nas mensagens dos três canais e organizadas por prazo.</p></div>
    <div style="display:flex;gap:8px;align-items:center"><div class="seg">${[["equipe", "Toda a equipe"], ["minhas", "Minhas"]].map(([k, t]) => `<button class="${ui.tview === k ? "on" : ""}" data-a="tview" data-k="${k}">${t}</button>`).join("")}</div><button class="btn" data-a="newtask">${I("plus", 15)}Nova tarefa</button></div></div>
    <div class="board">${COLS.map(([k, t]) => { const its = op.filter(x => bucket(x) === k).sort(sortPrazo); return `<section class="col${k === "atrasadas" ? " late" : ""}"><div class="col-h">${t}<span class="n">${its.length}</span></div>${its.length ? its.map(tkCard).join("") : '<div class="empty" style="padding:14px 6px">Nada aqui</div>'}</section>`; }).join("")}</div>
    ${done.length ? `<details class="card why" style="box-shadow:none"><summary>Concluídas (${done.length})</summary><div style="display:grid;gap:8px;padding:0 12px 12px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">${done.map(tkCard).join("")}</div></details>` : ""}</div>`;
}

/* contas a pagar */
function contas() { return S.tasks.filter(t => t.valor).sort((a, b) => (a.feita - b.feita) || sortPrazo(a, b)); }
function contasView() {
  const l = contas(); const k = kpis();
  const rec = l.filter(t => t.valor.sentido === "receber" && !t.feita).reduce((a, t) => a + t.valor.v, 0);
  const pagas = l.filter(t => t.valor.sentido === "pagar" && t.feita);
  return `<div class="page-h"><div><h1>Contas a pagar</h1><p>Boletos, guias, faturas e cobranças encontrados nas mensagens, somados por vencimento.</p></div></div>
    <div class="bill-sum">
      <div class="card kpi"><span>${I("money", 14)}A pagar em 7 dias</span><b class="red num">${brl(k.pagar)}</b><small>${k.nPagar} contas abertas</small></div>
      <div class="card kpi"><span>${I("money", 14)}A receber</span><b class="num" style="color:var(--lo)">${brl(rec)}</b><small>boletos que você precisa emitir</small></div>
      <div class="card kpi"><span>${I("check", 14)}Marcadas como pagas</span><b class="num">${pagas.length}</b><small>nesta demonstração</small></div>
    </div>
    <div class="card">${l.map(t => { const o = t.origens.map(C).filter(Boolean); const pay = t.valor.sentido === "pagar"; return `<div class="bill${t.feita ? " paid" : ""}">${o[0] ? chIcon(o[0].canal) : '<span class="ch" style="background:var(--mu)"></span>'}
      <div style="min-width:0"><b>${esc(t.titulo)}${o.length > 1 ? `<span class="dup">${I("layers", 11)}recebida por ${o.map(c => canal(c.canal).nome.replace(" Business", "")).join(" e ")}</span>` : ""}</b><small>${pay ? "Vencimento" : "Emitir até"}: ${prazoTxt(t.prazo, true)}${o[0] ? " · " + esc(contato(o[0].contato).nome) : ""}${t.feita ? (pay ? " · marcada como paga" : " · emitido") : ""}</small></div>
      <span class="amt ${pay ? "" : ""}" style="color:${pay ? "var(--tx)" : "var(--lo)"}">${pay ? "" : "+ "}${brl(t.valor.v)}</span>
      <span style="display:flex;gap:6px">${o[0] ? `<button class="btn ghost" data-a="open" data-id="${o[0].id}">Ver mensagem</button>` : ""}<button class="btn ${t.feita ? "sec" : "ok"}" data-a="ttoggle" data-id="${t.id}">${t.feita ? "Desfazer" : pay ? "Marcar como paga" : "Marcar como emitido"}</button></span></div>`; }).join("")}</div>
    <p class="note">${I("info", 14)}<span>O Assistence identifica e soma as contas, mas não faz pagamentos. Um boleto nunca é tratado como comprovante de pagamento.</span></p>`;
}

/* contatos */
function contatosView() {
  const people = D.contatos.map(ct => { const cs = S.conv.filter(c => c.contato === ct.id); if (!cs.length) return null; const pend = S.tasks.filter(t => !t.feita && t.origens.some(o => cs.find(c => c.id === o))).length; return { ct, cs, pend, lt: Math.max.apply(null, cs.map(last)) }; }).filter(Boolean).sort((a, b) => b.cs.length - a.cs.length || b.lt - a.lt);
  return `<div class="page-h"><div><h1>Contatos frequentes</h1><p>Cada pessoa com as conversas de todos os canais reunidas.</p></div></div>
    <div class="people">${people.map(p => `<button class="card person" data-a="contato" data-c="${p.ct.id}"><div class="ph">${cAvatar(p.ct.id)}<div style="min-width:0"><b>${esc(p.ct.nome)}</b><small>${esc(p.ct.org)}</small></div></div>
      <div class="pm">${[...new Set(p.cs.map(c => c.canal))].map(ch => chIcon(ch, true)).join("")}<span>${p.cs.length} ${p.cs.length > 1 ? "conversas" : "conversa"}</span><span>· última ${when(p.lt)}</span></div>
      <div class="pm">${p.pend ? `<span class="pill me">${p.pend} ${p.pend > 1 ? "pendências" : "pendência"}</span>` : '<span class="pill lo">Sem pendências</span>'}${p.cs.some(c => c.aguardando && !c.resolvida) ? '<span class="pill hi">Aguarda resposta</span>' : ""}</div></button>`).join("")}</div>`;
}

/* relatórios */
function relatoriosView() {
  const R = D.relatorio; const maxV = Math.max.apply(null, Object.values(R.volume));
  const porResp = D.equipe.concat([{ id: null, nome: "Sem responsável" }]).map(m => ({ m, n: openTasks().filter(t => t.resp === m.id).length }));
  const maxR = Math.max(1, ...porResp.map(x => x.n));
  const cats = D.categorias.map(c => ({ c, n: S.conv.filter(x => x.cat === c).length })); const maxC = Math.max(...cats.map(x => x.n));
  return `<div class="page-h"><div><h1>Relatórios</h1><p>Visão da equipe na última semana. Números de exemplo da demonstração.</p></div></div>
    <div class="rep">
      <div class="card"><div class="sec-h"><h3>${I("layers", 15)}Mensagens recebidas por canal</h3><span class="mu" style="font-size:12px">últimos 7 dias</span></div><div class="bars">${D.canais.map(c => `<div><span style="display:flex;gap:7px;align-items:center">${chIcon(c.id, true)}${esc(c.nome.replace(" Business", ""))}</span><span class="b"><i style="width:${R.volume[c.id] / maxV * 100}%;background:${c.cor}"></i></span><b>${R.volume[c.id]}</b></div>`).join("")}</div></div>
      <div class="card"><div class="sec-h"><h3>${I("clock", 15)}Tempo médio de resposta</h3></div><div class="bars">${D.canais.map(c => `<div><span style="display:flex;gap:7px;align-items:center">${chIcon(c.id, true)}${esc(c.nome.replace(" Business", ""))}</span><span></span><b style="text-align:left;white-space:nowrap">${R.resposta[c.id]}</b></div>`).join("")}<div style="grid-template-columns:1fr;border-top:1px solid var(--bd);padding-top:12px"><span class="mu">Tempo poupado com a triagem automática: <b style="color:var(--tx)">${R.tempoPoupado}</b> na semana</span></div></div></div>
      <div class="card"><div class="sec-h"><h3>${I("users", 15)}Pendências por pessoa</h3><span class="mu" style="font-size:12px">agora</span></div><div class="bars">${porResp.map(x => `<div><span style="display:flex;gap:7px;align-items:center">${avatar(x.m.id, "xs")}${esc(x.m.nome.split(" ")[0])}</span><span class="b"><i style="width:${x.n / maxR * 100}%"></i></span><b>${x.n}</b></div>`).join("")}</div></div>
      <div class="card"><div class="sec-h"><h3>${I("layers", 15)}Conversas por categoria</h3><span class="mu" style="font-size:12px">agora</span></div><div class="bars">${cats.map(x => `<div><span>${esc(x.c)}</span><span class="b"><i style="width:${x.n / maxC * 100}%;background:${catColor(x.c)}"></i></span><b>${x.n}</b></div>`).join("")}</div></div>
    </div>
    <div class="card" style="padding:14px 16px"><span class="mu">Correções feitas por você nesta demonstração: <b style="color:var(--tx)">${S.correcoes}</b>. Cada correção ensina o Assistence a classificar melhor as próximas mensagens.</span></div>`;
}

/* configurações */
function configView() {
  return `<div class="page-h"><div><h1>Configurações</h1><p>Canais, regras e notificações da demonstração.</p></div></div>
    <div class="card" style="padding:14px 16px;border-color:var(--me);background:var(--me-s)"><p style="display:flex;gap:10px;align-items:flex-start;color:var(--tx2)">${I("info", 16)}<span><b>Conexões demonstrativas.</b> Gmail, Outlook e WhatsApp aparecem conectados apenas para ilustrar como o Assistence reúne os canais. Nenhuma conta real está ligada a esta demonstração, e nada do que você faz aqui sai deste navegador.</span></p></div>
    <div class="conn">${D.canais.map(c => `<div class="card">${chIcon(c.id)}<div><b>${esc(c.nome)}</b><div class="mu" style="font-size:12.5px">${esc(c.conta)}</div></div><span class="st"><i></i>Conectado · demonstrativo</span><span class="mu" style="font-size:12.5px">${S.conv.filter(x => x.canal === c.id).length} conversas de exemplo</span></div>`).join("")}</div>
    <div class="card"><div class="sec-h"><h3>${I("layers", 15)}Regras de organização</h3></div>${S.regras.map(r => `<div class="rule"><span style="flex:1">${esc(r.nome)}</span><button class="sw" role="switch" aria-checked="${r.ativa}" aria-label="${esc(r.nome)}" data-a="rule" data-id="${r.id}"></button></div>`).join("")}</div>
    <div class="card"><div class="sec-h"><h3>${I("bell", 15)}Notificações</h3></div>
      ${[["alta", "Avisar só mensagens de prioridade alta"], ["resumo", "Resumo do dia às 8h"], ["equipe", "Avisar quando uma conversa for atribuída a mim"]].map(([k, t]) => `<div class="rule"><span style="flex:1">${t}</span><button class="sw" role="switch" aria-checked="${S.prefs[k]}" aria-label="${t}" data-a="pref" data-k="${k}"></button></div>`).join("")}</div>
    <div class="card" style="padding:16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><b>Recomeçar a demonstração</b><p class="mu" style="font-size:13px">Volta todas as conversas, tarefas e regras ao estado inicial.</p></div><button class="btn sec" data-a="reset">${I("reset", 15)}Recomeçar</button></div>`;
}

/* busca */
const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const digits = s => String(s).replace(/[^\d]/g, "");
function search(q) {
  const words = norm(q).split(/\s+/).filter(Boolean); if (!words.length) return { conv: [], tasks: [] };
  const match = txt => { const n = norm(txt), dg = digits(txt); return words.every(w => n.includes(w) || (digits(w).length >= 3 && dg.includes(digits(w)))); };
  const conv = S.conv.filter(c => match([contato(c.contato).nome, contato(c.contato).org, fill(c.assunto), fill(c.resumo), c.cat, c.tipo, canal(c.canal).nome, fill(c.acao), prazoTxt(c.prazo), c.valor ? brl(c.valor.v) + " " + c.valor.v : "", c.anexos.map(a => a.nome).join(" "), c.msgs.map(m => fill(m.txt)).join(" ")].join(" ")));
  const tasks = S.tasks.filter(t => match([t.titulo, prazoTxt(t.prazo), t.valor ? brl(t.valor.v) + " " + t.valor.v : "", membro(t.resp) ? membro(t.resp).nome : ""].join(" ")));
  return { conv, tasks };
}
function hl(txt) { const ws = norm(ui.q).split(/\s+/).filter(w => w.length > 1); let out = esc(txt); ws.forEach(w => { const n = norm(out); const i = n.indexOf(norm(esc(w))); if (i >= 0) out = out.slice(0, i) + "<mark>" + out.slice(i, i + w.length) + "</mark>" + out.slice(i + w.length); }); return out; }
function buscaView() {
  const r = search(ui.q);
  const sugs = ["boleto", "Sérgio", "2.180", "planta", "reunião", "pdf"];
  const head = mode === "mob" ? `<div class="msearch"><input id="mq" type="search" placeholder="Buscar por nome, valor, prazo, anexo…" aria-label="Buscar" value="${esc(ui.q)}"></div>` : "";
  if (!ui.q.trim()) return `${head}<div class="sres"><p class="mu">Experimente buscar:</p><div class="chips">${sugs.map(s => `<button class="chip" data-a="tryq" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
  let i = 0;
  return `${head}<div class="sres"><p class="mu">${r.conv.length + r.tasks.length} resultados para “${esc(ui.q)}”</p>
    ${r.conv.length ? `<div><h3>Conversas</h3>${r.conv.map(c => `<button class="hit${ui.kb === i++ ? " kb" : ""}" data-a="open" data-id="${c.id}">${chIcon(c.canal)}<span class="hx"><b>${hl(contato(c.contato).nome)} · ${hl(fill(c.assunto))}</b><span>${hl(fill(c.resumo))}</span></span>${c.valor ? valPill(c.valor) : ""}</button>`).join("")}</div>` : ""}
    ${r.tasks.length ? `<div><h3>Tarefas e contas</h3>${r.tasks.map(t => `<button class="hit${ui.kb === i++ ? " kb" : ""}" data-a="topen" data-id="${t.id}"><span class="check${t.feita ? " on" : ""}">${t.feita ? I("check", 12, 3) : ""}</span><span class="hx"><b>${hl(t.titulo)}</b><span>${prazoTxt(t.prazo, true)}${t.valor ? " · " + brl(t.valor.v) : ""}</span></span></button>`).join("")}</div>` : ""}
    ${!r.conv.length && !r.tasks.length ? `<div class="empty">Nada encontrado. Tente o nome de um contato, um valor ou o nome de um anexo.</div>` : ""}</div>`;
}

/* ---------------- vistas do celular ---------------- */
const MT = [["inicio", "Início", "home"], ["caixa", "Caixa", "inbox"], ["tarefas", "Tarefas", "task"], ["contas", "Contas", "money"], ["mais", "Mais", "more"]];
const MSUB = { contatos: "Contatos", relatorios: "Relatórios", config: "Configurações", busca: "Buscar", prioridades: "Prioridades" };
function mtabs() {
  const k = kpis(); const cur = MSUB[ui.view] ? (ui.view === "prioridades" ? "inicio" : "mais") : ui.view === "painel" ? "inicio" : ui.view;
  $("#mtabs").innerHTML = MT.map(([v, l, i]) => `<button class="${cur === v ? "on" : ""}" data-a="go" data-v="${v}" aria-current="${cur === v ? "page" : "false"}">${I(i, 22)}<span>${l}</span>${v === "caixa" && k.naoLidas ? `<span class="badge">${k.naoLidas}</span>` : ""}</button>`).join("");
  const t = { inicio: "Início", painel: "Início", caixa: "Caixa unificada", tarefas: "Tarefas", contas: "Contas a pagar", mais: "Mais" }[ui.view] || MSUB[ui.view] || "";
  $("#mtitle").textContent = t;
  $("#mback").hidden = !MSUB[ui.view];
}
function mobView() {
  switch (ui.view) {
    case "caixa": return mCaixa(false);
    case "prioridades": return mCaixa(true);
    case "tarefas": return mTarefas();
    case "contas": return `<div class="pad" style="padding:14px 14px 24px">${contasView()}</div>`;
    case "mais": return mMais();
    case "contatos": return `<div class="pad" style="padding:14px 14px 24px">${contatosView()}</div>`;
    case "relatorios": return `<div class="pad" style="padding:14px 14px 24px">${relatoriosView()}</div>`;
    case "config": return `<div class="pad" style="padding:14px 14px 24px">${configView()}</div>`;
    case "busca": return buscaView();
    default: return mInicio();
  }
}
function mRow(c) {
  const lm = c.msgs[c.msgs.length - 1];
  return `<button class="mrow pri${!c.lida ? " unread" : ""}${c._new ? " row-new" : ""}" style="--c:var(--${PRI[c.pri][0]})" data-a="open" data-id="${c.id}">${chIcon(c.canal)}
    <span class="l1"><b>${esc(contato(c.contato).nome)}</b><time>${when(last(c))}</time></span>
    <span class="l2">${esc(fill(c.acao) !== "Nenhuma ação necessária" ? fill(c.acao) : fill(lm.txt).replace(/\n+/g, " "))}</span>
    <span class="l3">${c.prazo && !c.resolvida ? `<span class="pill ${prazoCls(c.prazo)}">${prazoTxt(c.prazo)}</span>` : ""}${c.valor ? valPill(c.valor) : ""}<span class="pill">${esc(c.cat)}</span></span></button>`;
}
function mInicio() {
  const k = kpis(); const pri = S.conv.filter(c => c.pri === "alta" && !c.resolvida).sort(sortPrazo);
  const hoje = openTasks().filter(t => t.prazo && t.prazo.d <= 0).sort(sortPrazo);
  return `<div><div class="mhello"><span class="demo-tag" style="justify-self:start">${I("info", 12, 2.4)}Demonstração · dados fictícios</span><h2>${saudacao()}, Camila</h2><p class="mu">${hojeLongo()}</p></div>
    <div class="msec"><div class="card resume" style="border-radius:16px"><h3>${I("spark", 15)}Resumo do dia</h3><p style="font-size:14px">${resumoTxt()}</p></div></div>
    <div class="msec"><div class="mk"><button data-a="go" data-v="prioridades"><b class="red">${k.altas}</b><span>Prioridade alta</span></button><button data-a="go" data-v="tarefas"><b>${k.hoje + k.atrasadas}</b><span>Para hoje e atrasadas</span></button><button data-a="go" data-v="contas"><b class="num">${curto(k.pagar)}</b><span>A pagar em 7 dias</span></button></div></div>
    <div class="msec"><div class="msec-h"><h3>Prioridades</h3><button class="link" data-a="go" data-v="prioridades">Ver todas</button></div><div class="mcard">${pri.slice(0, 4).map(mRow).join("") || '<div class="empty">Nada urgente agora.</div>'}</div></div>
    <div class="msec"><div class="msec-h"><h3>Para hoje</h3><button class="link" data-a="go" data-v="tarefas">Tarefas</button></div><div class="mcard">${hoje.length ? hoje.map(mTask).join("") : '<div class="empty">Nada para hoje.</div>'}</div></div>
    <div class="msec" style="padding-bottom:18px"><button class="btn sec" style="width:100%;padding:12px" data-a="sim" ${S.roteiro >= D.roteiro.length ? "disabled" : ""}>${I("spark", 15)}${S.roteiro >= D.roteiro.length ? "Todas as mensagens de exemplo já chegaram" : "Simular nova mensagem"}</button></div></div>`;
}
function mCaixa(forPri) {
  const l = convList(forPri);
  const filt = [["todas", "Todas"], ["naolidas", "Não lidas"], ["prioritarias", "Prioritárias"], ["aguardando", "Aguardando"], ["anexo", "Com anexo"], ["resolvidas", "Resolvidas"]];
  const extra = ui.cat ? `<button class="chip on" data-a="clearf">${esc(ui.cat)} ${I("x", 12)}</button>` : ui.contato ? `<button class="chip on" data-a="clearf">${esc(contato(ui.contato).nome)} ${I("x", 12)}</button>` : "";
  return `<div><div style="padding:12px 16px 8px;background:var(--sf);border-bottom:1px solid var(--bd);display:grid;gap:10px">${chSeg()}</div>
    ${forPri ? (extra ? `<div class="mscroll" style="padding-top:10px">${extra}</div>` : "") : `<div class="mscroll" style="padding-top:10px">${extra}${filt.map(([k, t]) => `<button class="chip${ui.filtro === k ? " on" : ""}" data-a="filtro" data-f="${k}">${t}</button>`).join("")}</div>`}
    <div class="mcard" style="margin:0 12px 16px">${l.length ? l.map(mRow).join("") : '<div class="empty">Nenhuma conversa neste filtro.</div>'}</div></div>`;
}
function mTask(t) {
  const o = t.origens.map(C).filter(Boolean);
  return `<div class="mtask${t.feita ? " done" : ""}" data-tid="${t.id}"><button class="check${t.feita ? " on" : ""}" style="width:24px;height:24px" data-a="ttoggle" data-id="${t.id}" aria-label="${t.feita ? "Reabrir" : "Concluir"} tarefa">${t.feita ? I("check", 13, 3) : ""}</button>
    <button class="tx" style="text-align:left" ${o[0] ? `data-a="open" data-id="${o[0].id}"` : ""}><b>${esc(t.titulo)}</b><small>${o[0] ? chIcon(o[0].canal, true) : ""}<span class="pill ${prazoCls(t.prazo)}">${prazoTxt(t.prazo)}</span>${t.valor ? valPill(t.valor) : ""}${avatar(t.resp, "xs")}</small></button></div>`;
}
function mTarefas() {
  const l = tasksFiltered(); const op = l.filter(t => !t.feita); const done = l.filter(t => t.feita);
  return `<div><div style="padding:12px 16px;display:flex;gap:8px;align-items:center;justify-content:space-between;background:var(--sf);border-bottom:1px solid var(--bd)"><div class="seg">${[["equipe", "Equipe"], ["minhas", "Minhas"]].map(([k, t]) => `<button class="${ui.tview === k ? "on" : ""}" data-a="tview" data-k="${k}">${t}</button>`).join("")}</div><button class="btn" data-a="newtask">${I("plus", 15)}Nova</button></div>
    ${COLS.map(([k, t]) => { const its = op.filter(x => bucket(x) === k).sort(sortPrazo); if (!its.length) return ""; return `<div class="mgroup${k === "atrasadas" ? " late" : ""}">${t}<span>${its.length}</span></div><div class="mcard" style="margin:0 12px">${its.map(mTask).join("")}</div>`; }).join("")}
    ${done.length ? `<div class="mgroup">Concluídas<span>${done.length}</span></div><div class="mcard" style="margin:0 12px 16px">${done.map(mTask).join("")}</div>` : ""}</div>`;
}
function mMais() {
  const it = (v, l, i, extra = "") => `<button class="li" data-a="go" data-v="${v}"><span class="ic">${I(i, 17)}</span>${l}${extra}${I("arrow", 16)}</button>`;
  return `<div style="padding:14px 12px;display:grid;gap:14px">
    <div class="mcard mlist">${it("prioridades", "Prioridades", "star")}${it("contatos", "Contatos frequentes", "users")}${it("relatorios", "Relatórios", "chart")}${it("busca", "Buscar", "search")}</div>
    <div class="mcard mlist">${it("config", "Canais, regras e notificações", "gear")}<button class="li" data-a="sim" ${S.roteiro >= D.roteiro.length ? "disabled" : ""}><span class="ic">${I("spark", 17)}</span>Simular nova mensagem${I("arrow", 16)}</button>${top === window ? `<a class="li" href="../"><span class="ic">${I("link", 17)}</span>Voltar ao site${I("arrow", 16)}</a>` : ""}</div>
    <div class="card" style="padding:14px;border-color:var(--me);background:var(--me-s);font-size:13px;color:var(--tx2)"><b>Demonstração com dados fictícios.</b> Gmail, Outlook e WhatsApp aparecem como conexões demonstrativas. Nada do que você faz aqui é enviado ou salvo fora deste navegador.</div></div>`;
}

/* tela de conversa no celular */
function openS2(id) {
  const c = C(id); if (!c) return;
  ui.s2 = id; c.lida = true; markNotif(id);
  let el = $("#s2"); if (!el) { el = document.createElement("div"); el.id = "s2"; el.className = "screen2"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); document.body.appendChild(el); }
  el.classList.remove("out");
  drawS2();
  render(true);
}
function drawS2() {
  const c = C(ui.s2); const el = $("#s2"); if (!c || !el) return;
  const ct = contato(c.contato); const ts = tasksOf(c); const tk = ts.find(t => !t.feita);
  el.innerHTML = `<div class="s2top"><button class="icb" data-a="s2close" aria-label="Voltar">${I("back", 22)}</button>${cAvatar(c.contato, "sm")}<div class="tt"><b>${esc(ct.nome)}</b><small>${chIcon(c.canal, true)}${esc(canal(c.canal).nome)} · demonstrativo</small></div></div>
    <div class="s2body">
      <div class="s2info"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b style="font-size:13px;display:flex;gap:6px;align-items:center">${I("spark", 14)}Informações identificadas</b><span class="mu num" style="font-size:12px">${c.conf}% de confiança</span></div>
        <p class="sum">${esc(fill(c.resumo))}</p>
        <div class="tags">${priPill(c.pri)}<span class="pill">${esc(c.cat)}</span><span class="pill">${esc(c.tipo)}</span>${c.prazo ? `<span class="pill ${prazoCls(c.prazo)}">${prazoTxt(c.prazo, true)}</span>` : ""}${c.valor ? valPill(c.valor) : ""}</div>
        <p style="font-size:13.5px"><span class="mu">Ação sugerida:</span> <b>${esc(fill(c.acao))}</b></p>
        <p style="font-size:13px;display:flex;gap:6px;align-items:center"><span class="mu">Responsável:</span> ${c.resp ? avatar(c.resp, "xs") + esc(membro(c.resp).nome) : "ninguém"}</p>
        <details class="why"><summary>Por que essa classificação?</summary><ul>${c.motivos.map(m => `<li>${esc(fill(m))}</li>`).join("")}</ul></details>
        <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="chip" data-a="edit" data-id="${c.id}" data-f="pri">${I("edit", 12)}Prioridade</button><button class="chip" data-a="edit" data-id="${c.id}" data-f="cat">${I("edit", 12)}Categoria</button><button class="chip" data-a="edit" data-id="${c.id}" data-f="prazo">${I("edit", 12)}Prazo</button></div>
      </div>
      <h2 style="font-size:16px;padding:0 4px">${esc(fill(c.assunto))}</h2>
      ${thread(c)}
      ${ts.length ? `<div class="mcard">${ts.map(mTask).join("")}</div>` : ""}
    </div>
    <div class="s2bar"><button data-a="reply" data-id="${c.id}">${I("reply", 20)}Responder</button>${tk ? `<button data-a="ttoggle" data-id="${tk.id}">${I("task", 20)}Concluir tarefa</button>` : `<button data-a="mktask" data-id="${c.id}">${I("plus", 20)}Criar tarefa</button>`}<button data-a="assign" data-id="${c.id}">${I("user", 20)}${c.resp ? esc(membro(c.resp).nome.split(" ")[0]) : "Atribuir"}</button><button class="${c.resolvida ? "on" : ""}" data-a="resolve" data-id="${c.id}">${I("check", 20)}${c.resolvida ? "Resolvida" : "Resolver"}</button></div>`;
}
function closeS2() {
  const el = $("#s2"); ui.s2 = null; if (!el) return;
  if (calm) { el.remove(); render(true); return; }
  el.classList.add("out"); setTimeout(() => { el.remove(); }, 230); render(true);
}

/* ---------------- janelas (no celular, folhas que sobem) ---------------- */
function modal(title, body, onMount) {
  closeModal();
  const scrim = document.createElement("div"); scrim.className = "scrim"; scrim.id = "scrim"; scrim.dataset.a = "mclose";
  const m = document.createElement("div"); m.className = "modal"; m.id = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", title);
  m.innerHTML = `<div class="grab"></div><div class="modal-h"><h3>${esc(title)}</h3><button class="icb" data-a="mclose" aria-label="Fechar">${I("x", 18)}</button></div><div class="modal-b">${body}</div>`;
  document.body.append(scrim, m); ui.modal = true;
  const f = m.querySelector("textarea,input,select,.opt,.btn"); if (f && isDesk()) setTimeout(() => f.focus(), 30);
  if (onMount) onMount(m);
}
function closeModal() { const a = $("#modal"), b = $("#scrim"); if (a) a.remove(); if (b) b.remove(); ui.modal = null; }

function replyModal(id) {
  const c = C(id);
  modal(`Responder ${contato(c.contato).nome}`, `
    <p class="mu" style="font-size:13px">Pelo ${esc(canal(c.canal).nome)} · conexão demonstrativa</p>
    ${c.sugestoes.length ? `<div class="fld"><label>Respostas sugeridas</label><div class="sugs">${c.sugestoes.map((s, i) => `<button class="sug" data-a="usesug" data-i="${i}">${esc(fill(s))}</button>`).join("")}</div></div>` : ""}
    <div class="fld"><label for="rtxt">Sua resposta</label><textarea id="rtxt" placeholder="Escreva aqui…"></textarea></div>
    <p class="note">${I("info", 14)}<span>Na demonstração, a resposta aparece na conversa, mas nada é enviado de verdade.</span></p>
    <div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn sec" data-a="mclose">Cancelar</button><button class="btn" data-a="send" data-id="${c.id}">${I("send", 15)}Enviar (simulado)</button></div>`);
}
function assignModal(id) {
  const c = C(id);
  modal("Atribuir conversa", `<div style="display:grid;gap:8px">${D.equipe.map(m => `<button class="opt${c.resp === m.id ? " on" : ""}" data-a="setresp" data-id="${c.id}" data-m="${m.id}">${avatar(m.id)}<span><b>${esc(m.nome)}</b><small>${esc(m.papel)} · ${openTasks().filter(t => t.resp === m.id).length} pendências</small></span></button>`).join("")}
    <button class="opt${!c.resp ? " on" : ""}" data-a="setresp" data-id="${c.id}" data-m="">${avatar(null)}<span><b>Sem responsável</b><small>Fica visível para toda a equipe</small></span></button></div>`);
}
const EDITS = {
  pri: ["Prioridade", ["alta", "media", "baixa"], v => PRI[v][1]],
  cat: ["Categoria", D.categorias, v => v],
  tipo: ["Tipo", ["Pedido", "Pergunta", "Proposta", "Aprovação", "Cobrança", "Reunião", "Compromisso", "Documento", "Informativo", "Newsletter"], v => v],
  prazo: ["Prazo", [0, 1, 2, 3, 5, 7, null], v => v === null ? "Sem prazo" : prazoTxt({ d: v }, true)],
  resp: ["Responsável", D.equipe.map(m => m.id).concat([null]), v => v ? membro(v).nome : "Sem responsável"]
};
function editModal(id, f) {
  const c = C(id); const [title, opts, lab] = EDITS[f];
  const cur = f === "prazo" ? (c.prazo ? c.prazo.d : null) : c[f];
  modal(`Corrigir ${title.toLowerCase()}`, `<p class="mu" style="font-size:13px">O Assistence classificou como <b style="color:var(--tx)">${esc(lab(cur))}</b>. Escolha o correto:</p>
    <div style="display:grid;gap:8px">${opts.map(o => `<button class="opt${o === cur ? " on" : ""}" data-a="setf" data-id="${c.id}" data-f="${f}" data-v="${o === null ? "" : esc(o)}">${f === "pri" ? `<span class="dot ${PRI[o][0]}"></span>` : ""}<span><b>${esc(lab(o))}</b></span></button>`).join("")}</div>
    <p class="note">${I("spark", 14)}<span>Cada correção ensina o Assistence a classificar melhor as próximas mensagens parecidas.</span></p>`);
}
function newTaskModal(fromConv) {
  const c = fromConv ? C(fromConv) : null;
  modal(c ? "Criar tarefa desta conversa" : "Nova tarefa", `
    <div class="fld"><label for="ntt">Tarefa</label><input id="ntt" value="${c ? esc(fill(c.acao)) : ""}" placeholder="Ex.: Ligar para o fornecedor"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="fld"><label for="ntp">Prazo</label><select id="ntp">${[0, 1, 2, 3, 5, 7, 14].map(d => `<option value="${d}"${c && c.prazo && c.prazo.d === d ? " selected" : ""}>${prazoTxt({ d }, true)}</option>`).join("")}<option value=""${c && !c.prazo ? " selected" : ""}>Sem prazo</option></select></div>
    <div class="fld"><label for="ntr">Responsável</label><select id="ntr">${D.equipe.map(m => `<option value="${m.id}"${(c ? c.resp : "camila") === m.id ? " selected" : ""}>${esc(m.nome)}</option>`).join("")}</select></div></div>
    <div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn sec" data-a="mclose">Cancelar</button><button class="btn" data-a="savetask" data-id="${c ? c.id : ""}">${I("plus", 15)}Criar tarefa</button></div>`);
}
function notifPop(anchor) {
  const list = S.notifs.slice().sort((a, b) => b.ts - a.ts);
  const body = list.length ? list.map(n => `<button class="nt${!n.lida ? " new" : ""}" data-a="open" data-id="${n.conv}">${chIcon(C(n.conv) ? C(n.conv).canal : "gmail", true)}<span><b>${esc(n.titulo)}</b><span>${esc(n.txt)}</span></span><span class="mu" style="margin-left:auto;font-size:11.5px">${when(n.ts)}</span></button>`).join("") : '<div class="empty">Sem notificações.</div>';
  if (!isDesk()) { modal("Notificações", `<div class="mcard">${body}</div><p class="note">${I("bell", 14)}<span>Só mensagens de prioridade alta geram aviso, para não interromper você à toa.</span></p>`); S.notifs.forEach(n => n.lida = true); render(true); return; }
  closePop();
  const r = anchor.getBoundingClientRect();
  const p = document.createElement("div"); p.className = "pop"; p.id = "pop"; p.style.top = (r.bottom + 8) + "px"; p.style.right = (innerWidth - r.right) + "px";
  p.innerHTML = `<h4>Notificações<span class="mu" style="font-weight:500">só prioridade alta</span></h4><div style="max-height:360px;overflow:auto">${body}</div>`;
  document.body.appendChild(p); ui.pop = true;
  S.notifs.forEach(n => n.lida = true); setTimeout(() => render(true), 0);
}
function closePop() { const p = $("#pop"); if (p) p.remove(); ui.pop = false; }
function markNotif(id) { S.notifs.forEach(n => { if (n.conv === id) n.lida = true; }); }

/* ---------------- ações ---------------- */
function go(v) {
  closePop();
  if (v === "inicio") v = "painel";
  if (v === "caixa") { ui.cat = null; ui.contato = null; }
  if (v !== "busca") { ui.q = ""; const q = $("#q"); if (q) q.value = ""; } else { ui.prev = ui.view === "busca" ? ui.prev : ui.view; }
  ui.view = v; ui.kb = -1;
  render();
  const vw = $("#view"); if (vw) vw.scrollTop = 0;
  if (v === "busca" && mode === "mob") { const mi = $("#mq"); if (mi) setTimeout(() => mi.focus(), 50); }
}
function openConv(id) {
  const c = C(id); if (!c) return;
  closePop(); closeModal();
  if (mode === "mob") { openS2(id); return; }
  if (ui.view !== "caixa" && ui.view !== "prioridades") { ui.view = c.pri === "alta" && ui.view === "prioridades" ? "prioridades" : "caixa"; ui.cat = null; ui.contato = null; ui.canal = "todos"; ui.filtro = c.resolvida ? "resolvidas" : "todas"; }
  if (ui.view === "caixa" && !convList(false).find(x => x.id === id)) { ui.canal = "todos"; ui.filtro = c.resolvida ? "resolvidas" : "todas"; ui.cat = null; ui.contato = null; }
  ui.sel = id; c.lida = true; markNotif(id); ui.q = ""; const q = $("#q"); if (q) q.value = "";
  render(true);
  const r = document.querySelector(`.row[data-id="${id}"]`); if (r) r.scrollIntoView({ block: "nearest" });
}
function openTask(id) {
  const t = T(id); if (!t) return;
  const o = t.origens.map(C).filter(Boolean)[0];
  if (o) openConv(o.id); else go("tarefas");
}
function toggleTask(id) {
  const t = T(id); if (!t) return;
  const was = t.feita;
  const finish = () => {
    t.feita = !was;
    if (!was) { const msg = t.valor ? (t.valor.sentido === "pagar" ? "Conta marcada como paga" : "Boleto marcado como emitido") : "Tarefa concluída"; toast(msg, t.titulo, { label: "Desfazer", fn: () => { t.feita = false; render(true); if (ui.s2) drawS2(); } }); }
    render(true); if (ui.s2) drawS2();
  };
  const card = document.querySelector(`[data-tid="${id}"]`);
  const btn = card && card.querySelector(".check");
  if (!was && btn && !calm) { btn.classList.add("on"); btn.innerHTML = I("check", 12, 3); setTimeout(() => { card.classList.add("done-out"); setTimeout(finish, 380); }, 220); }
  else finish();
}
function resolve(id) {
  const c = C(id); c.resolvida = !c.resolvida; c.lida = true;
  if (c.resolvida) { toast("Conversa resolvida", contato(c.contato).nome, { label: "Desfazer", fn: () => { c.resolvida = false; render(true); if (ui.s2) drawS2(); } }); if (ui.sel === id && ui.filtro !== "resolvidas" && mode === "desk") { const l = convList(ui.view === "prioridades"); ui.sel = l[0] ? l[0].id : null; } }
  render(true); if (ui.s2) drawS2();
}
function send(id) {
  const c = C(id); const ta = $("#rtxt"); const txt = ta ? ta.value.trim() : "";
  if (!txt) { if (ta) { ta.focus(); ta.style.borderColor = "var(--hi)"; } return; }
  c.msgs.push({ de: "voce", ts: Date.now(), txt, sim: true }); c.aguardando = false; c.lida = true;
  closeModal();
  const open = tasksOf(c).find(t => !t.feita && /responder|confirmar|definir/i.test(t.titulo));
  toast("Resposta registrada na demonstração", "Nada foi enviado de verdade.", open ? { label: "Concluir tarefa", fn: () => toggleTask(open.id) } : null);
  render(true); if (ui.s2) drawS2();
  const th = $("#thread"); if (th) th.scrollTop = th.scrollHeight;
}
function setField(id, f, raw) {
  if (f === "resp") { setResp(id, raw); return; }
  const c = C(id);
  let v = raw === "" ? null : raw;
  if (f === "prazo") { v = v === null ? null : { d: +v, h: null }; c.prazo = v; tasksOf(c).forEach(t => { if (!t.feita) t.prazo = v ? { d: v.d, h: null } : null; }); }
  else if (f === "resp") { c.resp = v; }
  else { c[f] = v; if (f === "pri") tasksOf(c).forEach(t => t.pri = v === "baixa" ? "media" : v); }
  if (f !== "resp") { S.correcoes++; c.conf = 100; c.motivos = ["Corrigido por você"].concat(c.motivos.filter(m => m !== "Corrigido por você")); }
  closeModal();
  toast(f === "resp" ? "Responsável atualizado" : "Correção registrada", f === "resp" ? (v ? membro(v).nome : "Sem responsável") : `O Assistence vai usar essa correção nas próximas mensagens de ${contato(c.contato).nome}.`);
  render(true); if (ui.s2) drawS2();
}
function setResp(id, m) {
  const c = C(id); c.resp = m || null; tasksOf(c).forEach(t => { if (!t.feita) t.resp = c.resp; });
  closeModal();
  toast(m ? `Atribuída a ${membro(m).nome}` : "Sem responsável", m && m !== "camila" ? `${membro(m).nome.split(" ")[0]} foi avisado (simulado).` : "");
  render(true); if (ui.s2) drawS2();
}
function saveTask(fromConv) {
  const tt = $("#ntt"); const titulo = tt.value.trim(); if (!titulo) { tt.focus(); tt.style.borderColor = "var(--hi)"; return; }
  const pv = $("#ntp").value; const id = "t" + (++S.seq);
  const c = fromConv ? C(fromConv) : null;
  S.tasks.push({ id, titulo, origens: c ? [c.id] : [], prazo: pv === "" ? null : { d: +pv, h: null }, resp: $("#ntr").value, pri: c ? (c.pri === "baixa" ? "media" : c.pri) : "media", valor: c && c.valor ? clone(c.valor) : null, feita: false });
  if (c) c.tarefas.push(id);
  closeModal(); toast("Tarefa criada", titulo); render(true); if (ui.s2) drawS2();
}
function simulate() {
  if (S.roteiro >= D.roteiro.length) return;
  const r = clone(D.roteiro[S.roteiro]); S.roteiro++;
  let cid;
  if (r.tipo === "junta") {
    const c = C(r.conversa); cid = c.id;
    c.msgs.push({ de: r.msg.de, ts: Date.now(), txt: r.msg.txt }); c.lida = false; c.resolvida = false; c.aguardando = true;
    Object.assign(c, r.muda);
    const t = T(r.tarefa.id); if (t && !t.feita) t.prazo = r.tarefa.prazo;
  } else {
    const c = r.conversa; c.msgs.forEach(m => { m.ts = Date.now(); delete m.t; }); c.resolvida = false; cid = c.id;
    S.conv.push(c); S.tasks.push(Object.assign({ feita: false }, r.tarefa));
  }
  const c = C(cid); c._new = true; setTimeout(() => { delete c._new; }, 1700);
  S.notifs.push({ id: "n" + Date.now(), conv: cid, titulo: contato(c.contato).nome, txt: r.aviso, ts: Date.now(), lida: false });
  toast(r.aviso, `${canal(c.canal).nome} · organizada como ${PRI[c.pri][1].toLowerCase()} prioridade`, { label: "Abrir", fn: () => openConv(cid) });
  const bell = document.querySelector("#bellN"); if (bell && !calm) { bell.parentElement.classList.remove("bump"); void bell.offsetWidth; bell.parentElement.classList.add("bump"); }
  render(true); if (ui.s2 === cid) drawS2();
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-a]");
  if (ui.pop && !e.target.closest("#pop") && !(el && el.dataset.a === "pop")) closePop();
  if (!el) return;
  const a = el.dataset.a, id = el.dataset.id;
  switch (a) {
    case "go": if (el.dataset.v === "caixa" && mode === "desk") { ui.canal = "todos"; ui.filtro = "todas"; } go(el.dataset.v); break;
    case "open": openConv(id); break;
    case "topen": openTask(id); break;
    case "close": ui.sel = null; render(true); break;
    case "canal": ui.canal = el.dataset.c; ui.cat = null; ui.contato = null; if (ui.view !== "caixa" && ui.view !== "prioridades") { ui.view = "caixa"; ui.filtro = "todas"; } render(true); break;
    case "cat": ui.cat = el.dataset.c; ui.contato = null; ui.canal = "todos"; ui.filtro = "todas"; ui.view = "caixa"; render(); break;
    case "contato": ui.contato = el.dataset.c; ui.cat = null; ui.canal = "todos"; ui.filtro = "todas"; ui.view = "caixa"; render(); break;
    case "clearf": ui.cat = null; ui.contato = null; render(true); break;
    case "filtro": ui.filtro = el.dataset.f; render(true); break;
    case "tview": ui.tview = el.dataset.k; render(true); break;
    case "ttoggle": toggleTask(id); break;
    case "reply": replyModal(id); break;
    case "usesug": { const sb = document.querySelector('#modal [data-a="send"]'); const cc = sb && C(sb.dataset.id); const ta = $("#rtxt"); if (ta && cc) { ta.value = fill(cc.sugestoes[+el.dataset.i]); ta.style.borderColor = ""; ta.focus(); } break; }
    case "send": send(id); break;
    case "assign": assignModal(id); break;
    case "setresp": setResp(id, el.dataset.m); break;
    case "edit": editModal(id, el.dataset.f); break;
    case "setf": setField(id, el.dataset.f, el.dataset.v); break;
    case "resolve": resolve(id); break;
    case "mktask": newTaskModal(id); break;
    case "newtask": newTaskModal(null); break;
    case "savetask": saveTask(id); break;
    case "mclose": closeModal(); break;
    case "sim": simulate(); break;
    case "pop": if (ui.pop) closePop(); else notifPop(el); break;
    case "rule": { const r = S.regras.find(x => x.id === id); r.ativa = !r.ativa; toast(r.ativa ? "Regra ativada" : "Regra pausada", r.nome); render(true); break; }
    case "pref": { const k = el.dataset.k; S.prefs[k] = !S.prefs[k]; render(true); break; }
    case "reset": modal("Recomeçar a demonstração?", `<p>Todas as conversas, tarefas, correções e regras voltam ao estado inicial.</p><div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn sec" data-a="mclose">Cancelar</button><button class="btn" data-a="doreset">${I("reset", 15)}Recomeçar</button></div>`); break;
    case "doreset": S = fresh(); Object.assign(ui, { view: "painel", sel: null, canal: "todos", filtro: "todas", cat: null, contato: null, q: "" }); closeModal(); if (ui.s2) closeS2(); render(); toast("Demonstração reiniciada", "Tudo voltou ao estado inicial."); break;
    case "s2close": closeS2(); break;
    case "mback": go(ui.view === "prioridades" ? "painel" : "mais"); break;
    case "tryq": ui.q = el.dataset.q; { const q = $("#q"); if (q) q.value = ui.q; } if (ui.view !== "busca") ui.prev = ui.view; ui.view = "busca"; render(true); break;
  }
});
document.addEventListener("toggle", e => { if (e.target.classList && e.target.classList.contains("info-inline")) ui.infoInline = e.target.open; }, true);
document.addEventListener("input", e => { if (e.target.id === "mq") { ui.q = e.target.value; const pos = e.target.selectionStart; render(true); const mi = $("#mq"); if (mi) { mi.focus(); try { mi.setSelectionRange(pos, pos); } catch (er) { } } } });

/* atalhos de teclado (computador) */
document.addEventListener("keydown", e => {
  const tag = (e.target.tagName || "").toLowerCase(); const typing = tag === "input" || tag === "textarea" || tag === "select";
  if (e.key === "Escape") {
    if (ui.modal) { closeModal(); return; }
    if (ui.pop) { closePop(); return; }
    if (ui.s2) { closeS2(); return; }
    if (ui.view === "busca") { const q = $("#q"); if (q) { q.value = ""; q.blur(); } ui.q = ""; ui.view = ui.prev; render(true); return; }
    if (ui.sel) { ui.sel = null; render(true); return; }
    return;
  }
  if (mode !== "desk") return;
  if (e.key === "/" && !typing) { e.preventDefault(); const q = $("#q"); if (q) { q.focus(); q.select(); } return; }
  if (ui.view === "busca" && e.target.id === "q" && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter")) {
    const hits = [...document.querySelectorAll(".hit")]; if (!hits.length) return; e.preventDefault();
    if (e.key === "Enter") { (hits[Math.max(0, ui.kb)] || hits[0]).click(); return; }
    ui.kb = Math.max(0, Math.min(hits.length - 1, ui.kb + (e.key === "ArrowDown" ? 1 : -1))); render(true); const q = $("#q"); if (q) q.focus(); return;
  }
  if (typing || ui.modal) return;
  if ((ui.view === "caixa" || ui.view === "prioridades") && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "j" || e.key === "k")) {
    e.preventDefault(); const l = convList(ui.view === "prioridades"); if (!l.length) return;
    let i = l.findIndex(c => c.id === ui.sel); i = (e.key === "ArrowDown" || e.key === "j") ? Math.min(l.length - 1, i + 1) : Math.max(0, i - 1);
    openConv(l[i].id);
  }
});

/* troca entre computador e celular ao redimensionar */
let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if ((isDesk() ? "desk" : "mob") !== mode) { closeModal(); closePop(); if (ui.s2) { const el = $("#s2"); if (el) el.remove(); const id = ui.s2; ui.s2 = null; if (isDesk()) ui.sel = id; } if (ui.view === "mais" && isDesk()) ui.view = "painel"; shell(); } }, 120); });

/* ---------------- abertura ---------------- */
function boot() {
  const b = $("#boot");
  shell();
  if (!b) return;
  const steps = [...b.querySelectorAll("li")]; const bar = b.querySelector(".boot-bar i");
  const quick = voltou || calm; const dt = quick ? 0 : 260;
  steps.forEach((li, i) => setTimeout(() => { li.classList.add("ok"); bar.style.width = ((i + 1) / steps.length * 100) + "%"; }, quick ? 0 : 180 + i * dt));
  setTimeout(() => { b.classList.add("out"); setTimeout(() => b.remove(), 400); }, quick ? 120 : 180 + steps.length * dt + 250);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
