import { useEffect } from "react";
import { useRouter } from "next/router";
import { eventBus, TOOL_EVENTS, STORYBOARD_EVENTS } from "@/utils/eventBus";
import { useTaskStore } from "@/store/task";
import { storyBoardService } from "@/services/storyBoardService";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/utils/toast";
import { characterService } from "@/services/characterService";
import { frameService } from "@/services/frameService";

const GlobalEventListener: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const toast = useToast();

  // 刷新角色数据的函数
  const refreshCharacterData = async (threadId: string) => {
    try {
      console.log("正在刷新角色数据...");
      const characters = await characterService.getCharactersByThread(threadId);

      // 更新store中的角色数据
      useTaskStore.setState((state) => ({
        ...state,
        characters: characters || [],
      }));

      console.log("角色数据已更新:", characters);
      toast.success("角色数据已更新！");
    } catch (error) {
      console.error("刷新角色数据失败:", error);
      toast.error("刷新角色数据失败");
    }
  };

  // 导航到故事板页面
  const navigateToStoryboard = async (threadId: string) => {
    const currentPath = router.pathname;
    console.log("当前页面路径:", currentPath);

    if (currentPath !== "/storyBoard") {
      // 如果不在故事板页面，导航到故事板页面
      console.log("正在跳转到故事板页面...");
      toast.success("正在跳转到故事板页面...");
      await router.push({
        pathname: "/storyBoard",
        query: { threadId },
      });
    }

    await refreshCharacterData(threadId);
  };

  const refreshStoryboardData = async (threadId: string) => {
    try {
      const currentPath = router.pathname;
      console.log("当前页面路径:", currentPath);
      if (currentPath !== "/storyBoard") {
        // 如果不在故事板页面，导航到故事板页面
        console.log("正在跳转到故事板页面...");
        toast.success("正在跳转到故事板页面...");
        await router.push({
          pathname: "/storyBoard",
          query: { threadId },
        });
      }
      console.log("正在刷新故事板数据...");
      const storyboard = await storyBoardService.getStoryboardByThread(
        threadId
      );

      // 更新 store 中的故事板数据
      if (storyboard && storyboard.shots) {
        useTaskStore.setState((state) => ({
          ...state,
          frames: storyboard.shots || state.frames,
        }));
        toast.success("故事板数据已更新！");
      }
    } catch (error) {
      console.error("刷新故事板数据失败:", error);
      toast.error("刷新故事板数据失败");
    }
  };

  const refreshFramesData = async (threadId: string) => {
    try {
      const currentPath = router.pathname;
      console.log("当前页面路径:", currentPath);
      if (currentPath !== "/storyBoard") {
        // 如果不在故事板页面，导航到故事板页面
        console.log("正在跳转到故事板页面...");
        toast.success("正在跳转到故事板页面...");
        await router.push({
          pathname: "/storyBoard",
          query: { threadId },
        });
      }
      console.log("正在刷新帧数据...");
      const frameUrls = await frameService.getFramesByThread(threadId);

      // 更新 store 中的帧数据
      if (frameUrls && Array.isArray(frameUrls)) {
        useTaskStore.setState((state) => {
          // 获取现有的帧数据
          const currentFrames = state.frames || [];

          // 更新每个帧的 image_url
          const updatedFrames = currentFrames.map((frame, index) => ({
            ...frame,
            image_url: frameUrls[index] || frame.image_url, // 如果新的 URL 不存在，保留旧的 URL
          }));

          return {
            ...state,
            frames: updatedFrames,
          };
        });
        toast.success("帧数据已更新！");
      }
    } catch (error) {
      console.error("刷新帧数据失败:", error);
      toast.error("刷新帧数据失败");
    }
  };

  useEffect(() => {
    // 监听创建角色工具事件
    const handleCreateCharacter = async (data: {
      tool: string;
      args: any;
      threadId?: string;
    }) => {
      console.log("全局监听: 检测到创建角色工具执行:", data);
      if (!data.threadId) {
        console.error("缺少 threadId");
        return;
      }
      await navigateToStoryboard(data.threadId);
    };

    // 监听创建故事板工具事件
    const handleCreateStoryboard = async (data: {
      tool: string;
      args: any;
      threadId?: string;
    }) => {
      console.log("全局监听: 检测到创建故事板工具执行:", data);
      if (!data.threadId) {
        console.error("缺少 threadId");
        return;
      }
      await refreshStoryboardData(data.threadId);
    };

    const handleCreateFrames = async (data: {
      tool: string;
      args: any;
      threadId?: string;
    }) => {
      console.log("全局监听: 检测到创建帧工具执行:", data);
      if (!data.threadId) {
        console.error("缺少 threadId");
        return;
      }
      await refreshFramesData(data.threadId);
    };

    // 注册事件监听器
    eventBus.on(TOOL_EVENTS.CREATE_CHARACTER, handleCreateCharacter);
    eventBus.on(TOOL_EVENTS.CREATE_STORYBOARD, handleCreateStoryboard);
    eventBus.on(TOOL_EVENTS.CREATE_FRAMES, handleCreateFrames);
    console.log("全局事件监听器已注册");

    // 清理函数
    return () => {
      eventBus.off(TOOL_EVENTS.CREATE_CHARACTER, handleCreateCharacter);
      eventBus.off(TOOL_EVENTS.CREATE_STORYBOARD, handleCreateStoryboard);
      eventBus.off(TOOL_EVENTS.CREATE_FRAMES, handleCreateFrames);
      console.log("全局事件监听器已清理");
    };
  }, [router, user]);

  // 这个组件不渲染任何内容
  return null;
};

export default GlobalEventListener;
