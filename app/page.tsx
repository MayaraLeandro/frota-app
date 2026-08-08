"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ChecklistMotorista() {
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");
  const [pneusOk, setPneusOk] = useState(true);
  const [combustivelOk, setCombustivelOk] = useState(true);
  const [funilariaOk, setFunilariaOk] = useState(true);
  const [observacoes, setObservacoes] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  // Link corrigido para o seu site oficial na Vercel
  const urlChecklist = "https://frota-app-ruddy.vercel.app";

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8 text-gray-800">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
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
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded text-center">
            <h2 className="font-bold text-lg">Checklist Enviado!</h2>
            <p className="text-sm mt-1">Veículo liberado para rodar.</p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-green-700"
            >
              Novo Registro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Placa do Veículo
              </label>
              <input
                type="text"
                required
                placeholder="ABC-1234"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Quilometragem Atual (KM)
              </label>
              <input
                type="number"
                required
                placeholder="150000"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <hr className="my-4" />

            <h2 className="font-semibold text-sm text-gray-700">
              Itens de Inspeção:
            </h2>

            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
              <span className="text-sm">Nível / Calibragem de Pneus</span>
              <input
                type="checkbox"
                checked={pneusOk}
                onChange={(e) => setPneusOk(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
              <span className="text-sm">Nível de Combustível OK</span>
              <input
                type="checkbox"
                checked={combustivelOk}
                onChange={(e) => setCombustivelOk(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
              <span className="text-sm">Sem Avarias / Amassados</span>
              <input
                type="checkbox"
                checked={funilariaOk}
                onChange={(e) => setFunilariaOk(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 mt-2">
                Observações / Avarias
              </label>
              <textarea
                rows={3}
                placeholder="Descreva aqui se houver algo errado..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-2 border rounded border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Inspeção
            </button>
          </form>
        )}
      </div>
    </main>
  );
}