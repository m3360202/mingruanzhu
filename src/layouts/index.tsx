import React from 'react';

interface ILayout {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => (
  <>
    {children}
  </>
);

export default Layout;
