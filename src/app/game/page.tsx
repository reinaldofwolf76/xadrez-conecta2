"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Mic, 
  MicOff, 
  MessageSquare, 
  Send,
  ArrowLeft,
  Clock,
  User
} from "lucide-react"
import Link from "next/link"

export default function GamePage() {
  const [isMicOn, setIsMicOn] = useState(false)
  const [messages, setMessages] = useState<{text: string, sender: 'me' | 'opponent'}[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [timePlayer1, setTimePlayer1] = useState(600) // 10 minutos em segundos
  const [timePlayer2, setTimePlayer2] = useState(600)
  const [currentTurn, setCurrentTurn] = useState<'player1' | 'player2'>('player1')
  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Timer do jogo
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTurn === 'player1') {
        setTimePlayer1(prev => Math.max(0, prev - 1))
      } else {
        setTimePlayer2(prev => Math.max(0, prev - 1))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTurn])

  // Função para formatar tempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Controle de microfone
  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        audioContextRef.current = new AudioContext()
        setIsMicOn(true)
      } catch (error) {
        console.error("Erro ao acessar microfone:", error)
        alert("Não foi possível acessar o microfone. Verifique as permissões.")
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
        streamRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      setIsMicOn(false)
    }
  }

  // Enviar mensagem de texto
  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'me' }])
      setInputMessage("")
      
      // Simular resposta do oponente (remover em produção)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Boa jogada!", 
          sender: 'opponent' 
        }])
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#161512] text-white">
      {/* Header - Compacto */}
      <header className="bg-[#262421] border-b border-[#3d3935] px-3 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8 px-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="text-center">
            <p className="text-xs text-gray-400">Partida Rápida • 1200 vs 1180</p>
          </div>
          <div className="w-8"></div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-0 lg:gap-4 lg:p-4 max-w-7xl mx-auto w-full">
        {/* Área do Tabuleiro - Ocupa tela toda no mobile */}
        <div className="flex-1 flex flex-col">
          {/* Informações do Oponente - Compacto */}
          <div className="bg-[#262421] px-3 py-2 flex items-center justify-between border-b border-[#3d3935]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#3d3935] flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Oponente</p>
                <p className="text-xs text-gray-500">1180</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#3d3935] px-2 py-1 rounded">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="font-mono text-sm font-bold">{formatTime(timePlayer2)}</span>
            </div>
          </div>

          {/* Tabuleiro de Xadrez - Fullscreen no mobile */}
          <div className="flex-1 flex items-center justify-center bg-[#161512] p-2 lg:p-4">
            <div className="w-full max-w-[600px] aspect-square">
              <div className="w-full h-full grid grid-cols-8 gap-0 shadow-2xl">
                {Array.from({ length: 64 }).map((_, i) => {
                  const row = Math.floor(i / 8)
                  const col = i % 8
                  const isLight = (row + col) % 2 === 0
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-all hover:brightness-110 ${
                        isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'
                      }`}
                    >
                      {/* Peças */}
                      {i === 0 && <span className="text-[#000]">♜</span>}
                      {i === 1 && <span className="text-[#000]">♞</span>}
                      {i === 2 && <span className="text-[#000]">♝</span>}
                      {i === 3 && <span className="text-[#000]">♛</span>}
                      {i === 4 && <span className="text-[#000]">♚</span>}
                      {i === 5 && <span className="text-[#000]">♝</span>}
                      {i === 6 && <span className="text-[#000]">♞</span>}
                      {i === 7 && <span className="text-[#000]">♜</span>}
                      {i >= 8 && i <= 15 && <span className="text-[#000]">♟</span>}
                      {i >= 48 && i <= 55 && <span className="text-[#fff]">♙</span>}
                      {i === 56 && <span className="text-[#fff]">♖</span>}
                      {i === 57 && <span className="text-[#fff]">♘</span>}
                      {i === 58 && <span className="text-[#fff]">♗</span>}
                      {i === 59 && <span className="text-[#fff]">♕</span>}
                      {i === 60 && <span className="text-[#fff]">♔</span>}
                      {i === 61 && <span className="text-[#fff]">♗</span>}
                      {i === 62 && <span className="text-[#fff]">♘</span>}
                      {i === 63 && <span className="text-[#fff]">♖</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Informações do Jogador - Compacto */}
          <div className="bg-[#262421] px-3 py-2 flex items-center justify-between border-t border-[#3d3935]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#759900] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Você</p>
                <p className="text-xs text-gray-500">1200</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#759900] px-2 py-1 rounded">
              <Clock className="w-3 h-3 text-white" />
              <span className="font-mono text-sm font-bold text-white">{formatTime(timePlayer1)}</span>
            </div>
          </div>
        </div>

        {/* Painel de Chat - Oculto no mobile, visível no desktop */}
        <Card className="hidden lg:flex w-80 bg-[#262421] border-[#3d3935] p-4 flex-col h-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-[#759900]" />
              Chat
            </h3>
            <Button
              size="sm"
              onClick={toggleMic}
              className={`h-8 text-xs ${
                isMicOn 
                  ? 'bg-[#759900] hover:bg-[#5d7700]' 
                  : 'bg-[#3d3935] hover:bg-[#4d4945]'
              }`}
            >
              {isMicOn ? (
                <>
                  <Mic className="w-3 h-3 mr-1" />
                  Ativo
                </>
              ) : (
                <>
                  <MicOff className="w-3 h-3 mr-1" />
                  Inativo
                </>
              )}
            </Button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'me'
                      ? 'bg-[#759900] text-white'
                      : 'bg-[#3d3935] text-gray-200'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-xs mt-8">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Nenhuma mensagem ainda</p>
              </div>
            )}
          </div>

          {/* Input de Mensagem */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-[#161512] border border-[#3d3935] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#759900]"
            />
            <Button
              size="sm"
              onClick={sendMessage}
              className="bg-[#759900] hover:bg-[#5d7700] h-9 w-9 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Status do Áudio */}
          {isMicOn && (
            <div className="mt-3 p-2 bg-[#759900]/20 border border-[#759900]/30 rounded-lg">
              <p className="text-xs text-[#759900] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#759900] rounded-full animate-pulse"></span>
                Microfone ativo
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
