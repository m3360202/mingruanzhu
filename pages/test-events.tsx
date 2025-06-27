import React from "react";
import { eventBus, TOOL_EVENTS, STORYBOARD_EVENTS } from "@/utils/eventBus";
import { useToast } from "@/utils/toast";

const TestEventsPage: React.FC = () => {
  const toast = useToast();

  const handleCreateCharacterTest = () => {
    console.log("手动触发create_character事件");
    eventBus.emit(TOOL_EVENTS.CREATE_CHARACTER, {
      tool: "create_character",
      args: { test: true },
    });
  };

  const handleCreateStoryboardTest = () => {
    console.log("手动触发create_storyboard事件");
    eventBus.emit(TOOL_EVENTS.CREATE_STORYBOARD, {
      tool: "create_storyboard",
      args: { test: true },
    });
  };

  const handleDataUpdateTest = () => {
    console.log("手动触发数据更新事件");
    eventBus.emit(STORYBOARD_EVENTS.DATA_UPDATED, {
      stories: [{ id: "test", title: "测试故事" }],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">事件系统测试</h1>

        <div className="space-y-4">
          <button
            onClick={handleCreateCharacterTest}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            测试创建角色事件
          </button>

          <button
            onClick={handleCreateStoryboardTest}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            测试创建故事板事件
          </button>

          <button
            onClick={handleDataUpdateTest}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            测试数据更新事件
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            点击按钮后，检查浏览器控制台和页面跳转行为。
            <br />
            如果在故事板页面点击，应该刷新数据并显示toast通知；
            <br />
            如果在其他页面点击，应该跳转到故事板页面。
            <br />
            <strong>注意：不会强制刷新整个页面，Chatbot聊天记录会保留！</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestEventsPage;
