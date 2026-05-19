# QA Gate Review — Brownfield Discovery

**Agente:** @qa (Quinn)  
**Fase:** Brownfield Discovery — Fase 7 (QA Gate)  
**Data:** 2026-05-18  
**Revisando:**
- `docs/prd/technical-debt-DRAFT.md`
- `docs/reviews/ux-specialist-review.md`
- `docs/architecture/system-architecture.md`
- `docs/frontend/frontend-spec.md`

**Veredicto:** ✅ APROVADO

---

## 1. Verificações do QA Gate

### Check 1 — Completude do inventário de débitos

**Status:** ✅ PASS

Todos os 25 débitos originais foram catalogados com:
- ID único rastreável (SYS-xx, UX-xx)
- Severidade clara
- Esforço estimado
- Prioridade (P1/P2/P3)

A revisão UX adicionou 2 débitos (UX-13, UX-14) corretamente justificados. **Total final: 27 débitos.**

### Check 2 — Critérios de priorização consistentes

**Status:** ✅ PASS

A matriz P1/P2/P3 é internamente consistente:
- P1: impacto imediato no negócio ou bloqueio legal/acessibilidade
- P2: qualidade e conformidade, próximo sprint
- P3: dívida estrutural, pode aguardar

A elevação de UX-06 para Crítico pela @ux-design-expert é correta e alinhada com WCAG AA Critério 4.1.2 — referência normativa válida.

### Check 3 — Dependências entre débitos mapeadas

**Status:** ✅ PASS

O mapa de dependências no DRAFT cobre:
```
SYS-01 → depende de domínio ativado ✅
SYS-02 → independente ✅
SYS-08 → habilita SYS-07 ✅
UX-03 → relacionado a SYS-07 ✅
SYS-13 → requer UX-12 ✅
```

**Dependência não mapeada identificada:**
- UX-13 (focus-visible) deveria ser listado como pré-condição para conformidade WCAG completa, junto com UX-06/07/08. Baixo risco — adicionado nas recomendações abaixo.

### Check 4 — Estimativas de esforço razoáveis

**Status:** ✅ PASS com observação

As estimativas estão realistas para um desenvolvedor frontend sênior:
- Quick wins (0.5h cada) — corretos para mudanças de atributo HTML/CSS
- Formulário backend (4–6h) — correto para integração Formspree/EmailJS
- SSG migration (12–20h) — correto para 11ty com 18 páginas

**Observação:** A estimativa de SYS-07 (CSS monolítico 8–12h) assume refatoração sem SSG. Se SYS-08 (SSG) for feito primeiro, SYS-07 cai para 4–6h. O DRAFT menciona isso implicitamente — sugestão de tornar explícito na versão final.

### Check 5 — Cobertura de riscos ao negócio

**Status:** ✅ PASS

Riscos críticos ao negócio cobertos:
| Risco | Débito | Coberto? |
|-------|--------|---------|
| Mensagens de pacientes perdidas (form) | SYS-02/UX-02 | ✅ P1 |
| LGPD — sem política de privacidade | SYS-13 | ✅ P2 |
| SEO — domínio errado em robots/sitemap | SYS-01 | ✅ P1 |
| Acessibilidade — falha WCAG | UX-06/07/08 | ✅ P1 |
| Analytics ausente — sem dados de conversão | SYS-12 | ✅ P2 |

### Check 6 — Perguntas críticas respondidas

**Status:** ✅ PASS

Todas as 3 perguntas dirigidas ao @qa no DRAFT foram analisadas:

**Pergunta 1:** O formulário placeholder é bloqueador para validação da Dra. Marcela?

**Resposta:** Sim, é bloqueador parcial. O formulário exibe mensagem de sucesso mas não envia nada. A validação da cliente pode acontecer sem isso (o site tem WhatsApp funcional como canal principal), mas deve ser claramente comunicado que o formulário está em modo demonstração. **Recomendação:** Adicionar banner ou texto visível no formulário: "Formulário em implementação — use o WhatsApp para contato imediato."

**Pergunta 2:** Existem riscos de regressão ao consolidar `.cta-strip` e `.trat-cta-strip`?

**Resposta:** Baixo risco. As duas classes têm CSS idêntico. A consolidação requer:
1. Verificar que não há override específico em nenhuma página
2. Substituir ocorrências em todas as páginas de tratamento
3. Remover a classe obsoleta do CSS
Risco de regressão: visual (layout) nas páginas de tratamento. Mitigação: revisar visualmente as 12 páginas após a mudança.

**Pergunta 3:** Quais testes de smoke antes do deploy no domínio definitivo?

**Resposta:** Ver Seção 4 — Smoke Tests.

### Check 7 — Rastreabilidade entre fases

**Status:** ✅ PASS

Cada débito no DRAFT é rastreável:
- SYS-xx → `docs/architecture/system-architecture.md` (Fase 1)
- UX-xx → `docs/frontend/frontend-spec.md` (Fase 3)
- DRAFT → `docs/prd/technical-debt-DRAFT.md` (Fase 4)
- Revisão UX → `docs/reviews/ux-specialist-review.md` (Fase 6)

A cadeia de evidências está completa para todos os débitos.

---

## 2. Problemas Identificados

### Severidade Média

| # | Problema | Débito Relacionado | Recomendação |
|---|----------|-------------------|--------------|
| QA-01 | Estimativa de SYS-07 não considera dependência de SYS-08 | SYS-07, SYS-08 | Adicionar nota na versão final: "Esforço cai de 8–12h para 4–6h se SYS-08 for implementado primeiro" |
| QA-02 | UX-13 (focus-visible) não listado como pré-condição WCAG junto com UX-06/07/08 | UX-13 | Mover UX-13 para P1 na versão final — é requisito WCAG 2.4.7 |

### Severidade Baixa

| # | Problema | Débito Relacionado | Recomendação |
|---|----------|-------------------|--------------|
| QA-03 | Formulário placeholder sem comunicação ao usuário | SYS-02 | Adicionar texto visível no formulário durante período de implementação |
| QA-04 | SYS-11 (rel=canonical) listado como P2 mas depende de domínio definitivo | SYS-01, SYS-11 | Marcar como dependente de SYS-01 no mapa de dependências |

---

## 3. Validação de Riscos de Regressão

### Mudanças P1 — Análise de impacto

| Mudança | Arquivos Afetados | Risco de Regressão | Mitigação |
|---------|------------------|-------------------|-----------|
| Adicionar `aria-label` no WhatsApp float | 18 páginas HTML | Baixo — atributo adicional | Verificar que label não duplica texto visível |
| Adicionar `aria-expanded` no hamburger | 18 páginas HTML + `main.js` | Baixo — atributo + JS toggle | Testar menu mobile em iOS e Android |
| Adicionar skip-to-content | 18 páginas HTML + `style.css` | Muito baixo — elemento novo | Verificar que não cria scroll indesejado |

**Conclusão:** Todas as correções P1 são de baixo risco. Podem ser aplicadas em batch em um único commit.

---

## 4. Smoke Tests — Deploy no Domínio Definitivo

Lista completa de testes manuais antes de apontar DNS para `www.uropediatra.com.br`:

### Funcionalidade

- [ ] Homepage carrega sem erros de console
- [ ] Todos os links da navegação principal funcionam
- [ ] Menu mobile abre e fecha corretamente
- [ ] Botões WhatsApp (SP e Jundiaí) abrem WhatsApp com mensagem pré-preenchida
- [ ] Mapas do Google carregam nos cards de localização
- [ ] FAQ accordion abre e fecha
- [ ] Formulário de contato — verificar se comportamento está documentado para usuário
- [ ] Todas as 12 páginas de tratamento acessíveis a partir do hub

### SEO / Metadados

- [ ] `<title>` único e correto em cada página
- [ ] `<meta description>` presente em todas as páginas
- [ ] Schema.org válido (testar em Rich Results Test do Google)
- [ ] `robots.txt` atualizado para domínio correto
- [ ] `sitemap.xml` atualizado para domínio correto

### Performance

- [ ] Google Fonts carrega com `display=swap`
- [ ] Imagem hero carrega em < 2s em 4G simulado
- [ ] Lighthouse score >= 80 em Performance
- [ ] Lighthouse score >= 90 em Acessibilidade (após correções P1)

### Mobile

- [ ] Layout responsivo verificado em 375px (iPhone SE)
- [ ] Layout responsivo verificado em 768px (iPad)
- [ ] Botões WhatsApp tap target >= 44px
- [ ] Texto legível sem zoom em todas as páginas

### Cross-browser

- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + iOS)
- [ ] Firefox

---

## 5. Veredicto Final

| Dimensão | Score | Notas |
|----------|-------|-------|
| Completude do inventário | 5/5 | 27 débitos rastreados |
| Consistência de priorização | 5/5 | Matriz P1/P2/P3 coerente |
| Mapeamento de dependências | 4/5 | SYS-01→SYS-11 não explicitado |
| Estimativas de esforço | 4/5 | SYS-07/SYS-08 dependência implícita |
| Cobertura de riscos | 5/5 | Todos os riscos ao negócio cobertos |
| Rastreabilidade | 5/5 | Cadeia completa Fase 1→6 |
| **Total** | **28/30** | |

**Veredicto: ✅ APROVADO**

O DRAFT está pronto para consolidação na versão final pelo @architect (Fase 8). Os 4 problemas identificados (QA-01 a QA-04) são de baixa/média severidade e devem ser incorporados na versão final — nenhum bloqueia a progressão.

---

## 6. Condições para Progressão

O assessment final (Fase 8) deve incorporar:
1. **QA-01:** Nota sobre dependência SYS-07 → SYS-08 nas estimativas
2. **QA-02:** Mover UX-13 para P1 (WCAG 2.4.7 é obrigatório)
3. **QA-03:** Adicionar ação de comunicação para formulário placeholder
4. **QA-04:** Mapear SYS-11 como dependente de SYS-01

---

*Documento gerado por @qa (Quinn) — Brownfield Discovery Fase 7*  
*Aprovado para progressão à Fase 8 (@architect — assessment final)*
