import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Slider, Typography, IconButton, Tooltip, CircularProgress
} from '@mui/material';
import { Brush, Undo, Redo, Clear, Save, Close } from '@mui/icons-material';

interface ImageMaskDialogProps {
    open: boolean;
    onClose: () => void;
    src: string;
    alt: string;
    onSave?: (maskData: string) => void;
    type?: string; // 控制中间点canvas显隐
}

const FIXED_CANVAS_HEIGHT = 600;
const MAX_CANVAS_WIDTH = 800;

const ImageMaskDialog: React.FC<ImageMaskDialogProps> = ({ open, onClose, src, alt, onSave, type }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);         // 底图
    const pointCanvasRef = useRef<HTMLCanvasElement>(null);    // 点
    const canvasMaskRef = useRef<HTMLCanvasElement>(null);     // 遮罩
    const imgRef = useRef<HTMLImageElement | null>(null);

    const [canvasSize, setCanvasSize] = useState({ width: 400, height: FIXED_CANVAS_HEIGHT });
    const [imgDrawInfo, setImgDrawInfo] = useState<{ dx: number, dy: number, dw: number, dh: number; } | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(20);
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
    const [history, setHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [cursorPos, setCursorPos] = useState<{ x: number, y: number; } | null>(null);
    const [isCanvasHover, setIsCanvasHover] = useState(false);

    // 初始化和重置
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                initializeCanvas();
            }, 0);
            // 其余状态重置...
            setIsLoading(true);
            setHistory([]);
            setHistoryIndex(-1);
            setBrushSize(35);
            setTool('brush');
            setIsDrawing(false);
            setCursorPos(null);
            setIsCanvasHover(false);
            imgRef.current = null;
            setImgDrawInfo(null);
        }
    }, [open, src]);

    // 初始化图片和所有canvas
    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        const maskCanvas = canvasMaskRef.current;
        const pointCanvas = pointCanvasRef.current;
        if (!canvas || !maskCanvas || !src) return;
        setIsLoading(true);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            imgRef.current = img;
            // 计算宽高，固定高度，宽度按比例缩放，最大不超过 MAX_CANVAS_WIDTH
            const scale = Math.min(FIXED_CANVAS_HEIGHT / img.naturalHeight, MAX_CANVAS_WIDTH / img.naturalWidth, 1);
            const dw = img.naturalWidth * scale;
            const dh = img.naturalHeight * scale;
            const dx = (dw < MAX_CANVAS_WIDTH ? (MAX_CANVAS_WIDTH - dw) / 2 : 0);
            const dy = 0;
            [canvas, maskCanvas, pointCanvas].forEach(c => {
                if (c) {
                    c.width = dw;
                    c.height = dh;
                }
            });
            setCanvasSize({ width: dw, height: dh });
            setImgDrawInfo({ dx: 0, dy: 0, dw, dh });

            // 绘制底图
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, dw, dh);
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, dw, dh);
            }
            // 清空遮罩
            const maskCtx = maskCanvas.getContext('2d');
            if (maskCtx) maskCtx.clearRect(0, 0, dw, dh);
            // 清空点
            if (pointCanvas) {
                const pctx = pointCanvas.getContext('2d');
                if (pctx) pctx.clearRect(0, 0, dw, dh);
            }
            setIsLoading(false);
        };
        img.onerror = (e) => {
            setIsLoading(false);
        };
        img.src = src;
    };

    // 保存历史
    const saveToHistory = () => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas) return;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;
        const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(imageData);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length);
    };
    const restoreFromHistory = (index: number) => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas || index < 0 || index >= history.length) return;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;
        maskCtx.putImageData(history[index], 0, 0);
        renderMaskCanvas();
    };

    // 鼠标事件
    const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas) return { x: 0, y: 0 };
        const rect = maskCanvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        saveToHistory(); // 鼠标按下时记录历史
        setIsDrawing(true);
        draw(e, true);
    };
    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = getCanvasPos(e);
        setCursorPos({ x, y });
        if (isDrawing) {
            draw(e, false); // 只有按下+移动才绘制
        }
    };
    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(false);
    };
    const handleCanvasMouseLeave = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsCanvasHover(false);
        setCursorPos(null);
        setIsDrawing(false); // 离开时也要停止绘制
    };
    const handleCanvasMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsCanvasHover(true);
    };

    // 绘制（只在maskCanvas上画）
    const draw = (e: React.MouseEvent<HTMLCanvasElement>, isFirst: boolean) => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas) return;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;
        const { x, y } = getCanvasPos(e);
        if (tool === 'brush') {
            // 画淡紫色透明圆
            maskCtx.globalCompositeOperation = 'source-over';
            maskCtx.fillStyle = 'rgba(162,89,255,0.3)'; // 透明度0.35，可调整
        } else {
            // 橡皮擦
            maskCtx.globalCompositeOperation = 'destination-out';
            maskCtx.globalAlpha = 1;
            maskCtx.fillStyle = 'rgba(0,0,0,1)';
        }
        maskCtx.beginPath();
        maskCtx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        maskCtx.fill();
        maskCtx.globalAlpha = 1;
        renderMaskCanvas();
    };

    // 渲染遮罩到主canvas（只负责maskCanvas的显示，底图不动）
    const renderMaskCanvas = () => {
        // 只需清空再画一遍maskCanvas即可
        // 实际显示已经分层，不需要合成
        // 这里只是为了触发 React 的重绘
    };

    // 清除只清遮罩
    const handleClear = () => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas) return;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;
        maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
        renderMaskCanvas();
        saveToHistory();
    };
    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            restoreFromHistory(historyIndex - 1);
        }
    };
    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            restoreFromHistory(historyIndex + 1);
        }
    };
    const handleSave = async () => {
        const maskCanvas = canvasMaskRef.current;
        if (!maskCanvas) return;

        try {
            // 获取原始遮罩数据
            const originalMaskData = maskCanvas.toDataURL('image/png');
            // 处理遮罩：绘制区域改为白色，未绘制区域改为黑色
            const processedMaskData = await new Promise<string>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    try {
                        // 创建临时canvas进行处理
                        const tempCanvas = document.createElement('canvas');
                        const ctx = tempCanvas.getContext('2d');
                        if (!ctx) {
                            reject(new Error('无法获取canvas上下文'));
                            return;
                        }
                        // 设置canvas尺寸
                        tempCanvas.width = img.width;
                        tempCanvas.height = img.height;
                        // 绘制图像到canvas
                        ctx.drawImage(img, 0, 0);
                        // 获取图像数据
                        const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                        const data = imageData.data;
                        // 处理每个像素
                        for (let i = 0; i < data.length; i += 4) {
                            const alpha = data[i + 3];
                            // 检查是否为透明或接近透明的像素（未绘制区域）
                            if (alpha < 128) {
                                // 未绘制区域 -> 黑色
                                data[i] = 0;       // R
                                data[i + 1] = 0;   // G
                                data[i + 2] = 0;   // B
                                data[i + 3] = 255; // A (不透明)
                            } else {
                                // 绘制区域 -> 白色
                                data[i] = 255;     // R
                                data[i + 1] = 255; // G
                                data[i + 2] = 255; // B
                                data[i + 3] = 255; // A (不透明)
                            }
                        }
                        // 将处理后的数据绘制回canvas
                        ctx.putImageData(imageData, 0, 0);
                        // 转换为base64
                        const processedBase64 = tempCanvas.toDataURL('image/png');
                        resolve(processedBase64);
                    } catch (error) {
                        reject(error);
                    }
                };

                img.onerror = () => {
                    reject(new Error('图像加载失败'));
                };
                // 加载原始遮罩图像
                img.src = originalMaskData;
            });

            // 保存处理后的遮罩数据
            onSave?.(processedMaskData);
            onClose();

        } catch (error) {
            // 如果处理失败，使用原始数据
            const fallbackMaskData = maskCanvas.toDataURL('image/png');
            onSave?.(fallbackMaskData);
            onClose();
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth scroll="body" PaperProps={{ sx: { background: '#fff', boxShadow: 'none' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2, borderBottom: '1px solid #eee', gap: 2 }}>
                <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>Edit Mask</Typography>
                <Tooltip title="Brush"><IconButton onClick={() => setTool('brush')} color={tool === 'brush' ? 'primary' : 'default'}><Brush /></IconButton></Tooltip>
                <Tooltip title="Eraser"><IconButton onClick={() => setTool('eraser')} color={tool === 'eraser' ? 'primary' : 'default'}><Clear /></IconButton></Tooltip>
                <Typography variant="body2" sx={{ color: '#888', mx: 2 }}>Brush</Typography>
                <Slider value={brushSize} onChange={(_, v) => setBrushSize(v as number)} min={1} max={50} sx={{ width: 120 }} />
                <IconButton onClick={onClose}><Close /></IconButton>
            </Box>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', background: '#fff', p: 0 }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 400 }}>
                    <Box sx={{ position: 'relative', width: canvasSize.width, height: canvasSize.height, background: '#fff', boxShadow: 1, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading && (
                            <Box sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10
                            }}>
                                <CircularProgress size={60} />
                                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Image loading...</Typography>
                            </Box>
                        )}
                        {/* 底部图片 Canvas */}
                        <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 1, left: 0, top: 0 }} />
                        {/* 中间层 点 */}
                        <canvas
                            ref={pointCanvasRef}
                            style={{ position: 'absolute', zIndex: 2, left: 0, top: 0, opacity: type === 'smart' ? 1 : 0, pointerEvents: 'none' }}
                        />
                        {/* 顶部遮罩 Canvas */}
                        <canvas
                            ref={canvasMaskRef}
                            style={{ position: 'absolute', zIndex: 3, left: 0, top: 0, cursor: isLoading ? 'wait' : (tool === 'brush' ? 'crosshair' : 'cell') }}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleCanvasMouseLeave}
                            onMouseEnter={handleCanvasMouseEnter}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 6, py: 3, justifyContent: 'center', background: '#fff', borderTop: '1px solid #eee' }}>
                <Button onClick={handleClear} startIcon={<Clear />} sx={{ mx: 1 }}>Reset</Button>
                <Button onClick={handleUndo} startIcon={<Undo />} disabled={historyIndex <= 0} sx={{ mx: 1 }}>Undo</Button>
                <Button onClick={handleRedo} startIcon={<Redo />} disabled={historyIndex > history.length - 1} sx={{ mx: 1 }}>Redo</Button>
                <Button variant="contained" color="primary" onClick={handleSave} startIcon={<Save />} sx={{ mx: 2, minWidth: 100 }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageMaskDialog;