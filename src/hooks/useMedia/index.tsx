import { useContext } from 'react';

import context from './context';

const useMedia = () => {
  const { isMobile } = useContext(context);
  return { isMobile };
};

export default useMedia;
