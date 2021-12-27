import axios from 'axios';
import { Api } from 'const/const';

export const createApi = () => {
  const api = axios.create({
    baseURL: Api.Url,
    timeout: Api.RequestTimeOut,
  });

  return api;
};
