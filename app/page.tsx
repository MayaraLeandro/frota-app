"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ChecklistMotorista() {
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");
  
  const [pneusOk, setPneusOk] = useState(true);
  const [nivelOleoOk, setNivelOleoOk] = useState(true);
  const [infiltracaoBauOk, setInfiltracaoBauOk] = useState(true);
  const [paraBrisasOk, setParaBrisasOk] = useState(true);
  const [funilariaOk, setFunilariaOk] = useState(true);

  const [fotoPneus, setFotoPneus] = useState<string | null>(null);
  const [fotoOleo, setFotoOleo] = useState<string | null>(null);
  const [fotoBau, setFotoBau] = useState<string | null>(null);
  const [fotoParaBrisas, setFotoParaBrisas] = useState<string | null>(null);
  const [fotoFunilaria, setFotoFunilaria] = useState<string | null>(null);

  // Estados Separados do Posto / Abastecimento e Custos
  const [kmAnteriorAbast, setKmAnteriorAbast] = useState("");
  const [kmAbastecimento, setKmAbastecimento] = useState("");
  const [litrosAbastecidos, setLitrosAbastecidos] = useState("");
  const [precoTotalCombustivel, setPrecoTotalCombustivel] = useState("");
  const [precoTotalOleo, setPrecoTotalOleo] = useState("");
  const [localizacaoPosto, setLocalizacaoPosto] = useState("");
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  const [manutencaoNecessaria, setManutencaoNecessaria] = useState("nao");
  const [detalhesManutencao, setDetalhesManutencao] = useState("");

  const [dataTrocaOleo, setDataTrocaOleo] = useState("");
  const [horaTrocaOleo, setHoraTrocaOleo] = useState("");
  const [kmTrocaOleo, setKmTrocaOleo] = useState("");

  const [observacoes, setObservacoes] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);

  // Cálculos Automáticos
  const calcularDadosPosto = () => {
    const kmAnt = parseFloat(kmAnteriorAbast);
    const kmAtu = parseFloat(kmAbastecimento);
    const litros = parseFloat(litrosAbastecidos);
    const custoComb = parseFloat(precoTotalCombustivel) || 0;
    const custoOleo = parseFloat(precoTotalOleo) || 0;

    let kmRodados = 0;
    if (kmAnt && kmAtu && kmAtu >= kmAnt) {
      kmRodados = kmAtu - kmAnt;
    }

    // Média de consumo (KM/L)
    const mediaConsumo = (kmRodados > 0 && litros > 0) ? (kmRodados / litros).toFixed(2) : "0.00";

    // Custo por KM rodado de Combustível (R$/KM)
    const custoKmCombustivel = (kmRodados > 0 && custoComb > 0) ? (custoComb / kmRodados).toFixed(2) : "0.00";

    // Custo por KM rodado de Óleo (R$/KM)
    const custoKmOleo = (kmRodados > 0 && custoOleo > 0) ? (custoOleo / kmRodados).toFixed(2) : "0.00";

    return { kmRodados, mediaConsumo, custoKmCombustivel, custoKmOleo };
  };

  const dadosCalculados = calcularDadosPosto();

  const obterLocalizacaoGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }
    setBuscandoLocal(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocalizacaoPosto(`Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`);
        setBuscandoLocal(false);
      },
      () => {
        alert("Não foi possível obter a localização. Verifique as permissões do GPS.");
        setBuscandoLocal(false);
      }
    );
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>, setFoto: (val: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const urlChecklist = "https://frota-app-ruddy.vercel.app";

  return (
    <main className="min-h-screen bg-[#0b0f19] p-4 sm:p-8 text-slate-100 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-[#131b2e] rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-800">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="text-blue-500 bg-blue-500/10 p-2 rounded-xl">🚛</span> Controle de Frota
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Painel Inteligente de Checklist Diário e Paradas
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setMostrarQrCode(!mostrarQrCode)}
            className="mt-4 sm:mt-0 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl font-semibold transition border border-slate-700"
          >
            {mostrarQrCode ? "✕ Fechar QR Code" : "📱 Ver QR Code"}
          </button>
        </div>

        {mostrarQrCode && (
          <div className="mb-8 p-6 bg-slate-900/90 rounded-2xl border border-slate-700 flex flex-col items-center">
            <p className="text-xs text-slate-300 mb-3 font-semibold">
              Escaneie para abrir o checklist no celular:
            </p>
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <QRCodeSVG value={urlChecklist} size={160} />
            </div>
            <span className="text-[11px] text-slate-500 mt-3">{urlChecklist}</span>
          </div>
        )}

        {enviado ? (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-8 rounded-2xl text-center">
            <h2 className="font-bold text-2xl mb-2">Checklist e Posto Registrados com Sucesso!</h2>
            <p className="text-sm text-emerald-400/80 mb-6">Os dados de custos e abastecimento foram computados.</p>
            <button
              onClick={() => setEnviado(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-lg"
            >
              Fazer Novo Registro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Placa do Veículo
                </label>
                <input
                  type="text"
                  required
                  placeholder="ABC-1234"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Quilometragem Atual (KM)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 150000"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                />
              </div>
            </div>

            {/* Itens de Inspeção com Câmera Discreta */}
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">
                Itens de Inspeção Diária:
              </h2>

              <div className="grid grid-cols-1 gap-3">
                
                {/* Nível de Óleo */}
                <div className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={nivelOleoOk}
                      onChange={(e) => setNivelOleoOk(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-200 font-medium">🛢️ Nível de Óleo OK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fotoOleo && <span className="text-[11px] text-emerald-400 font-medium">Capturado ✓</span>}
                    <label className="cursor-pointer opacity-40 hover:opacity-100 transition text-slate-400 hover:text-white p-1" title="Tirar foto na hora">
                      <span className="text-lg">📷</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFotoChange(e, setFotoOleo)} />
                    </label>
                  </div>
                </div>

                {/* Pneus */}
                <div className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={pneusOk}
                      onChange={(e) => setPneusOk(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-200 font-medium">🚗 Pneus (Calibragem)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fotoPneus && <span className="text-[11px] text-emerald-400 font-medium">Capturado ✓</span>}
                    <label className="cursor-pointer opacity-40 hover:opacity-100 transition text-slate-400 hover:text-white p-1" title="Tirar foto na hora">
                      <span className="text-lg">📷</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFotoChange(e, setFotoPneus)} />
                    </label>
                  </div>
                </div>

                {/* Infiltração no Baú */}
                <div className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={infiltracaoBauOk}
                      onChange={(e) => setInfiltracaoBauOk(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-200 font-medium">📦 Infiltração no Baú</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fotoBau && <span className="text-[11px] text-emerald-400 font-medium">Capturado ✓</span>}
                    <label className="cursor-pointer opacity-40 hover:opacity-100 transition text-slate-400 hover:text-white p-1" title="Tirar foto na hora">
                      <span className="text-lg">📷</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFotoChange(e, setFotoBau)} />
                    </label>
                  </div>
                </div>

                {/* Para-brisas */}
                <div className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={paraBrisasOk}
                      onChange={(e) => setParaBrisasOk(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-200 font-medium">🪟 Para-brisas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fotoParaBrisas && <span className="text-[11px] text-emerald-400 font-medium">Capturado ✓</span>}
                    <label className="cursor-pointer opacity-40 hover:opacity-100 transition text-slate-400 hover:text-white p-1" title="Tirar foto na hora">
                      <span className="text-lg">📷</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFotoChange(e, setFotoParaBrisas)} />
                    </label>
                  </div>
                </div>

                {/* Sem Avarias / Amassados */}
                <div className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={funilariaOk}
                      onChange={(e) => setFunilariaOk(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="text-sm text-slate-200 font-medium">🛡️ Sem Avarias / Amassados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fotoFunilaria && <span className="text-[11px] text-emerald-400 font-medium">Capturado ✓</span>}
                    <label className="cursor-pointer opacity-40 hover:opacity-100 transition text-slate-400 hover:text-white p-1" title="Tirar foto na hora">
                      <span className="text-lg">📷</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFotoChange(e, setFotoFunilaria)} />
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* CARD: Parada no Posto, Abastecimento e Custos Separados */}
            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80 space-y-4">
              <h2 className="font-bold text-sm uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                ⛽ Parada no Posto e Controle de Custos
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    KM Anterior (Abast.)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 149000"
                    value={kmAnteriorAbast}
                    onChange={(e) => setKmAnteriorAbast(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    KM Atual Abastecimento
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 149500"
                    value={kmAbastecimento}
                    onChange={(e) => setKmAbastecimento(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Litros de Combustível
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 150.5"
                    value={litrosAbastecidos}
                    onChange={(e) => setLitrosAbastecidos(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Preço Combustível (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 850.00"
                    value={precoTotalCombustivel}
                    onChange={(e) => setPrecoTotalCombustivel(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Preço Óleo do Motor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 120.00"
                    value={precoTotalOleo}
                    onChange={(e) => setPrecoTotalOleo(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Localização (Maps / GPS)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      placeholder="Obter GPS"
                      value={localizacaoPosto}
                      className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={obterLocalizacaoGPS}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-xl text-xs font-semibold transition shrink-0"
                    >
                      {buscandoLocal ? "..." : "📍 Maps"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bloco com os Cálculos Automáticos Separados */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-xl text-center">
                  <span className="text-[11px] text-blue-300 font-bold uppercase tracking-wider block">Média do Veículo</span>
                  <span className="text-xl font-extrabold text-blue-400">{dadosCalculados.mediaConsumo}</span>
                  <span className="text-xs text-slate-300 ml-1">KM/L</span>
                </div>

                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Custo Combustível/KM</span>
                  <span className="text-xl font-extrabold text-emerald-400">R$ {dadosCalculados.custoKmCombustivel}</span>
                  <span className="text-xs text-slate-400 ml-1">/km</span>
                </div>

                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-center">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Custo Óleo/KM</span>
                  <span className="text-xl font-extrabold text-amber-400">R$ {dadosCalculados.custoKmOleo}</span>
                  <span className="text-xs text-slate-400 ml-1">/km</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
              <label className="block font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">
                Manutenção a Fazer?
              </label>
              <select
                value={manutencaoNecessaria}
                onChange={(e) => setManutencaoNecessaria(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>

              {manutencaoNecessaria === "sim" && (
                <textarea
                  rows={3}
                  required
                  placeholder="Descreva detalhadamente o que precisa de manutenção..."
                  value={detalhesManutencao}
                  onChange={(e) => setDetalhesManutencao(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-amber-500/50 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-slate-500 mt-1"
                />
              )}
            </div>

            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">
                ⏱️ Registro da Última Troca de Óleo:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Data</label>
                  <input
                    type="date"
                    value={dataTrocaOleo}
                    onChange={(e) => setDataTrocaOleo(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Hora</label>
                  <input
                    type="time"
                    value={horaTrocaOleo}
                    onChange={(e) => setHoraTrocaOleo(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">KM da Troca</label>
                  <input
                    type="number"
                    placeholder="Ex: 140000"
                    value={kmTrocaOleo}
                    onChange={(e) => setKmTrocaOleo(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
              <label className="block font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">
                Observações Gerais
              </label>
              <textarea
                rows={2}
                placeholder="Descreva aqui se houver algo mais..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition shadow-xl text-base flex items-center justify-center gap-2 mt-4"
            >
              🚀 Salvar Checklist e Custos
            </button>

          </form>
        )}
      </div>
    </main>
  );
}