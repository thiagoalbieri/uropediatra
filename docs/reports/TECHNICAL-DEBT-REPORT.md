# Relatório Executivo — Dívida Técnica

**Projeto:** Site Dra. Marcela Leal da Cruz — Uropediatra  
**Agente:** @analyst (Alex)  
**Data:** 2026-05-18  
**Destinatário:** Thiago Albieri (responsável técnico)

---

## Situação Atual

O site institucional da Dra. Marcela está **publicado e funcional** em `thiagoalbieri.github.io/uropediatra`. O caminho principal de conversão — WhatsApp — funciona corretamente. O site pode ser validado pela Dra. Marcela neste endereço.

O levantamento de dívida técnica identificou **27 pontos de melhoria** classificados por impacto e urgência.

---

## O que está funcionando bem

- Fluxo principal de agendamento via WhatsApp (Jundiaí e São Paulo) — funcional
- Conteúdo clínico informativo em 12 páginas de tratamentos
- Design responsivo mobile-first — funciona em celulares
- SEO básico: títulos únicos, meta descriptions, Schema.org (médico)
- Mapa do Google embarcado nas duas unidades
- Hospedagem estável no GitHub Pages com HTTPS

---

## Riscos que precisam de atenção imediata

### 1. Mensagens perdidas de pacientes

O formulário de contato **simula** o envio mas não entrega nenhuma mensagem. Um paciente que use o formulário ao invés do WhatsApp nunca será atendido. O site precisa de uma das seguintes ações antes da divulgação ampla:

- Integrar o formulário com serviço de e-mail (Formspree — gratuito para até 50 envios/mês)
- Ou exibir aviso claro no formulário enquanto a integração não é feita

**Impacto:** Alto — perda direta de potenciais pacientes.  
**Esforço:** 4–6 horas (integração) ou 0.5 hora (aviso temporário).

### 2. Acessibilidade (obrigatória por lei)

Três pontos de acessibilidade impedem conformidade com o padrão WCAG AA, que é referência para a Lei Brasileira de Inclusão:

- Botão flutuante do WhatsApp sem identificação para leitores de tela
- Menu mobile sem indicador de estado (aberto/fechado) para tecnologia assistiva
- Ausência de link "ir para o conteúdo" para navegação por teclado

Correção estimada: 1.5 horas no total.

### 3. Política de Privacidade (LGPD)

O site coleta dados via formulário de contato mas não possui política de privacidade. A LGPD (Lei 13.709/2018) exige que sites informem como os dados são tratados. Risco de penalidade da ANPD.

**Esforço:** 2–3 horas para criar a página e adicionar o link no rodapé.

---

## Pontos a resolver antes de apontar o domínio definitivo

Quando o domínio `www.uropediatra.com.br` for ativado, dois arquivos precisam ser atualizados (robots.txt e sitemap.xml) — atualmente apontam para o domínio correto, mas o DNS ainda não foi configurado. Isso afeta o ranqueamento no Google. Esforço: 30 minutos.

---

## Melhorias de qualidade — próximo sprint

Após resolver os pontos urgentes, as melhorias de qualidade incluem:

| Melhoria | Benefício | Esforço |
|---------|-----------|---------|
| Google Analytics | Dados de tráfego e conversão | 1h |
| Favicon | Reconhecimento da marca na aba do browser | 0.5h |
| Google Fonts otimizado | Carregamento mais rápido percebido | 0.5h |
| Active state na navegação | Usuário sabe em qual página está | 1h |
| Limpeza de código CSS | Manutenção mais fácil | 2–3h |

---

## Dívida estrutural (longo prazo)

O principal débito estrutural é a duplicação do cabeçalho, rodapé e botão WhatsApp em 18 arquivos HTML. Qualquer alteração nesses componentes exige editar 18 arquivos manualmente — alto risco de inconsistência.

A solução recomendada é migrar para um gerador de site estático (Eleventy/11ty), que continua gerando arquivos HTML para GitHub Pages mas elimina a duplicação via templates. Esforço estimado: 12–20 horas. Esta é uma decisão de longo prazo que não afeta o lançamento.

---

## Resumo de esforço e prioridade

| Prioridade | Itens | Esforço Total | Quando |
|-----------|-------|--------------|--------|
| P1 — Antes da divulgação ampla | 7 itens | 7–9 horas | Sprint 1 |
| P2 — Próximo sprint | 12 itens | 11–13 horas | Sprint 2 |
| P3 — Dívida estrutural | 4 itens | 17–27 horas | Backlog |

**Total:** 35–49 horas de desenvolvimento para eliminar toda a dívida técnica identificada.

---

## Recomendação

O site está pronto para **validação interna com a Dra. Marcela**. Antes de divulgação pública ampla, priorizar:

1. Formspree no formulário de contato (ou aviso temporário) — risco de negócio
2. Três correções de acessibilidade WCAG — risco legal e inclusão
3. Política de privacidade LGPD — risco regulatório

Esses itens somam aproximadamente 7 horas de desenvolvimento e eliminam os principais riscos antes do lançamento.

---

*Relatório gerado por @analyst (Alex) — Brownfield Discovery Fase 9*  
*Baseado em: `docs/prd/technical-debt-assessment.md`*
