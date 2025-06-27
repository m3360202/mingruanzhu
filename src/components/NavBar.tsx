import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, LogOut } from 'lucide-react';
import MenuBar from './MenuBar';
import { useRouter } from 'next/router';
import UserProfileDialog from './UserProfileDialog';
import { supabase } from '@/lib/supabase';
import { getCookie, removeCookie } from '@/utils/cookies';
import { useAuthStore } from '@/store/authStore';

interface NavBarProps {
  activePage?: 'explore' | 'create' | 'works';
}

const NavBar: React.FC<NavBarProps> = ({
  activePage = 'create'
}) => {
  const router = useRouter();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('---handleAccountClick---',event.currentTarget);
    setOpenProfileDialog(true);
  };

  const handleClose = () => {
    setOpenProfileDialog(false);
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        alert(error.message)
      } else {
        removeCookie('user');
        removeCookie('token');
        useAuthStore.setState({ token: null, user: null });
        router.push('/signIn');
      }

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  useEffect(() => {
    const user = getCookie('user');
    if (!user) {
      router.push('/signIn');
    }
  }, []);
  
  return (
    <header className="fixed top-0 left-5 right-5 z-50 mt-5 bg-transparent">
      <div className="container flex h-25 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/explore" className="flex items-center mr-6">
            <Image
              src="/images/logo/logo-metal.png"
              alt="OpenStory"
              width={240}
              height={40}
              className="object-contain h-20"
            />
          </Link>
        </div>

        <div className="floating-menu-bar">
          <MenuBar activePage={activePage} />
        </div>

        <div className="flex items-center h-full gap-2">
          <button
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors rounded-full"
            onClick={handleAccountClick}
          >
            <User size={22} />
          </button>
          <button
            className="p-2 text-gray-700 hover:text-gray-900 transition-colors rounded-full"
            onClick={handleLogout}
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>

      <UserProfileDialog
        open={openProfileDialog}
        onClose={handleClose}
        anchorEl={anchorEl}
      />
    </header>
  );
};

export default NavBar;
