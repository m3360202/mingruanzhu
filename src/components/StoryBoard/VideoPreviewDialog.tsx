import { Dialog, DialogContent } from "@mui/material";
import VideoPreview from "@/components/ProEditor/PreviewVideo";
import BottomBar from "@/components/ProEditor/BottomBar";

interface VideoPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  frames: any[];
}

export const VideoPreviewDialog = ({ open, onClose, frames }: VideoPreviewDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: '100%',
          height: '100%',
          margin: 0,
          borderRadius: 0,
          overflow: 'hidden',
          bgcolor: 'background.default'
        }
      }}
    >
      <DialogContent sx={{ 
        p: 0, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&.MuiDialogContent-root': {
          padding: 0
        }
      }}>
        <main className="flex flex-col h-full w-full">
          <div className="flex flex-col flex-1">
            <VideoPreview />
            <BottomBar />
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}; 