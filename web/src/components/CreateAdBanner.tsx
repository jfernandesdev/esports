import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-xl rounded-b-xl mx-4">
      <div className="bg-[#2A2634] rounded-t-lg rounded-b-lg px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <strong className="text-xl md:text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="bg-violet-500 hover:bg-violet-600 text-white font-medium rounded py-3 px-4 flex items-center justify-center gap-3 mt-3 w-full md:w-auto md:mt-0">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}