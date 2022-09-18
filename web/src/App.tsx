import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { Input } from './components/Input'

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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

          <Dialog.Content className="modal">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input  id="game" placeholder="Selecione o game que deseja jogar" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold"> Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                  <Input type="number" id="yearsPlaying" min="0" max="99" placeholder="Tudo bem ser ZERO" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">Quando costuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      type="button" 
                      title="Domingo"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        D
                    </button>
                    <button 
                      type="button" 
                      title="Segunda-feira"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        S
                    </button>
                    <button 
                      type="button" 
                      title="Terça-feira"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        T
                    </button>
                    <button 
                      type="button" 
                      title="Quarta-feira"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        Q
                    </button>
                    <button 
                      type="button" 
                      title="Quinta-feira"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        Q
                    </button>
                    <button 
                      type="button" 
                      title="Sexta-feira"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        S
                    </button>
                    <button 
                      type="button" 
                      title="Sábado"
                      className="w-10 h-10 rounded bg-zinc-900"  
                    >
                        S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" id="useVoiceChannel" />
                <label htmlFor="useVoiceChannel">Costumo me conectar ao chat de voz </label>
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close 
                  type="reset" 
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                    Cancelar
                </Dialog.Close >

                <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}