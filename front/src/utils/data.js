import { Axios } from './auth';

const API_URL = 'http://localhost:1234';

export const submitNFT = (metadata) => {
  const data = Axios.post(`${API_URL}/mint`, {
    metadata,
  });
};

export const getGalleryList = async () => {
  const { data } = await Axios.get(`${API_URL}/gallery`);
  return data;
};
