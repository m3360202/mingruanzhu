import { useContext } from 'react';

import context from './context';

const useUser = () => {
  const { user, setUser, openLoginDialog, setOpenLoginDialog } = useContext(context);
  return { user, setUser, openLoginDialog, setOpenLoginDialog };
};

export default useUser;
