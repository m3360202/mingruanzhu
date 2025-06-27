import React, {
  createContext,
  useState,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react';

// 定义用户类型
export interface User {
  token: string | null;
  email: string | null;
  mobile: string | null;
  firstName: string | null;
  lastName: string | null;
}

// 定义 Context 的类型
interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  openLoginDialog: boolean;
  setOpenLoginDialog: Dispatch<SetStateAction<boolean>>;
}

// 创建 Context
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    console.warn('setUser method is not implemented');
  },
  openLoginDialog: false,
  setOpenLoginDialog: () => {
    console.warn('setOpenLoginDialog method is not implemented');
  }
});

// Provider 组件
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

  const setOpenLoginDialogHandler: UserContextType['setOpenLoginDialog'] = (open) => {
    setOpenLoginDialog(open);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        openLoginDialog,
        setOpenLoginDialog: setOpenLoginDialogHandler
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
