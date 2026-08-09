'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function PainelGestor() {
  const [logado, setLogado] = useState(false)
  const [senha, setSenha] = useState('')
  const [checklists, setChecklists] = useState<any[]>([])
  const [carregando, setCarregando] = useState(false)

  // SENHA DE ACESSO DO GESTOR
  const SENHA_MESTRE = 'admin123'

  function fazerLogin(e: React.FormEvent) {
    e.preventDefault()
    if (senha === SENHA_MESTRE) {
      setLogado(true)
      carregarDados()
    } else {
      alert('Senha incorreta! A senha padrão é: admin123')
    }
  }

  async function carregarDados() {
    setCarregando(true)
    const { data, error } = await supabase
      .from('checklists')
      .select('*')
      .order('criado_em', { ascending: false })

    if (!error) {
      setChecklists(data || [])
    }
    setCarregando(false)
  }

  // TELA DE LOGIN DA NJ TRANSPORTES
  if (!logado) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-6 text-white">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-emerald-400">NJ Transportes</h1>
            <p className="text-sm text-slate-400">Painel do Gestor - Digite a senha para acessar</p>
          </div>

          <form onSubmit={fazerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">SENHA DE ACESSO</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha (admin123)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg transition-colors"
            >
              Entrar no Painel
            </button>
          </form>
          <p className="text-xs text-center text-slate-500">Senha padrão: <span className="text-emerald-400 font-mono">admin123</span></p>
        </div>
      </main>
    )
  }

  // PAINEL DE DADOS
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">NJ Transportes - Painel do Gestor</h1>
            <p className="text-slate-400">Acompanhe em tempo real os checklists enviados pelos motoristas.</p>
          </div>
          <button
            onClick={() => setLogado(false)}
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
          >
            Sair
          </button>
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