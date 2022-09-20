import { useState, useEffect, FormEvent } from 'react'
import { Input } from './Input'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check, GameController, X } from 'phosphor-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { api } from '../lib/api'

interface Game {
  id: string;
  title: string;
}

const weeksDaysOptions = [
  { "day": 'D', "value": "0", "name": 'Domingo' },
  { "day": 'S', "value": "1", "name": 'Segunda-feira' },
  { "day": 'T', "value": "2", "name": 'Terça-feira' },
  { "day": 'Q', "value": "3", "name": 'Quarta-feira' },
  { "day": 'Q', "value": "4", "name": 'Quinta-feira' },
  { "day": 'S', "value": "5", "name": 'Sexta-feira' },
  { "day": 'S', "value": "6", "name": 'Sábado' },
]

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    async function loadGames() {
      const { data } = await api.get('games');
      setGames(data)
    }

    loadGames()
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

   try {
    await api.post(`games/${data.game}/ads`, {
      name: data.name,
      yearsPlaying: Number(data.yearsPlaying),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourStart,
      hourEnd: data.hourEnd,
      useVoiceChannel: useVoiceChannel
     })

    // @ts-ignore:next-line
     event.target.reset();
     setWeekDays([]);
     setUseVoiceChannel(false);

     toast.success('Anúncio criado com sucesso!', {
       position: "bottom-right",
       theme: 'dark'
     });
   } catch (err) {
      console.log(err)
      toast.error('Erro ao criar o anúncio, por favor tente novamente!', {
        position: "bottom-right",
        theme: 'dark'
     });
   }
  }

  return (
    <Dialog.Portal>
      <ToastContainer />

      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="modal">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <Dialog.Close
          type="reset"
          className="absolute top-6 right-6 text-zinc-500 px-5 h-12 rounded-md font-semibold hover:text-zinc-600"
        >
          <X size={30}/>
        </Dialog.Close >

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <select 
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm first:text-zinc-500"
              required
              defaultValue=""
            >
              <option 
                value="" 
                className="text-zinc-500 py-3"
                disabled
              >Selecione o game que deseja jogar</option>

              {games.map((game) => (
                <option key={game.id} value={game.id} className="text-white my-3">
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold"> Seu nome (ou nickname)</label>
            <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
              <Input type="number" id="yearsPlaying" name="yearsPlaying" min="0" max="99" placeholder="Tudo bem ser ZERO" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
                >
                {weeksDaysOptions.map((item) => (
                  <ToggleGroup.Item
                    key={item.name}
                    value={item.value}
                    title={item.name}
                    className={`w-10 h-10 rounded ${weekDays.includes(item.value) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  >
                    {item.day}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" id="hourStart" name="hourStart" placeholder="De" />
                <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root 
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if(checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-500" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

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
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}