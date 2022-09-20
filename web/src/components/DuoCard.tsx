import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { DuoInfo } from './DuoInfo';
import { DuoMatch } from './DuoMatch';
import { api } from '../lib/api';

export interface DuoCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
}

export function DuoCard({ data }: Props) {
  const weekDays = (data.weekDays.length > 1) ?
    `${data.weekDays.length} dias` :
    `${data.weekDays.length} dia`;

  const hours = `${data.hourStart} - ${data.hourEnd}`;

  return (
    <div className="w-[250px] bg-[#2A2634] rounded-lg p-5 items-center">
        <DuoInfo 
          label="Nome" 
          value={data.name} 
        />
        <DuoInfo
          label="Tempo de jogo"
          value={(data.yearsPlaying > 1) ? `${data.yearsPlaying} anos` : `${data.yearsPlaying} ano` }
        />
        <DuoInfo
          label="Disponibilidade"
          value={`${weekDays} \u2022 ${hours}`}
        />
        <DuoInfo
          label="Chamada de áudio?"
          value={(data.useVoiceChannel) ? 'Sim' : 'Não'}
          colorValue={ (data.useVoiceChannel) ? '#34D399' :  '#F87171' }
        />

        <Dialog.Root>
          <Dialog.Trigger className="w-full h-9 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center justify-center">
            <GameController 
              color='#FFF'
              size={18}
            /> 
            <span className="ml-2 font-bold text-white">Conectar</span>
          </Dialog.Trigger>

          <DuoMatch adsId={data.id} />
      </Dialog.Root>
    </div>
  );
}