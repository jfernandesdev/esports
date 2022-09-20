import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from '../components/CreateAdModal';

import { DuoCard } from '../components/DuoCard';

import { api } from '../lib/api'
import { ArrowLeft, MagnifyingGlassPlus } from 'phosphor-react';

import logoImg from '../assets/logo-esports.svg'
import Carousel from 'react-multi-carousel';
import { responsiveCarouselGame } from '../utils/responsiveCarousel';

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

  useEffect(() => {
    async function loadAds() {
      const { data } = await api.get(`games/${id}/ads`);
      setDuos(data);
    }
    loadAds();
  }, []);

  useEffect(() => {
    async function getGame() {
      const { data } = await api.get(`game/${id}`);
      setGame(data);
    }
    getGame();
  }, []);

  return(
    <div className="max-w-[1200px] h-[100vh] mx-auto flex flex-col items-center justify-center">
      <div className="bg-nlw-gradient w-full h-1 absolute bottom-0" />

      <div className="flex w-full items-center justify-between mb-8">

        <Link to="/">
          <button
            className="flex items-center gap-2 text-white bg-zinc-600 hover:bg-zinc-500 py-3 px-3 rounded">
            <ArrowLeft size={20} />Voltar
          </button>
        </Link>

        <img src={logoImg} alt="eSports NLW" className="w-[125px]" />

        <Dialog.Root>
          <Dialog.Trigger className="bg-violet-500 hover:bg-violet-600 text-white font-medium rounded py-3 px-4 flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
          <CreateAdModal />
        </Dialog.Root>
      </div>

      <div className="flex gap-16 w-full mt-10">
        <img src={game.bannerUrl} alt={game.title} className={`w-[350px] h-[475px] object- bg-zinc-600 border-0 rounded-lg`}/>
      
        <div className="my-auto">

          <div className="mb-16">

            <h1 className="text-white font-black text-4xl">{game.title}</h1>
            <span className="text-zinc-400 text-xl">Conecte-se e comece a jogar!</span>
          </div>

          <div className="mt-10 w-[800px] relative">
            {(duos.length > 0) ? (
            <Carousel
              responsive={responsiveCarouselGame}
            >
              {duos.map((item) => (
                <DuoCard
                  key={item.id}
                  data={item}
                  onConnect={() => { }}
                />
              )) }
            </Carousel>
            ) : (
              <div className="w-full flex py-16">
                <span> Não há anúncios publicados para esse jogo ainda!</span>
              </div>
            )}
          </div>
      </div>
      </div>
    </div>
  )
}