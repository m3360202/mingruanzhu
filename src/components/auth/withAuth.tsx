import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
// import { checkAuthAndRedirect } from '@/utils/auth';

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return function WithAuthComponent(props: any) {
    const router = useRouter();
    const { user } = useAuthStore();

    // useEffect(() => {
    //   const isAuthenticated = checkAuthAndRedirect(router, user);
    //   if (!isAuthenticated) {
    //     return;
    //   }
    // }, [router, user]);

    return <WrappedComponent {...props} />;
  };
}; 