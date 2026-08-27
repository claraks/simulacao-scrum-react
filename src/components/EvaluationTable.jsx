import { SPRINTS } from "../utils/constants";

export function SelectSN({ value, onChange }) {
  return <select value={value} onChange={e => onChange(e.target.value)}>
    <option value="">—</option><option value="S">Sim</option><option value="N">Não</option>
  </select>;
}

export function SelectScore({ value, onChange }) {
  return <select value={value} onChange={e => onChange(e.target.value)}>
    <option value="">—</option>
    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
  </select>;
}

export function SelectDecision({ value, onChange }) {
  return <select value={value} onChange={e => onChange(e.target.value)}>
    <option value="">—</option><option value="A">Aceitou</option><option value="I">Ignorou</option><option value="D">Denunciou</option>
  </select>;
}

export function SprintLabel({ rows, index }) {
  return index === 0 || rows[index].sprint !== rows[index - 1].sprint ? `Sprint ${rows[index].sprint}` : "";
}

export function TextInput({ value, onChange, placeholder = "" }) {
  return <input className="obs-input" type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
}

export function EvaluationTable({ title, description, children, note, noteClass = "note-dark" }) {
  return <div className="panel">
    <h2>{title}</h2>
    <div className="desc">{description}</div>
    <div className="table-wrap"><table><thead>{children.header}</thead><tbody>{children.body}</tbody></table></div>
    <div className={`note ${noteClass}`}>{note}</div>
  </div>;
}

export function sprintRows(rows, renderRow) {
  return rows.map((row, index) => renderRow(row, index, <SprintLabel rows={rows} index={index} />));
}
