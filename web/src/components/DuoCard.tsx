import { GameController } from 'phosphor-react';
import { DuoInfo } from './DuoInfo';

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
  onConnect?: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
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

        <button
          className="w-full h-9 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center justify-center"
          onClick={() => {}}
        >
          <GameController 
            color='#FFF'
            size={18}
          /> 
          <span className="ml-2 font-bold text-white">Conectar</span>
        </button>
    </div>
  );
}