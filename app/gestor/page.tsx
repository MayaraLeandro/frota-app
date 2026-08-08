'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'

interface Checklist {
  id: string
  criado_em: string
  placa: string
  km: number
  media_consumo: string
  custo_km_combustivel: string
  manutencao_necessaria: string
  detalhes_manutencao: string
  observacoes: string
}

export default function PainelGestor() {
  const [checklists, setChecklists] = useState<Checklist[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarChecklists() {
      const { data, error } = await supabase
        .from('checklists')
        .select('*')
        .order('criado_em', { ascending: false })

      if (error) {
        console.error('Erro ao buscar dados:', error.message)
      } else {
        setChecklists(data || [])
      }
      setCarregando(false)
    }

    buscarChecklists()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-emerald-400">Painel do Gestor</h1>
        <p className="text-slate-400 mb-6">Acompanhe em tempo real os checklists enviados pelos motoristas.</p>

        {carregando ? (
          <p className="text-slate-500">Carregando dados...</p>
        ) : checklists.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
            Nenhum checklist registrado até o momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklists.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-lg font-bold text-emerald-400">Placa: {item.placa}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(item.criado_em).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">KM Atual</span>
                    <span className="font-semibold">{item.km}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Média de Consumo</span>
                    <span className="font-semibold">{item.media_consumo || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Custo por KM</span>
                    <span className="font-semibold">{item.custo_km_combustivel || '-'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Manutenção Necessária?</span>
                    <span className={`font-bold ${item.manutencao_necessaria === 'Sim' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {item.manutencao_necessaria}
                    </span>
                  </div>
                </div>

                {item.manutencao_necessaria === 'Sim' && item.detalhes_manutencao && (
                  <div className="bg-red-950/30 border border-red-500/20 p-3 rounded-lg text-sm">
                    <span className="text-red-400 block text-xs font-bold mb-1">Detalhes da Manutenção:</span>
                    <p className="text-red-200">{item.detalhes_manutencao}</p>
                  </div>
                )}

                {item.observacoes && (
                  <div className="bg-slate-950 p-3 rounded-lg text-sm border border-slate-800/60">
                    <span className="text-slate-500 block text-xs mb-1">Observações:</span>
                    <p className="text-slate-300">{item.observacoes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}