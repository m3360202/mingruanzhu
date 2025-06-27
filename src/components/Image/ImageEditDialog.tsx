import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Box, DialogActions, Grid, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ImageDisplay from './ImageDisplay';
import { imageGenerationService } from '@/services/imageService';

interface ModelOption {
  label: string;
  value: string;
}

const DEFAULT_MODELS: ModelOption[] = [
  { label: 'FLUX', value: 'flux' },
];

interface ImageEditDialogProps {
  open: boolean;
  onClose: () => void;
  originalImage: string;
  onSave?: (newImage: string) => void;
  defaultPrompt?: string;
  onReplace?: (newImage: string | null) => void;
  frameId?: string;
  onReplay?: (image_url: string, prompt: string) => void;
}

interface HistoryImage {
  image_url: string;
  prompt?: string;
}

const ImageEditDialog: React.FC<ImageEditDialogProps> = ({
  open,
  onClose,
  originalImage,
  onSave,
  defaultPrompt,
  onReplace,
  frameId,
  onReplay,
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODELS[0].value);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultPrompt, setResultPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyImages, setHistoryImages] = useState<HistoryImage[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [originalImageState, setOriginalImageState] = useState(originalImage);
  const [maskImageState, setMaskImageState] = useState<string | null>(null);
  const [buttonGroupValue, setButtonGroupValue] = useState('re_generate');

  const fetchHistoryImages = () => {
    setLoadingHistory(true);
    imageGenerationService.listImageGenerations('frame', frameId || '')
      .then((res) => {
        if (res?.data) {
          let images = res.data.map((item: any) => ({ image_url: item.image_url, prompt: item.prompt }));
          setHistoryImages(images);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoadingHistory(false));
  };

  useEffect(() => {
    if (open) {
      setPrompt(defaultPrompt || '');
      setSelectedModel(DEFAULT_MODELS[0].value);
      setResultImage(null);
      setLoading(false);
      setLoadingHistory(true);
      fetchHistoryImages();
    }
  }, [open]);

  const handleChange = (field: string, value: string) => {
    setPrompt(value);
  };

  const handleReplay = (image_url: string, prompt: string) => {
    setPrompt(prompt);
    setOriginalImageState(image_url);
    setResultImage(null);
  };

  const handleMaskSave = (maskUrl: string, maskImageUrl: string | null) => {
    setOriginalImageState(maskUrl);
    console.log('handleMaskSave', maskUrl, maskImageUrl);
    setMaskImageState(maskImageUrl);
    setResultImage(null);
  };

  const handleUploaded = (url: string) => {
    setOriginalImageState(url);
    setResultImage(url);
  };

  const buttonGroupChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    console.log('buttonGroupChange', newAlignment);
    setButtonGroupValue(newAlignment);
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '500px',
          maxWidth: '1200px',
        }
      }}
    >

      <DialogTitle sx={{
        borderBottom: '1px solid #eee',
        pb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        fontFamily: 'var(--font-koho)'
      }}>Image Editor</DialogTitle>


      <DialogContent sx={{ mt: 2, minHeight: 500 }}>
        <Grid container spacing={2} sx={{ height: '100%', width: '100%' }}>
          {/* 左侧原图 */}
          <Grid item xs={4} sx={{ position: 'relative', height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <ImageDisplay
              src={originalImageState}
              alt="Original"
              showEdit={false}
              showMask={true}
              onMaskSave={handleMaskSave}
              uploadable={true}
              onUploaded={handleUploaded}
            />
          </Grid>
          {/* 中间编辑区 */}
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div className="w-full flex flex-col gap-4" style={{ maxWidth: 320, minHeight: 340 }}>
              <ToggleButtonGroup
                color="primary"
                value={buttonGroupValue}
                exclusive
                onChange={buttonGroupChange}
                aria-label="Platform"
                sx={{ mb: 2 }}
              >
                <ToggleButton value="re_generate">ReGenerate</ToggleButton>
                <ToggleButton value="background_remove">Background Remove</ToggleButton>
                <ToggleButton value="upscale">Upscale</ToggleButton>
              </ToggleButtonGroup>
              {
                buttonGroupValue != 'upscale' && (
                  <TextField
                    fullWidth
                    label="Prompt"
                    value={prompt}
                    multiline
                    rows={4}
                    placeholder=""
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    sx={{ mb: 2 }}
                    helperText=""
                  />
                )
              }
              {buttonGroupValue === 're_generate' && (
                <TextField
                  select
                  fullWidth
                  label="Model"
                  value={selectedModel}
                  sx={{ mb: 2 }}
                  helperText=""
                  required
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                  }}
                >
                  {DEFAULT_MODELS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  setResultImage(null);
                  setLoading(true);
                  imageGenerationService.editImage(buttonGroupValue, 'frame', frameId || '', originalImageState, maskImageState, prompt)
                    .then((res) => {
                      setResultImage(res?.image_url);
                      setLoading(false);
                    })
                    .catch((err) => {
                      setLoading(false);
                      console.error(err);
                    });
                  fetchHistoryImages();
                }}
                disabled={loading || !prompt}
                sx={{ mt: 2, minWidth: 180 }}
              >
                {loading ? <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} /> : null}
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </Grid>
          {/* 右侧结果图 */}
          <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, position: "relative", }}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={60} />
                <Typography variant="body2" color="text.secondary">
                  Generating image...
                </Typography>
              </Box>
            ) : resultImage ? (
              <ImageDisplay
                src={resultImage}
                alt="Generated"
                width={320}
                height={240}
                showEdit={false}
                showReplay={true}
                prompt={resultPrompt || ''}
                onReplay={handleReplay}
              />
            ) : (
              <Box sx={{
                width: 320,
                height: 240,
                border: '2px dashed #ccc',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">
                  Generated image will appear here
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* 历史图片记录 */}
        <Box sx={{ mt: 3, p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
            History
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {loadingHistory ? (
              <Typography variant="body2" color="text.secondary">Loading...</Typography>
            ) : (
              historyImages.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: 80,
                    height: 60,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => {
                    setResultImage(img.image_url);
                    setResultPrompt(img.prompt || '');
                  }}
                >
                  <Image
                    src={img.image_url}
                    alt={img.prompt || `History ${index + 1}`}
                    width={80}
                    height={60}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #eee' }}>
        <Button onClick={() => {
          onReplace && onReplace(resultImage);
          onClose();
        }} variant="contained" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px' }} disabled={!resultImage}>
          Replace
        </Button>
        <Button onClick={onClose} variant="outlined" sx={{ fontFamily: 'var(--font-koho)', fontSize: '14px', color: '#666F8D' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageEditDialog;