import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';
import { styles } from './styles';

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
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  const weekDays = (data.weekDays.length > 1) ?
    `${data.weekDays.length} dias` :
    `${data.weekDays.length} dia`;

  const hours = `${data.hourStart} - ${data.hourEnd}`;

  return (
    <View style={styles.container}>
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
          colorValue={
          (data.useVoiceChannel) ?
            THEME.COLORS.SUCCESS : 
            THEME.COLORS.ALERT
          }
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={onConnect}
        >
          <GameController 
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text style={styles.buttonTitle}>
            Conectar
          </Text>
        </TouchableOpacity>
    </View>
  );
}