import { makeUseAxios } from 'axios-hooks';

import axios from '@/clients/AxiosClient';
import cache from '@/clients/LRUCache';

const useAxios = makeUseAxios({
  cache,
  axios
});

export default useAxios;
