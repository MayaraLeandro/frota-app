'use client'

import { useState } from 'react'
import { supabase } from '@/supabaseClient'

export default function ChecklistMotorista() {
  const [placa, setPlaca] = useState('')
  const [km, setKm] = useState('')
  const [mediaConsumo, setMediaConsumo] = useState('')
  const [custoKmCombustivel, setCustoKmCombustivel] = useState('')
  const [manutencaoNecessaria, setManutencaoNecessaria] = useState('Não')
  const [detalhesManutencao, setDetalhesManutencao] = useState('')
  const [observacoes, setObservacoes] = useState('')
  
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)

    const { error } = await supabase.from('checklists').insert([
      {
        placa: placa,
        km: Number(km),
        media_consumo: mediaConsumo,
        custo_km_combustivel: custoKmCombustivel,
        manutencao_necessaria: manutencaoNecessaria,
        detalhes_manutencao: detalhesManutencao,
        observacoes: observacoes
      }
    ])

    setCarregando(false)

    if (error) {
      alert('Erro ao salvar os dados: ' + error.message)
    } else {
      setEnviado(true)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">Checklist do Motorista</h1>

        {enviado ? (
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-lg text-center">
            <h2 className="font-bold text-2xl mb-2 text-emerald-300">Checklist Registrado com Sucesso!</h2>
            <p className="text-sm text-emerald-400/80 mb-6">Os dados foram enviados e salvos no banco de dados.</p>
            <button
              onClick={() => {
                setEnviado(false)
                setPlaca('')
                setKm('')
                setMediaConsumo('')
                setCustoKmCombustivel('')
                setDetalhesManutencao('')
                setObservacoes('')
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Fazer Novo Registro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Placa do Veículo</label>
              <input
                type="text"
                required
                placeholder="ABC-1234"
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Quilometragem (KM)</label>
              <input
                type="number"
                required
                placeholder="Ex: 45000"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Média de Consumo</label>
              <input
                type="text"
                placeholder="Ex: 10 km/l"
                value={mediaConsumo}
                onChange={(e) => setMediaConsumo(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Custo por KM (Combustível)</label>
              <input
                type="text"
                placeholder="Ex: R$ 0,75"
                value={custoKmCombustivel}
                onChange={(e) => setCustoKmCombustivel(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Manutenção Necessária?</label>
              <select
                value={manutencaoNecessaria}
                onChange={(e) => setManutencaoNecessaria(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>

            {manutencaoNecessaria === 'Sim' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Detalhes da Manutenção</label>
                <textarea
                  placeholder="Descreva o problema..."
                  value={detalhesManutencao}
                  onChange={(e) => setDetalhesManutencao(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Observações Gerais</label>
              <textarea
                placeholder="Algum comentário adicional..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
                rows={2}
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold p-3 rounded-lg transition disabled:opacity-50"
            >
              {carregando ? 'Salvando...' : 'Enviar Checklist'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}