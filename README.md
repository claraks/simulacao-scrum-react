# Painel de Avaliação — Simulação Scrum Competitiva

Aplicação React para o painel de avaliação da Simulação Scrum Competitiva.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra o endereço exibido pelo Vite no terminal.

## Build

```bash
npm run build
```

## Pré-visualização do build

```bash
npm run preview
```

## Persistência

Os dados são mantidos automaticamente no `localStorage` do navegador a cada alteração. O botão `Salvar dados` também permite gerar uma cópia JSON. O botão `Carregar dados` restaura uma cópia JSON gerada pelo painel.

## Lista de alunos

A lista inicial é carregada a partir dos nomes definidos no modelo da aplicação. A aba `Alunos` também permite importar uma planilha `.xlsx` ou `.xls`.

## Estrutura

- `src/components`: componentes da interface
- `src/utils`: modelo de dados e regras de cálculo
- `public/images`: imagens fornecidas para empresas, times e compradores
- `public/data`: planilha de referência dos alunos
