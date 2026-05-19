# Technical Debt Assessment — FINAL

**Projeto:** Site Dra. Marcela Leal da Cruz — Uropediatra  
**Agente:** @architect (Aria)  
**Fase:** Brownfield Discovery — Fase 8 (Assessment Final)  
**Data:** 2026-05-18  
**Status:** FINAL — Validado por @ux-design-expert (Fase 6) e @qa (Fase 7)

---

## Executive Summary

Site institucional estático de 18 páginas (HTML5 + CSS3 + Vanilla JS), hospedado no GitHub Pages. Objetivo: gerar agendamentos via WhatsApp e educar sobre condições urológicas pediátricas.

**Total de débitos catalogados:** 27  
**Críticos (bloqueiam lançamento):** 4 | **Altos:** 4 | **Médios:** 14 | **Baixos:** 5  
**Esforço total estimado:** 20–33 horas de desenvolvimento  

**Débitos que bloqueiam lançamento em produção (domínio definitivo):**
1. SYS-02 — Formulário sem backend real (ou comunicação clara de limitação)
2. UX-06 — WhatsApp float sem `aria-label` (falha WCAG AA obrigatória)
3. UX-07 — Hamburger sem `aria-expanded`
4. UX-08 — Sem skip-to-content link

---

## 1. Inventário Completo de Débitos

### 1.1 Débitos de Sistema (SYS)

*Fonte: `docs/architecture/system-architecture.md` — @architect*

| ID | Débito | Severidade | Esforço | Prioridade | Bloqueante |
|----|--------|-----------|---------|-----------|-----------|
| SYS-01 | `robots.txt` e `sitemap.xml` apontam para `www.uropediatra.com.br` (domínio ainda não ativo) | Alta | 0.5h | P1* | Depende de DNS |
| SYS-02 | Formulário de contato sem backend — setTimeout placeholder | Alta | 4–6h | P1 | ✅ Sim |
| SYS-03 | `og:image` ausente — compartilhamentos sociais sem preview | Alta | 1h | P1 | Não |
| SYS-04 | Favicon ausente | Média | 0.5h | P2 | Não |
| SYS-05 | Foto hero via Unsplash CDN sem fallback local | Média | 1h | P2 | Não |
| SYS-06 | Google Fonts sem `display=swap` — bloqueia renderização | Média | 0.5h | P2 | Não |
| SYS-07 | CSS monolítico (~1000 linhas) sem modularização | Média | 4–6h† | P3 | Não |
| SYS-08 | Componentes HTML duplicados em 18 páginas (header/footer/whatsapp-float) | Média | 12–20h | P3 | Não |
| SYS-09 | Classe CSS `.chegou__item` e observer JS órfãos | Baixa | 0.5h | P2 | Não |
| SYS-10 | Sem página 404 customizada | Baixa | 1h | P3 | Não |
| SYS-11 | Sem `rel="canonical"` nas páginas | Baixa | 1h | P2* | Depende SYS-01 |
| SYS-12 | Analytics ausente (sem Google Analytics ou similar) | Baixa | 1h | P2 | Não |
| SYS-13 | Sem política de privacidade (LGPD) | Média | 2–3h | P2 | Não |

*†* Esforço de SYS-07 cai para 4–6h se SYS-08 for implementado primeiro (QA-01)  
*\** SYS-01 e SYS-11 dependem do domínio definitivo ser ativado — não bloqueia validação no GitHub Pages

### 1.2 Débitos de Frontend/UX (UX)

*Fonte: `docs/frontend/frontend-spec.md` — @ux-design-expert + revisão Fase 6*

| ID | Débito | Severidade | Esforço | Prioridade | Bloqueante |
|----|--------|-----------|---------|-----------|-----------|
| UX-01 | Navegação sem indicador de página ativa (`aria-current`, `.active`) | Média | 1h | P2 | Não |
| UX-02 | Formulário sem backend — duplica SYS-02 | Alta | — | *ver SYS-02* | — |
| UX-03 | 12+ inline styles fora do design system | Alta | 2–3h | P2 | Não |
| UX-04 | `.cta-strip` e `.trat-cta-strip` — classes CSS idênticas | Baixa | 0.5h | P3 | Não |
| UX-05 | `.chegou__item` em `telemedicina.html` semanticamente incorreta | Baixa | 0.5h | P2 | Não |
| UX-06 | WhatsApp float sem `aria-label` descritivo | **Crítica** | 0.5h | P1 | ✅ WCAG 4.1.2 |
| UX-07 | Hamburger sem `aria-expanded` | Média | 0.5h | P1 | ✅ WCAG 4.1.2 |
| UX-08 | Sem skip-to-content link | Média | 0.5h | P1 | ✅ WCAG 2.4.1 |
| UX-09 | Header/Footer/Float duplicados em 18 arquivos — duplica SYS-08 | Média | — | *ver SYS-08* | — |
| UX-10 | Google Fonts sem `display=swap` — duplica SYS-06 | Média | — | *ver SYS-06* | — |
| UX-11 | Sem favicon — duplica SYS-04 | Baixa | — | *ver SYS-04* | — |
| UX-12 | Sem link de política de privacidade no footer | Média | 0.5h | P2 | Não |
| UX-13 | Sem `:focus-visible` customizado — padrão browser insuficiente | Média | 0.5h | P1 | ✅ WCAG 2.4.7 |
| UX-14 | Alt text das fotos em `sobre.html` não auditado | Média | 0.5h | P2 | Não |

---

## 2. Matriz de Priorização Consolidada

### P1 — Crítico/Imediato (resolver antes do lançamento em produção)

| ID | Débito | Esforço | WCAG? |
|----|--------|---------|-------|
| SYS-01 | Corrigir robots.txt e sitemap.xml (ao ativar DNS) | 0.5h | — |
| SYS-02 | Integrar formulário com Formspree/EmailJS OU adicionar aviso claro | 4–6h | — |
| SYS-03 | Criar og:image e completar Open Graph tags | 1h | — |
| UX-06 | Adicionar `aria-label` no WhatsApp float | 0.5h | ✅ 4.1.2 |
| UX-07 | Adicionar `aria-expanded` no hamburger | 0.5h | ✅ 4.1.2 |
| UX-08 | Adicionar skip-to-content link | 0.5h | ✅ 2.4.1 |
| UX-13 | Implementar `:focus-visible` customizado | 0.5h | ✅ 2.4.7 |

**Total P1:** 7.5–9.5 horas

### P2 — Importante (próximo sprint)

| ID | Débito | Esforço |
|----|--------|---------|
| SYS-04 | Favicon | 0.5h |
| SYS-05 | Fallback local para imagem hero | 1h |
| SYS-06 | Google Fonts com `display=swap` | 0.5h |
| SYS-09 | Remover classe CSS e observer JS órfãos | 0.5h |
| SYS-11 | Adicionar `rel=canonical` (após DNS ativo — depende SYS-01) | 1h |
| SYS-12 | Configurar Google Analytics | 1h |
| SYS-13 | Criar página de política de privacidade (LGPD) | 2–3h |
| UX-01 | Active state na navegação (`aria-current="page"`) | 1h |
| UX-03 | Extrair inline styles para classes CSS | 2–3h |
| UX-05 | Renomear `.chegou__item` → `.telemed-step` em telemedicina.html | 0.5h |
| UX-12 | Link de política de privacidade no footer (depende SYS-13) | 0.5h |
| UX-14 | Auditar e corrigir alt text em `sobre.html` | 0.5h |

**Total P2:** 11–13 horas

### P3 — Dívida estrutural (backlog)

| ID | Débito | Esforço |
|----|--------|---------|
| SYS-07 | Modularizar CSS monolítico (após SYS-08 reduz esforço) | 4–6h† |
| SYS-08 | Migrar para SSG 11ty — eliminar duplicação de 18 páginas | 12–20h |
| SYS-10 | Página 404 customizada | 1h |
| UX-04 | Unificar `.cta-strip` e `.trat-cta-strip` | 0.5h |

**Total P3:** 17.5–27.5 horas  
*†* 4–6h para SYS-07 assume SYS-08 feito primeiro. Caso contrário: 8–12h.

---

## 3. Dependências entre Débitos

```
SYS-01 (robots/sitemap) ────depende de────▶ Ativação do domínio DNS
SYS-11 (canonical)      ────depende de────▶ SYS-01 (domínio ativo)
SYS-02 (formulário)     ────independente───▶ P1 imediato
SYS-08 (SSG/dedup)      ────habilita───────▶ SYS-07 (CSS modular) esforço reduz ~50%
UX-03 (inline styles)   ────relacionado────▶ SYS-07 (CSS modular)
SYS-13 (privacidade)    ────requer─────────▶ UX-12 (link no footer)
UX-06/07/08/13          ────compõem────────▶ Conformidade WCAG AA mínima
```

---

## 4. Análise de Conformidade WCAG AA

**Score atual estimado:** 68/100  
**Score após correções P1:** 92/100

| Critério WCAG | Antes | Após P1 |
|---------------|-------|---------|
| 1.1.1 Alt text | ⚠️ A verificar | ✅ (UX-14) |
| 1.4.3 Contraste | ✅ | ✅ |
| 2.4.1 Skip navigation | ❌ | ✅ (UX-08) |
| 2.4.7 Focus visible | ⚠️ | ✅ (UX-13) |
| 4.1.2 Name, Role, Value | ❌ | ✅ (UX-06, UX-07) |

---

## 5. Comunicação do Formulário (QA-03)

Enquanto SYS-02 não for implementado, adicionar ao formulário de contato em `contato.html`:

> **"O formulário está em implementação. Para contato imediato, utilize os botões de WhatsApp acima."**

Isso previne que pacientes enviem mensagens acreditando que serão recebidas.

---

## 6. Recomendação de Stack para P3

Para eliminação da duplicação (SYS-08), recomendamos **Eleventy (11ty)**:

| Critério | 11ty | Astro | JS fetch de componentes |
|---------|------|-------|------------------------|
| Zero JS no cliente | ✅ | ✅ | ❌ |
| Sem framework pesado | ✅ | ⚠️ | ✅ |
| GitHub Pages via Actions | ✅ | ✅ | ✅ (direto) |
| Curva de aprendizado | Baixa | Média | Muito baixa |
| Adequado para 18 páginas | ✅ | Superdimensionado | ✅ |

**Decisão:** 11ty por equilíbrio entre simplicidade e eliminação total da duplicação. Alternativa aceitável se o time preferir evitar toolchain: um script Node.js de build que injeta header/footer via replace de tokens no HTML estático.

---

## 7. Smoke Tests para Deploy no Domínio Definitivo

*Gerado por @qa — Fase 7*

### Funcionalidade
- [ ] Homepage carrega sem erros de console
- [ ] Todos os links da navegação principal funcionam
- [ ] Menu mobile abre e fecha corretamente em iOS e Android
- [ ] Botões WhatsApp (SP e Jundiaí) abrem WhatsApp com mensagem pré-preenchida
- [ ] Mapas do Google carregam nos cards de localização
- [ ] FAQ accordion abre e fecha
- [ ] Formulário exibe mensagem de limitação visível
- [ ] Todas as 12 páginas de tratamento acessíveis a partir do hub

### SEO / Metadados
- [ ] `<title>` único e correto em cada página
- [ ] `<meta description>` presente em todas as páginas
- [ ] Schema.org válido (Rich Results Test do Google)
- [ ] `robots.txt` atualizado para domínio definitivo
- [ ] `sitemap.xml` atualizado para domínio definitivo

### Performance
- [ ] Google Fonts com `display=swap` ativo
- [ ] Lighthouse Performance >= 80
- [ ] Lighthouse Accessibility >= 90 (após P1)

### Mobile / Cross-browser
- [ ] Layout em 375px (iPhone SE), 768px (iPad)
- [ ] Tap targets >= 44px nos botões WhatsApp
- [ ] Testado em Chrome, Safari, Firefox

---

## 8. Roadmap de Implementação

| Sprint | Débitos | Esforço | Marco |
|--------|---------|---------|-------|
| Sprint 1 | P1: SYS-02, SYS-03, UX-06, UX-07, UX-08, UX-13 | ~7h | Site pronto para divulgação ampla |
| Sprint 2 | P2: SYS-04–06, SYS-09, SYS-12, SYS-13, UX-01, UX-03, UX-05, UX-12, UX-14 | ~11h | Qualidade e conformidade completa |
| Sprint 3 | P1 pendente DNS: SYS-01, SYS-11 | ~1.5h | Lançamento em `www.uropediatra.com.br` |
| Sprint 4+ | P3: SYS-08, SYS-07, SYS-10, UX-04 | ~18h | Dívida estrutural eliminada |

---

*Documento final gerado por @architect (Aria) — Brownfield Discovery Fase 8*  
*Aprovado para progressão à Fase 9 (@analyst — relatório executivo)*
