"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ChecklistMotorista() {
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");
  
  // Itens de Inspeção atualizados
  const [nivelOleoOk, setNivelOleoOk] = useState(true);
  const [pneusOk, setPneusOk] = useState(true);
  const [infiltracaoBauOk, setInfiltracaoBauOk] = useState(true);
  const [paraBrisasOk, setParaBrisasOk] = useState(true);
  const [funilariaOk, setFunilariaOk] = useState(true);

  // Manutenção a Fazer (Sim/Não) e detalhes
  const [manutencaoNecessaria, setManutencaoNecessaria] = useState("nao");
  const [detalhesManutencao, setDetalhesManutencao] = useState("");

  // Última Troca de Óleo
  const [dataTrocaOleo, setDataTrocaOleo] = useState("");
  const [horaTrocaOleo, setHoraTrocaOleo] = useState("");
  const [kmTrocaOleo, setKmTrocaOleo] = useState("");

  const [observacoes, setObservacoes] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const urlChecklist = "https://frota-app-ruddy.vercel.app";

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8 text-gray-800">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-1">
          🚛 Controle de Frota
        </h1>
        <p className="text-sm text-center text-gray-500 mb-4">
          Checklist Diário do Motorista
        </p>

        {/* Botão para alternar exibição do QR Code */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setMostrarQrCode(!mostrarQrCode)}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-full font-medium transition"
          >
            {mostrarQrCode ? "✕ Fechar QR Code" : "📱 Ver QR Code para Impressão"}
          </button>

          {mostrarQrCode && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center">
              <p className="text-xs text-gray-600 mb-3 font-semibold">
                Escaneie para abrir o checklist no celular:
              </p>
              <div className="bg-white p-3 rounded shadow-sm">
                <QRCodeSVG value={urlChecklist} size={160} />
              </div>
              <span className="text-[10px] text-gray-400 mt-2">{urlChecklist}</span>
            </div>
          )}
        </div>

        {enviado ? (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-xl text-center">
            <h2 className="font-bold text-lg">Checklist Enviado!</h2>
            <p className="text-sm mt-1">Veículo liberado para rodar.</p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition"
            >
              Novo Registro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Placa */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Placa do Veículo
              </label>
              <input
                type="text"
                required
                placeholder="ABC-1234"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                className="w-full p-2.5 border rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quilometragem */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Quilometragem Atual (KM)
              </label>
              <input
                type="number"
                required
                placeholder="150000"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                className="w-full p-2.5 border rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <hr className="my-4 border-gray-200" />

            <h2 className="font-semibold text-sm text-gray-700">
              Itens de Inspeção:
            </h2>

            {/* Checkboxes de Inspeção */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-700">Nível de Óleo OK</span>
                <input
                  type="checkbox"
                  checked={nivelOleoOk}
                  onChange={(e) => setNivelOleoOk(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-700">Pneus (Calibragem / Estado)</span>
                <input
                  type="checkbox"
                  checked={pneusOk}
                  onChange={(e) => setPneusOk(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-700">Infiltração no Baú</span>
                <input
                  type="checkbox"
                  checked={infiltracaoBauOk}
                  onChange={(e) => setInfiltracaoBauOk(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-700">Para-brisas</span>
                <input
                  type="checkbox"
                  checked={paraBrisasOk}
                  onChange={(e) => setParaBrisasOk(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-700">Sem Avarias / Amassados</span>
                <input
                  type="checkbox"
                  checked={funilariaOk}
                  onChange={(e) => setFunilariaOk(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Manutenção a Fazer (Sim/Não) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Manutenção a Fazer?
              </label>
              <select
                value={manutencaoNecessaria}
                onChange={(e) => setManutencaoNecessaria(e.target.value)}
                className="w-full p-2.5 border rounded-lg border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              >
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>

              {manutencaoNecessaria === "sim" && (
                <textarea
                  rows={3}
                  required
                  placeholder="Descreva o que precisa de manutenção..."
                  value={detalhesManutencao}
                  onChange={(e) => setDetalhesManutencao(e.target.value)}
                  className="w-full p-2.5 border rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-yellow-50"
                />
              )}
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Última Troca de Óleo */}
            <div>
              <h2 className="font-semibold text-sm text-gray-700 mb-2">
                Última Troca de Óleo:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Data</label>
                  <input
                    type="date"
                    value={dataTrocaOleo}
                    onChange={(e) => setDataTrocaOleo(e.target.value)}
                    className="w-full p-2 border rounded-lg border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hora</label>
                  <input
                    type="time"
                    value={horaTrocaOleo}
                    onChange={(e) => setHoraTrocaOleo(e.target.value)}
                    className="w-full p-2 border rounded-lg border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">KM da Troca</label>
                  <input
                    type="number"
                    placeholder="Ex: 140000"
                    value={kmTrocaOleo}
                    onChange={(e) => setKmTrocaOleo(e.target.value)}
                    className="w-full p-2 border rounded-lg border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Observações Gerais */}
            <div>
              <label className="block text-sm font-medium mb-1 mt-3 text-gray-700">
                Observações Gerais
              </label>
              <textarea
                rows={2}
                placeholder="Descreva aqui se houver algo mais..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-2.5 border rounded-lg border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition shadow-md mt-4"
            >
              Enviar Inspeção
            </button>
          </form>
        )}
      </div>
    </main>
  );
}