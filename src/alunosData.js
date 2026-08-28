// Base de dados oficial de alunos para inicialização da simulação Scrum

export const alunosMockData = [
  { id: 1, nome: "Ana Silva", papel: "Product Owner", pontuacao: 85, status: "Ativo" },
  { id: 2, nome: "Bruno Costa", papel: "Scrum Master", pontuacao: 90, status: "Ativo" },
  { id: 3, nome: "Carla Dias", papel: "Developer", pontuacao: 88, status: "Ativo" },
  { id: 4, nome: "Daniel Lima", papel: "Developer", pontuacao: 92, status: "Ativo" },
  { id: 5, nome: "Eduardo Rocha", papel: "Developer", pontuacao: 80, status: "Ativo" },
  { id: 6, "nome": "Fernanda Souza", papel: "Product Owner", pontuacao: 95, status: "Ativo" },
  { id: 7, nome: "Gabriel Alves", papel: "Scrum Master", pontuacao: 87, status: "Ativo" },
  { id: 8, nome: "Helena Martins", papel: "Developer", pontuacao: 91, status: "Ativo" },
  { id: 9, nome: "Igor Barbosa", papel: "Developer", pontuacao: 84, status: "Ativo" },
  { id: 10, nome: "Juliana Mendes", papel: "Developer", pontuacao: 89, status: "Ativo" },
  { id: 11, nome: "Lucas Oliveira", papel: "Product Owner", pontuacao: 82, status: "Ativo" },
  { id: 12, nome: "Mariana Santos", papel: "Scrum Master", pontuacao: 94, status: "Ativo" },
  { id: 13, nome: "Nicolas Pereira", papel: "Developer", pontuacao: 79, status: "Ativo" },
  { id: 14, nome: "Olivia Ferreira", papel: "Developer", pontuacao: 88, status: "Ativo" },
  { id: 15, nome: "Pedro Henrique", papel: "Developer", pontuacao: 90, status: "Ativo" },
  { id: 16, nome: "Quintino Ramos", papel: "Product Owner", pontuacao: 86, status: "Ativo" },
  { id: 17, nome: "Rafaela Cruz", papel: "Scrum Master", pontuacao: 93, status: "Ativo" },
  { id: 18, nome: "Samuel Viana", papel: "Developer", pontuacao: 81, status: "Ativo" },
  { id: 19, status: "Ativo", nome: "Tatiane Cardoso", papel: "Developer", pontuacao: 87 },
  { id: 20, status: "Ativo", nome: "Ubirajara Neto", papel: "Developer", pontuacao: 85 },
  { id: 21, status: "Ativo", nome: "Vanessa Duarte", papel: "Product Owner", pontuacao: 89 },
  { id: 22, status: "Ativo", nome: "Wagner Lopes", papel: "Scrum Master", pontuacao: 91 },
  { id: 23, status: "Ativo", nome: "Xavier Machado", papel: "Developer", pontuacao: 78 },
  { id: 24, status: "Ativo", nome: "Yasmin Ribeiro", papel: "Developer", pontuacao: 96 },
  { id: 25, status: "Ativo", nome: "Zeneide Faria", papel: "Developer", pontuacao: 83 },
  { id: 26, status: "Ativo", nome: "Arthur Castro", papel: "Product Owner", pontuacao: 88 },
  { id: 27, status: "Ativo", nome: "Beatriz Nogueira", papel: "Scrum Master", pontuacao: 92 },
  { id: 28, status: "Ativo", nome: "Caio Teixeira", papel: "Developer", pontuacao: 84 },
  { id: 29, status: "Ativo", nome: "Debora Fonseca", papel: "Developer", pontuacao: 89 },
  { id: 30, status: "Ativo", nome: "Erick Freitas", papel: "Developer", pontuacao: 90 }
];

export const obterAlunosAtivos = () => {
  return alunosMockData.filter(aluno => aluno.status === "Ativo");
};

export const obterAlunosPorPapel = (papel) => {
  return alunosMockData.filter(aluno => aluno.papel === papel);
};

export const calcularMediaPontuacao = () => {
  const total = alunosMockData.reduce((acc, aluno) => acc + aluno.pontuacao, 0);
  return (total / alunosMockData.length).toFixed(2);
};