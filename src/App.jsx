// Módulo de Componentes Visuais - Desenvolvido por Manuela
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import SetupTab from "./components/SetupTab";
import StudentsTab from "./components/StudentsTab";
import { SMTab, OwnerTab, POTab, DevTab, BuyerProfTab, BuyerProductTab } from "./components/EvaluationTabs";
import { CorruptionTab, EscalacaoTab, ResultTab } from "./components/SpecialTabs";
import { buildInitialData } from "./utils/model";

const STORAGE_KEY = "scrum-simulacao-react";

export default function App() {
  const [data, setData] = useState(() => loadStored() || buildInitialData());
  const [tab, setTab] = useState("setup");
  const [fileName, setFileName] = useState("(nenhum arquivo carregado)");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${data.meta.fontScale || 16}px`;
  }, [data.meta.fontScale]);

  const setField = (path, value) => {
    setData(prev => {
      const parts = path.split(".");
      const next = structuredClone(prev);
      let current = next;
      parts.slice(0, -1).forEach(part => {
        current = current[part];
      });
      current[parts.at(-1)] = value;
      return next;
    });
  };

  const renameEmpresa = (which, novoNome) => {
    const oldName = which === "A" ? data.meta.empresaA : data.meta.empresaB;
    const newName = novoNome.trim();
    if (!newName || newName === oldName) return;
    setData(prev => {
      const next = structuredClone(prev);
      const rename = value => value === oldName ? newName : value;
      ["sm","owner","po","dev","buyerProduct"].forEach(key => next[key].forEach(row => row.empresa = rename(row.empresa)));
      next.alunos.forEach(aluno => aluno.empresa = rename(aluno.empresa));
      next.corrupcao.empresaCorruptora = rename(next.corrupcao.empresaCorruptora);
      next.sabotagem.empresaSabotador = rename(next.sabotagem.empresaSabotador);
      if (next.teamImages?.[oldName]) {
        next.teamImages[newName] = next.teamImages[oldName];
        delete next.teamImages[oldName];
      }
      if (next.teamNames[oldName]) {
        next.teamNames[newName] = next.teamNames[oldName];
        delete next.teamNames[oldName];
      }
      if (which === "A") next.meta.empresaA = newName;
      else next.meta.empresaB = newName;
      return next;
    });
  };

  const saveJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const safe = (data.meta.turma || "simulacao").replace(/[^a-z0-9_-]+/gi, "_");
    const link = document.createElement("a");
    link.href = url;
    link.download = `scrum_simulacao_${safe}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadJson = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        setData(normalizeLoaded(parsed));
        setFileName(file.name);
        setTab("setup");
      } catch {
        window.alert("Não foi possível ler este arquivo. Verifique se é um JSON válido gerado pelo painel.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (!window.confirm("Isso apaga todos os dados lançados nesta sessão. Continuar?")) return;
    const initial = buildInitialData();
    setData(initial);
    setFileName("(nenhum arquivo carregado)");
    setTab("setup");
  };

  const changeFont = delta => {
    setData(prev => ({ ...prev, meta: { ...prev.meta, fontScale: Math.max(12, Math.min(24, (prev.meta.fontScale || 16) + delta)) } }));
  };

  const content = useMemo(() => {
    const props = { data, setData, setField };
    if (tab === "setup") return <SetupTab {...props} renameEmpresa={renameEmpresa} onReset={reset} />;
    if (tab === "alunos") return <StudentsTab {...props} />;
    if (tab === "escalacao") return <EscalacaoTab data={data} />;
    if (tab === "sm") return <SMTab {...props} />;
    if (tab === "owner") return <OwnerTab {...props} />;
    if (tab === "po") return <POTab {...props} />;
    if (tab === "dev") return <DevTab {...props} />;
    if (tab === "buyerProf") return <BuyerProfTab {...props} />;
    if (tab === "buyerProduct") return <BuyerProductTab {...props} />;
    if (tab === "corrupsab") return <CorruptionTab data={data} setField={setField} />;
    return <ResultTab data={data} />;
  }, [tab, data]);

  return <div>
    <header className="topbar">
      <div><h1>Painel de Avaliação — Simulação Scrum Competitiva</h1><div className="sub">Desenvolvimento Web II · React</div></div>
      <div className="topbar-actions">
        <span className="file-label">{fileName}</span>
        <button className="btn btn-save" onClick={saveJson}>Salvar dados</button>
        <label className="btn btn-load">Carregar dados<input hidden type="file" accept=".json" onChange={loadJson}/></label>
        <button className="btn btn-reset" onClick={reset}>Limpar</button>
        <div className="fontctrl"><button onClick={()=>changeFont(-1)}>A−</button><span>{data.meta.fontScale || 16}px</span><button onClick={()=>setData(prev=>({...prev,meta:{...prev.meta,fontScale:16}}))}>A</button><button onClick={()=>changeFont(1)}>A+</button></div>
      </div>
    </header>
    <Tabs active={tab} onChange={setTab} />
    <main className="wrap">{content}<div className="footer-note">Dados salvos automaticamente neste navegador. O botão “Salvar dados” gera uma cópia JSON para arquivo.</div></main>
  </div>;
}

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeLoaded(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function normalizeLoaded(parsed) {
  const base = buildInitialData(parsed.meta?.empresaA || "Maverick Aviation", parsed.meta?.empresaB || "SkyForge Ind. Aeronáutica");
  return {
    ...base,
    ...parsed,
    meta: { ...base.meta, ...(parsed.meta || {}) },
    weights: { ...base.weights, ...(parsed.weights || {}) },
    corrupcao: { ...base.corrupcao, ...(parsed.corrupcao || {}) },
    sabotagem: { ...base.sabotagem, ...(parsed.sabotagem || {}) },
    teamImages: { ...base.teamImages, ...(parsed.teamImages || {}) },
    teamNames: { ...base.teamNames, ...(parsed.teamNames || {}) },
    alunos: parsed.alunos || base.alunos
  };
}
