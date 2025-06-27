import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';

interface AssetPreviewProps {
  asset: {
    type: string;
    display_name: string;
    url?: string;
  };
}

export const AssetPreview: React.FC<AssetPreviewProps> = ({ asset }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (asset.display_name) {
      const audioElement = new Audio();
      const audioPath = `/audios/${asset.display_name}.mp3`;
      console.log('Audio :', `/audios/${asset.display_name}.mp3`);
      audioElement.src = audioPath;

      const handleError = (e: ErrorEvent) => {
        console.error('Audio loading error:', e);
        setError(`Failed to load audio: ${audioPath}`);
      };

      const handleCanPlay = () => {
        setError(null);
      };

      audioElement.addEventListener('error', handleError as any);
      audioElement.addEventListener('canplay', handleCanPlay);

      setAudio(audioElement);

      return () => {
        audioElement.removeEventListener('error', handleError as any);
        audioElement.removeEventListener('canplay', handleCanPlay);
        audioElement.pause();
        audioElement.src = '';
      };
    }
  }, [asset]);

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

  if (asset.type === 'audio') {
    return (
      <Box 
        className="aspect-square rounded-md bg-gray-100 overflow-hidden relative"
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          gap: 1
        }}
      >
        <VolumeUp sx={{ fontSize: 32, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {asset.display_name}
        </Typography>
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
      </Box>
    );
  }

  return (
    <div className="aspect-square rounded-md bg-gray-100 overflow-hidden relative group">
      <Image 
        src={asset.url || '/placeholder-image.svg'} 
        alt={asset.display_name} 
        width={104} 
        height={104} 
        className="object-cover w-full h-full cursor-pointer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23cccccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'%3E%3C/rect%3E%3Cpath d='M3 9L21 9'%3E%3C/path%3E%3Cpath d='M9 21L9 9'%3E%3C/path%3E%3C/svg%3E";
        }}
      />
      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        onClick={handlePlayPause}
      >
        <IconButton 
          size="large"
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
      </div>
    </div>
  );
}; 