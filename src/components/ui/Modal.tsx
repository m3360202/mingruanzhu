import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Fade,
  Backdrop,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { koho } from '@/theme';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void | Promise<void>;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  saveButtonText?: string;
  showSaveButton?: boolean;
  loading?: boolean;
  hasUnsavedChanges?: boolean;
  disableSave?: boolean;
}

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }
      }}
      className={koho.className}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Discard Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  title,
  children,
  maxWidth = 'lg',
  fullWidth = true,
  saveButtonText = 'Save',
  showSaveButton = true,
  loading = false,
  hasUnsavedChanges = false,
  disableSave = false,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    // Prevent closing when clicking on the modal content
    event.stopPropagation();
    handleClose();
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave();
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, hasUnsavedChanges]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          }
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            maxHeight: '90vh',
            minWidth: '600px',
            position: 'relative',
            overflow: 'hidden',
          }
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center',
            justifyContent: 'center',
          }
        }}
        className={koho.className}
      >
        {/* Header with title and close button */}
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            py: 2,
            px: 3,
            backgroundColor: '#fafafa',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#333',
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: '#333',
              },
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent
          sx={{
            px: 3,
            py: 3,
            overflow: 'auto',
            maxHeight: 'calc(90vh - 140px)', // Account for header and footer
          }}
        >
          {children}
        </DialogContent>

        {/* Footer with save button */}
        {showSaveButton && (
          <DialogActions
            sx={{
              borderTop: '1px solid #f0f0f0',
              px: 3,
              py: 2,
              backgroundColor: '#fafafa',
              justifyContent: 'flex-end',
            }}
          >
            <LoadingButton
              onClick={handleSave}
              variant="contained"
              loading={loading}
              disabled={disableSave}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {saveButtonText}
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>

      {/* Confirmation dialog for unsaved changes */}
      <ConfirmDialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmClose}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to close without saving?"
      />
    </>
  );
}; 