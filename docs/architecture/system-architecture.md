# System Architecture — Site Dra. Marcela Leal da Cruz

**Projeto:** uropediatra  
**Agente:** @architect (Aria)  
**Fase:** Brownfield Discovery — Fase 1  
**Data:** 2026-05-18  

---

## 1. Visão Geral

Site institucional estático da Dra. Marcela Leal da Cruz, uropediatra com atendimento em Jundiaí e São Paulo. O objetivo é gerar agendamentos via WhatsApp e fornecer conteúdo educativo sobre condições urológicas pediátricas.

**Tipo:** Static Website (sem backend, sem banco de dados)  
**Hospedagem atual:** GitHub Pages (`thiagoalbieri.github.io/uropediatra`)  
**Domínio pretendido:** `www.uropediatra.com.br`  

---

## 2. Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Markup | HTML5 semântico | — |
| Estilo | CSS3 custom (mobile-first) | — |
| Comportamento | Vanilla JavaScript (ES6+) | — |
| Fontes | Google Fonts (Nunito + Inter) | CDN |
| Imagem hero | Unsplash CDN | CDN externo |
| Mapas | Google Maps embed (iframe) | CDN externo |
| Hospedagem | GitHub Pages | — |
| Build | Nenhum (arquivos servidos diretamente) | — |
| CI/CD | Git push → GitHub Pages automático | — |

**Dependências externas:**
- `fonts.googleapis.com` — tipografia (bloqueante para renderização)
- `images.unsplash.com` — foto hero (sem fallback local)
- `maps.google.com` — embeds de localização

---

## 3. Estrutura de Arquivos

```
uropediatra/
├── index.html                    # Homepage
├── sobre.html                    # Sobre a médica
├── telemedicina.html             # Telemedicina
├── perguntas-frequentes.html     # FAQ completo
├── contato.html                  # Formulário de contato
│
├── tratamentos/
│   ├── index.html                # Hub de tratamentos
│   ├── fimose.html
│   ├── criptorquidia.html
│   ├── enurese-noturna.html
│   ├── hipospadias.html
│   ├── hidronefrose.html
│   ├── infeccao-urinaria.html
│   ├── refluxo-vesicoureteral.html
│   ├── penis-embutido.html
│   ├── hidrocele.html
│   ├── varicocele.html
│   ├── bexiga-neurogenica.html
│   └── disfuncoes-miccionais.html
│
├── css/
│   └── style.css                 # CSS monolítico (~1000 linhas)
│
├── js/
│   └── main.js                   # JS monolítico (~100 linhas)
│
├── img/
│   ├── marcela.jpg               # Foto da médica (existente, não usada no hero)
│   ├── marcela-2.jpg
│   ├── marcela-3.jpg
│   └── marcela-foto.jpg
│
├── robots.txt                    # Aponta para www.uropediatra.com.br
├── sitemap.xml                   # Aponta para www.uropediatra.com.br
└── docs/                         # Documentação interna (não publicada)
```

**Total de páginas:** 18 HTML  
**Total de arquivos CSS:** 1 monolítico  
**Total de arquivos JS:** 1 monolítico  

---

## 4. Arquitetura de Componentes

O site segue um padrão de **componentes HTML repetidos manualmente** em cada página:

```
Toda página HTML
├── <head>  (meta, SEO, Schema.org, link CSS)
├── <header class="header">     — fixo, sticky
├── <div class="mobile-menu">   — menu mobile overlay
├── [conteúdo específico da página]
├── <footer class="footer">
├── <div class="whatsapp-float"> — botão flutuante
└── <script src="js/main.js">
```

**Padrão de layout:** BEM-like CSS (`.bloco__elemento--modificador`)  
**Responsividade:** Mobile-first com media queries em 640px, 768px e 900px  
**Design tokens:** Variáveis CSS custom properties no `:root`

---

## 5. Fluxo de Navegação

```
Homepage (index.html)
├── Sobre (sobre.html)
├── Tratamentos (tratamentos/index.html)
│   └── [12 páginas individuais]
├── Telemedicina (telemedicina.html)
├── Perguntas Frequentes (perguntas-frequentes.html)
└── Contato (contato.html)
```

**Conversão principal:** Botões WhatsApp → abertura do WhatsApp Web/App  
**Conversão secundária:** Formulário de contato (sem backend ativo)

---

## 6. Integrações Externas

| Integração | Tipo | Status |
|-----------|------|--------|
| WhatsApp Business | Link direto (`wa.me`) | ✅ Ativo |
| Google Maps | Iframe embed | ✅ Ativo |
| Unsplash CDN | Imagem hero | ✅ Ativo |
| Google Fonts | CDN bloqueante | ✅ Ativo |
| Formulário de contato | Placeholder (setTimeout) | ❌ Não funcional |
| Analytics | Ausente | ❌ Não configurado |
| Instagram | Links estáticos | ✅ Parcial |

---

## 7. SEO & Metadados

| Item | Status | Observação |
|------|--------|------------|
| `<title>` único por página | ✅ | Implementado |
| `<meta description>` | ✅ | Implementado |
| Schema.org Physician | ✅ | Na homepage |
| Open Graph (og:*) | ⚠️ Parcial | `og:image` ausente |
| `robots.txt` | ⚠️ | Aponta para domínio errado |
| `sitemap.xml` | ⚠️ | Aponta para domínio errado |
| Favicon | ❌ | Ausente |
| `rel="canonical"` | ❌ | Ausente |

---

## 8. Performance

| Item | Status | Observação |
|------|--------|------------|
| Minificação CSS | ❌ | Arquivo servido raw |
| Minificação JS | ❌ | Arquivo servido raw |
| Compressão (gzip/brotli) | ✅ | GitHub Pages ativa automaticamente |
| Image lazy loading | ⚠️ | Maps com `loading="lazy"`, hero sem |
| Cache headers | ✅ | GitHub Pages configura automaticamente |
| Font display swap | ❌ | Google Fonts sem `display=swap` |

---

## 9. Débitos Técnicos Identificados (Nível Sistema)

| ID | Débito | Área | Severidade | Esforço |
|----|--------|------|-----------|---------|
| SYS-01 | `robots.txt` e `sitemap.xml` apontam para domínio errado (`www.uropediatra.com.br` vs GitHub Pages) | SEO | Alta | Baixo |
| SYS-02 | Formulário de contato sem backend real (usa `setTimeout` placeholder) | Funcional | Alta | Médio |
| SYS-03 | `og:image` ausente — compartilhamentos sem imagem | SEO/Social | Alta | Baixo |
| SYS-04 | Favicon ausente | UX/Brand | Média | Baixo |
| SYS-05 | Foto hero via Unsplash CDN externo sem fallback local | Resiliência | Média | Baixo |
| SYS-06 | Google Fonts sem `display=swap` — bloqueio de renderização | Performance | Média | Baixo |
| SYS-07 | CSS monolítico (~1000 linhas) sem modularização | Manutenção | Média | Alto |
| SYS-08 | Componentes HTML duplicados em todas as páginas (header/footer) | Manutenção | Média | Alto |
| SYS-09 | Classe CSS `.chegou__item` e observer JS órfãos (seção removida) | Code debt | Baixa | Baixo |
| SYS-10 | Sem página 404 customizada | UX | Baixa | Baixo |
| SYS-11 | Sem `rel="canonical"` nas páginas | SEO | Baixa | Baixo |
| SYS-12 | Analytics ausente (sem dados de tráfego) | Negócio | Baixa | Baixo |
| SYS-13 | Sem política de privacidade | Legal | Média | Médio |

---

## 10. Pontos de Integração Futuros

Se o domínio `www.uropediatra.com.br` for ativado:
- Atualizar `robots.txt` e `sitemap.xml`
- Adicionar `rel="canonical"` em todas as páginas
- Configurar redirect de `thiagoalbieri.github.io/uropediatra` → domínio final
- Configurar Google Search Console com o novo domínio

---

*Documento gerado por @architect (Aria) — Brownfield Discovery Fase 1*
