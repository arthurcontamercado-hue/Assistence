"""Gera o site estático (várias páginas) a partir da página única usada na prévia.
uso: python3 make.py <fonte.html> <pasta-saida> <endereco-do-site> <caminho-base> <pasta-img> <pasta-demonstracao>"""
import re, os, shutil, sys
src=open(sys.argv[1],encoding="utf8").read()
out,DOM,BASE,IMG,DEMO=sys.argv[2],sys.argv[3].rstrip("/"),sys.argv[4],sys.argv[5],sys.argv[6]
shutil.rmtree(out,ignore_errors=True); os.makedirs(out+"/assets")
def grab(pat,flags=re.S):
    m=re.search(pat,src,flags); assert m,pat; return m
style=grab(r"<style>(.*?)</style>").group(1)
font=grab(r'<link rel="stylesheet" href="https://fonts[^>]+>').group(0)
header=grab(r'<header class="top">.*?</header>').group(0)
footer=grab(r'<footer>.*?</footer>').group(0)
shell=grab(r'<nav class="tabbar".*?</div>\s*<div class="sheet"[^>]*></div>').group(0)
js=grab(r"<script>(.*?)</script>").group(1)
PAGES={"inicio":("index","Assistence | Organização inteligente de mensagens","O Assistence reúne e-mails e conversas, identifica o que importa e transforma mensagens em tarefas, prazos e valores. No computador e no celular."),
"produto":("recursos","Recursos | Assistence","Caixa organizada, prioridade automática, tarefas a partir de mensagens, contas a pagar, busca, visão da semana e aprendizado com correções."),
"como-funciona":("como-funciona","Como funciona | Assistence","Como o algoritmo próprio do Assistence processa cada mensagem, da conexão à ação, e a ficha técnica completa."),
"seguranca":("seguranca","Segurança e privacidade | Assistence","Acesso somente leitura com o login oficial do Google, criptografia AES-256-GCM, algoritmo próprio e conformidade com a LGPD."),
"plataformas":("plataformas","Plataformas | Assistence","Assistence no computador, como mesa de trabalho, e no celular, com abas no rodapé. A mesma conta nos dois."),
"sobre":("sobre","Sobre | Assistence","Missão, visão e trajetória do Assistence, feito no Brasil para quem empreende."),
"suporte":("suporte","Suporte | Assistence","Central de ajuda do Assistence: guias, perguntas frequentes e contato com a equipe."),
"acessar":("acessar","Entrar | Assistence","Entre no Assistence com a sua conta Google ou experimente a demonstração."),
"privacidade":("privacidade","Política de Privacidade | Assistence","Como o Assistence trata os seus dados pessoais e os dados das contas conectadas."),
"termos":("termos","Termos de Uso | Assistence","As regras de uso do Assistence.")}
fn=lambda k: PAGES[k][0]+".html"
def links(h):
    return re.sub(r'href="#([\w-]+)"',lambda m:f'href="{fn(m.group(1))}"' if m.group(1) in PAGES else m.group(0),h)
footer=re.sub(r'<a href="#area" data-private>Área privada</a>','',footer)
assert "Área privada" not in footer
header,footer=links(header),links(footer)
# JS da versão publicada: rotas viram arquivos, área privada sai
js=js.replace('const href=k=>"#"+k;','const FN={inicio:"index",produto:"recursos"};const href=k=>(FN[k]||k)+".html";')
js=js.replace('<a href="${href("area")}" data-private>${I(ICO.lock,20)}Área privada</a>','')
n=len(js); js=re.sub(r"function route\(\)\{.*?window\.addEventListener\(\"hashchange\",route\);",
 'function route(){document.querySelectorAll("[data-v]").forEach(a=>a.classList.toggle("on",a.dataset.v===window.PAGE));}',js,flags=re.S); assert len(js)<n
n=len(js); js=re.sub(r"/\* ---------- área privada ---------- \*/.*?(?=route\(\);\n\}\)\(\);)","",js,flags=re.S); assert len(js)<n
js=js.replace('href="#acessar"','href="acessar.html"').replace('CFG.demo||"#acessar"','CFG.demo||"acessar.html"')
assert "startArea" not in js and "Área privada" not in js
fav="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 24'><path fill='#2f5bea' d='M13 1 1 23h6.2L13 12.4 18.8 23H25z'/></svg>"
open(out+"/assets/icone.svg","w").write(fav)
reset="html{-webkit-text-size-adjust:100%}body{margin:0}img{max-width:100%}[hidden]{display:none!important}:root{padding-top:env(safe-area-inset-top,0px)}"
open(out+"/assets/site.css","w",encoding="utf8").write(reset+style)
open(out+"/assets/site.js","w",encoding="utf8").write(js.strip()+"\n")
open(out+"/assets/config.js","w",encoding="utf8").write('''/* Ligações do site com o aplicativo. É o ÚNICO arquivo que precisa mudar quando o endereço do app mudar.
   app:  endereço do aplicativo do Assistence (o Worker da Cloudflare), terminando em "/".
         Exemplo: "https://assistence-mvp.SUA-CONTA.workers.dev/"  ou, com domínio próprio, "https://app.assistence.com.br/".
         Enquanto estiver vazio, os botões "Entrar" levam à página Entrar, que oferece a demonstração.
   demo: a demonstração, uma página própria (pasta demonstracao/, com dados fictícios). Ela não usa o motor
         nem as integrações do aplicativo real. */
window.ASSISTENCE={
  app:"",
  demo:"demonstracao/"
};
''')
for f in os.listdir(IMG): shutil.copy(os.path.join(IMG,f),out+"/img/"+f) if os.path.isdir(out+"/img") else (os.makedirs(out+"/img"),shutil.copy(os.path.join(IMG,f),out+"/img/"+f))
# Demonstração: pasta própria (index.html, estilo.css, dados.js, app.js), copiada sem mudanças.
assert os.path.isdir(DEMO), "DEMO deve ser a pasta demonstracao/ do repositório"
shutil.copytree(DEMO,out+"/demonstracao",ignore=shutil.ignore_patterns("LEIA-ME.md","*.py"))
def doc(k,body,extra=""):
    f,title,desc=PAGES[k]; url=DOM+("/" if f=="index" else "/"+f+".html")
    abs_=(f'\n<link rel="canonical" href="{url}">\n<meta property="og:url" content="{url}">\n<meta property="og:image" content="{DOM}/img/app-computador-painel.webp">' if DOM else "")
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">{extra}
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Assistence">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:locale" content="pt_BR">{abs_}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#2f5bea">
<link rel="icon" href="assets/icone.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{font}
<link rel="stylesheet" href="assets/site.css">
<!-- Espaço para o código de análise de visitas (Google Analytics ou Cloudflare Web Analytics) -->
</head>
<body>
{header}
<main>
{body}
</main>
{footer}
{shell}
<script>window.PAGE="{k}";</script>
<script src="assets/config.js"></script>
<script src="assets/site.js"></script>
</body>
</html>
'''
for k in PAGES:
    m=re.search(r'<div class="page" id="p-%s"[^>]*>.*?(?=\n<!-- =+|\n</main>)'%re.escape(k),src,re.S); assert m,k
    body=links(m.group(0).replace(' hidden>','>',1))
    open(out+"/"+fn(k),"w",encoding="utf8").write(doc(k,body))
nf='<div class="page"><section class="phero"><div class="wrap"><span class="label">Erro 404</span><h1>Página não encontrada.</h1><p class="lead">O endereço pode ter mudado. Volte para a página inicial do Assistence.</p><div class="cta"><a class="btn" href="index.html">Ir para o início</a></div></div></section></div>'
PAGES["404"]=("404","Página não encontrada | Assistence","Página não encontrada.")
open(out+"/404.html","w",encoding="utf8").write(doc("404",nf,f'\n<base href="{BASE}">\n<meta name="robots" content="noindex">'))
open(out+"/robots.txt","w").write("User-agent: *\nAllow: /\nDisallow: /demonstracao/\n"+(f"\nSitemap: {DOM}/sitemap.xml\n" if DOM else ""))
urls="" if not DOM else "".join(f"  <url><loc>{DOM}{'/' if v[0]=='index' else '/'+v[0]+'.html'}</loc><priority>{'1.0' if v[0]=='index' else '0.7'}</priority></url>\n" for k,v in PAGES.items() if k!="404")
if DOM: open(out+"/sitemap.xml","w").write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
open(out+"/.nojekyll","w").write("")
print(sorted(os.listdir(out)))

open(out+"/_headers","w").write("""/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/img/*
  Cache-Control: public, max-age=604800

/assets/*
  Cache-Control: public, max-age=3600
""")
