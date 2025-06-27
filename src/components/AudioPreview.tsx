import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Alert } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';

interface AudioPreviewProps {
  displayName: string;
}

export const AudioPreview: React.FC<AudioPreviewProps> = ({ displayName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 创建新的音频实例
    const audioElement = new Audio();
    
    // 设置音频源
    const audioPath = `/audios/${displayName}.mp3`;
    audioElement.src = audioPath;

    // 处理加载错误
    const handleError = (e: ErrorEvent) => {
      console.error('Audio loading error:', e);
      setError(`Failed to load audio: ${audioPath}`);
    };

    // 处理加载成功
    const handleCanPlay = () => {
      setError(null);
    };

    audioElement.addEventListener('error', handleError as any);
    audioElement.addEventListener('canplay', handleCanPlay);

    setAudio(audioElement);

    // 清理函数
    return () => {
      audioElement.removeEventListener('error', handleError as any);
      audioElement.removeEventListener('canplay', handleCanPlay);
      audioElement.pause();
      audioElement.src = '';
    };
  }, [displayName]);

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play().catch(err => {
        console.error('Playback error:', err);
        setError('Failed to play audio');
      });
    }
    setIsPlaying(!isPlaying);
  };

  // 监听音频播放结束
  useEffect(() => {
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      bgcolor: '#f5f5f5',
      p: 1,
      borderRadius: 1
    }}>
      <IconButton 
        onClick={handlePlayPause}
        size="small"
        disabled={!audio}
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          '&.Mui-disabled': {
            bgcolor: 'grey.300',
            color: 'grey.500'
          }
        }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <VolumeUp color="action" />
      <Typography variant="body2" color="text.secondary">
        Voice Preview
      </Typography>
    </Box>
  );
}; 