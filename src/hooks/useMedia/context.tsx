import React, { createContext } from 'react';

export interface IMediaContext {
  isMobile: boolean;
}

const MediaContext = createContext<IMediaContext>({ isMobile: false });

interface IMediaContextProvider extends IMediaContext {
  children: React.ReactNode;
}

export const MediaContextProvider: React.FC<IMediaContextProvider> = ({ children, isMobile }) => (
  <MediaContext.Provider value={{ isMobile }}>{children}</MediaContext.Provider>
);

export default MediaContext;
