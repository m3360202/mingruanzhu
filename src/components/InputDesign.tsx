"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Monitor, Smartphone, Tablet } from "lucide-react";
import Image from "next/image";
import { getTagImage } from "@/constants/tagImages";
import { movieStyleService } from "@/services/movieStyleService";
import { useTaskStore } from "@/store/task";
import { generateEpisodeService } from "@/services/generateStory";
import { characterService } from "@/services/characterService";
import { useAuthStore } from "@/store/authStore";
import ActionButton from "@/components/ui/ActionButton";
import { storyBoardService } from "@/services/storyBoardService";
import { Backdrop, Box, Typography } from "@mui/material";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface TagOption {
  tag: string;
  options: string[];
}

interface InputDesignProps {
  onCreateStory?: () => void;
  initialValue?: string;
  onChange?: (value: string) => void;
}

const InputDesign: React.FC<InputDesignProps> = ({
  initialValue = "",
  onChange,
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialValue);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string | null>>({
    "Use Case": null,
    "Visual Style": null,
    "World Remix": null,
    "Vibes": null,
    "Video Aspect Ratio": null,
  });

  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9');

  useEffect(() => {
    const fetchMovieStyles = async () => {
      try {
        const response: any = await movieStyleService.getMovieStyles(0, 10);
        if (response && response.length > 0) {
          const newTagOptions: TagOption[] = [];
          response.forEach((style: any) => {
            newTagOptions.push(style.styles);
          });
          
          // Add Video Aspect Ratio as a tag option
          newTagOptions.push({
            tag: "Video Aspect Ratio",
            options: ["16:9", "9:16", "1:1"]
          });
          
          setTagOptions(newTagOptions);
        }

      } catch (err) {
        console.error('Error fetching movie styles:', err);
      } finally {
        // setLoading(false);
      }
    };

    fetchMovieStyles();
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setActiveDropdown(null);
        }, 50);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleTagClick = (tag: string) => {
    setTimeout(() => {
      setActiveDropdown(activeDropdown === tag ? null : tag);
    }, 0);
  };

  const handleOptionSelect = (tag: string, option: string) => {
    setSelectedValues({
      ...selectedValues,
      [tag]: option,
    });
    setActiveDropdown(null);
    
    // Handle aspect ratio selection
    if (tag === "Video Aspect Ratio") {
      handleAspectRatioSelect(option);
    }
  };

  const handleRemoveSelection = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues({
      ...selectedValues,
      [tag]: null,
    });
  };

  const handleTestSaveStory = async () => {
    const user = useAuthStore.getState().user;
    await storyBoardService.saveStory({
      id: '',
      user_id: user?.id,
      story: { ...useTaskStore.getState() }
    });
  }

  const formatComposition = (composition: any) => {
    if (composition) {
      const str = JSON.stringify(composition);
      return str.slice(1, -1);
    }
    return "";
  }

  const handleCreateStory = async () => {
    setLoading(true);
    setProgress(0);
    const user = useAuthStore.getState().user;
    if (!inputValue) {
      setLoading(false);
      return;
    }
      
    try {
      setCurrentTask('Initializing story creation...');
      useTaskStore.setState({
        id: '',
        movie_style: selectedValues["Visual Style"] || "Realistic",
        concept: inputValue,
      });
      setProgress(10);
      setCurrentTask('Generating episode...');
      const movieStyleStr = selectedValues["Visual Style"] || "Realistic";
      const response: any = await generateEpisodeService.generateEpisode(inputValue, movieStyleStr);
      console.log(response);

      // Store generated title as soon as we receive it
      if (response?.title || response?.show?.title) {
        useTaskStore.setState({
          title: response.title ?? response.show?.title,
        });
      }

      setProgress(30);
      setCurrentTask('Creating characters...');
      let characters: any[] = [];
      if (response?.characters) {
        characters = await Promise.all(
          response.characters.map(async (character: any) => {
            return await characterService.createCharacter({ 
              ...character, 
              creator_user_id: user?.id, 
              visual_style: movieStyleStr 
            });
          })
        );
        useTaskStore.setState({
          characters: characters
        });
      }

      setProgress(50);
      setCurrentTask('Finalizing...');

      // Store synopsis and background music for later storyboard generation
      // and ensure there are no pre-generated frames at this stage.
      useTaskStore.setState({
        story_line: response?.show?.synopsis,
        bgm: response?.show?.bgm,
        frames: [],
      });

      setProgress(100);
      setCurrentTask('Complete!');
      setTimeout(() => {
        setLoading(false);
        router.push('/storyBoard');
      }, 500);

    } catch (error) {
      console.error('Error creating story:', error);
      setLoading(false);
    }
  };

  const handleAspectRatioSelect = (ratio: string) => {
    setSelectedAspectRatio(ratio);
    useTaskStore.setState({
      ratio: ratio
    });
  };

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: 2
        }}
        open={loading}
      >
        <LoadingSpinner message={currentTask} size="large" />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="inherit">
            Progress: {progress}%
          </Typography>
        </Box>
      </Backdrop>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Main textarea */}
          <div className="relative bg-gray-50 rounded-xl p-6 border border-gray-200">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              className="w-full h-32 resize-none bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-lg"
              placeholder="Describe your story idea..."
            />
          </div>

          {/* Tags section */}
          <div ref={dropdownRef} className="relative">
            <div className="flex flex-wrap gap-3">
              {tagOptions.map((tagOption) => (
                <div key={tagOption.tag} className="relative">
                  <button
                    onClick={() => handleTagClick(tagOption.tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedValues[tagOption.tag]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedValues[tagOption.tag] || tagOption.tag}
                    {selectedValues[tagOption.tag] && (
                      <button
                        onClick={(e) => handleRemoveSelection(tagOption.tag, e)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === tagOption.tag && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                      {tagOption.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(tagOption.tag, option)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          {tagOption.tag === "Video Aspect Ratio" ? (
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                              {option === "16:9" && <Monitor size={16} />}
                              {option === "9:16" && <Smartphone size={16} />}
                              {option === "1:1" && <Tablet size={16} />}
                            </div>
                          ) : (
                            <Image
                              src={getTagImage(tagOption.tag, option)}
                              alt={option}
                              width={32}
                              height={32}
                              className="rounded object-cover"
                            />
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Create story button - centered below tags */}
          <div className="flex justify-center pt-4">
            <ActionButton onClick={handleCreateStory}>
              Create video
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputDesign;
