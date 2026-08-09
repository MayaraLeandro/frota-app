"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

interface Checklist {
  id: string;
  criado_em: string;
  placa: string;
  km: number;
  media_consumo: string;
  custo_km_combustivel: string;
  manutencao_necessaria: string;
  detalhes_manutencao: string;
  observacoes: string;
}

export default function GestorPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarChecklists() {
      try {
        const { data, error } = await supabase
          .from("listas de verificação")
          .select("*")
          .order("criado_em", { ascending: false });

        if (error) {
          console.error("Erro ao buscar dados:", error.message);
        } else if (data) {
          setChecklists(data);
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    }

    buscarChecklists();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">
          Painel do Gestor - NJ Transportes
        </h1>

        {loading ? (
          <p className="text-gray-400">Carregando dados dos motoristas...</p>
        ) : checklists.length === 0 ? (
          <p className="text-gray-400">Nenhum registro encontrado ainda.</p>
        ) : (
          <div className="grid gap-6">
            {checklists.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md"
              >
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                  <span className="text-lg font-semibold text-emerald-300">
                    Placa: {item.placa || "Não informada"}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(item.criado_em).toLocaleString("pt-BR")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Quilometragem (KM):</p>
                    <p className="font-medium">{item.km || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Média de Consumo:</p>
                    <p className="font-medium">{item.media_consumo || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Custo KM Combustível:</p>
                    <p className="font-medium">{item.custo_km_combustivel || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Manutenção Necessária:</p>
                    <p className="font-medium">{item.manutencao_necessaria || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-400">Detalhes da Manutenção:</p>
                    <p className="font-medium">{item.detalhes_manutencao || "-"}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-gray-400">Observações:</p>
                    <p className="font-medium">{item.observacoes || "-"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}