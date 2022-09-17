import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-xl rounded-b-xl ">
      <div className="bg-[#2A2634] rounded-t-lg rounded-b-lg px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <button className="bg-violet-500 hover:bg-violet-600 text-white font-medium rounded py-3 px-4 flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </button>
      </div>
    </div>
  )
}