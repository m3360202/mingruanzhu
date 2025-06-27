import { FC, CSSProperties } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ReplayIcon from '@mui/icons-material/Replay';
import CropFreeIcon from '@mui/icons-material/CropFree';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

interface ImageToolbarProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  style?: CSSProperties;
}

const icons = [
  {Icon: RotateLeftIcon, action: "onRotateLeft", label: "Rotate Left"},
  {Icon: RotateRightIcon, action: "onRotateRight", label: "Rotate Right"},
  {Icon: ZoomOutIcon, action: "onZoomOut", label: "Zoom Out"},
  {Icon: ZoomInIcon, action: "onZoomIn", label: "Zoom In"},
  {Icon: ReplayIcon, action: "onReset", label: "Reset"},
];

const ImageToolbar: FC<ImageToolbarProps> = (props) => {

  const actionMap: Record<string, () => void> = {
    onZoomIn: props.onZoomIn!,
    onZoomOut: props.onZoomOut!,
    onReset: props.onReset!,
    onRotateLeft: props.onRotateLeft!,
    onRotateRight: props.onRotateRight!
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        pointerEvents: 'auto',
        ...props.style,
      }}
      className="image-toolbar"
    >
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          background: 'rgba(120,120,120,0.28)',
          borderRadius: 32,
          padding: '8px 32px',
          boxShadow: '0 2px 8px rgba(60,60,60,0.05)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        {icons.map(({Icon, action, label}) =>
          actionMap[action] && (
            <button
              key={label}
              onClick={actionMap[action]}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
              }}
              title={label}
              tabIndex={0}
              type="button"
            >
              <Icon
                fontSize="medium"
                sx={{
                  color: 'rgba(255,255,255,0.86)',
                  stroke: 'white',
                  strokeWidth: 0.5,
                  filter: 'drop-shadow(0 0 1px #0006)',
                  transition: 'color 0.15s',
                  '&:hover': { color: '#fff' }
                }}
              />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ImageToolbar;