import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Alert,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useTaskStore } from "@/store/task";
import { koho } from "@/theme";

// BGM接口定义
interface BGM {
  name: string;
  url: string;
}

// 直接配置BGM列表
const BGM_LIST: BGM[] = [
  {
    name: "drum beats",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/drum_beats.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vZHJ1bV9iZWF0cy5tcDMiLCJpYXQiOjE3NDg2NzU1NjgsImV4cCI6MjA2NDAzNTU2OH0.DmZYbN5I_Jo9Q-wV8g5HwdLgbJjnu-LuU1yqhPutFbY",
  },
  {
    name: "electronic chill",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/electronic_chill.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vZWxlY3Ryb25pY19jaGlsbC5tcDMiLCJpYXQiOjE3NDg2NzU2MzgsImV4cCI6MjA2NDAzNTYzOH0.QknNDrvvRFNsuSN35aPG27JozPMc_PFYi7gNTI7vyA8",
  },
  {
    name: "energetic beats",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/energetic_beats.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vZW5lcmdldGljX2JlYXRzLm1wMyIsImlhdCI6MTc0ODY3NTY1NSwiZXhwIjoyMDY0MDM1NjU1fQ.wvWNrJUeX9DwI3W74lafN0ndH4rw7IokKPQjD8bDBlI",
  },
  {
    name: "majestic orchestra",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/majestic_orchestra.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vbWFqZXN0aWNfb3JjaGVzdHJhLm1wMyIsImlhdCI6MTc0ODY3NTY3MCwiZXhwIjoyMDY0MDM1NjcwfQ.vnjj45JLMk5ZgTbj1BKG7y-LSSSZfbqDMpOj1GzkHT0",
  },
  {
    name: "melancholy instrumental",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/melancholy_instrumental.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vbWVsYW5jaG9seV9pbnN0cnVtZW50YWwubXAzIiwiaWF0IjoxNzQ4Njc1Njg1LCJleHAiOjIwNjQwMzU2ODV9.OdNiVcrVuRrc3GkR-RxO9Kq6-ydnO76HWhIcz1Je6Zk",
  },
  {
    name: "serene piano",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/serene_piano.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vc2VyZW5lX3BpYW5vLm1wMyIsImlhdCI6MTc0ODY3NTcwOCwiZXhwIjoyMDY0MDM1NzA4fQ.9dAZgEtQS2-C_PoOrkQlK7U4bQ8VeE-HWn97L3737Z4",
  },
  {
    name: "upbeat chill",
    url: "https://binqzmwendzrdooxgmgf.supabase.co/storage/v1/object/sign/audio/bgm/upbeat_chill.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk4YWJiMjgzLTFlZTAtNDliNC04NGU4LWQyMGY5NWM2ODc1NSJ9.eyJ1cmwiOiJhdWRpby9iZ20vdXBiZWF0X2NoaWxsLm1wMyIsImlhdCI6MTc0ODY3NTcyMCwiZXhwIjoyMDY0MDM1NzIwfQ.7Nbp5C-BZuj9Ll2RhrQt2EdPYSINFp1I6AEZ_oAHq1k",
  },
];

interface BGMSelectorProps {
  className?: string;
}

export const BGMSelector: React.FC<BGMSelectorProps> = ({ className }) => {
  const [bgmList, setBgmList] = useState<BGM[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { bgm: bgm } = useTaskStore();

  useEffect(() => {
    fetchBGMList();
  }, []);

  useEffect(() => {
    // 清理音频资源
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const fetchBGMList = () => {
    try {
      setLoading(true);
      setBgmList(BGM_LIST);
    } catch (err) {
      console.error("Error loading BGM list:", err);
      setError("Failed to load BGM list");
    } finally {
      setLoading(false);
    }
  };

  const handleBGMChange = (bgmName: string) => {
    // 清除错误提示
    setError(null);

    if (bgmName === "") {
      // 选择"No Background Music"
      useTaskStore.setState({
        bgm: null,
      });
    } else {
      useTaskStore.setState({
        bgm: bgmName,
      });
    }
  };

  const handlePreview = (bgm: BGM) => {
    if (currentPreview === bgm.name && isPlaying) {
      // 停止当前播放
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentPreview(null);
    } else {
      // 开始播放新的BGM
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(bgm.url);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentPreview(null);
      });

      audio.addEventListener("error", () => {
        setError(`Failed to load audio: ${bgm.name}`);
        setIsPlaying(false);
        setCurrentPreview(null);
      });

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setCurrentPreview(bgm.name);
          setError(null);
        })
        .catch((err) => {
          console.error("Playback error:", err);
          setError("Failed to play audio");
        });
    }
  };

  return (
    <Box className={className}>
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 1.5,
            fontSize: "12px",
            "& .MuiAlert-message": { fontSize: "12px" },
          }}
        >
          {error}
        </Alert>
      )}

      <FormControl fullWidth>
        <Select
          value={bgm || ""}
          onChange={(e) => handleBGMChange(e.target.value)}
          disabled={loading}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return (
                <span style={{ fontSize: "1.2rem", color: "#9e9e9e" }}>
                  Select BGM
                </span>
              );
            }
            return <span style={{ fontSize: "1.4rem" }}>{value}</span>;
          }}
          className={koho.className}
          MenuProps={{
            PaperProps: {
              className: koho.className,
            },
          }}
          sx={{
            "& .MuiSelect-select": {
              py: 1,
              minHeight: "1.4375em", // 确保高度一致
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <MenuItem value="">
            <em style={{ fontSize: "1.2rem" }}>No Background Music</em>
          </MenuItem>
          {bgmList.map((bgm) => (
            <MenuItem key={bgm.name} value={bgm.name}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: "1.2rem" }}
                  >
                    {bgm.name}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // 防止触发MenuItem的选择
                    handlePreview(bgm);
                  }}
                  sx={{
                    ml: 1,
                    bgcolor:
                      currentPreview === bgm.name && isPlaying
                        ? "primary.main"
                        : "grey.100",
                    color:
                      currentPreview === bgm.name && isPlaying
                        ? "white"
                        : "primary.main",
                    "&:hover": {
                      bgcolor:
                        currentPreview === bgm.name && isPlaying
                          ? "primary.dark"
                          : "grey.200",
                    },
                    width: 28,
                    height: 28,
                  }}
                >
                  {currentPreview === bgm.name && isPlaying ? (
                    <Pause fontSize="small" />
                  ) : (
                    <PlayArrow fontSize="small" />
                  )}
                </IconButton>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
