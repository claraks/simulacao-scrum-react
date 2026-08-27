const weightLabels = { sm: "Scrum Master", owner: "Product Owner", po: "Product Owner", dev: "Developers", buyer: "Avaliação dos Compradores" };

export default function SetupTab({ data, setField, renameEmpresa, onReset }) {
  const { meta, weights, teamNames } = data;
  return <div className="panel">
    <h2>Configuração</h2>
    <div className="desc">Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.</div>
    <div className="fields-row">
      <Field label="Turma"><input type="text" value={meta.turma} onChange={e => setField("meta.turma", e.target.value)} /></Field>
      <Field label="Data"><input type="text" value={meta.data} onChange={e => setField("meta.data", e.target.value)} /></Field>
    </div>
    <div className="fields-row">
      <Field label="Nome — Empresa A"><input type="text" value={meta.empresaA} onBlur={e => renameEmpresa("A", e.target.value)} /></Field>
      <Field label="Time Caça — Empresa A"><input type="text" value={teamNames[meta.empresaA]?.Caça || ""} onChange={e => setField(`teamNames.${meta.empresaA}.Caça`, e.target.value)} /></Field>
      <Field label="Time Transporte — Empresa A"><input type="text" value={teamNames[meta.empresaA]?.Transporte || ""} onChange={e => setField(`teamNames.${meta.empresaA}.Transporte`, e.target.value)} /></Field>
    </div>
    <div className="fields-row">
      <Field label="Nome — Empresa B"><input type="text" value={meta.empresaB} onBlur={e => renameEmpresa("B", e.target.value)} /></Field>
      <Field label="Time Caça — Empresa B"><input type="text" value={teamNames[meta.empresaB]?.Caça || ""} onChange={e => setField(`teamNames.${meta.empresaB}.Caça`, e.target.value)} /></Field>
      <Field label="Time Transporte — Empresa B"><input type="text" value={teamNames[meta.empresaB]?.Transporte || ""} onChange={e => setField(`teamNames.${meta.empresaB}.Transporte`, e.target.value)} /></Field>
    </div>
    <div className="note note-dark">Os nomes de empresa e dos times podem ser alterados conforme a turma.</div>
    <h2 className="section-title">Pesos da Nota Final</h2>
    <div className="desc">Ajuste o peso de cada papel no cálculo da nota final da empresa.</div>
    <div className="weights-panel">
      {Object.keys(weights).map(key => <div className="weight-field" key={key}>
        <label>{weightLabels[key]}</label>
        <input type="number" min="0" step="0.5" value={weights[key]} onChange={e => setField(`weights.${key}`, Number(e.target.value) || 0)} />
      </div>)}
    </div>
    <button className="btn btn-reset" onClick={onReset}>Restaurar dados iniciais</button>
  </div>;
}

function Field({ label, children }) {
  return <div className="field"><label>{label}</label>{children}</div>;
}
