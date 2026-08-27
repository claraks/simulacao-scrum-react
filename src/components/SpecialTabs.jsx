import { BUYERS, BUYER_IMAGES, ROLE_COLORS, TEAM_IMAGES, TIMES } from "../utils/constants";
import { computeCorrupcaoPontos, computeSabotagemPontos, computeEmpresaScore } from "../utils/model";

export function CorruptionTab({ data, setField }) {
  const c = data.corrupcao;
  const s = data.sabotagem;
  const cp = computeCorrupcaoPontos(c);
  const sp = computeSabotagemPontos(s);
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const buyers = BUYERS.filter(b => b !== "Militar");

  return <div className="panel">
    <h2>Corrupção & Sabotagem</h2>
    <div className="desc">Estes dois mecanismos são baseados em regras fixas — os pontos abaixo são calculados automaticamente.</div>
    <div className="grid2">
      <div className="mini-card">
        <h3>Corruptor (Owner)</h3>
        <Row label="Empresa do corruptor"><select value={c.empresaCorruptora} onChange={e=>setField("corrupcao.empresaCorruptora",e.target.value)}>{empresas.map(e=><option key={e}>{e}</option>)}</select></Row>
        <Check label="1ª descoberta ocorreu" value={c.primeiraDescoberta} onChange={v=>setField("corrupcao.primeiraDescoberta",v)} />
        {c.primeiraDescoberta && <Row label="Comprador que aceitou (1ª vez)"><select value={c.primeiroComprador} onChange={e=>setField("corrupcao.primeiroComprador",e.target.value)}><option value="">—</option>{buyers.map(b=><option key={b}>{b}</option>)}</select></Row>}
        <Check label="2ª descoberta ocorreu (mesmo assim)" value={c.segundaDescoberta} disabled={!c.primeiraDescoberta} onChange={v=>setField("corrupcao.segundaDescoberta",v)} />
        {c.segundaDescoberta && <Row label="Comprador que aceitou (2ª vez)"><select value={c.segundoComprador} onChange={e=>setField("corrupcao.segundoComprador",e.target.value)}><option value="">—</option>{buyers.map(b=><option key={b}>{b}</option>)}</select></Row>}
        <Points label="Pontos do corruptor" value={cp.corruptor} />
        {Object.keys(cp.compradores).map(b=><Points key={b} label={`Pontos — ${b}`} value={cp.compradores[b]} />)}
        <div className="note note-red">O corruptor nunca troca de papel e continua negociando normalmente, mesmo após ser descoberto.</div>
      </div>
      <div className="mini-card">
        <h3>Sabotador (Developer)</h3>
        <Row label="Empresa do sabotador"><select value={s.empresaSabotador} onChange={e=>setField("sabotagem.empresaSabotador",e.target.value)}>{empresas.map(e=><option key={e}>{e}</option>)}</select></Row>
        <Row label="Time do sabotador"><select value={s.timeSabotador} onChange={e=>setField("sabotagem.timeSabotador",e.target.value)}>{TIMES.map(t=><option key={t}>{t}</option>)}</select></Row>
        <Row label="Tipo de ação"><select value={s.tipoAcao} onChange={e=>setField("sabotagem.tipoAcao",e.target.value)}><option value="vazar">Vazar informação</option><option value="atrapalhar">Atrapalhar decisões/produção</option></select></Row>
        <Check label="Sabotador foi descoberto" value={s.descoberto} onChange={v=>setField("sabotagem.descoberto",v)} />
        {s.descoberto && <><Row label="Denúncias consecutivas recebidas"><select value={s.denunciasConsecutivas} onChange={e=>setField("sabotagem.denunciasConsecutivas",Number(e.target.value))}><option value="0">0</option><option value="1">1</option><option value="2">2</option></select></Row><Check label="PO/colegas da área sabiam e ficaram calados" value={s.areaSoubeECalou} onChange={v=>setField("sabotagem.areaSoubeECalou",v)} /></>}
        <Points label="Pontos do sabotador" value={sp.sabotador} />
        <Points label="Pontos da área/time" value={sp.area} />
        <Points label="Demitido?" value={sp.demitido ? "SIM — vai para o time RIVAL" : "Não"} />
      </div>
    </div>
  </div>;
}

function Row({ label, children }) { return <div className="mini-row"><label>{label}</label>{children}</div> }
function Check({ label, value, onChange, disabled=false }) { return <div className="checkbox-row"><input type="checkbox" checked={value} disabled={disabled} onChange={e=>onChange(e.target.checked)} /><label>{label}</label></div> }
function Points({ label, value }) { const n=typeof value==="number"; return <div className="mini-row points-row"><label><strong>{label}</strong></label><span className={`pts ${n && value<0 ? "neg" : n && value>0 ? "pos" : ""}`}>{n ? `${value>0?"+":""}${value.toFixed(1)}` : value}</span></div> }

export function EscalacaoTab({ data }) {
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  return <div className="panel">
    <h2>Escalação</h2>
    <div className="desc">Visão de equipe, com a identidade visual de cada empresa.</div>
    {empresas.map(e => <Company key={e} data={data} empresa={e} />)}
    <h2 className="section-title">Compradores</h2>
    <div className="buyers-strip">{BUYERS.map(b => {
      const aluno = data.alunos.find(a => a.papel === `Comprador - ${b}`);
      return <div className="buyer-card" key={b}><img src={BUYER_IMAGES[b]} alt={b}/><div className="buyer-body"><h3>{b}</h3><div>{aluno ? aluno.nome : <span className="tag-unassigned">não atribuído</span>}</div></div></div>
    })}</div>
  </div>;
}

function Company({ data, empresa }) {
  const imgs = data.teamImages?.[empresa] || TEAM_IMAGES[empresa] || {};
  const sm = data.alunos.find(a => a.papel==="Scrum Master" && a.empresa===empresa);
  const owner = data.alunos.find(a => a.papel==="Owner/Stakeholder" && a.empresa===empresa);
  return <div className="company-block">
    <div className="company-header"><img src={imgs.logo || ""} alt={empresa}/><div><h2>{empresa}</h2><div className="muted">Scrum Master: {sm?.nome || <span className="tag-unassigned">não atribuído</span>} · Owner: {owner?.nome || <span className="tag-unassigned">não atribuído</span>}</div></div></div>
    <div className="teams-grid">{TIMES.map(time => {
      const roster = data.alunos.filter(a=>a.empresa===empresa && a.time===time && ["Product Owner","Developer"].includes(a.papel));
      return <div className="team-card" key={time}><img className="team-img" src={imgs[time] || ""} alt={data.teamNames[empresa][time]}/><div className="team-body"><h3>{data.teamNames[empresa][time]}</h3><ul className="role-list">{roster.length ? roster.sort((a,b)=>a.papel==="Product Owner"?-1:1).map(a=><li key={a.id}><span>{a.nome}</span><span className="role-badge" style={{background:ROLE_COLORS[a.papel]}}>{a.papel==="Product Owner"?"PO":"Dev"}</span></li>) : <li><span className="tag-unassigned">ninguém atribuído ainda</span></li>}</ul></div></div>
    })}</div>
  </div>
}

export function ResultTab({ data }) {
  const scores = [data.meta.empresaA,data.meta.empresaB].map(empresa=>({empresa,...computeEmpresaScore(data,empresa)}));
  return <div className="panel"><h2>Resultado Final</h2><div className="desc">Cálculo automático a partir das médias lançadas em cada aba, ajustado pelos pontos de corrupção/sabotagem.</div><div className="grid2">{scores.map((s,i)=><div className={`dash-card score-${i}`} key={s.empresa}><h3>{s.empresa}</h3><div className="big">{s.final!==null?s.final.toFixed(2):"—"}</div><div className="breakdown">{s.parts.map(p=><div key={p.key}><span>{p.key}</span><span>{p.val!==null?p.val.toFixed(2):"—"}</span></div>)}<div className="adjustment"><span>Ajuste (corrupção/sabotagem)</span><span>{s.ajuste>=0?"+":""}{s.ajuste.toFixed(1)}</span></div></div></div>)}</div><div className="note note-orange">A nota final é uma média ponderada das notas médias por papel, somada aos pontos fixos de corrupção/sabotagem. Ela não substitui seu julgamento.</div></div>
}
