import { useState, useEffect } from 'react';
import { Activity, CheckCircle, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import { api } from '../lib/api';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface DuoMatchProps {
  adsId: string;
}

export function DuoMatch({ adsId }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState(false);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  useEffect(() => {
    async function getDiscordUser() {
      const { data } = await api.get(`ads/${adsId}/discord`);
      setDiscordDuoSelected(data.discord)
    }
    getDiscordUser();
  }, [discordDuoSelected])

  function handleCopyDiscordUserToClipBoard() {
    navigator.clipboard.writeText(discordDuoSelected);
    toast.success('Usuário copiado para você colar no Discord :)', {
      icon: '✍️',
      position: "bottom-right",
      theme: 'dark'
    });
  }

  return (
    <Dialog.Portal>
      <ToastContainer />

      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="modalConnect flex flex-col justify-center items-center">
          <Dialog.Close
            type="reset"
            className="absolute top-6 right-6 text-zinc-500 px-5 h-12 rounded-md font-semibold hover:text-zinc-600"
          >
            <X size={30}/>
          </Dialog.Close >

          <CheckCircle size={70} color='#34D399' weight={'bold'} />
          <Dialog.Title className="text-4xl mt-4 font-black mb-2">Let's Play</Dialog.Title>
          <span className="text-zinc-400 text-xl mb-8">Agora é só começar a jogar</span>

          <label className="label font-bold">Adicione no Discord</label>
          <button
            className="bg-zinc-900 rounded py-3 flex w-full justify-center mt-2"
            onClick={handleCopyDiscordUserToClipBoard}
            disabled={isCopping}
          >
            <div className="text-zinc-200">
              {isCopping ? (
                <Activity color="##8B5CF6" />
              ) : (
                discordDuoSelected
              )}
            </div>
          </button>
      </Dialog.Content>
    </Dialog.Portal>
  );
}