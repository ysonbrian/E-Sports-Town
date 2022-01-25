import { Axios } from './auth';

const API_URL = 'http://localhost:1234';

export const submitNFT = (metadata) => {
  const data = Axios.post(`${API_URL}/mint`, {
    metadata,
  });
  console.log(data);
  // return data;
};

export const getGalleryList = async () => {
  const { data } = await Axios.get(`${API_URL}/gallery`);
  return data;
};
export const getClickedItemBidList = async () => {
  const { data } = await Axios.get(`${API_URL}/auction`);
  console.log('getClickedItemBidList', data);
  return data;
};

export const submitBid = async (metadata) => {
  console.log(metadata);
  const { data } = await Axios.post(
    `${API_URL}/auction/${metadata.tokenId}/bidding`,
    {
      metadata,
    }
  );
  console.log('data??', data);
  return data;
};

export const submitMultiBid = async (metadata) => {
  console.log("metadata", metadata);
  const { data } = await Axios.post(
    `${API_URL}/auction/${metadata.tokenId}/MultiBidding`,
    {
      metadata,
    }
  );
  console.log('data??', data);
  return data;
};

export const submitSell = async (metadata) => {
  console.log(metadata);
  const { data } = await Axios.post(
    `${API_URL}/auction/${metadata.tokenId}/sell`,
    { metadata }
  );
};

export const submitUpdate = async (metadata) => {
  console.log(metadata);
  const { data } = await Axios.post(
    `${API_URL}/auction/${metadata.tokenId}/Update`,
    { metadata }
  );
};