import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MagnifyingGlassPlus } from 'phosphor-react';
import Carousel from 'react-multi-carousel';
import * as Dialog from '@radix-ui/react-dialog';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { CreateAdModal } from '../components/CreateAdModal';
import { DuoCard } from '../components/DuoCard';

import { responsiveCarouselGame } from '../utils/responsiveCarousel';

import { api } from '../lib/api'

import logoImg from '../assets/logo-esports.svg'

interface DuoData {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface GameInfo {
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Game() {
  const { id } = useParams<{id: string}>()
  const [duos, setDuos] = useState<DuoData[]>([]);
  const [game, setGame] = useState<GameInfo>({} as GameInfo);

  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);
 
  useEffect(() => {
    async function loadAds() {
      const { data } = await api.get(`games/${id}/ads`);
      setDuos(data);
      setLoadingAds(false);
    }
    loadAds();
  }, []);

  useEffect(() => {
    async function getGame() {
      const { data } = await api.get(`game/${id}`);
      setGame(data);
      setLoadingGame(false);
    }
    getGame();
  }, []);

  return(
    <div className="max-w-[1200px] h-auto md:h-[100vh] mx-auto flex flex-col items-center justify-center pb-10 md:pb-0">
      <div className="bg-nlw-gradient w-full h-1 fixed left-0 bottom-0 hidden md:block" />

      <div className="flex w-full items-center justify-between md:mb-8 p-5 md:px-0">
        <Link to="/">
          <button
            className="flex items-center gap-2 text-white bg-zinc-600 hover:bg-zinc-500 py-3 px-3 rounded">
            <ArrowLeft size={20} />
            <div className="hidden md:block">Voltar</div>
          </button>
        </Link>

        <img src={logoImg} alt="eSports NLW" className="w-[100px] md:w-[125px]" />

        <Dialog.Root>
          <Dialog.Trigger className="bg-violet-500 hover:bg-violet-600 text-white font-medium rounded py-3 px-4 hidden md:flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar an??ncio
          </Dialog.Trigger>
          <CreateAdModal />
        </Dialog.Root>

        <div className="h-5 w-5 py-3 px-3 block md:hidden" />
      </div>

      <div className="flex flex-col md:flex-row md:gap-16 gap-4 w-full mt-10">
        <SkeletonTheme baseColor="#2A2634" highlightColor="#302C38">
            {loadingGame ? (
                <Skeleton className={`w-[100%] h-[175px] md:w-[350px] md:h-[475px] rounded-lg mx-auto`} /> 
            ) : (
                <img src={game.bannerUrl} alt={game.title} className={`w-[calc(100%-48px)] h-[175px] md:w-[350px] md:h-[475px] object-cover bg-zinc-600 border-0 rounded-lg m-auto`} />
            )}
           
            <div className="my-auto">
                <div className="mb-8 md:mb-16 pl-6 md:pl-0 mt-3 md:mt-0">
                    {loadingGame ? (
                        <Skeleton className="text-white font-black text-2xl md:text-4xl mb-2 w-[40%]" />
                    ) : (
                        <h1 className="text-white font-black text-2xl md:text-4xl mb-2">{game.title}</h1>
                    )}
                    <span className="text-zinc-400 text-xl">Conecte-se e comece a jogar!</span>
                </div>

                <div className="mt-4 md:mt-10 w-full md:w-[800px] relative pl-5 md:pl-0">
                    {(!loadingAds && duos.length <= 0) && (
                        <div className="w-full flex py-16">
                            <span> N??o h?? an??ncios publicados para esse jogo ainda!</span>
                        </div>
                    )}
                
                        <Carousel
                            responsive={responsiveCarouselGame}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            itemClass="px-2 md:px-0"
                        >
                        {loadingAds ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton 
                                key={index}
                                className="w-[200px] md:w-[250px] h-[290px] md:h-[330px] rounded" 
                            />
                        ))
                        ) : ( 
                        duos.map((item) => (
                            <DuoCard
                                key={item.id}
                                data={item}
                            />
                        ))    
                        )} 
                    </Carousel>
                </div>
            </div>
        </SkeletonTheme>
      </div>
    </div>
  )
}