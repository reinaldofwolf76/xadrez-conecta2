"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Users, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

type TimeControl = 'rapid' | 'blitz' | 'classical'

export default function MatchmakingButton({ timeControl }: { timeControl: TimeControl }) {
  const [isSearching, setIsSearching] = useState(false)
  const [playersInQueue, setPlayersInQueue] = useState(0)
  const router = useRouter()

  // Buscar oponente
  const findOpponent = async () => {
    setIsSearching(true)

    try {
      // Criar perfil temporário para convidado
      const guestId = crypto.randomUUID()
      
      // Verificar se há alguém na fila
      const { data: queueData, error: queueError } = await supabase
        .from('matchmaking_queue')
        .select('*')
        .eq('time_control', timeControl)
        .limit(1)
        .single()

      if (queueData && !queueError) {
        // Encontrou oponente! Criar partida
        const { data: matchData, error: matchError } = await supabase
          .from('matches')
          .insert({
            player1_id: queueData.player_id,
            player2_id: guestId,
            time_control: timeControl,
            status: 'active'
          })
          .select()
          .single()

        if (!matchError) {
          // Remover da fila
          await supabase
            .from('matchmaking_queue')
            .delete()
            .eq('id', queueData.id)

          // Redirecionar para o jogo
          router.push('/game')
        }
      } else {
        // Ninguém na fila, adicionar à fila
        await supabase
          .from('matchmaking_queue')
          .insert({
            player_id: guestId,
            time_control: timeControl
          })

        // Simular busca por 3 segundos
        setTimeout(() => {
          router.push('/game')
        }, 3000)
      }
    } catch (error) {
      console.error('Erro ao buscar oponente:', error)
      setIsSearching(false)
    }
  }

  // Atualizar contador de jogadores na fila
  useEffect(() => {
    const fetchQueueCount = async () => {
      const { count } = await supabase
        .from('matchmaking_queue')
        .select('*', { count: 'exact', head: true })
        .eq('time_control', timeControl)

      setPlayersInQueue(count || 0)
    }

    fetchQueueCount()
    const interval = setInterval(fetchQueueCount, 5000)

    return () => clearInterval(interval)
  }, [timeControl])

  if (isSearching) {
    return (
      <Card className="bg-[#759900] border-none p-8 text-center shadow-2xl">
        <Loader2 className="w-16 h-16 mx-auto mb-4 text-white animate-spin" />
        <h3 className="text-2xl font-bold mb-2 text-white">Buscando Oponente...</h3>
        <p className="text-white/90 mb-4">Aguarde enquanto conectamos você</p>
        <div className="flex items-center justify-center gap-2 text-sm text-white/80">
          <Users className="w-4 h-4" />
          <span>{playersInQueue} jogadores na fila</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-[#759900] border-none p-8 text-center shadow-2xl">
      <Zap className="w-16 h-16 mx-auto mb-4 text-white" />
      <h3 className="text-2xl font-bold mb-2 text-white">Buscar Oponente</h3>
      <p className="text-white/90 mb-6">Conecte-se com um jogador online agora</p>
      <Button 
        size="lg"
        onClick={findOpponent}
        className="w-full sm:w-auto bg-white text-[#759900] hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Zap className="w-5 h-5 mr-2" />
        Começar Partida
      </Button>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
        <Users className="w-4 h-4" />
        <span>{playersInQueue} jogadores na fila</span>
      </div>
    </Card>
  )
}
