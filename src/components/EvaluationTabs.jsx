import { SelectDecision, SelectScore, SelectSN, TextInput, SprintLabel } from "./EvaluationTable";

function Table({ headers, children }) {
  return <div className="table-wrap"><table><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}

function update(setData, collection, index, field, value) {
  setData(prev => ({ ...prev, [collection]: prev[collection].map((r, i) => i === index ? { ...r, [field]: value } : r) }));
}

export function SMTab({ data, setData }) {
  return <Panel title="Scrum Master" desc="Avaliação de processo — um Scrum Master por empresa, atendendo os dois times." note="Critério-guia: o SM não é avaliado por produzir, mas por garantir que o Scrum aconteça de verdade e por ajudar o time a evoluir de uma Sprint para a outra.">
    <Table headers={["Sprint","Empresa","Conduziu os eventos corretamente?","Removeu impedimentos?","Ajudou o time a melhorar entre Sprints?","Nota (1-5)","Observações"]}>
      {data.sm.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.sm} index={i}/></td><td>{r.empresa}</td><td><SelectSN value={r.conduziu} onChange={v=>update(setData,"sm",i,"conduziu",v)}/></td><td><SelectSN value={r.removeu} onChange={v=>update(setData,"sm",i,"removeu",v)}/></td><td><SelectSN value={r.ajudou} onChange={v=>update(setData,"sm",i,"ajudou",v)}/></td><td><SelectScore value={r.nota} onChange={v=>update(setData,"sm",i,"nota",v)}/></td><td><TextInput value={r.obs} onChange={v=>update(setData,"sm",i,"obs",v)}/></td></tr>)}
    </Table>
  </Panel>;
}

export function OwnerTab({ data, setData }) {
  return <Panel title="Stakeholder / Owner" desc='Avaliação de comunicação e negociação — independente dos pontos de corrupção.' note="Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no mecanismo de corrupção.">
    <Table headers={["Sprint","Empresa","Comunicação com a equipe (1-5)","Negociação com compradores (1-5)","Alinhamento com SM/PO sobre qualidade (1-5)","Nota Geral (1-5)","Observações"]}>
      {data.owner.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.owner} index={i}/></td><td>{r.empresa}</td><td><SelectScore value={r.comunicacao} onChange={v=>update(setData,"owner",i,"comunicacao",v)}/></td><td><SelectScore value={r.negociacao} onChange={v=>update(setData,"owner",i,"negociacao",v)}/></td><td><SelectScore value={r.alinhamento} onChange={v=>update(setData,"owner",i,"alinhamento",v)}/></td><td><SelectScore value={r.notaGeral} onChange={v=>update(setData,"owner",i,"notaGeral",v)}/></td><td><TextInput value={r.obs} onChange={v=>update(setData,"owner",i,"obs",v)}/></td></tr>)}
    </Table>
  </Panel>;
}

export function POTab({ data, setData }) {
  return <Panel title="Product Owner" desc="Um Product Owner por time (2 times por empresa)." note="Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da produção — não pela qualidade técnica do avião em si." noteClass="note-teal">
    <Table headers={["Sprint","Empresa","Time","Requisitos claros ao time?","Acompanhou os testes de perto?","Reunião de priorização ocorreu?","Nota (1-5)","Observações"]}>
      {data.po.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.po} index={i}/></td><td>{r.empresa}</td><td>{r.time}</td><td><SelectSN value={r.requisitos} onChange={v=>update(setData,"po",i,"requisitos",v)}/></td><td><SelectSN value={r.testes} onChange={v=>update(setData,"po",i,"testes",v)}/></td><td><SelectSN value={r.reuniao} onChange={v=>update(setData,"po",i,"reuniao",v)}/></td><td><SelectScore value={r.nota} onChange={v=>update(setData,"po",i,"nota",v)}/></td><td><TextInput value={r.obs} onChange={v=>update(setData,"po",i,"obs",v)}/></td></tr>)}
    </Table>
  </Panel>;
}

export function DevTab({ data, setData }) {
  return <Panel title="Developers" desc="Avaliação por time — a qualidade do produto é o principal indicador de entendimento do processo pelo grupo." note="Reserve a coluna de destaque individual apenas para casos que realmente chamem atenção, positiva ou negativamente." noteClass="note-green">
    <Table headers={["Sprint","Empresa","Time","Qualidade do produto (1-5)","Seguiu o processo?","Colaboração do time (1-5)","Nota Time (1-5)","Destaque individual (opcional)"]}>
      {data.dev.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.dev} index={i}/></td><td>{r.empresa}</td><td>{r.time}</td><td><SelectScore value={r.qualidade} onChange={v=>update(setData,"dev",i,"qualidade",v)}/></td><td><SelectSN value={r.processo} onChange={v=>update(setData,"dev",i,"processo",v)}/></td><td><SelectScore value={r.colaboracao} onChange={v=>update(setData,"dev",i,"colaboracao",v)}/></td><td><SelectScore value={r.notaTime} onChange={v=>update(setData,"dev",i,"notaTime",v)}/></td><td><TextInput value={r.destaque} onChange={v=>update(setData,"dev",i,"destaque",v)} placeholder="nome (se houver)"/></td></tr>)}
    </Table>
  </Panel>;
}

export function BuyerProfTab({ data, setData }) {
  return <Panel title="Compradores — Desempenho no Papel" desc="Avaliação do professor sobre como cada comprador exerceu seu papel." note="Critério-guia: avalie se o comprador aplicou o checklist a cada Sprint, se as decisões foram coerentes com o papel, e se o feedback nas Reviews foi útil." noteClass="note-orange">
    <Table headers={["Sprint","Comprador","Aplicou o checklist de verificação?","Decisões coerentes com o papel?","Feedback construtivo nas Reviews?","Nota (1-5)","Observações"]}>
      {data.buyerProf.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.buyerProf} index={i}/></td><td>{r.comprador}</td><td><SelectSN value={r.checklist} onChange={v=>update(setData,"buyerProf",i,"checklist",v)}/></td><td><SelectSN value={r.decisoes} onChange={v=>update(setData,"buyerProf",i,"decisoes",v)}/></td><td><SelectSN value={r.feedback} onChange={v=>update(setData,"buyerProf",i,"feedback",v)}/></td><td><SelectScore value={r.nota} onChange={v=>update(setData,"buyerProf",i,"nota",v)}/></td><td><TextInput value={r.obs} onChange={v=>update(setData,"buyerProf",i,"obs",v)}/></td></tr>)}
    </Table>
  </Panel>;
}

export function BuyerProductTab({ data, setData }) {
  return <Panel title="Ficha do Comprador — Avaliação do Produto" desc="Transcreva aqui os dados que cada comprador preencheu na ficha em papel, ao final de cada Sprint." note="Militar só avalia Caça; Setor Privado só avalia Transporte; Governo avalia os dois. Linhas fora do papel do comprador podem ficar em branco." noteClass="note-orange">
    <Table headers={["Sprint","Comprador","Empresa","Produto","Padrão Técnico","Padrão Visual","Prazo","Com. Owner (1-5)","Sinal","Decisão","Nota (1-5)"]}>
      {data.buyerProduct.map((r,i)=><tr key={i}><td className="sprint-label"><SprintLabel rows={data.buyerProduct} index={i}/></td><td>{r.comprador}</td><td>{r.empresa}</td><td>{r.produto}</td><td><SelectSN value={r.pt} onChange={v=>update(setData,"buyerProduct",i,"pt",v)}/></td><td><SelectSN value={r.pv} onChange={v=>update(setData,"buyerProduct",i,"pv",v)}/></td><td><SelectSN value={r.prazo} onChange={v=>update(setData,"buyerProduct",i,"prazo",v)}/></td><td><SelectScore value={r.comOwner} onChange={v=>update(setData,"buyerProduct",i,"comOwner",v)}/></td><td><SelectSN value={r.sinal} onChange={v=>update(setData,"buyerProduct",i,"sinal",v)}/></td><td><SelectDecision value={r.decisao} onChange={v=>update(setData,"buyerProduct",i,"decisao",v)}/></td><td><SelectScore value={r.nota} onChange={v=>update(setData,"buyerProduct",i,"nota",v)}/></td></tr>)}
    </Table>
  </Panel>;
}

function Panel({ title, desc, note, noteClass="note-dark", children }) {
  return <div className="panel"><h2>{title}</h2><div className="desc">{desc}</div>{children}<div className={`note ${noteClass}`}>{note}</div></div>;
}
