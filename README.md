#  Simulação Scrum Competitiva - Painel de Avaliação

Aplicação web desenvolvida em React para gerenciar e avaliar o desempenho de alunos em simulações do Framework Scrum. O sistema contempla o gerenciamento de turmas, alunos, escalação de papéis e relatório consolidado.

---

##  Sumário
1. [Sobre o Projeto](#sobre-o-projeto)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura do Repositório](#estrutura-do-repositório)
5. [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
6. [Mecanismos de Persistência](#mecanismos-de-persistência)
7. [Autoria e Créditos](#autoria-e-créditos)

---

## Sobre o Projeto

O projeto consiste no porting e na refatoração da ferramenta de avaliação Scrum para o ecossistema React, garantindo maior modularização dos componentes, responsividade na interface e persistência reativa dos dados de simulação.

---

##  Funcionalidades Principais

- **Aba Configuração:**
  - Ajuste de parâmetros de tempo e critérios da simulação.
  - Carregamento e redefinição da lista oficial de participantes.

- **Aba Alunos:**
  - Listagem detalhada de todos os participantes.
  - Cadastro de novos integrantes com campos validados.

- **Aba Escalação:**
  - Atribuição dos papéis do Scrum (Product Owner, Scrum Master, Developers).
  - Controle de limites por papel segundo a dinâmica.

- **Aba Avaliação de Papéis:**
  - Formulário para atribuição de notas por critérios técnicos e comportamentais.

- **Aba Resultado Final:**
  - Exibição gráfica e sumarizada dos vencedores e relatórios finais.

---

##  Tecnologias Utilizadas

- **React.js:** Biblioteca principal para criação da interface baseada em componentes.
- **JavaScript (ES6+):** Lógica funcional e manipulação de estado.
- **HTML5 & CSS3:** Semântica web e estilização.
- **LocalStorage API:** Persistência local reativa dos dados.
- **Git & GitHub:** Controle de versão distribuído.

---

## Estrutura do Repositório

```text
├── public/             # Arquivos públicos e ícones
├── src/                # Código-fonte da aplicação React
│   ├── assets/         # Imagens oficiais de fabricantes/setores
│   ├── components/     # Componentes da interface
│   ├── context/        # Gerenciamento de estado global
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Ponto de entrada do DOM
├── .gitignore          # Regras de exclusão do Git
├── package.json        # Dependências e scripts do projeto
└── README.md           # Documentação completa