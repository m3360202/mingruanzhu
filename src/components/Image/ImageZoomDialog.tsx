import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CloseIcon from '@mui/icons-material/Close';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import ImageToolbar from './ImageToolbar';

interface ImageZoomDialogProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;

const ImageZoomDialog: FC<ImageZoomDialogProps> = ({
  open,
  onClose,
  src,
  alt
}) => {
  const [imgLoading, setImgLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setScale(1);
      setRotation(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        setScale(prev => {
          const next = e.deltaY < 0 ? prev + 0.1 : prev - 0.1;
          return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(next * 100) / 100));
        });
      };
      container.addEventListener('wheel', handleWheel, { passive: false });
      // 清理
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }, 0);
    return () => clearTimeout(timer);
  }, [open]);


  const handleBackdropClick = (e: React.MouseEvent) => {
    onClose();
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setRotation(0);
    onClose();
  };


  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          background: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative'
        }
      }}
      slotProps={{
        backdrop: {
          sx: {
            background: 'rgba(0,0,0,0.9)',
            cursor: 'pointer'
          }
        }
      }}
      onClick={handleBackdropClick}
    >
      {/* 关闭按钮 */}
      <div
        className="fixed top-4 right-4 z-50"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-12 h-12 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all duration-200"
        >
          <CloseIcon fontSize="medium" />
        </button>
      </div>

      {/* 图片容器 */}
      <div
        className="flex items-center justify-center flex-1 w-full relative"
        onClick={handleBackdropClick}
        ref={containerRef}
      >
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <CircularProgress
              sx={{ color: 'white' }}
              size={60}
            />
          </div>
        )}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            maxWidth: '80vw',
            maxHeight: '60vh'
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="80vw"
            className="w-auto h-auto max-w-full max-h-full object-contain"
            style={{
              maxWidth: '80vw',
              maxHeight: '60vh',
              width: 'auto',
              height: 'auto'
            }}
            onLoad={() => setImgLoading(false)}
            onLoadStart={() => setImgLoading(true)}
            onClick={handleImageClick}
          />
        </div>
      </div>

      {/* 底部操作栏 */}
      <div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageToolbar
          onZoomIn={() => setScale(s => Math.min(s + 0.25, MAX_SCALE))}
          onZoomOut={() => setScale(s => Math.max(s - 0.25, MIN_SCALE))}
          onReset={() => { setScale(1); setRotation(0); }}
          onRotateLeft={() => setRotation(r => r - 90)}
          onRotateRight={() => setRotation(r => r + 90)}
        />
      </div>
    </Dialog>
  );
};

export default ImageZoomDialog;