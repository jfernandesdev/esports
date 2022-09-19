import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Carousel from 'react-multi-carousel';

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'


import { api } from './lib/api'

import logoImg from './assets/logo-esports.svg'

import './styles/main.css'
import 'react-multi-carousel/lib/styles.css';

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
     
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
     
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.5,
     
    }
  };


  return (
    <div className="max-w-[1200px] h-[100vh] mx-auto flex flex-col items-center justify-center my-10">
      <img src={logoImg} alt="eSports NLW" className="w-[200px]"/>

      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
     
      <div className="relative w-full mt-10">
      <Carousel 
        responsive={responsive}
        containerClass=""
        itemClass="h-[260px] px-2"
      >
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          /> 
        ))}
      </Carousel>
     </div>
  
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}