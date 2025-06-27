import React from 'react';
import Link from 'next/link';
import { Globe, Wand2, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuBarProps {
  activePage?: 'explore' | 'create' | 'works';
}

const MenuBar: React.FC<MenuBarProps> = ({ activePage = 'create' }) => {
  return (
    <div className="flex items-center bg-gray-100/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] border-2 border-gray-400">
      <div className="flex items-center space-x-8">
        <Link href="/explore">
          <div 
            className={cn(
              "flex flex-col items-center justify-center transition-colors cursor-pointer",
              activePage === 'explore' 
                ? "text-[#0275D6]" 
                : "text-gray-700 hover:text-gray-900"
            )}
            title="Explore"
          >
            <Globe size={24} />
          </div>
        </Link>
        
        <Link href="/create">
          <div 
            className={cn(
              "flex flex-col items-center justify-center transition-colors cursor-pointer",
              activePage === 'create' 
                ? "text-[#0275D6]" 
                : "text-gray-700 hover:text-gray-900"
            )}
            title="Create"
          >
            <Wand2 size={24} />
          </div>
        </Link>
        
        <Link href="/works">
          <div 
            className={cn(
              "flex flex-col items-center justify-center transition-colors cursor-pointer",
              activePage === 'works' 
                ? "text-[#0275D6]" 
                : "text-gray-700 hover:text-gray-900"
            )}
            title="My Works"
          >
            <Folder size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;
