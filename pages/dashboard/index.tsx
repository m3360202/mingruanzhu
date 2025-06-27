"use client";

import React, { useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import NavBar from "@/components/NavBar";
import SidePanel from "@/components/StoryBoard/SidePanel";
import StoryboardGrid, {
  StoryboardFrame,
} from "@/components/StoryBoard/StoryboardGrid";
import { useTaskStore } from "@/store/task";
import { useEffect } from "react";
import { useToast } from "@/utils/toast";

const StoryBoardPage: NextPage = () => {
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
  const { frames: sampleFrames, ratio, title } = useTaskStore();
  const [frames, setFrames] = useState(sampleFrames);
  const toast = useToast();

  // 订阅 store 的变化
  useEffect(() => {
    const unsubscribe = useTaskStore.subscribe((state) => {
      setFrames(state.frames);
    });
    return () => unsubscribe();
  }, []);

  const handleFramesChange = (updatedFrames: StoryboardFrame[]) => {
    console.log("Frames updated:", updatedFrames);
    useTaskStore.setState({ frames: updatedFrames });
  };

  const handleUpdateShot = (frame: StoryboardFrame) => {
    console.log("Shot update requested:", frame);
    // Here you would call your backend API to regenerate the image
  };

  const handleSidePanelCollapse = (collapsed: boolean) => {
    setSidePanelCollapsed(collapsed);
  };

  return (
    <>
      <Head>
        <title>Story Board - {title || "Untitled Story"}</title>
        <meta name="description" content="Create and visualize your story" />
      </Head>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-1 overflow-hidden pt-[100px]">
          <SidePanel
            className={sidePanelCollapsed ? "collapsed" : ""}
            onCollapse={handleSidePanelCollapse}
          />
          <div className="flex-1 overflow-auto">
            <StoryboardGrid
              initialFrames={frames}
              onChange={handleFramesChange}
              onUpdateShot={handleUpdateShot}
              aspectRatio={ratio}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryBoardPage;
