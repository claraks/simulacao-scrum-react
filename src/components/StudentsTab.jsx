import { PAPERS, TIMES } from "../utils/constants";
import { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";

export default function StudentsTab({ data, setData }) {
  const [query, setQuery] = useState("");
  const fileRef = useRef(null);
  const empresas = [data.meta.empresaA, data.meta.empresaB];

  const counts = useMemo(() => {
    const result = {};
    empresas.forEach(e => result[e] = { "Scrum Master": 0, "Owner/Stakeholder": 0, "Product Owner-Caça": 0, "Product Owner-Transporte": 0, "Developer-Caça": 0, "Developer-Transporte": 0 });
    const buyers = { "Comprador - Governo": 0, "Comprador - Militar": 0, "Comprador - Setor Privado": 0 };
    data.alunos.forEach(a => {
      if (buyers[a.papel] !== undefined) buyers[a.papel]++;
      else if (result[a.empresa]?.[a.papel] !== undefined) result[a.empresa][a.papel]++;
      else if (result[a.empresa] && a.time && result[a.empresa][`${a.papel}-${a.time}`] !== undefined) result[a.empresa][`${a.papel}-${a.time}`]++;
    });
    return { result, buyers };
  }, [data.alunos, empresas]);

  const updateAluno = (index, field, value) => {
    setData(prev => {
      const alunos = prev.alunos.map((a, i) => i === index ? { ...a, [field]: value } : a);
      return { ...prev, alunos };
    });
  };

  const importExcel = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      const names = [];
      wb.SheetNames.forEach(sheet => {
        XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1 }).forEach(row => row.forEach(cell => {
          if (typeof cell === "string" && cell.trim().split(" ").length >= 2 && cell.trim().length > 5 && !/\d/.test(cell)) names.push(cell.trim());
        }));
      });
      const unique = [...new Set(names)];
      if (!unique.length) {
        window.alert("Não encontrei nomes reconhecíveis nesse arquivo.");
        return;
      }
      if (!window.confirm(`Encontrei ${unique.length} nomes. Isso substitui a lista atual de alunos. Continuar?`)) return;
      setData(prev => ({ ...prev, alunos: unique.map((nome, i) => ({ id: i + 1, nome, empresa: "", time: "", papel: "" })) }));
    } catch {
      window.alert("Não foi possível ler este arquivo Excel.");
    } finally {
      event.target.value = "";
    }
  };

  return <div className="panel">
    <h2>Alunos</h2>
    <div className="desc">Atribua cada aluno a um papel e equipe. A atribuição é feita aqui pelo professor.</div>
    <div className="roster-search"><input type="text" placeholder="Buscar aluno por nome..." value={query} onChange={e => setQuery(e.target.value)} /></div>
    <table className="roster-table"><thead><tr><th>#</th><th>Nome</th><th>Papel</th><th>Empresa</th><th>Time</th></tr></thead><tbody>
      {data.alunos.map((a, i) => {
        const visible = a.nome.toLowerCase().includes(query.toLowerCase());
        const needsEmpresa = ["Scrum Master", "Owner/Stakeholder", "Product Owner", "Developer"].includes(a.papel);
        const needsTime = ["Product Owner", "Developer"].includes(a.papel);
        return <tr key={a.id} style={{ display: visible ? "" : "none" }}>
          <td>{a.id}</td><td>{a.nome}</td>
          <td><select value={a.papel} onChange={e => {
            const papel = e.target.value;
            setData(prev => ({ ...prev, alunos: prev.alunos.map((item, idx) => idx === i ? { ...item, papel, empresa: ["Scrum Master","Owner/Stakeholder","Product Owner","Developer"].includes(papel) ? item.empresa : "", time: ["Product Owner","Developer"].includes(papel) ? item.time : "" } : item) }));
          }}>{PAPERS.map(p => <option key={p} value={p}>{p || "— não atribuído —"}</option>)}</select></td>
          <td>{needsEmpresa && <select value={a.empresa} onChange={e => updateAluno(i, "empresa", e.target.value)}><option value="">—</option>{empresas.map(e => <option key={e} value={e}>{e}</option>)}</select>}</td>
          <td>{needsTime && <select value={a.time} onChange={e => updateAluno(i, "time", e.target.value)}><option value="">—</option>{TIMES.map(t => <option key={t} value={t}>{t}</option>)}</select>}</td>
        </tr>;
      })}
    </tbody></table>
    <div className={`note ${data.alunos.filter(a => !a.papel).length ? "note-orange" : "note-green"}`}>
      {data.alunos.filter(a => !a.papel).length} de {data.alunos.length} alunos ainda sem papel atribuído.
    </div>
    <h2 className="section-title">Resumo de Vagas Preenchidas</h2>
    <div className="grid2">{empresas.map(e => <div className="mini-card" key={e}>
      <h3>{e}</h3>
      <Count label="Scrum Master" value={counts.result[e]["Scrum Master"]} max="1" />
      <Count label="Owner/Stakeholder" value={counts.result[e]["Owner/Stakeholder"]} max="1" />
      <Count label={`PO — ${data.teamNames[e].Caça}`} value={counts.result[e]["Product Owner-Caça"]} max="1" />
      <Count label={`PO — ${data.teamNames[e].Transporte}`} value={counts.result[e]["Product Owner-Transporte"]} max="1" />
      <Count label={`Devs — ${data.teamNames[e].Caça}`} value={counts.result[e]["Developer-Caça"]} max="4" />
      <Count label={`Devs — ${data.teamNames[e].Transporte}`} value={counts.result[e]["Developer-Transporte"]} max="5" />
    </div>)}</div>
    <div className="mini-card buyer-summary"><h3>Compradores</h3>
      <Count label="Governo" value={counts.buyers["Comprador - Governo"]} max="1" />
      <Count label="Militar" value={counts.buyers["Comprador - Militar"]} max="1" />
      <Count label="Setor Privado" value={counts.buyers["Comprador - Setor Privado"]} max="1" />
    </div>
    <h2 className="section-title">Importar Lista de Alunos</h2>
    <div className="desc">Substitui a lista atual por uma nova a partir de um arquivo Excel.</div>
    <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={importExcel} />
  </div>;
}

function Count({ label, value, max }) {
  return <div className="mini-row"><label>{label}</label><span className="pts">{value} / {max}</span></div>;
}
