import Image from 'next/image';
import { FC, useState, useRef } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import ImageZoomDialog from './ImageZoomDialog';
import ImageEditDialog from './ImageEditDialog';
import ImageMaskDialog from './ImageMaskDialog';
import Box from '@mui/material/Box';
import { Replay, Brush } from '@mui/icons-material';
import { imageGenerationService } from '@/services/imageService';
import UploadIcon from '@mui/icons-material/Upload';
import SupaUpload from './SupaUpload';

interface ImageDisplayProps {
  src?: string | null;
  alt: string;
  placeholderSrc?: string;
  placeholderAlt?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  onClick?: () => void;
  onZoom?: () => void;
  onEdit?: () => void;
  onRedraw?: () => void;
  onMask?: () => void;
  showZoom?: boolean;
  showEdit?: boolean;
  showReplay?: boolean;
  showMask?: boolean;

  prompt?: string;
  onReplace?: (newImage: string | null) => void;
  frameId?: string;
  onReplay?: (image_url: string, prompt: string) => void;
  onMaskSave?: (maskData: string, maskUrl: string | null) => void;
  uploadable?: boolean;
  onUploaded?: (url: string) => void;
  sizes?: string;
}

const ImageDisplay: FC<ImageDisplayProps> = ({
  src,
  alt,
  placeholderSrc = "/placeholder-image.svg",
  placeholderAlt = "placeholder image",
  fill = false,
  width,
  height,
  className = "object-cover rounded-xl",
  objectFit = 'cover',
  priority = false,
  onClick,
  onZoom,
  onEdit,
  onRedraw,
  onMask,
  showZoom = true,
  showEdit = true,
  showReplay = false,
  showMask = false,
  prompt,
  onReplace,
  frameId,
  onReplay,
  onMaskSave,
  uploadable = false,
  onUploaded,
  sizes,
}) => {
  const [openZoom, setOpenZoom] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMask, setOpenMask] = useState(false);
  const [maskLoading, setMaskLoading] = useState(false);
  const [pendingMaskUrl, setPendingMaskUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageProps = {
    alt: src ? alt : placeholderAlt,
    className: `${className} ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`}`,
    priority,
    ...(onClick && {
      style: { cursor: 'pointer' },
      onClick
    })
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenZoom(true);
    onZoom && onZoom();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEdit(true);
    onEdit && onEdit();
  };

  const handleDialogClose = () => {
    setOpenZoom(false);
    setOpenEdit(false);
    setOpenMask(false);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRedraw && onRedraw();
    onReplay && onReplay(src || placeholderSrc, prompt || '');
  };

  const handleMask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMask(true);
    onMask && onMask();
  };

  const handleMaskSave = (maskData: string) => {
    setMaskLoading(true);
    imageGenerationService.mergeMask(src || placeholderSrc, maskData)
      .then((res) => {
        if (res?.image_url) {
          setPendingMaskUrl(res.image_url);
          onMaskSave && onMaskSave(res.image_url, res?.mask_url);
        } else {
          setMaskLoading(false);
        }
      })
      .catch((err) => {
        setMaskLoading(false);
      });
  };

  const handleImageLoad = () => {
    if (pendingMaskUrl) {
      setPendingMaskUrl(null);
      setMaskLoading(false);
    }
  };

  const handleUploaded = (url: string) => {
    setPendingMaskUrl(url);
    setMaskLoading(true);
    onUploaded && onUploaded(url);
  };


  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 上传按钮，仅在 uploadable 时显示 */}
        {uploadable && (
          <SupaUpload
            onUploaded={url => handleUploaded(url)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 30
            }}
            bucket='user-upload'
          />
        )}
        {maskLoading && (
          <div style={{
            position: 'absolute',
            left: 0, top: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.5)', zIndex: 20
          }}>
            <CircularProgress />
          </div>
        )}
        {fill ? (
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <Image
              src={pendingMaskUrl || src || placeholderSrc}
              alt={alt}
              fill
              sizes={sizes || '100vw'}
              style={{ objectFit }}
              priority={true}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <Image
            src={pendingMaskUrl || src || placeholderSrc}
            width={width || 300}
            height={height || 200}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            onLoad={handleImageLoad}
            {...imageProps}
          />
        )}

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '6%',
            zIndex: 10,
            '&:hover .icon-bar': {
              opacity: 1,
            },
          }}
        >
          <Box
            className="icon-bar"
            sx={{
              display: 'flex',
              gap: 2,
              bgcolor: 'rgba(0,0,0,0.4)',
              borderRadius: '9999px',
              px: 2,
              py: 1,
              opacity: 0,
              transition: 'opacity 0.2s',
            }}
          >
            {showZoom && <ZoomInIcon sx={{ color: '#fff', cursor: 'pointer' }} fontSize="medium" onClick={handleZoom} />}
            {showEdit && <EditIcon sx={{ color: '#fff', cursor: 'pointer' }} fontSize="medium" onClick={handleEdit} />}
            {showReplay && <Replay sx={{ color: '#fff', cursor: 'pointer' }} fontSize="medium" onClick={handleReplay} />}
            {showMask && <Brush sx={{ color: '#fff', cursor: 'pointer' }} fontSize="medium" onClick={handleMask} />}
          </Box>
        </Box>
      </div>

      <ImageZoomDialog
        open={openZoom}
        onClose={handleDialogClose}
        src={src || placeholderSrc}
        alt={alt}
      />

      <ImageEditDialog
        open={openEdit}
        onClose={handleDialogClose}
        originalImage={src || placeholderSrc}
        defaultPrompt={prompt}
        onReplace={onReplace}
        frameId={frameId}
        onReplay={onReplay}
      />

      <ImageMaskDialog
        open={openMask}
        onClose={handleDialogClose}
        src={src || placeholderSrc}
        alt={alt}
        onSave={handleMaskSave}
      />
    </>
  );
};

export default ImageDisplay;