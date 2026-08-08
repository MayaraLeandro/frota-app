"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

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

  const [kmAnteriorAbast, setKmAnteriorAbast] = useState("");
  const [kmAbastecimento, setKmAbastecimento] = useState("");
  const [litrosAbastecidos, setLitrosAbastecidos] = useState("");
  const [precoTotalCombustivel, setPrecoTotalCombustivel] = useState("");
  const [precoTotalOleo, setPrecoTotalOleo] = useState("");
  const [localizacaoPosto, setLocalizacaoPosto] = useState("");
  const [coordsGPS, setCoordsGPS] = useState<{ lat: number; lon: number } | null>(null);
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  const [manutencaoNecessaria, setManutencaoNecessaria] = useState("nao");
  const [detalhesManutencao, setDetalhesManutencao] = useState("");

  const [dataTrocaOleo, setDataTrocaOleo] = useState("");
  const [horaTrocaOleo, setHoraTrocaOleo] = useState("");
  const [kmTrocaOleo, setKmTrocaOleo] = useState("");

  const [observacoes, setObservacoes] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);

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

    const mediaConsumo = (kmRodados > 0 && litros > 0) ? (kmRodados / litros).toFixed(2) : "0.00";
    const custoKmCombustivel = (kmRodados > 0 && custoComb > 0) ? (custoComb / kmRodados).toFixed(2) : "0.00";
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
        setCoordsGPS({ lat, lon });
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

  return (
    <main className="min-h-screen bg-[#070b14] p-4 sm:p-8 text-slate-100 flex items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-[#0e1626] rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#1b2a4a]">
        
        {/* CABEÇALHO COM A LOGO OFICIAL */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-[#1b2a4a]">
          <div className="flex items-center gap-4">
            {/* Contêiner da Logo */}
            <div className="bg-white p-2 rounded-2xl border border-[#23427f] flex items-center justify-center w-28 h-20 relative shadow-md">
              <Image 
                src="/logo.png" 
                alt="Logo NJ Transportes" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                CHECKLIST E FROTA
              </h1>
              <p className="text-xs text-blue-400 tracking-wider uppercase font-medium mt-0.5">
                NJ TRANSPORTES
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setMostrarQrCode(!mostrarQrCode)}
            className="mt-4 sm:mt-0 text-xs bg-[#162238] hover:bg-[#1e2f4f] text-slate-300 px-4 py-2.5 rounded-xl font-semibold transition border border-[#263c66]"
          >
            {mostrarQrCode ? "✕ Fechar QR Code" : "📱 Ver QR Code"}
          </button>
        </div>

        {mostrarQrCode && (
          <div className="mb-8 p-6 bg-[#090f1a] rounded-2xl border border-[#1b2a4a] flex flex-col items-center">
            <p className="text-xs text-slate-300 mb-3 font-semibold">
              Escaneie para acessar o checklist:
            </p>
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <QRCodeSVG value="https://frota-app-ruddy.vercel.app" size={160} />
            </div>
          </div>
        )}

        {enviado ? (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-8 rounded-2xl text-center">
            <h2 className="font-bold text-2xl mb-2">Checklist Registrado!</h2>
            <button
              onClick={() => setEnviado(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition shadow-lg"
            >
              Fazer Novo Registro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... restante do código permanece o mesmo ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#090f1a]/60 p-5 rounded-2xl border border-[#1b2a4a]/70">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Placa do Veículo</label>
                <input type="text" required value={placa} onChange={(e) => setPlaca(e.target.value.toUpperCase())} className="w-full p-3 bg-[#131d31] border border-[#23375c] rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Quilometragem (KM)</label>
                <input type="number" required value={km} onChange={(e) => setKm(e.target.value)} className="w-full p-3 bg-[#131d31] border border-[#23375c] rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* Itens de Inspeção simplificados */}
            <div className="bg-[#090f1a]/60 p-5 rounded-2xl border border-[#1b2a4a]/70 space-y-4">
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">Itens de Inspeção:</h2>
              <div className="flex items-center justify-between p-3 bg-[#131d31]/70 rounded-xl border border-[#23375c]/60">
                 <span className="text-sm">🛢️ Óleo, 🚗 Pneus, 📦 Baú, 🪟 Para-brisas, 🛡️ Funilaria</span>
                 <span className="text-xs text-blue-400">Todos OK?</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition shadow-xl">
              Salvar Checklist
            </button>
          </form>
        )}
      </div>
    </main>
  );
}