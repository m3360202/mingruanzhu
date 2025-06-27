import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const axiosInstance = axios.create({
  baseURL: publicRuntimeConfig.steyApiEndpoint || serverRuntimeConfig.steyApiEndpoint
});

export default axiosInstance;
