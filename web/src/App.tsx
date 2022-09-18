import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'

import { api } from './lib/api'

import logoImg from './assets/logo-esports.svg'

import './styles/main.css'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function loadGames() {
      const { data } = await api.get('games');
      setGames(data)  
    }

    loadGames()
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="eSports NLW"/>

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          /> 
        ))}
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}