import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { koho } from '@/theme';

interface Voice {
  id: string;
  voice_id: string;
  display_name: string;
  gender: string;
  age: number;
  accent: string;
}

interface VoiceSelectProps {
  value: string;
  onChange: (value: string) => void;
  voices: Voice[];
  required?: boolean;
}

export const VoiceSelect: React.FC<VoiceSelectProps> = ({
  value,
  onChange,
  voices,
  required = false,
}) => {
  return (
    <FormControl fullWidth required={required} className={koho.className}>
      <InputLabel>Voice</InputLabel>
      <Select
        value={value}
        label="Voice"
        onChange={(e) => onChange(e.target.value)}
      >
        {voices.map((voice) => (
          <MenuItem 
            key={voice.id} 
            value={voice.voice_id}
          >
            {voice.display_name} ({voice.gender}, {voice.age} years, {voice.accent})
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Select a specific voice for your character
      </FormHelperText>
    </FormControl>
  );
}; 