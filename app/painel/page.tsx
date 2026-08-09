"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function PainelMotorista() {
  const [placa, setPlaca] = useState("");
  const [km, setKm] = useState("");
  const [media_consumo, setMediaConsumo] = useState("");
  const [custo_km_combustivel, setCustoKmCombustivel] = useState("");
  const [manutencao_necessaria, setManutencaoNecessaria] = useState("Não");
  const [detalhes_manutencao, setDetalhesManutencao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("listas de verificação").insert([
      {
        placa,
        km: Number(km),
        media_consumo,
        custo_km_combustivel,
        manutencao_necessaria,
        detalhes_manutencao,
        observacoes,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      alert("Checklist enviado com sucesso!");
      setPlaca("");
      setKm("");
      setMediaConsumo("");
      setCustoKmCombustivel("");
      setManutencaoNecessaria("Não");
      setDetalhesManutencao("");
      setObservacoes("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-emerald-400">
          Checklist do Motorista - NJ Transportes
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Placa do Veículo</label>
            <input
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Quilometragem (KM)</label>
            <input
              type="number"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Média de Consumo</label>
            <input
              type="text"
              value={media_consumo}
              onChange={(e) => setMediaConsumo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Custo KM Combustível</label>
            <input
              type="text"
              value={custo_km_combustivel}
              onChange={(e) => setCustoKmCombustivel(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Manutenção Necessária?</label>
            <select
              value={manutencao_necessaria}
              onChange={(e) => setManutencaoNecessaria(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            >
              <option value="Não">Não</option>
              <option value="Sim">Sim</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Detalhes da Manutenção</label>
            <textarea
              value={detalhes_manutencao}
              onChange={(e) => setDetalhesManutencao(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 font-semibold p-2 rounded text-white transition"
          >
            {loading ? "Enviando..." : "Enviar Checklist"}
          </button>
        </form>
      </div>
    </main>
  );
}