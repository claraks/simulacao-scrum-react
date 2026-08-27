import { BUYERS, SEED_NAMES, SPRINTS, TIMES, TEAM_IMAGES } from "./constants";

export function buildInitialData(empresaA = "Maverick Aviation", empresaB = "SkyForge Ind. Aeronáutica") {
  const empresas = [empresaA, empresaB];
  const sm = [];
  const owner = [];
  SPRINTS.forEach(sprint => empresas.forEach(empresa => {
    sm.push({ sprint, empresa, conduziu: "", removeu: "", ajudou: "", nota: "", obs: "" });
    owner.push({ sprint, empresa, comunicacao: "", negociacao: "", alinhamento: "", notaGeral: "", obs: "" });
  }));

  const po = [];
  const dev = [];
  SPRINTS.forEach(sprint => empresas.forEach(empresa => TIMES.forEach(time => {
    po.push({ sprint, empresa, time, requisitos: "", testes: "", reuniao: "", nota: "", obs: "" });
    dev.push({ sprint, empresa, time, qualidade: "", processo: "", colaboracao: "", notaTime: "", destaque: "" });
  })));

  const buyerProf = [];
  SPRINTS.forEach(sprint => BUYERS.forEach(comprador => {
    buyerProf.push({ sprint, comprador, checklist: "", decisoes: "", feedback: "", nota: "", obs: "" });
  }));

  const buyerProduct = [];
  SPRINTS.forEach(sprint => empresas.forEach(empresa => {
    buyerProduct.push({ sprint, comprador: "Governo", empresa, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
    buyerProduct.push({ sprint, comprador: "Governo", empresa, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
    buyerProduct.push({ sprint, comprador: "Militar", empresa, produto: "Caça", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
    buyerProduct.push({ sprint, comprador: "Setor Privado", empresa, produto: "Transporte", pt: "", pv: "", prazo: "", comOwner: "", sinal: "", decisao: "", nota: "" });
  }));

  return {
    meta: { turma: "", data: "", empresaA, empresaB, fontScale: 16 },
    sm,
    owner,
    po,
    dev,
    buyerProf,
    buyerProduct,
    corrupcao: { empresaCorruptora: empresaA, primeiraDescoberta: false, primeiroComprador: "", segundaDescoberta: false, segundoComprador: "" },
    sabotagem: { empresaSabotador: empresaA, timeSabotador: "Caça", tipoAcao: "atrapalhar", denunciasConsecutivas: 0, descoberto: false, areaSoubeECalou: false },
    weights: { sm: 1, owner: 1, po: 1, dev: 2, buyer: 2 },
    teamImages: structuredClone(TEAM_IMAGES),
    teamNames: {
      [empresaA]: { Caça: "Esquadrão Falcon", Transporte: "Falcon Carggo" },
      [empresaB]: { Caça: "SkyForge Combat", Transporte: "SkyForge Transport" }
    },
    alunos: SEED_NAMES.map((nome, i) => ({ id: i + 1, nome, empresa: "", time: "", papel: "" }))
  };
}

export function avg(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
}

export function computeCorrupcaoPontos(c) {
  let corruptor = 0;
  const compradores = {};
  if (c.primeiraDescoberta) {
    corruptor -= 1;
    if (c.primeiroComprador) compradores[c.primeiroComprador] = (compradores[c.primeiroComprador] || 0) - 1;
  }
  if (c.segundaDescoberta) {
    corruptor -= 1;
    if (c.segundoComprador) compradores[c.segundoComprador] = (compradores[c.segundoComprador] || 0) - 1;
  }
  return { corruptor, compradores };
}

export function computeSabotagemPontos(s) {
  let sabotador = 0;
  let area = 0;
  let demitido = false;
  if (s.descoberto) {
    sabotador -= 1;
    area += s.areaSoubeECalou ? -1 : 1;
    if (s.tipoAcao === "vazar" && s.denunciasConsecutivas >= 1) demitido = true;
    if (s.tipoAcao === "atrapalhar" && s.denunciasConsecutivas >= 2) demitido = true;
  }
  return { sabotador, area, demitido };
}

export function computeEmpresaScore(data, empresa) {
  const w = data.weights;
  const parts = [
    { key: "Scrum Master", val: avg(data.sm.filter(r => r.empresa === empresa).map(r => r.nota)), w: w.sm },
    { key: "Owner", val: avg(data.owner.filter(r => r.empresa === empresa).map(r => r.notaGeral)), w: w.owner },
    { key: "Product Owner", val: avg(data.po.filter(r => r.empresa === empresa).map(r => r.nota)), w: w.po },
    { key: "Developers", val: avg(data.dev.filter(r => r.empresa === empresa).map(r => r.notaTime)), w: w.dev },
    { key: "Avaliação dos Compradores", val: avg(data.buyerProduct.filter(r => r.empresa === empresa).map(r => r.nota)), w: w.buyer }
  ];
  let sumW = 0;
  let sumV = 0;
  parts.forEach(p => {
    if (p.val !== null) {
      sumW += p.w;
      sumV += p.val * p.w;
    }
  });
  const base = sumW > 0 ? sumV / sumW : null;
  let ajuste = 0;
  const cPts = computeCorrupcaoPontos(data.corrupcao);
  const sPts = computeSabotagemPontos(data.sabotagem);
  if (data.corrupcao.empresaCorruptora === empresa) ajuste += cPts.corruptor;
  if (data.sabotagem.empresaSabotador === empresa) ajuste += sPts.sabotador + sPts.area;
  return { base, ajuste, final: base !== null ? base + ajuste : null, parts };
}
