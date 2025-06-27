import React from 'react';
import { useStoryboardStore } from '@/store/storyboardStore';

const StoryboardList: React.FC = () => {
  const { frames, addFrame, updateFrame, removeFrame } = useStoryboardStore();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Storyboard Frames</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frames.map((frame) => (
          <div key={frame.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{frame.title}</h3>
            <p className="text-gray-600">{frame.description}</p>
            {frame.imageUrl && (
              <img 
                src={frame.imageUrl} 
                alt={frame.title} 
                className="w-full h-48 object-cover mt-2 rounded"
              />
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateFrame(frame.id, { title: 'Updated ' + frame.title })}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => removeFrame(frame.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryboardList; 