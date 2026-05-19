# Epic: Resolução de Dívida Técnica — Site Uropediatra

**Epic ID:** UROPEDIATRA-DEBT  
**Agente:** @pm (Morgan)  
**Data:** 2026-05-18  
**Status:** Ready  
**Fonte:** `docs/prd/technical-debt-assessment.md`

---

## Visão

Elevar o site da Dra. Marcela Leal da Cruz de um protótipo funcional para um site de produção profissional, seguro e acessível — pronto para divulgação ampla e para o lançamento no domínio definitivo `www.uropediatra.com.br`.

## Objetivo de Negócio

- Eliminar risco de perda de pacientes (formulário não funcional)
- Garantir conformidade WCAG AA e LGPD antes da divulgação pública
- Estabelecer analytics para medir conversões
- Reduzir custo de manutenção a longo prazo

## Critérios de Sucesso do Épico

- [ ] Formulário de contato entrega mensagens reais para a Dra. Marcela
- [ ] Site passa nos 7 checks de smoke test antes do DNS
- [ ] Lighthouse Accessibility >= 90
- [ ] Política de privacidade LGPD publicada
- [ ] Google Analytics configurado e coletando dados
- [ ] Domínio `www.uropediatra.com.br` ativo com robots.txt e sitemap corretos

## Stories por Sprint

### Sprint 1 — Lançamento seguro (P1)

| Story | Título | Esforço | Débitos |
|-------|--------|---------|---------|
| [1.1](../stories/1.1.story.md) | Acessibilidade WCAG — correções críticas | 2h | UX-06, UX-07, UX-08, UX-13 |
| [1.2](../stories/1.2.story.md) | Formulário de contato funcional | 4–6h | SYS-02 |
| [1.3](../stories/1.3.story.md) | Open Graph e preview social | 1h | SYS-03 |

**Total Sprint 1:** ~7–9 horas

### Sprint 2 — Qualidade e conformidade (P2)

| Story | Título | Esforço | Débitos |
|-------|--------|---------|---------|
| [2.1](../stories/2.1.story.md) | Quick wins de performance e identidade | 3h | SYS-04, SYS-05, SYS-06, SYS-09 |
| [2.2](../stories/2.2.story.md) | LGPD — política de privacidade | 3–4h | SYS-13, UX-12 |
| [2.3](../stories/2.3.story.md) | Analytics, SEO e navegação | 3h | SYS-12, UX-01, UX-14 |
| [2.4](../stories/2.4.story.md) | Qualidade de código frontend | 3h | UX-03, UX-05 |

**Total Sprint 2:** ~12–14 horas

### Sprint 3 — Domínio definitivo (P1 dependente de DNS)

| Story | Título | Esforço | Débitos |
|-------|--------|---------|---------|
| [3.1](../stories/3.1.story.md) | Ativação do domínio `www.uropediatra.com.br` | 2h | SYS-01, SYS-11 |

**Total Sprint 3:** ~2 horas

### Sprint 4+ — Dívida estrutural (P3)

| Story | Título | Esforço | Débitos |
|-------|--------|---------|---------|
| [4.1](../stories/4.1.story.md) | Migração para Eleventy (SSG) | 12–20h | SYS-08, SYS-07 |
| [4.2](../stories/4.2.story.md) | Polimento final — 404 e CSS unificado | 1.5h | SYS-10, UX-04 |

**Total Sprint 4+:** ~13.5–21.5 horas

## Dependências

```
Sprint 1 → pode iniciar imediatamente
Sprint 2 → pode iniciar após Sprint 1 ou em paralelo
Sprint 3 → requer ativação do DNS (decisão externa)
Sprint 4 → requer Sprint 1 e Sprint 2 concluídos
```

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|------------|---------|-----------|
| Formspree atingir limite gratuito (50/mês) | Média | Alto | Migrar para EmailJS ou plano pago |
| Domínio DNS não ativado antes da divulgação | Alta | Médio | Sprint 3 é independente do lançamento |
| Migração 11ty quebrar alguma página | Baixa | Alto | Testar todas as 18 páginas após migração |

---

*Épico criado por @pm (Morgan) — Brownfield Discovery Fase 10*
