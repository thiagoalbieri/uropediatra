# Technical Debt Assessment — DRAFT

**Projeto:** Site Dra. Marcela Leal da Cruz — Uropediatra  
**Agente:** @architect (Aria)  
**Fase:** Brownfield Discovery — Fase 4 (Consolidação Inicial)  
**Data:** 2026-05-18  
**Status:** DRAFT — Pendente revisão de @ux-design-expert e @qa  

---

## Executive Summary (Preliminar)

Site estático de 18 páginas HTML, sem backend, sem banco de dados. Stack: HTML5 + CSS3 + Vanilla JS. Hospedado no GitHub Pages. Domínio definitivo (`www.uropediatra.com.br`) ainda não apontado.

**Total de débitos identificados:** 25  
**Críticos:** 1 | **Altos:** 4 | **Médios:** 13 | **Baixos:** 7  
**Esforço total estimado:** 18–28 horas de desenvolvimento  

---

## 1. Débitos de Sistema

*Fonte: `docs/architecture/system-architecture.md` — @architect*

| ID | Débito | Severidade | Esforço Est. | Prioridade |
|----|--------|-----------|-------------|-----------|
| SYS-01 | `robots.txt` e `sitemap.xml` apontam para domínio errado (`www.uropediatra.com.br`) | Alta | 0.5h | P1 |
| SYS-02 | Formulário de contato sem backend real (setTimeout placeholder) | Alta | 4–6h | P1 |
| SYS-03 | `og:image` ausente — compartilhamentos sem preview visual | Alta | 1h | P1 |
| SYS-04 | Favicon ausente | Média | 0.5h | P2 |
| SYS-05 | Foto hero via Unsplash CDN externo sem fallback local | Média | 1h | P2 |
| SYS-06 | Google Fonts sem `display=swap` — bloqueia renderização | Média | 0.5h | P2 |
| SYS-07 | CSS monolítico (~1000 linhas) sem modularização | Média | 8–12h | P3 |
| SYS-08 | Componentes HTML duplicados em 18 páginas (header/footer/whatsapp-float) | Média | 12–20h | P3 |
| SYS-09 | Classe CSS `.chegou__item` e observer JS órfãos | Baixa | 0.5h | P2 |
| SYS-10 | Sem página 404 customizada | Baixa | 1h | P3 |
| SYS-11 | Sem `rel="canonical"` nas páginas | Baixa | 1h | P2 |
| SYS-12 | Analytics ausente (sem Google Analytics ou similar) | Baixa | 1h | P2 |
| SYS-13 | Sem política de privacidade (LGPD) | Média | 2–3h | P2 |

---

## 2. Débitos de Frontend/UX

*Fonte: `docs/frontend/frontend-spec.md` — @ux-design-expert*

| ID | Débito | Severidade | Esforço Est. | Prioridade |
|----|--------|-----------|-------------|-----------|
| UX-01 | Navegação sem indicador de página ativa (`aria-current`, `.active`) | Média | 1h | P2 |
| UX-02 | Formulário sem backend (duplicado de SYS-02) | Alta | — | *ver SYS-02* |
| UX-03 | 12+ inline styles espalhados fora do design system | Média | 2–3h | P2 |
| UX-04 | Duas classes CSS idênticas: `.cta-strip` e `.trat-cta-strip` | Baixa | 0.5h | P3 |
| UX-05 | `.chegou__item` usada semanticamente errada em `telemedicina.html` | Baixa | 0.5h | P2 |
| UX-06 | WhatsApp float sem `aria-label` descritivo | Média | 0.5h | P1 |
| UX-07 | Hamburger sem `aria-expanded` | Média | 0.5h | P1 |
| UX-08 | Sem skip-to-content link | Média | 0.5h | P1 |
| UX-09 | Header/Footer/Float duplicados em 18 arquivos (duplicado de SYS-08) | Média | — | *ver SYS-08* |
| UX-10 | Google Fonts sem `display=swap` (duplicado de SYS-06) | Média | — | *ver SYS-06* |
| UX-11 | Sem favicon (duplicado de SYS-04) | Baixa | — | *ver SYS-04* |
| UX-12 | Sem link de política de privacidade no footer | Média | 0.5h | P2 |

---

## 3. Matriz de Priorização Consolidada

### P1 — Crítico/Imediato (resolver antes de divulgar amplamente)

| ID | Débito | Esforço |
|----|--------|---------|
| SYS-01 | Corrigir robots.txt e sitemap.xml | 0.5h |
| SYS-02 | Integrar formulário com serviço real (Formspree/EmailJS) | 4–6h |
| SYS-03 | Criar og:image e adicionar meta tags Open Graph completas | 1h |
| UX-06 | Adicionar aria-label no WhatsApp float | 0.5h |
| UX-07 | Adicionar aria-expanded no hamburger | 0.5h |
| UX-08 | Adicionar skip-to-content | 0.5h |

**Total P1:** 7–9 horas

### P2 — Importante (próximo sprint)

| ID | Débito | Esforço |
|----|--------|---------|
| SYS-04 | Favicon | 0.5h |
| SYS-05 | Fallback local para imagem hero | 1h |
| SYS-06 | Google Fonts com display=swap | 0.5h |
| SYS-09 | Remover classe CSS e observer JS órfãos | 0.5h |
| SYS-11 | Adicionar rel=canonical | 1h |
| SYS-12 | Configurar Google Analytics | 1h |
| SYS-13 | Criar página de política de privacidade | 2–3h |
| UX-01 | Active state na navegação | 1h |
| UX-03 | Extrair inline styles para classes CSS | 2–3h |
| UX-05 | Corrigir semântica de .chegou__item em telemedicina | 0.5h |
| UX-12 | Link de privacidade no footer | 0.5h |

**Total P2:** 11–13 horas

### P3 — Dívida técnica estrutural (backlog)

| ID | Débito | Esforço |
|----|--------|---------|
| SYS-07 | Modularizar CSS monolítico | 8–12h |
| SYS-08 | Eliminar duplicação de header/footer (SSG ou includes) | 12–20h |
| SYS-10 | Página 404 customizada | 1h |
| UX-04 | Unificar .cta-strip e .trat-cta-strip | 0.5h |

**Total P3:** 21–34 horas

---

## 4. Perguntas para Especialistas

### Para @ux-design-expert:
1. A remoção de `.chegou__item` da homepage quebrou alguma experiência importante? O componente em `telemedicina.html` é adequado semanticamente ou deve ter nome próprio?
2. O WhatsApp float com dois botões ("SP" e "Jundiaí") é suficientemente claro para usuários mobile? Alguma alternativa de UX recomendada?
3. A duplicação de header/footer em 18 arquivos justifica migrar para um Static Site Generator (ex: 11ty, Astro) ou uma solução mais simples (JS fetch de componentes) é suficiente?

### Para @qa:
1. O formulário de contato com setTimeout placeholder é um bloqueador para validação da Dra. Marcela? Ou pode ser tratado como dívida P2?
2. Existem riscos de regressão ao consolidar `.cta-strip` e `.trat-cta-strip`?
3. Quais testes de smoke deveriam existir antes de qualquer deploy para o domínio definitivo?

---

## 5. Dependências entre Débitos

```
SYS-01 (robots/sitemap) ──depende de──▶ Domínio definitivo ativado
SYS-02 (formulário)     ──independente──▶ P1 imediato
SYS-08 (deduplicação)   ──habilita──▶ SYS-07 (modularização CSS) fica mais fácil depois
UX-03 (inline styles)   ──relacionado──▶ SYS-07 (modularização CSS)
SYS-13 (privacidade)    ──requer──▶ UX-12 (link no footer)
```

---

*DRAFT gerado por @architect (Aria) — Brownfield Discovery Fase 4*  
*Aguardando validação de @ux-design-expert (Fase 6) e @qa (Fase 7)*
