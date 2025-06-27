import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { assetService } from "@/services/assetService";
import { koho } from "@/theme";

interface Asset {
  id: number;
  name: string;
  description: string | null;
  type: "bgm" | "voice" | "character" | "other";
  store_type: string;
  access_type: string;
  external_url: string | null;
  bucket: string | null;
  path: string | null;
  foreign_id: string | null;
}

interface AssetsSelectorProps {
  className?: string;
  onAssetSelect?: (asset: Asset) => void;
}

export const AssetsSelector: React.FC<AssetsSelectorProps> = ({
  className,
  onAssetSelect,
}) => {
  const [assets, setAssets] = useState<{
    bgm: Asset[];
    voice: Asset[];
    character: Asset[];
    other: Asset[];
  }>({
    bgm: [],
    voice: [],
    character: [],
    other: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"bgm" | "voice" | "character" | "other">("bgm");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchAssets();
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

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await assetService.getAssets();
      setAssets(response);
    } catch (err) {
      console.error("Error loading assets:", err);
      setError("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: "bgm" | "voice" | "character" | "other") => {
    setSelectedType(type);
    setSelectedAsset(null);
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    if (onAssetSelect) {
      onAssetSelect(asset);
    }
  };

  const handlePreview = (asset: Asset) => {
    if (currentPreview === asset.name && isPlaying) {
      // 停止当前播放
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentPreview(null);
    } else {
      // 开始播放新的资产
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(asset.external_url || '');
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentPreview(null);
      });

      audio.addEventListener("error", () => {
        setError(`Failed to load audio: ${asset.name}`);
        setIsPlaying(false);
        setCurrentPreview(null);
      });

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setCurrentPreview(asset.name);
          setError(null);
        })
        .catch((err) => {
          console.error("Playback error:", err);
          setError("Failed to play audio");
        });
    }
  };

  const getCurrentAssets = () => {
    return assets[selectedType] || [];
  };

  const assetTypeLabels = {
    bgm: "Background Music",
    voice: "Voice",
    character: "Character",
    other: "Other Assets"
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value as "bgm" | "voice" | "character" | "other")}
          className={koho.className}
          MenuProps={{
            PaperProps: {
              className: koho.className,
            },
          }}
          sx={{
            "& .MuiSelect-select": {
              py: 1,
              minHeight: "1.4375em",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          {Object.entries(assetTypeLabels).map(([type, label]) => (
            <MenuItem key={type} value={type}>
              <Typography sx={{ fontSize: "1.2rem" }}>{label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Select
          value={selectedAsset?.id || ""}
          onChange={(e) => {
            const asset = getCurrentAssets().find(
              (a) => a.id === e.target.value
            );
            if (asset) {
              handleAssetSelect(asset);
            }
          }}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return (
                <span style={{ fontSize: "1.2rem", color: "#9e9e9e" }}>
                  Select {assetTypeLabels[selectedType]}
                </span>
              );
            }
            const asset = getCurrentAssets().find((a) => a.id === value);
            return (
              <span style={{ fontSize: "1.4rem" }}>{asset?.name}</span>
            );
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
              minHeight: "1.4375em",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <MenuItem value="">
            <em style={{ fontSize: "1.2rem" }}>No Selection</em>
          </MenuItem>
          {getCurrentAssets().map((asset) => (
            <MenuItem key={asset.id} value={asset.id}>
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
                    {asset.name}
                  </Typography>
                  {asset.description && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {asset.description}
                    </Typography>
                  )}
                </Box>
                {selectedType === "bgm" && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(asset);
                    }}
                    sx={{
                      ml: 1,
                      bgcolor:
                        currentPreview === asset.name && isPlaying
                          ? "primary.main"
                          : "grey.100",
                      color:
                        currentPreview === asset.name && isPlaying
                          ? "white"
                          : "primary.main",
                      "&:hover": {
                        bgcolor:
                          currentPreview === asset.name && isPlaying
                            ? "primary.dark"
                            : "grey.200",
                      },
                      width: 28,
                      height: 28,
                    }}
                  >
                    {currentPreview === asset.name && isPlaying ? (
                      <Pause fontSize="small" />
                    ) : (
                      <PlayArrow fontSize="small" />
                    )}
                  </IconButton>
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}; 