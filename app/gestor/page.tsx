'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function PainelGestor() {
  const [checklists, setChecklists] = useState<any[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarDados() {
      const { data, error } = await supabase
        .from('checklists')
        .select('*')
        .order('criado_em', { ascending: false })

      if (!error) {
        setChecklists(data || [])
      }
      setCarregando(false)
    }
    carregarDados()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-400">NJ Transportes - Painel do Gestor</h1>
          <p className="text-slate-400">Acompanhe em tempo real os checklists enviados pelos motoristas.</p>
        </div>

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
                    {item.criado_em ? new Date(item.criado_em).toLocaleString('pt-BR') : ''}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>KM Atual:</strong> {item.km}</p>
                  <p><strong>Observações:</strong> {item.observacoes || 'Nenhuma'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}