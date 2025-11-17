import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type Profile = {
  id: string
  username: string
  rating: number
  wins: number
  losses: number
  draws: number
  status: string
  avatar_url?: string
  created_at: string
}

export type Match = {
  id: string
  player1_id: string
  player2_id: string
  winner_id?: string
  status: 'waiting' | 'active' | 'finished'
  time_control: 'rapid' | 'blitz' | 'classical'
  moves: string[]
  created_at: string
  finished_at?: string
}

export type Friend = {
  id: string
  user_id: string
  friend_id: string
  status: 'pending' | 'accepted'
  created_at: string
}
