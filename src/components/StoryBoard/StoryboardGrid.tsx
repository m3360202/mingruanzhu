"use client";
import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { v4 as uuid } from "uuid";
import { koho } from "@/theme";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/store/task";
import { useVideoProjectStore } from "@/store/videoProject";
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Box,
  Backdrop,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { frameService } from "@/services/frameService";
import { generateStoryService } from "@/services/generateStory";
import { LoadingButton } from "@mui/lab";
import { storyBoardService } from "@/services/storyBoardService";
import { useAuthStore } from "@/store/authStore";

import { useRouter } from 'next/router';
import type { VideoKeyFrame } from "@/types/editor";
import ImageDisplay from "../Image/ImageDisplay";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import FormTextInput from "@/components/ui/FormTextInput";

/* ---------- types ---------- */
export interface StoryboardFrame {
  id: string;
  shot_name: string;
  image_url?: string;
  shot_type?:
  | "setting_only"
  | "setting_with_actors_no_dialogue"
  | "setting_with_actors_dialogue"
  | "text_only"
  | "images_frame";
  shot_setting?: string;
  shot_framing?: "medium" | "close-up" | "wide angle";
  shot_angle?:
  | "eye-level"
  | "low angle"
  | "high angle"
  | "over the shoulder"
  | "dutch angle";
  shot_movement?:
  | "dolly in"
  | "pan"
  | "tracking shot"
  | "static"
  | "slow push in"
  | "slow push out";
  character_composition?: string;
  character_dialogue?: string;
  duration_ms?: number;
  audio_url?: string;
  meta_data?: string | Record<string, any>;
  type?: "image" | "video" | "close-up";
  description?: string;
  status?: "pending" | "done" | "editing";
  characters?: any[];
  result_type: string;
  timestamp?: number;
  duration?: number;
  result?: string;
}

interface StoryboardGridProps {
  initialFrames?: StoryboardFrame[];
  onChange?: (frames: StoryboardFrame[]) => void;
  onUpdateShot?: (frame: StoryboardFrame) => void;
  className?: string;
  aspectRatio?: string;
}

/* ---------- presentational sub-component ---------- */
function FrameCard({
  frame,
  onUpdate,
  handleDeleteFrame,
  aspectRatio = '16:9',
}: {
  frame: StoryboardFrame;
  onUpdate: (id: string, field: string, value: any) => void;
  onUpdateShot: (frame: StoryboardFrame) => void;
  handleDeleteFrame: (id: string) => void;
  aspectRatio?: string;
}) {
  const { characters } = useTaskStore();
  const [selectedCharacters, setSelectedCharacters] = useState<any[]>(
    frame.characters || []
  );
  const [loading, setLoading] = useState(false);

  const handleTextChange = (field: string, value: string) => {
    onUpdate(frame.id, field, value);
  };

  const handleSelectChange = (
    field: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onUpdate(frame.id, field, e.target.value);
  };

  const handleCharacterChange = (event: any) => {
    const selectedIds = event.target.value;
    const selectedChars = characters.filter((char) =>
      selectedIds.includes(char.id)
    );
    setSelectedCharacters(selectedChars);
    onUpdate(frame.id, "characters", selectedChars);
  };

  const renderSelect = (
    field: string,
    value: string | undefined,
    options: string[],
    label: string
  ) => (
    <div className="mb-4">
      <label className="block text-[12px] font-medium text-[#666F8D] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => handleSelectChange(field, e)}
          className={`w-full px-3 py-2.5 border border-[#E3E6EA] rounded-xl text-[14px] text-[#666F8D] appearance-none pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all !rounded-xl leading-relaxed min-h-[44px] ${koho.className}`}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666F8D]"
        />
      </div>
    </div>
  );

  const handleCreateFrame = async (frame: any) => {
    try {
      setLoading(true);
      // 处理 character_composition 和 character_dialogue
      const processedFrame = {
        ...frame,
        movie_style: useTaskStore.getState().movie_style,
        character_composition:
          typeof frame.character_composition === "object"
            ? JSON.stringify(frame.character_composition)
            : frame.character_composition,
        character_dialogue: frame.character_dialogue || "",
        characters: useTaskStore.getState().characters,
        meta_data: typeof frame.meta_data === 'object' && frame.meta_data !== null ? frame.meta_data : {},
      };
      const ratio = useTaskStore.getState().ratio;
      const result = await frameService.createFrame(ratio, processedFrame);
      const { frames } = useTaskStore.getState();
      if (result && result.video_url) {
        const next = frames?.map((f) =>
          f.id === frame.id
            ? { ...f, image_url: result.video_url, result_type: result.type }
            : f
        );
        useTaskStore.setState({ frames: next });
      }
    } catch (error) {
      console.error("Error creating frame:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '9:16':
        return 'aspect-[9/16]';
      case '1:1':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const [frameImage, setFrameImage] = useState(frame.image_url);
  const handleReplaceImage = (newImage: string | null) => {
    if (newImage) {
      setFrameImage(newImage);
      frameService.updateFrame({ "image_url": newImage, "id": frame.id });

      const { frames } = useTaskStore.getState();
      const next = frames?.map((f) =>
        f.id === frame.id
          ? { ...f, image_url: newImage }
          : f
      );
      useTaskStore.setState({ frames: next });
    }
  };

  return (
    <div className="w-[361px] shrink-0 bg-white rounded-xl overflow-hidden border border-[#E3E6EA] shadow-[0px_4px_16px_rgba(25,33,61,0.04)] flex flex-col gap-4 p-7 h-full hover:shadow-[0px_8px_24px_rgba(25,33,61,0.06)] transition-shadow duration-300 !rounded-xl relative">
      {/* Delete Button */}
      <IconButton
        size="small"
        onClick={() => handleDeleteFrame(frame.id)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "error.main",
          "&:hover": {
            backgroundColor: "error.light",
            color: "error.contrastText",
          },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      {/* Shot Name */}
      <FormTextInput
        field="shot_name"
        value={frame.shot_name}
        label="Shot Name"
        onChange={handleTextChange}
      />

      {/* Image area */}
      <div
        className={`relative w-full ${getAspectRatioClass()} rounded-xl mb-5 overflow-hidden shadow-sm`}
        style={{ minHeight: 0 }}
      >
        <ImageDisplay src={frameImage} alt={frame.shot_name} prompt={frame.shot_setting} onReplace={handleReplaceImage} frameId={frame.id} fill={true} />
      </div>

      {/* Shot settings */}
      {renderSelect(
        "shot_type",
        frame.shot_type,
        [
          "setting_only",
          "text_only",
          "images_frame",
          "setting_with_actors_no_dialogue",
          "setting_with_actors_dialogue",
        ],
        "Shot Type"
      )}

      {frame.shot_type === "images_frame" && (
        <FormTextInput
          field="duration_ms"
          value={frame.duration_ms?.toString() || "1000"}
          label="Duration (ms)"
          onChange={handleTextChange}
        />
      )}

      <FormTextInput
        field="shot_setting"
        value={frame.shot_setting}
        label="Shot Setting"
        isLong={true}
        onChange={handleTextChange}
      />

      {renderSelect(
        "shot_framing",
        frame.shot_framing,
        ["medium", "close-up", "wide angle"],
        "Shot Framing"
      )}

      {renderSelect(
        "shot_angle",
        frame.shot_angle,
        [
          "eye-level",
          "low angle",
          "high angle",
          "over the shoulder",
          "dutch angle",
        ],
        "Shot Angle"
      )}

      {renderSelect(
        "shot_movement",
        frame.shot_movement,
        [
          "dolly in",
          "pan",
          "tracking shot",
          "static",
          "slow push in",
          "slow push out",
        ],
        "Shot Movement"
      )}

      <FormTextInput
        field="character_composition"
        value={frame.character_composition}
        label="Character Composition"
        isLong={true}
        onChange={handleTextChange}
      />

      <FormTextInput
        field="character_dialogue"
        value={frame.character_dialogue}
        label="Character Dialogue"
        isLong={true}
        onChange={handleTextChange}
      />

      {/* Character Selection */}
      <div className="mb-4 hidden">
        <label className="block text-[12px] font-medium text-[#666F8D] mb-1.5">
          Characters
        </label>
        <FormControl fullWidth>
          <Select
            multiple
            value={selectedCharacters.map((char) => char.id)}
            onChange={handleCharacterChange}
            sx={{
              "& .MuiSelect-select": {
                py: 1,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E3E6EA",
                borderRadius: "12px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E3E6EA",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3B82F6",
                borderWidth: "2px",
              },
            }}
          >
            {characters.map((char: any) => (
              <MenuItem key={char.id} value={char.id}>
                {char.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FormTextInput
        field="audio_url"
        value={frame.audio_url}
        label="Audio URL (optional)"
        placeholder="Enter your custom voice-over URL"
        onChange={handleTextChange}
      />

      <FormTextInput
        field="meta_data"
        value={typeof frame.meta_data === 'string' ? frame.meta_data : JSON.stringify(frame.meta_data ?? {})}
        label="Meta Data (optional)"
        isLong={true}
        onChange={handleTextChange}
      />

      {/* Update Shot Button */}
      <LoadingButton
        loading={loading}
        onClick={() => handleCreateFrame(frame)}
        className="mt-2 w-full p-3.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-[14px] font-medium transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md !rounded-xl"
      >
        Update Shot
      </LoadingButton>
    </div>
  );
}

const StoryboardGrid = ({
  initialFrames = [],
  onChange,
  onUpdateShot = (frame) => console.log("Update shot", frame),
  className,
  aspectRatio = '16:9',
}: StoryboardGridProps) => {
  const { frames, result } = useTaskStore();
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generationProgress, setGenerationProgress] = useState("");

  const router = useRouter();
  const [currentTask, setCurrentTask] = useState('');
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generateTask, setGenerateTask] = useState('');

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const insertFrame = (index: number) => {
    const newFrame: StoryboardFrame = {
      id: uuid(),
      shot_name: `Shot ${frames.length + 1}`,
      shot_type: "setting_with_actors_dialogue",
      shot_setting: "",
      shot_framing: "medium",
      shot_angle: "eye-level",
      shot_movement: "static",
      character_composition: "",
      character_dialogue: "",
      result_type: "image",
    };

    const newFrames = [...frames];
    newFrames.splice(index + 1, 0, newFrame);
    useTaskStore.setState({ frames: newFrames });
    if (onChange) onChange(newFrames);
  };

  const updateFrameField = (id: string, field: string, value: any) => {
    const updatedFrames = frames.map((frame) =>
      frame.id === id ? { ...frame, [field]: value } : frame
    );
    useTaskStore.setState({ frames: updatedFrames });
    if (onChange) onChange(updatedFrames);
  };

  const handleUpdateShot = (frame: StoryboardFrame) => {
    onUpdateShot(frame);
  };

  const handleDeleteFrame = (id: string) => {
    const updatedFrames = frames.filter((frame) => frame.id !== id);
    useTaskStore.setState({ frames: updatedFrames });
    if (onChange) onChange(updatedFrames);
  };

  const generateStoryboard = async () => {
    try {
      setSubmitting(true);
      setProgress(0);
      setCurrentTask('Initializing story creation...');

      const story = useTaskStore.getState();
      const user = useAuthStore.getState().user;
      const processedFrame = story.frames.map((frame) => ({
        ...frame,
        character_composition:
          typeof frame.character_composition === "object"
            ? JSON.stringify(frame.character_composition)
            : frame.character_composition,
        character_dialogue: frame.character_dialogue || "",
      }));

      setProgress(30);
      setCurrentTask('Processing frames...');

      const visual_style = story.movie_style;

      const storyData = {
        ...story,
        movie_style: visual_style,
        frames: processedFrame,
        user_id: user?.id,
        bgm: story.bgm || null,
      };

      setProgress(60);
      setCurrentTask('Generating story...');

      const ratio = useTaskStore.getState().ratio;
      const result = await storyBoardService.createStory(ratio, storyData);

      setProgress(90);
      setCurrentTask('Finalizing...');

      if (result && result.video_url) {
        useTaskStore.setState({ result: result.video_url });
        setProgress(100);
        setCurrentTask('Complete!');
        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating frame:", error);
      setSubmitting(false);
    }
  };

  const handleSaveStory = async () => {
    try {
      setSaveLoading(true);
      const user = useAuthStore.getState().user;
      if(!useTaskStore.getState().id){
        await storyBoardService.saveStory({
          id: useTaskStore.getState().id,
          user_id: user?.id,
          story: { ...useTaskStore.getState() }
        });
      }else{
        await storyBoardService.updateStory({
          id: useTaskStore.getState().id,
          user_id: user?.id,
          story: { ...useTaskStore.getState() }
        })
      }
      
    } catch (error) {
      console.error("Error saving story:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const formatComposition = (composition: any) => {
    if (composition) {
      const str = JSON.stringify(composition);
      return str.slice(1, -1);
    }
    return "";
  };

  /**
   * Generate storyboard frames from synopsis & characters.
   */
  const createStoryboard = async () => {
    try {
      setGenerating(true);
      setGenerateProgress(0);
      setGenerateTask("Generating story...");

      const { characters, story_line, movie_style, ratio } = useTaskStore.getState();

      // Ensure prerequisites are met
      if (!characters || characters.length === 0 || !story_line) {
        console.error("Missing characters or synopsis for storyboard generation");
        console.log("Characters:", characters);
        console.log("Story line:", story_line);
        setGenerating(false);
        return;
      }

      console.log("Creating storyboard with:", { characters, story_line, movie_style, ratio });

      const story: any = await generateStoryService.generateStory(
        characters,
        story_line,
        movie_style
      );

      console.log("Generated story:", story);

      if (!story || !story.shots || !Array.isArray(story.shots)) {
        console.error("Invalid story structure received:", story);
        setGenerating(false);
        return;
      }

      setGenerateProgress(40);
      setGenerateTask("Creating frames...");

      const frames = await Promise.all(
        story.shots.map(async (frame: any, index: number) => {
          // Handle character_dialogue properly
          let character_dialogue = "";
          if (frame.character_dialogue) {
            if (typeof frame.character_dialogue === 'string') {
              character_dialogue = frame.character_dialogue;
            } else if (frame.character_dialogue.line) {
              character_dialogue = frame.character_dialogue.line;
            }
          }

          // Prepare frame data with proper structure
          const frameData = {
            id: uuid(),
            shot_name: frame.shot_name || `Shot ${index + 1}`,
            shot_type: frame.shot_type || "setting_with_actors_dialogue",
            shot_setting: frame.shot_setting || "",
            shot_framing: frame.shot_framing || "medium",
            shot_angle: frame.shot_angle || "eye-level", 
            shot_movement: frame.shot_movement || "static",
            character_composition: frame.character_composition 
              ? (typeof frame.character_composition === 'string' 
                 ? frame.character_composition 
                 : JSON.stringify(frame.character_composition))
              : "",
            character_dialogue,
            characters: characters || [],
            movie_style: movie_style || "Realistic",
            duration_ms: frame.duration_ms || 3000,
            audio_url: frame.audio_url || "",
            meta_data: typeof frame.meta_data === 'object' && frame.meta_data !== null ? frame.meta_data : {}
          };

          console.log(`Creating frame ${index + 1}:`, frameData);

          try {
            const result = await frameService.createFrame(ratio || "16:9", frameData);
            console.log(`Frame ${index + 1} result:`, result);

            return {
              ...frameData,
              image_url: result?.video_url || result?.image_url,
              result_type: result?.type ?? "image",
            };
          } catch (error) {
            console.error(`Error creating frame ${index + 1}:`, error);
            // Return the frame without image_url if creation fails
            return {
              ...frameData,
              image_url: "/placeholder-image.svg",
              result_type: "image",
            };
          }
        })
      );

      setGenerateProgress(90);
      setGenerateTask("Finalizing...");

      console.log("Final frames:", frames);
      useTaskStore.setState({ frames });

      setGenerateProgress(100);
      setGenerateTask("Complete!");
      setTimeout(() => {
        setGenerating(false);
      }, 500);
    } catch (error) {
      console.error("Error generating storyboard:", error);
      setGenerating(false);
    }
  };

  return (
    <div className={cn("flex flex-col text-sm", koho.className, className)}>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 9999,
          flexDirection: "column",
          gap: 2,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={submitting}
      >
        <LoadingSpinner message={currentTask} size="large" />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="inherit">
            Progress: {progress}%
          </Typography>
        </Box>
      </Backdrop>

      {/* Backdrop for storyboard generation */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: 9999,
          flexDirection: "column",
          gap: 2,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={generating}
      >
        <LoadingSpinner message={generateTask} size="large" />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="inherit">
            Progress: {generateProgress}%
          </Typography>
        </Box>
      </Backdrop>

      {frames.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800">Storyboard</h2>
          <div className="flex gap-2">
            <LoadingButton
              variant="contained"
              loading={submitting}
              onClick={() => {
                generateStoryboard();
              }}
            >
              Create Frames
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={isGeneratingVideo}
              onClick={async () => {
                try {
                  setIsGeneratingVideo(true);
                  setGenerationProgress("Preparing video frames...");
                  await handleSaveStory();
                  console.log(
                    "useTaskStore.getState().frames",
                    useTaskStore.getState().frames
                  );

                  const videoFrames = useTaskStore
                    .getState()
                    .frames.map((frame, index) => ({
                      id: frame.id,
                      trackId: frame.id,
                      timestamp: index * 5000,
                      duration: 5000,
                      data: {
                        mediaId: frame.id,
                        type: frame.result ? "video" as const : "image" as const,
                        url: frame.result || frame.image_url || "",
                        audio_url: frame.result ? frame.audio_url : undefined,
                        img_url: frame.result ? frame.image_url : undefined,
                        prompt: frame.shot_name || "",
                      },
                    }));

                  setGenerationProgress("Generating audio...");
                  const audioFrames = useTaskStore
                    .getState()
                    .frames.map((frame, index) => {
                      // 如果 frame 有 result，则不生成单独的音频 frame
                      if (frame.audio_url && !frame.result) {
                        return {
                          id: `audio_${index + 1}`,
                          trackId: `${frame.id}_audio`,
                          timestamp: index * 5000,
                          duration: 5000,
                          data: {
                            mediaId: frame.id + '_audio',
                            type: "music" as const,
                            url: frame.audio_url,
                            prompt: frame.shot_name || "",
                            parent_id: frame.id
                          },
                        };
                      }
                      return null;
                    })
                    .filter(
                      (frame): frame is NonNullable<typeof frame> =>
                        frame !== null
                    );

                  setGenerationProgress("Generating dialogue...");
                  const dialogueFramesPromises = useTaskStore
                    .getState()
                    .frames.map(async (frame, index) => {
                      if (
                        frame.character_dialogue &&
                        frame.character_dialogue.trim() &&
                        !frame.result
                      ) {
                        try {
                          const dialogue =
                            await frameService.get_frames_dialogue(
                              frame.character_dialogue.trim()
                            );
                          return {
                            id: frame.id + '_dialogue',
                            trackId: `${
                              useTaskStore.getState().id || uuid()
                            }_dialogue`,
                            timestamp: index * 5000,
                            duration: 5000,
                            data: {
                              mediaId: frame.id,
                              type: "voiceover" as const,
                              url: dialogue,
                              prompt: frame.shot_name || "",
                              parent_id: frame.id
                            },
                          };
                        } catch (error) {
                          console.error(
                            `Error generating dialogue for frame ${index}:`,
                            error
                          );
                          return null;
                        }
                      }
                      return null;
                    });

                  const dialogueFrames = (
                    await Promise.all(dialogueFramesPromises)
                  ).filter(
                    (frame): frame is NonNullable<typeof frame> =>
                      frame !== null
                  );

                  useVideoProjectStore.setState({
                    frames: {
                      [useTaskStore.getState().id || uuid()]: videoFrames,
                      ...(audioFrames.length > 0 && {
                        [`${useTaskStore.getState().id || uuid()}_audio`]:
                          audioFrames,
                      }),
                      ...(dialogueFrames.length > 0 && {
                        [`${useTaskStore.getState().id || uuid()}_dialogue`]:
                          dialogueFrames,
                      }),
                    } as Record<string, VideoKeyFrame[]>,
                  });

                  setGenerationProgress("Jumping to video combine...");
                  //跳转到videocombine
                  router.push("/videoCombine");
                } catch (error) {
                  console.error("Error generating video:", error);
                  setGenerationProgress("Generation Failed");
                } finally {
                  setTimeout(() => {
                    setIsGeneratingVideo(false);
                    setGenerationProgress("");
                  }, 2000);
                }
              }}
            >
              Preview Story Video
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={saveLoading}
              onClick={handleSaveStory}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      )}

      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {result && (
            <video
              src={result}
              controls
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Backdrop Loading Component */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
          gap: 2,
        }}
        open={isGeneratingVideo}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" component="div">
          {generationProgress}
        </Typography>
      </Backdrop>

      {/* SCROLLER with transparent background */}
      <div className="flex-1 overflow-x-auto pb-6">
        {frames.length === 0 ? (
          /* Show Create Storyboard button in center when no frames */
          <div className="flex items-center justify-center h-full">
            <LoadingButton
              variant="contained"
              loading={generating}
              onClick={createStoryboard}
              size="large"
              sx={{
                fontSize: "1.5rem",
                padding: "16px 42px",
                borderRadius: "12px",
              }}
            >
              Create Storyboard
            </LoadingButton>
          </div>
        ) : (
          /* Show frames when they exist */
          <div className="flex items-stretch gap-8 w-max px-6 py-6">
            {frames.map((frame, i) => (
              <div key={frame.id} className="flex items-center gap-6 group">
                <FrameCard
                  frame={frame}
                  onUpdate={updateFrameField}
                  onUpdateShot={handleUpdateShot}
                  handleDeleteFrame={handleDeleteFrame}
                  aspectRatio={aspectRatio}
                />
                {/* plus button between cards */}
                {/* <button
                  aria-label="Insert frame"
                  onClick={() => insertFrame(i)}
                  className="shrink-0 h-12 w-12 rounded-full bg-blue-500 text-white
                           flex items-center justify-center hover:bg-blue-600 self-center
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           shadow-md hover:shadow-lg transform hover:scale-110 active:scale-100"
                >
                  <Plus size={20} />
                </button> */}
              </div>
            ))}

            {/* Add frame at the end */}
            <button
              aria-label="Add frame at end"
              onClick={() => insertFrame(frames.length - 1)}
              className="self-center shrink-0 h-14 w-14 rounded-full bg-blue-500 text-white
                       flex items-center justify-center hover:bg-blue-600
                       shadow-lg hover:shadow-xl transition-all duration-200
                       transform hover:scale-110 active:scale-100"
            >
              <Plus size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryboardGrid;
