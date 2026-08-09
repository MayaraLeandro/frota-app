'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Certifique-se de que essas variáveis estão configuradas no seu .env na Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Painel() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchChecklists() {
      const { data: checklists } = await supabase
        .from('checklists')
        .select('*')
        .order('created_at', { ascending: false })
      setData(checklists || [])
    }
    fetchChecklists()
  }, [])

  return (
    <div className="p-10 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Painel NJ Transportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <p className="font-bold text-xl">Placa: {item.placa}</p>
            <p>KM: {item.km}</p>
            <p>Obs: {item.observacoes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}