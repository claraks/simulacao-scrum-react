export const TABS = [
  ["setup", "Configuração"],
  ["alunos", "Alunos"],
  ["escalacao", "Escalação"],
  ["sm", "Scrum Master"],
  ["owner", "Owner"],
  ["po", "Product Owner"],
  ["dev", "Developers"],
  ["buyerProf", "Compradores (Papel)"],
  ["buyerProduct", "Compradores (Produto)"],
  ["corrupsab", "Corrupção & Sabotagem"],
  ["result", "Resultado Final"]
];

export default function Tabs({ active, onChange }) {
  return <nav className="tabs">
    {TABS.map(([key, label]) => <button key={key} className={`tab ${active === key ? "active" : ""}`} onClick={() => onChange(key)}>{label}</button>)}
  </nav>;
}
