import { useEffect, useRef } from 'react';
import {
  Popover,
  Avatar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useAuthStore } from '@/store/authStore';
import { setOpenProfileDialog } from '@/utils/auth';

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export default function UserProfileDialog({ open, onClose, anchorEl }: UserProfileDialogProps) {
  const { user } = useAuthStore();
  useEffect(() => {
    setOpenProfileDialog(() => onClose);
    return () => setOpenProfileDialog(null);
  }, [onClose]);

  if (!user) return null;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          borderRadius: 1,
          padding: 1,
          minWidth: '280px',
          mt: 1,
        },
      }}
    >
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        padding: '8px'
      }}>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }}>
          <Avatar
            src="/images/avatar-placeholder.png"
            alt={user.email}
            sx={{ width: '36px', height: '36px', fontSize: '14px', marginRight: '8px' }}
          />
          <Box style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <Typography style={{
              width: 'fit-content',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {user.user_metadata?.username || 'User'}
            </Typography>

            <Typography style={{
              width: 'fit-content',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {user.email}
            </Typography>
          </Box>
        </Box>


        <Divider sx={{ width: '100%', my: 1 }} />

        <Box style={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Typography style={{
            fontSize: '14px',
            color: '#111827'
          }}>
            Available Tokens:
          </Typography>
          <Typography color="primary" sx={{ fontWeight: 'bold' }}>
            999
          </Typography>
        </Box>
      </Box>
    </Popover>
  );
} 