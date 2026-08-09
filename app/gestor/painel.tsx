'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'

export default function PainelNovo() {
  const [checklists, setChecklists] = useState<any[]>([])

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.from('checklists').select('*').order('criado_em', { ascending: false })
      setChecklists(data || [])
    }
    carregar()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">NJ Transportes - Painel Direto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklists.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
            <p className="text-emerald-400 font-bold">Placa: {item.placa}</p>
            <p><strong>KM:</strong> {item.km}</p>
            <p><strong>Observações:</strong> {item.observacoes || 'Nenhuma'}</p>
          </div>
        ))}
      </div>
    </main>
  )
}