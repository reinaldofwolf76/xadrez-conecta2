"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Settings, 
  Clock,
  Zap,
  Target,
  Crown
} from "lucide-react"
import MatchmakingButton from "./components/MatchmakingButton"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("jogar")

  return (
    <div className="flex flex-col min-h-screen bg-[#161512] text-white">
      {/* Header */}
      <header className="bg-[#262421] border-b border-[#3d3935] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-[#759900]" />
            <h1 className="text-2xl font-bold text-white">
              Xadrez Conecta
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#3d3935] px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-[#f0d9b5]" />
              <span className="font-semibold">1200</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#759900] flex items-center justify-center font-bold">
              JG
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Seção Jogar */}
          {activeTab === "jogar" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Pronto para jogar?</h2>
                <p className="text-gray-400">Escolha um modo e encontre seu oponente</p>
              </div>

              {/* Botão Principal - Buscar Oponente */}
              <MatchmakingButton timeControl="rapid" />

              {/* Modos de Jogo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#262421] border-[#3d3935] p-6 hover:bg-[#2d2d2d] transition-all cursor-pointer hover:scale-105">
                  <Clock className="w-10 h-10 text-[#759900] mb-3" />
                  <h3 className="text-xl font-bold mb-2">Rápida</h3>
                  <p className="text-gray-400 text-sm">10 minutos por jogador</p>
                </Card>

                <Card className="bg-[#262421] border-[#3d3935] p-6 hover:bg-[#2d2d2d] transition-all cursor-pointer hover:scale-105">
                  <Zap className="w-10 h-10 text-[#f0d9b5] mb-3" />
                  <h3 className="text-xl font-bold mb-2">Blitz</h3>
                  <p className="text-gray-400 text-sm">5 minutos por jogador</p>
                </Card>

                <Card className="bg-[#262421] border-[#3d3935] p-6 hover:bg-[#2d2d2d] transition-all cursor-pointer hover:scale-105">
                  <Target className="w-10 h-10 text-[#b58863] mb-3" />
                  <h3 className="text-xl font-bold mb-2">Clássica</h3>
                  <p className="text-gray-400 text-sm">30 minutos por jogador</p>
                </Card>
              </div>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-[#262421] border-[#3d3935] p-4 text-center">
                  <p className="text-3xl font-bold text-[#759900]">24</p>
                  <p className="text-gray-400 text-sm">Vitórias</p>
                </Card>
                <Card className="bg-[#262421] border-[#3d3935] p-4 text-center">
                  <p className="text-3xl font-bold text-[#dc2626]">18</p>
                  <p className="text-gray-400 text-sm">Derrotas</p>
                </Card>
                <Card className="bg-[#262421] border-[#3d3935] p-4 text-center">
                  <p className="text-3xl font-bold text-[#f0d9b5]">6</p>
                  <p className="text-gray-400 text-sm">Empates</p>
                </Card>
              </div>
            </div>
          )}

          {/* Seção Amigos */}
          {activeTab === "amigos" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Amigos</h2>
                <p className="text-gray-400">Gerencie suas conexões</p>
              </div>

              <Button className="w-full sm:w-auto bg-[#759900] hover:bg-[#5d7700]">
                <Users className="w-4 h-4 mr-2" />
                Adicionar Amigo
              </Button>

              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-[#262421] border-[#3d3935] p-4 flex items-center justify-between hover:bg-[#2d2d2d] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#759900] flex items-center justify-center font-bold">
                        A{i}
                      </div>
                      <div>
                        <p className="font-semibold">Amigo {i}</p>
                        <p className="text-sm text-[#759900]">● Online</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#759900] hover:bg-[#5d7700]">
                      Desafiar
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Seção Ranking */}
          {activeTab === "ranking" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Ranking Global</h2>
                <p className="text-gray-400">Top jogadores da semana</p>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="bg-[#262421] border-[#3d3935] p-4 flex items-center justify-between hover:bg-[#2d2d2d] transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        i === 1 ? 'bg-[#f0d9b5] text-[#161512]' :
                        i === 2 ? 'bg-[#b58863] text-white' :
                        i === 3 ? 'bg-[#8b6f47] text-white' :
                        'bg-[#3d3935] text-gray-300'
                      }`}>
                        {i}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#759900] flex items-center justify-center font-bold text-sm">
                          J{i}
                        </div>
                        <div>
                          <p className="font-semibold">Jogador {i}</p>
                          <p className="text-sm text-gray-400">{1500 - i * 50} pontos</p>
                        </div>
                      </div>
                    </div>
                    <Trophy className="w-6 h-6 text-[#f0d9b5]" />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Seção Configurações */}
          {activeTab === "configuracoes" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Configurações</h2>
                <p className="text-gray-400">Personalize sua experiência</p>
              </div>

              <div className="space-y-4">
                <Card className="bg-[#262421] border-[#3d3935] p-6">
                  <h3 className="text-lg font-semibold mb-4">Perfil</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Nome de usuário</label>
                      <input 
                        type="text" 
                        placeholder="Seu nome"
                        className="w-full bg-[#161512] border border-[#3d3935] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#759900]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Status</label>
                      <input 
                        type="text" 
                        placeholder="Seu status"
                        className="w-full bg-[#161512] border border-[#3d3935] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#759900]"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="bg-[#262421] border-[#3d3935] p-6">
                  <h3 className="text-lg font-semibold mb-4">Preferências de Chat</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Chat de voz ativado</span>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Chat de texto ativado</span>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Notificações sonoras</span>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </label>
                  </div>
                </Card>

                <Card className="bg-[#262421] border-[#3d3935] p-6">
                  <h3 className="text-lg font-semibold mb-4">Acessibilidade</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Alto contraste</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span>Leitura de tela</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </label>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#262421] border-t border-[#3d3935] px-4 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <button
            onClick={() => setActiveTab("jogar")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === "jogar" 
                ? "bg-[#759900]/20 text-[#759900]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="text-xs font-medium">Jogar</span>
          </button>

          <button
            onClick={() => setActiveTab("amigos")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === "amigos" 
                ? "bg-[#759900]/20 text-[#759900]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Amigos</span>
          </button>

          <button
            onClick={() => setActiveTab("ranking")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === "ranking" 
                ? "bg-[#759900]/20 text-[#759900]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs font-medium">Ranking</span>
          </button>

          <button
            onClick={() => setActiveTab("configuracoes")}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === "configuracoes" 
                ? "bg-[#759900]/20 text-[#759900]" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs font-medium">Config</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
