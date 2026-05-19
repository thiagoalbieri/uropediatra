# Frontend Specification — Site Dra. Marcela Leal da Cruz

**Agente:** @ux-design-expert (Uma)  
**Fase:** Brownfield Discovery — Fase 3  
**Data:** 2026-05-18  

---

## 1. Design Tokens Existentes

### Cores (CSS Custom Properties)

```css
--azul:         #1A6FA3   /* Primária — ações, links, destaques */
--azul-dark:    #145A87   /* Hover estados */
--azul-light:   #EBF4FB   /* Backgrounds suaves, badges */
--teal:         #2A9D8F   /* Secundária — credenciais, tags */
--teal-light:   #E8F6F5   /* Backgrounds teal */
--laranja:      #F4A261   /* CTA principal (WhatsApp, agendar) */
--laranja-dark: #E08A45   /* Hover laranja */
--bg:           #FAFAFA   /* Background geral */
--branco:       #FFFFFF
--texto:        #1A1A2E   /* Texto base */
--cinza:        #6B7280   /* Texto secundário */
--cinza-light:  #F3F4F6   /* Sections alternadas */
--borda:        #E5E7EB   /* Bordas e divisores */
```

### Tipografia

| Token | Valor |
|-------|-------|
| Fonte título | Nunito (400/600/700/800/900) |
| Fonte corpo | Inter (400/500/600) |
| h1 | `clamp(2rem, 5vw, 3rem)` — weight 900 |
| h2 | `clamp(1.5rem, 3vw, 2.125rem)` — weight 800 |
| h3 | `1.25rem` — weight 700 |
| body | `1rem` — line-height 1.7 |
| lead | `1.125rem` — line-height 1.8 |

### Espaçamento e Raios

| Token | Valor |
|-------|-------|
| `--raio` | 12px |
| `--raio-sm` | 8px |
| Section padding | 64px 0 |
| Container max-width | 1140px |

### Sombras

| Token | Valor |
|-------|-------|
| `--sombra-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--sombra-md` | `0 4px 16px rgba(0,0,0,0.10)` |
| `--sombra-lg` | `0 8px 32px rgba(0,0,0,0.12)` |

### Breakpoints

| Nome | Valor | Uso |
|------|-------|-----|
| sm | 640px | Grid tratamentos (2→3 col), trust-bar (2→4 col), form-row |
| md | 768px | Hero (1→2 col), sobre, depoimentos, locais, telemedicina |
| lg | 900px | Nav desktop, page-content sidebar sticky |

---

## 2. Inventário de Componentes (Atomic Design)

### Atoms

| Componente | Classe | Variantes |
|-----------|--------|-----------|
| Botão | `.btn` | `--laranja`, `--azul`, `--outline`, `--branco`, `--whatsapp`, `--instagram` |
| Tag/badge | `.tag` | default (azul), `--teal` |
| Alerta | `.alerta` | laranja (único) |
| Input | `.form-group input/select/textarea` | — |
| Ícone SVG inline | — | sem sistema formal |

### Molecules

| Componente | Classe | Descrição |
|-----------|--------|-----------|
| Trust Item | `.trust-item` | Ícone + texto credencial |
| Credential Item | `.cred-item` | Emoji 🎓 + texto |
| Telemed Step | `.telemed-step` | Número circulado + título + descrição |
| Dep Card Author | `.dep-card__autor` | Nome + localidade |
| Form Row | `.form-row` | Grid 2 colunas de form-groups |

### Organisms

| Componente | Classe | Página(s) |
|-----------|--------|-----------|
| Header | `.header` | Todas |
| Mobile Menu | `.mobile-menu` | Todas |
| Hero Principal | `.hero` | index.html |
| Page Hero | `.page-hero` | Páginas internas |
| Trust Bar | `.trust-bar` | index.html |
| Treatment Card | `.trat-card` | index.html, tratamentos/index.html |
| Sobre Resumo | `.sobre-resumo__inner` | index.html, sobre.html |
| Depoimento Card | `.dep-card` | index.html |
| FAQ Item | `.faq-item` | index.html, perguntas-frequentes.html |
| Local Card | `.local-card` | index.html |
| Sidebar Card | `.sidebar-card` | Páginas internas |
| Instagram Grid | `.instagram` | index.html |
| CTA Strip | `.cta-strip` / `.trat-cta-strip` | Páginas de tratamento |
| CTA Final | `.cta-final` + `.section--dark` | index.html, telemedicina.html |
| Médicos Strip | `.medicos-strip` | index.html |
| WhatsApp Float | `.whatsapp-float` | Todas |
| Footer | `.footer` | Todas |

### Templates

| Template | Páginas |
|---------|---------|
| Homepage | index.html |
| Página Interna Simples | sobre.html, telemedicina.html, contato.html |
| Página de Tratamento | tratamentos/*.html |
| Hub de Tratamentos | tratamentos/index.html |
| FAQ | perguntas-frequentes.html |

---

## 3. Fluxos de Usuário

### Fluxo Principal — Agendamento

```
Landing (Hero)
  ↓ CTA "WhatsApp Jundiaí/SP"
    → Abre WhatsApp com mensagem pré-preenchida ✅

Landing (Hero)
  ↓ Navega para Tratamentos
    → Card do tratamento específico
      ↓ CTA Strip "Agendar consulta"
        → Abre WhatsApp ✅
```

### Fluxo Secundário — Informação

```
Google (busca orgânica)
  ↓ Página de tratamento específico
    → Lê conteúdo
      → Sidebar card "Agendar consulta"
        → WhatsApp ✅ ou Formulário ⚠️
```

### Fluxo Telemedicina

```
Landing → Telemedicina
  → Lê indicações
    → CTA "Agendar Teleconsulta"
      → WhatsApp ✅
```

---

## 4. Consistência Visual — Problemas Identificados

### Inline Styles Espalhados (inconsistência com design system)

Encontrados em:
- `contato.html` linhas 42-53: grid inline para botões WhatsApp
- `telemedicina.html` linha 41: grid inline no `sobre-resumo__inner`
- `telemedicina.html` linha 63: `grid-template-columns:1fr` nos steps
- `index.html`: múltiplos `style="..."` inline

Total estimado: **12+ ocorrências** de estilos inline que deveriam ser classes.

### Duplicação de Componentes

| Componente | Duplicações |
|-----------|-------------|
| `.cta-strip` e `.trat-cta-strip` | Mesmo CSS, duas classes |
| `.page-sidebar` e `.page-content__sidebar` | Aliases idênticos |
| Header HTML | Repetido em 18 páginas |
| Footer HTML | Repetido em 18 páginas |
| WhatsApp Float | Repetido em 18 páginas |

### Classe Órfã

- `.chegou__item` — Observer JS registrado em `main.js` linha 75, mas a seção foi removida da homepage. A classe ainda é usada em `telemedicina.html` com conteúdo diferente (semântica incorreta).

---

## 5. Acessibilidade (WCAG AA)

| Critério | Status | Observação |
|---------|--------|------------|
| Contraste texto/fundo | ✅ | Cores principais passam |
| Alt text em imagens | ⚠️ | Hero tem alt, fotos em sobre sem verificação |
| Aria-label em botões ícone | ❌ | WhatsApp float sem aria-label descritivo |
| Skip-to-content | ❌ | Ausente |
| Focus visible | ⚠️ | Apenas o padrão do browser |
| Landmarks semânticos | ✅ | header, nav, footer, section usados |
| Hamburger acessível | ⚠️ | `aria-label="Menu"` presente mas sem aria-expanded |
| Lang attribute | ✅ | `lang="pt-BR"` |

---

## 6. Débitos UX/Frontend Identificados

| ID | Débito | Severidade | Esforço | Impacto UX |
|----|--------|-----------|---------|------------|
| UX-01 | Navegação sem indicador de página ativa (`aria-current`, classe `.active`) | Média | Baixo | Desorientação do usuário |
| UX-02 | Formulário de contato sem backend — simula envio com setTimeout | Alta | Médio | Funcionalidade quebrada |
| UX-03 | 12+ ocorrências de inline styles fora do design system | Média | Médio | Manutenção difícil |
| UX-04 | Dois componentes CTA Strip idênticos (`.cta-strip` e `.trat-cta-strip`) | Baixa | Baixo | CSS inflado |
| UX-05 | Classe `.chegou__item` usada semanticamente errada em telemedicina.html | Baixa | Baixo | Confusão semântica |
| UX-06 | WhatsApp float sem `aria-label` descritivo | Média | Baixo | Acessibilidade |
| UX-07 | Hamburger sem `aria-expanded` | Média | Baixo | Acessibilidade |
| UX-08 | Sem skip-to-content link | Média | Baixo | Acessibilidade |
| UX-09 | Header/Footer/WhatsApp float duplicados em 18 arquivos HTML | Média | Alto | Manutenção — qualquer mudança requer 18 edições |
| UX-10 | Google Fonts carregado sem `display=swap` — bloqueia renderização | Média | Baixo | Performance percebida |
| UX-11 | Sem favicon | Baixa | Baixo | Brand/reconhecimento |
| UX-12 | Sem link de política de privacidade no footer | Média | Médio | Legal/LGPD |

---

## 7. Recomendações de Design

### Curto prazo (Quick Wins)
1. Adicionar `aria-label`, `aria-expanded` e classe `.active` na navegação
2. Unificar `.cta-strip` e `.trat-cta-strip` em uma única classe
3. Substituir Google Fonts CDN por `display=swap`
4. Adicionar favicon (mínimo: `.ico` 32x32)
5. Corrigir `.chegou__item` em telemedicina com classe semântica própria

### Médio prazo
6. Integrar formulário de contato com Formspree ou EmailJS
7. Extrair inline styles para classes no CSS
8. Adicionar skip-to-content e melhorar aria em WhatsApp float

### Longo prazo
9. Avaliar Static Site Generator (ex: 11ty, Astro) para eliminar duplicação de header/footer
10. Adicionar página de política de privacidade (LGPD)

---

*Documento gerado por @ux-design-expert (Uma) — Brownfield Discovery Fase 3*
