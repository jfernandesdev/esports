import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Carousel from 'react-multi-carousel';

import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'
import { CreateAdModal } from '../components/CreateAdModal'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      const { data } = await api.get('games');
      setGames(data);
      setLoading(false);
    }
    loadGames()
  }, [])

  return (
    <div className="max-w-[1200px] md:h-[100vh] mx-auto flex flex-col items-center justify-center">
      <img src={logoImg} alt="eSports NLW" className="w-[125px] md:w-[200px]" />

      <h1 className="text-3xl md:text-5xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="relative w-full mt-10 pl-4 ">
        <SkeletonTheme baseColor="#2A2634" highlightColor="#302C38">
          <Carousel
            responsive={responsiveCarouselHome}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            containerClass="pr-10"
            itemClass="h-[325px] md:h-[260px] px-2"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-[325px] md:h-[260px] px-2 rounded"/>
              ))
            ): ( 
              games.map((game) => (
                <GameBanner
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              ))
            )}
          </Carousel>
        </SkeletonTheme>
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}