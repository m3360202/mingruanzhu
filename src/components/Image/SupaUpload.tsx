import { useRef, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import { supabase } from '@/lib/supabase';

// 上传方法，可单独调用
export async function uploadToSupabase(file: File, bucket = 'public') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
}

// 上传组件
export default function SupaUpload({
    bucket = 'public',
    onUploaded,
    style = {},
    accept = 'image/*',
    children
}: {
    bucket?: string;
    onUploaded?: (url: string) => void;
    style?: React.CSSProperties;
    accept?: string;
    children?: React.ReactNode;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleUploadClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const url = await uploadToSupabase(file, bucket);
            onUploaded && onUploaded(url);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Upload failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', ...style }}>
            <button
                type="button"
                onClick={handleUploadClick}
                style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: 'none',
                    borderRadius: 6,
                    padding: 6,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={20} /> : (children || <UploadIcon fontSize="small" />)}
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
} 