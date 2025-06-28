import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  Backdrop,
  Paper,
  Chip,
  useTheme,
  keyframes
} from '@mui/material';
import {
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Autorenew as AutorenewIcon
} from '@mui/icons-material';
import { GenerationProgress } from '@/lib/codeGenerator';

interface GenerationProgressProps {
  open: boolean;
  progress: GenerationProgress;
  onClose?: () => void;
}

// 创建动画
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const GenerationProgressComponent: React.FC<GenerationProgressProps> = ({
  open,
  progress,
  onClose
}) => {
  const theme = useTheme();

  const getStatusIcon = () => {
    switch (progress.status) {
      case 'preparing':
        return <AutorenewIcon sx={{ animation: `${rotate} 2s linear infinite` }} />;
      case 'generating':
        return <CodeIcon sx={{ animation: `${pulse} 1.5s ease-in-out infinite` }} />;
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <CircularProgress size={24} />;
    }
  };

  const getStatusColor = () => {
    switch (progress.status) {
      case 'preparing':
        return 'info';
      case 'generating':
        return 'primary';
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getProgressPercentage = () => {
    if (progress.total === 0) return 0;
    return Math.round((progress.current / progress.total) * 100);
  };

  const getStatusColorValue = () => {
    const colorName = getStatusColor();
    const paletteColor = theme.palette[colorName as keyof typeof theme.palette] as any;
    return paletteColor?.main || theme.palette.primary.main;
  };

  return (
    <>
      {/* 遮罩层 */}
      <Backdrop
        open={open}
        sx={{
          zIndex: theme.zIndex.modal + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            minWidth: 400,
            maxWidth: 600,
            width: '90%',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* 状态图标 */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${getStatusColor()}.50`,
                border: `3px solid ${getStatusColorValue()}`,
                fontSize: 40,
              }}
            >
              {getStatusIcon()}
            </Box>
          </Box>

          {/* 标题和状态 */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            智慧树MCP代码生成中...
          </Typography>

          <Chip
            label={progress.status === 'preparing' ? '准备中' : 
                  progress.status === 'generating' ? '生成中' : 
                  progress.status === 'completed' ? '已完成' : '错误'}
            color={getStatusColor() as any}
            variant="filled"
            sx={{ mb: 3, fontSize: '0.875rem', fontWeight: 'medium' }}
          />

          {/* 当前任务 */}
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            {progress.currentPage}
          </Typography>

          {/* 进度条 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                进度
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progress.current} / {progress.total} ({getProgressPercentage()}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={getProgressPercentage()}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: progress.status === 'error' 
                    ? 'linear-gradient(90deg, #f44336 0%, #d32f2f 100%)'
                    : progress.status === 'completed'
                    ? 'linear-gradient(90deg, #4caf50 0%, #388e3c 100%)'
                    : 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
                }
              }}
            />
          </Box>

          {/* 状态消息 */}
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontStyle: 'italic',
              minHeight: 24
            }}
          >
            {progress.message}
          </Typography>

          {/* 生成中的动画效果 */}
          {progress.status === 'generating' && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          )}

          {/* 完成时的额外信息 */}
          {progress.status === 'completed' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="success.main" sx={{ fontWeight: 'medium' }}>
                🎉 代码生成完成！正在生成说明书...
              </Typography>
            </Box>
          )}

          {/* 错误时的额外信息 */}
          {progress.status === 'error' && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="error.main" sx={{ fontWeight: 'medium' }}>
                ❌ 生成过程中发生错误，请检查网络连接和API配置
              </Typography>
            </Box>
          )}
        </Paper>
      </Backdrop>
    </>
  );
};

export default GenerationProgressComponent; 