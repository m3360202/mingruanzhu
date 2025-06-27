import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
} from '@mui/material';
import { AudioPreview } from './AudioPreview';
import ImageDisplay from './Image/ImageDisplay';
import { Modal } from './ui/Modal';
import { koho } from '@/theme';

interface CharacterDetailDialogProps {
  open: boolean;
  onClose: () => void;
  character: any;
}

export const CharacterDetailDialog: React.FC<CharacterDetailDialogProps> = ({
  open,
  onClose,
  character,
}) => {
  if (!character) return null;

  const getImgUrl = (character: any) => {
    if (character && character.avatar_urls) {
      return character?.avatar_urls?.url;
    } else {
      return '/placeholder-image.svg';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={character.name}
      maxWidth="lg"
      fullWidth
      showSaveButton={false}
      hasUnsavedChanges={false}
    >
      <Box className={koho.className}>
        {/* Character Header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          pb: 2,
          borderBottom: '1px solid #eee',
          paddingTop: '12px'
        }}>
          <Avatar
            src={getImgUrl(character)}
            alt={character.name}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 600, color: '#333' }}>
              {character.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: '14px', color: '#666' }}>
              {character.gender} • {character.age} years old
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ height: '100%' }}>
          {/* 左侧图片区域 */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              {/* 主图 */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    mb: 2
                  }}
                >
                  <ImageDisplay
                    src={getImgUrl(character)}
                    alt={character.name}
                    showEdit={false}
                  />
                </Box>
              </Paper>
              {/* 缩略图区域 */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap', overflowX: 'auto' }}>
                  {Array.from({ length: 3 }, (_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        flex: '0 0 auto',
                        mr: 1,
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    >
                      <img
                        src={getImgUrl(character)}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* 右侧文字内容区域 - 垂直排列，超出滚动 */}
          <Grid item xs={12} md={8} sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', maxHeight: 500, overflowY: 'auto', pr: 1 }}>
              {/* Tagline */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }} gutterBottom>
                  Tagline
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D' }}>
                  {character.oneliner}
                </Typography>
              </Paper>
              {/* Backstory */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }} gutterBottom>
                  Backstory
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D', whiteSpace: 'pre-wrap' }}>
                  {character.backstory}
                </Typography>
              </Paper>
              {/* Personality */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }} gutterBottom>
                  Personality
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D', whiteSpace: 'pre-wrap' }}>
                  {character.personality}
                </Typography>
              </Paper>
              {/* Appearance */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }} gutterBottom>
                  Appearance
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D', whiteSpace: 'pre-wrap' }}>
                  {character.appearance}
                </Typography>
              </Paper>
              {/* Voice */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: '14px', color: '#666', whiteSpace: 'pre-wrap', lineHeight: 1.6 }} gutterBottom>
                  Voice
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D', mb: 2 }}>
                  {character.voice_description}
                </Typography>
                {character.voice_name && (
                  <AudioPreview displayName={character.voice_name} />
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}; 