import React, { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Carousel from 'react-multi-carousel';

import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'
import { CreateAdModal } from '../components/CreateAdModal'

import { api } from '../lib/api'

import logoImg from '../assets/logo-esports.svg'

import '../styles/main.css'
import 'react-multi-carousel/lib/styles.css';
import { responsiveCarouselHome } from '../utils/responsiveCarousel';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function loadGames() {
      const { data } = await api.get('games');
      setGames(data)
    }

    loadGames()
  }, [])

  return (
    <div className="max-w-[1200px] h-[100vh] mx-auto flex flex-col items-center justify-center my-10">
      <img src={logoImg} alt="eSports NLW" className="w-[200px]" />

      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="relative w-full mt-10">
        <Carousel
          responsive={responsiveCarouselHome}
          containerClass=""
          itemClass="h-[260px] px-2"
        >
          {games.map((game) => (
            <GameBanner
              key={game.id}
              id={game.id}
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