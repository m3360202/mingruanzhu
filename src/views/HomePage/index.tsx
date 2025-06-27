"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import InputDesign from "@/components/InputDesign";

export default function HomePage() {
  const router = useRouter();
  const [storyConcept, setStoryConcept] = useState<string>("");

  const handleCreateStory = () => {
    router.push("/storyBoard");
  };

  return (
    <Box
      id="container"
      className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col justify-center items-center"
    >
      <Box className="flex flex-col items-center justify-center gap-8 w-full px-8">
        <Typography className="text-blue-400 text-5xl font-bold">
          Create Your Story
        </Typography>
        
        {/* Input Design Component */}
        <InputDesign
          initialValue={storyConcept}
          onChange={setStoryConcept}
          onCreateStory={handleCreateStory}
        />
      </Box>
    </Box>
  );
}
