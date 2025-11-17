"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Crown, Mail, UserCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#161512] text-white px-4">
      {/* Logo e Título */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-[#759900]/20 blur-3xl rounded-full"></div>
          <Crown className="w-24 h-24 text-[#759900] relative z-10" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Xadrez Conecta
          </h1>
          <p className="text-gray-400 text-lg">Conecte-se através do xadrez</p>
        </div>
      </div>

      {/* Opções de Login */}
      <div className="w-full max-w-md space-y-4">
        <Button 
          className="w-full h-14 bg-[#759900] hover:bg-[#5d7700] text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Mail className="w-5 h-5 mr-2" />
          Entrar com Email
        </Button>

        <Button 
          className="w-full h-14 bg-white hover:bg-gray-100 text-gray-900 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Entrar com Google
        </Button>

        <Link href="/dashboard" className="block">
          <Button 
            variant="outline"
            className="w-full h-14 bg-transparent border-2 border-[#759900]/50 hover:bg-[#759900]/10 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            <UserCircle className="w-5 h-5 mr-2" />
            Entrar como Convidado
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>Ao continuar, você concorda com nossos</p>
        <p className="text-[#759900] hover:text-[#5d7700] cursor-pointer">
          Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
