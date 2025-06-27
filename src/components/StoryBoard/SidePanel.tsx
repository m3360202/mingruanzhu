import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import styled from 'styled-components';
import { Save, Edit2, X, ChevronLeft, ChevronRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { koho } from '@/theme';
import { useTaskStore } from '@/store/task';
import { useAuthStore } from '@/store/authStore';
import { characterService } from '@/services/characterService';
import { CharacterDialog } from '../CharacterDialog';
import { CharacterDetailDialog } from '../CharacterDetailDialog';
import { Button } from '@mui/material';
import { voiceLocaleService } from '@/services/voiceLocaleService';
import { AssetPreview } from './AssetPreview';
import { BGMSelector } from "./BGMSelector";
import { AssetsSelector } from './AssetsSelector';
import FormTextInput from '@/components/ui/FormTextInput';
import { Button as CustomButton } from '@/components/ui/button';
import { storyBoardService } from '@/services/storyBoardService';
// Radio selector component
const StyledRadioWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 100%;
    font-size: 14px;
  }

  .radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs .radio input {
    display: none;
  }

  .radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
  }

  .radio-inputs .radio input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }
`;

// Editable item styling
const EditableBox = styled.div`
  position: relative;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
  width: 100%;
  min-height: 120px;
  max-height: 400px;
  overflow-y: auto;

  &:hover {
    background: #f5f7fa;
  }

  .edit-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .edit-icon {
    opacity: 1;
  }

  .edit-controls {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    justify-content: flex-end;
  }

  .edit-controls button {
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

// Styled panel container for collapsible functionality
const PanelContainer = styled.div`
  position: relative;
  height: 100%;
  transition: transform 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  z-index: 20;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid #e3e6ea;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(25, 33, 61, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

interface StorylineItem {
  id: number;
  text: string;
}

interface Character {
  id: string;
  imageUrl: string;
}

interface Asset {
  id: string;
  imageUrl: string;
}

interface SidePanelProps {
  storyline?: string | StorylineItem[];
  characters?: Character[];
  assets?: Asset[];
  onStorylineUpdate?: (newStoryline: string) => void;
  className?: string;
  onCollapse?: (collapsed: boolean) => void;
  onAspectRatioChange?: (ratio: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ className, onCollapse, onAspectRatioChange }) => {
  const [activeSection, setActiveSection] = useState<"characters" | "assets">(
    "characters"
  );
  const [collapsed, setCollapsed] = useState(false);
  const [showCharacterDialog, setShowCharacterDialog] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [showCharacterDetail, setShowCharacterDetail] = useState(false);
  const [assets, setAssets] = useState([]);
  const [storyTitle, setStoryTitle] = useState("Untitled Story");
  const [isClient, setIsClient] = useState(false);
  const [originalStoryLine, setOriginalStoryLine] = useState<string>("");
  const [hasStorylineChanges, setHasStorylineChanges] = useState(false);

  const { characters } = useTaskStore();
  const { story_line: storyLine } = useTaskStore();
  const { user } = useAuthStore();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('16:9');

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    // Update title from store after hydration
    const title = useTaskStore.getState().title;
    if (title) {
      setStoryTitle(title);
    }
  }, []);

  // Subscribe to store changes for title
  useEffect(() => {
    if (!isClient) return;

    const unsubscribe = useTaskStore.subscribe((state) => {
      setStoryTitle(state.title || "Untitled Story");
    });

    return unsubscribe;
  }, [isClient]);

  // Initialize original storyline only once
  useEffect(() => {
    if (isClient && storyLine && originalStoryLine === "") {
      setOriginalStoryLine(storyLine);
    }
  }, [isClient, storyLine, originalStoryLine]);

  // Handle navigation away with unsaved changes (treat as discard)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasStorylineChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && hasStorylineChanges) {
        // User is navigating away or switching tabs with unsaved changes
        // Treat as discard - revert to original
        useTaskStore.setState({ story_line: originalStoryLine });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasStorylineChanges, originalStoryLine]);

  useEffect(() => {
    const fetchVoices = async () => {
      const user_id = user?.id as string;
      if (user_id) {
        try {
          const response: any = await voiceLocaleService.getVoiceLocales(
            user_id,
            0,
            10
          );
          if (response && response.length > 0) {
            console.log("--", response);
            setAssets(response);
          }
        } catch (err) {
          console.error("Error fetching assets:", err);
        } finally {
          // setLoading(false);
        }
      }
    };

    fetchVoices();
  }, [user]);

  const handleSave = async () => {
    try {
      // Save to database
      const user = useAuthStore.getState().user;
      await storyBoardService.saveStory({
        id: useTaskStore.getState().id,
        user_id: user?.id,
        story: { ...useTaskStore.getState() }
      });

      // Update local state only after successful DB save
      setOriginalStoryLine(storyLine);
      setHasStorylineChanges(false);
    } catch (error) {
      console.error("Error saving storyline to database:", error);
      // Don't update local state if DB save failed
    }
  };

  const handleCancel = () => {
    useTaskStore.setState({ story_line: originalStoryLine });
    setHasStorylineChanges(false);
  };

  const handleStorylineChange = (field: string, value: string) => {
    useTaskStore.setState({ story_line: value });
    setHasStorylineChanges(value !== originalStoryLine);
  };

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapse) {
      onCollapse(newCollapsed);
    }
  };

  const handleCharacterSuccess = async () => {
    const user_id = user?.id as string;
    if (user_id) {
      try {
        const response: any = await characterService.getCharacter(
          user_id,
          0,
          10
        );
        if (response && response.length > 0) {
          //@ts-ignore
          useTaskStore.setState({ ...characters, response });
        }
      } catch (err) {
        console.error("Error refreshing characters:", err);
      }
    }
  };

  const getImgUrl = (character: any) => {
    if (character && character.avatar_urls) {
      return character?.avatar_urls?.url;
    } else {
      return "/placeholder-image.svg";
    }
  };

  const handleCharacterClick = (character: any) => {
    setSelectedCharacter(character);
    setShowCharacterDetail(true);
  };

  const handleAspectRatioSelect = (ratio: string) => {
    setSelectedAspectRatio(ratio);
    useTaskStore.setState({ ratio: ratio });
  };

  return (
    <PanelContainer
      style={{ transform: collapsed ? "translateX(-100%)" : "translateX(0)" }}
    >
      {/* Collapse/Expand button */}
      {collapsed ? (
        <ToggleButton
          onClick={toggleCollapse}
          style={{ right: "-12px" }}
          aria-label="Expand panel"
        >
          <ChevronRight size={16} color="#2388FF" />
        </ToggleButton>
      ) : (
        <ToggleButton
          onClick={toggleCollapse}
          style={{ right: "-12px" }}
          aria-label="Collapse panel"
        >
          <ChevronLeft size={16} color="#2388FF" />
        </ToggleButton>
      )}

      <div
        className={cn(
          "w-[280px] md:w-[360px] flex flex-col gap-6 text-sm h-full",
          "bg-white shadow-md border-r border-[#E3E6EA] py-8 px-6",
          koho.className,
          className
        )}
      >
        {/* Story Title Section */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-shrink-0 mb-6">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 text-center">
              {storyTitle}
            </h2>
          </div>
        </div>

        {/* Storyline Section - Fixed height */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col flex-shrink-0">
          <div className="p-4 text-center border-b text-gray-800 text-sm font-medium">
            Storyline
          </div>
          <div className="p-4">
            <FormTextInput
              field="story_line"
              value={storyLine}
              label=""
              isLong={true}
              onChange={handleStorylineChange}
              className="mb-3"
            />
            {hasStorylineChanges && (
              <div className="flex gap-2 w-full">
                <CustomButton
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex-1 text-xs uppercase"
                >
                  DISCARD
                </CustomButton>
                <CustomButton
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="flex-1 text-xs uppercase"
                >
                  SAVE
                </CustomButton>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Characters/Assets Section */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col mb-6">
            <div className="p-4 text-center border-b text-gray-800 text-sm font-medium">
              Characters
            </div>

            {/* Content Area */}
            <div className="p-4">
              <div className="w-full flex flex-col gap-2">
                {characters.map((character: any) => (
                  <div
                    key={character?.id}
                    className="flex items-center gap-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
                    onClick={() => handleCharacterClick(character)}
                  >
                    <Image
                      src={getImgUrl(character)}
                      alt="Character"
                      width={64}
                      height={64}
                      className="object-cover rounded-md flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23cccccc' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.5 3.5C14.5 5.43 12.93 7 11 7C9.07 7 7.5 5.43 7.5 3.5C7.5 1.57 9.07 0 11 0C12.93 0 14.5 1.57 14.5 3.5Z'%3E%3C/path%3E%3Cpath d='M11 9C6.03 9 2 13.03 2 18H20C20 13.03 15.97 9 11 9Z'%3E%3C/path%3E%3C/svg%3E";
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-clamp-2">Name: {character.name}</span>
                      <span className="text-sm text-gray-500 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{character.oneliner}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="contained"
                  onClick={() => setShowCharacterDialog(true)}
                >
                  {"Create New Charachter"}
                </Button>
              </div>
            </div>
          </div>

          {/* BGM Section */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col mb-6">
            <div className="p-4 text-center border-b text-gray-800 text-sm font-medium">
              Background Music
            </div>
            <div className="p-4">
              <BGMSelector />
            </div>
          </div>

          {/* Assets Section */}
          <div className="bg-white rounded-xl shadow-sm flex flex-col mb-6">
            <div className="p-4 text-center border-b text-gray-800 text-sm font-medium">
              Assets
            </div>
            <div className="p-4">
              <AssetsSelector />
            </div>
          </div>
        </div>
      </div>

      <CharacterDialog
        voices={assets}
        open={showCharacterDialog}
        onClose={() => setShowCharacterDialog(false)}
        onSuccess={handleCharacterSuccess}
      />

      <CharacterDetailDialog
        open={showCharacterDetail}
        onClose={() => setShowCharacterDetail(false)}
        character={selectedCharacter}
      />
    </PanelContainer>
  );
};

export default SidePanel;