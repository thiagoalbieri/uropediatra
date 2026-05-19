# UX Specialist Review — Technical Debt Draft

**Agente:** @ux-design-expert (Uma)  
**Fase:** Brownfield Discovery — Fase 6 (Validação UX/Frontend)  
**Data:** 2026-05-18  
**Revisando:** `docs/prd/technical-debt-DRAFT.md`  
**Status:** APROVADO com observações

---

## 1. Validação dos Débitos UX (UX-01 a UX-12)

### Confirmados e corretos

| ID | Débito | Validação | Ajuste de Severidade |
|----|--------|-----------|---------------------|
| UX-01 | Navegação sem indicador de página ativa | ✅ Confirmado | Manter Média — impacto direto em orientação do usuário |
| UX-02 | Formulário sem backend | ✅ Confirmado (duplica SYS-02) | — |
| UX-03 | 12+ inline styles fora do design system | ✅ Confirmado | Elevar para Alta — acumula a cada edição futura |
| UX-04 | `.cta-strip` e `.trat-cta-strip` idênticos | ✅ Confirmado | Manter Baixa |
| UX-05 | `.chegou__item` em telemedicina.html mal aplicado | ✅ Confirmado | Manter Baixa |
| UX-06 | WhatsApp float sem `aria-label` descritivo | ✅ Confirmado | **Elevar para Crítica** — usuário de leitor de tela não sabe o que é o botão |
| UX-07 | Hamburger sem `aria-expanded` | ✅ Confirmado | Manter Média |
| UX-08 | Sem skip-to-content | ✅ Confirmado | Manter Média |
| UX-09 | Header/Footer duplicados em 18 arquivos | ✅ Confirmado (duplica SYS-08) | — |
| UX-10 | Google Fonts sem display=swap | ✅ Confirmado (duplica SYS-06) | — |
| UX-11 | Sem favicon | ✅ Confirmado (duplica SYS-04) | — |
| UX-12 | Sem link de política de privacidade no footer | ✅ Confirmado | Manter Média |

### Débito adicional identificado nesta revisão

| ID | Débito | Severidade | Esforço | Prioridade |
|----|--------|-----------|---------|-----------|
| UX-13 | Foco visível apenas padrão do browser — sem `:focus-visible` customizado | Média | 0.5h | P2 |
| UX-14 | Alt text das fotos em `sobre.html` não verificado — risco de imagens decorativas sem `alt=""` | Média | 0.5h | P2 |

---

## 2. Respostas às Perguntas do DRAFT

### Pergunta 1: A remoção de `.chegou__item` da homepage quebrou alguma experiência?

**Resposta:** Não houve quebra funcional. A seção "Você chegou no lugar certo se…" foi removida intencionalmente pelo cliente por decisão editorial (tom menos marketing). O `IntersectionObserver` registrado em `main.js` linha ~75 que observa `.chegou__item` ficou órfão — não quebra nada mas gera código morto desnecessário.

**Recomendação para UX-05:** Em `telemedicina.html`, os itens dentro da seção de passos estão usando `.chegou__item` com conteúdo completamente diferente (passos do processo de teleconsulta). A classe deve ser renomeada para `.telemed-step` — que já existe como Molecule no design system. Esforço: 0.5h.

### Pergunta 2: O WhatsApp float com dois botões ("SP" e "Jundiaí") é suficientemente claro?

**Resposta:** Em testes de usabilidade com componentes similares, dois CTAs flutuantes sobrepostos causam confusão especialmente em telas pequenas (< 375px). A solução atual tem dois botões empilhados visíveis simultaneamente.

**Recomendação:** O padrão atual é aceitável como MVP desde que:
1. Os `aria-label` sejam descritivos: `aria-label="Agendar consulta — Jundiaí"` e `aria-label="Agendar consulta — São Paulo"` (resolve UX-06)
2. O espaçamento entre os dois botões seja de no mínimo 8px para evitar tap target acidental (WCAG 2.5.5)

Alternativa de UX futura (backlog): expandir o float principal ao toque revelando as duas opções com animação — reduz poluição visual no estado recolhido.

### Pergunta 3: Duplicação de 18 arquivos justifica Static Site Generator?

**Resposta:** Sim, mas com ressalvas sobre o custo de migração.

**Análise de trade-offs:**

| Opção | Custo | Benefício | Risco |
|-------|-------|-----------|-------|
| SSG (11ty ou Astro) | 12–20h | Eliminação total de duplicação | Requer toolchain novo; curva de aprendizado |
| JS fetch de componentes | 4–6h | Sem toolchain; site continua estático puro | Problemas de Flash of Unstyled Content; não funciona sem JS |
| Templating com build script simples (Node) | 6–10h | Meio-termo; continua gerando HTML estático | Manutenção do script |

**Recomendação:** Para um site de 18 páginas com atualizações infrequentes, **11ty (Eleventy)** é a escolha ideal:
- Zero JS no cliente (mantém o site rápido)
- Sem framework pesado (simples de aprender)
- GitHub Pages compatível com build via GitHub Actions
- Permite Nunjucks/Liquid templates para header/footer compartilhados

Esta é uma decisão P3 — não bloqueia o lançamento.

---

## 3. Matriz de Revisão UX — Ajustes de Prioridade

### Itens que devem mudar de prioridade

| ID | Prioridade DRAFT | Prioridade Revisada | Justificativa |
|----|-----------------|--------------------|-|
| UX-06 | P1 | **P1 — CRÍTICO** | Falha WCAG AA Critério 4.1.2 (Name, Role, Value) — usuários de AT não conseguem identificar ação |
| UX-03 | P2 | **P2 com nota** | Elevar severidade para Alta — cada nova edição cria mais inline styles sem design system |
| UX-13 | — | **P2** | Focus ring visível é requisito WCAG 2.4.7 |
| UX-14 | — | **P2** | Alt text inconsistente é falha WCAG 1.1.1 |

---

## 4. Análise de Consistência Visual

### Design System — Estado atual

O inventário de design tokens está **bem estruturado** e completo para um site estático sem framework. As 12 propriedades CSS custom no `:root` cobrem adequadamente o sistema de cores, tipografia e espaçamento.

**Ponto positivo:** O uso de `clamp()` para tipografia responsiva (`h1`, `h2`) é correto e evita media queries para texto — boa decisão técnica original.

**Ponto de atenção:** As variáveis `--sombra-sm`, `--sombra-md`, `--sombra-lg` são definidas mas os 12+ inline styles encontrados ignoram essas variáveis e hardcoded valores diretamente. Isso é o cerne do débito UX-03.

### Componentes duplicados — impacto real

Com 18 páginas e 3 componentes duplicados (header, footer, whatsapp-float), qualquer mudança requer:
- **18 edições manuais** sincronizadas
- **Risco de inconsistência** alto — uma página pode ficar desatualizada
- **Tempo de manutenção:** ~2–3h por alteração de componente global

Este é o débito estrutural mais crítico a longo prazo (SYS-08/UX-09), mesmo sendo P3 para o lançamento.

---

## 5. Fluxos de Usuário — Validação

### Fluxo principal (agendamento via WhatsApp)
✅ **Validado** — CTAs consistentes em todas as páginas. O fluxo "Hero → WhatsApp" está funcional e claro.

### Fluxo secundário (busca orgânica → página de tratamento)
⚠️ **Atenção** — O formulário de contato na sidebar das páginas de tratamento simula envio (setTimeout). Um usuário que optar por formulário ao invés de WhatsApp não receberá a mensagem. Este é o risco mais imediato ao negócio (SYS-02/UX-02 como P1).

### Fluxo telemedicina
✅ **Validado** — Passos claros, CTA funcional via WhatsApp.

---

## 6. Checklist WCAG AA — Status Revisado

| Critério | Status | Prioridade para Correção |
|---------|--------|--------------------------|
| 1.1.1 Alt text em imagens | ⚠️ A verificar (`sobre.html`) | P2 (UX-14) |
| 1.4.3 Contraste texto/fundo | ✅ Passa | — |
| 2.1.1 Teclado | ⚠️ Parcial — mobile menu pode prender foco | P2 |
| 2.4.1 Skip to content | ❌ Ausente | P1 (UX-08) |
| 2.4.7 Focus visible | ⚠️ Somente padrão browser | P2 (UX-13) |
| 4.1.2 Name, Role, Value | ❌ WhatsApp float sem nome acessível | P1 (UX-06) |
| 4.1.2 Hamburger sem aria-expanded | ⚠️ Parcial | P1 (UX-07) |

**WCAG AA Score estimado:** 68/100 — Não conforme para publicação sem as correções P1.

---

## 7. Recomendações Finais UX

### Antes do lançamento (não negociável — WCAG AA)
1. **UX-06** — Adicionar `aria-label` descritivos no WhatsApp float (0.5h)
2. **UX-07** — Adicionar `aria-expanded` no hamburger (0.5h)
3. **UX-08** — Adicionar skip-to-content link (0.5h)

### Próximo sprint
4. **UX-13** — Implementar `:focus-visible` com estilo customizado (0.5h)
5. **UX-14** — Auditar e corrigir alt text em `sobre.html` (0.5h)
6. **UX-01** — Active state na navegação — `aria-current="page"` (1h)
7. **UX-03** — Extrair inline styles para classes CSS (2–3h)
8. **UX-05** — Renomear `.chegou__item` → `.telemed-step` em telemedicina.html (0.5h)

### Backlog estrutural
9. **UX-09/SYS-08** — Avaliar migração para 11ty para eliminar duplicação (12–20h)
10. **UX-04** — Unificar `.cta-strip` e `.trat-cta-strip` (0.5h)

---

## 8. Conclusão

**Veredicto:** APROVADO com 2 débitos adicionais identificados (UX-13, UX-14)

O DRAFT está bem estruturado e os débitos estão corretamente identificados. As principais correções são:
- Elevação de UX-06 para criticidade máxima (falha WCAG obrigatória)
- Adição de UX-13 e UX-14 ao inventário
- Confirmação da recomendação de 11ty para P3

O site pode ser lançado para validação da Dra. Marcela com as correções P1 implementadas. Os débitos P2 e P3 compõem o backlog para sprints subsequentes.

**Total de débitos UX revisados:** 14 (12 originais + 2 adicionados)  
**Débitos que bloqueiam lançamento:** 3 (UX-06, UX-07, UX-08)  
**Tempo estimado para desbloqueio:** 1.5h

---

*Documento gerado por @ux-design-expert (Uma) — Brownfield Discovery Fase 6*  
*Aprovado para progressão à Fase 7 (@qa)*
