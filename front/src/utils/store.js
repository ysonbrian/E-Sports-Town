import create from 'zustand';
import { Axios } from './auth';
const url = 'http://localhost:1234';
export const useStore = create((set) => ({
  user: null,
  id: null,
  setUser: (user) => set({ user }),
  setId: (input) => set((state) => ({ id: input })),
}));

export const useWeb3 = create((set) => ({
  web3: null,
  setWeb3: (web3) => set({ web3 }),
}));

export const useSign = create((set) => ({
  sign: null,
  setSign: (sign) => set({ sign }),
}));

export const useMyToken = create((set) => ({
  myToken: null,
  fetchMyToken: async (user) => {
    const res = await fetch(`${url}/mypage/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    set({ myToken: await res.json() });
  },
}));

export const useGallery = create((set) => ({
  gallery: [],
  fetchData: async () => {
    const res = await fetch(`${url}/gallery`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    set({ gallery: await res.json() });
  },
}));

export const usePolling = create((set) => ({
  votes: [],
  fetchVotes: async (userAddress) => {
    const res = await fetch(`${url}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userAddress }),
    });
    set({ votes: await res.json() });
  },
}));

export const useVoteState = create((set) => ({
  voteState: [],
  fetchVoteState: async (metadata) => {
    const res = await fetch(`${url}/vote/${metadata.tokenId}/votestate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metadata }),
    });
    set({ voteState: await res.json() });
  },
}));

export const useMypage = create((set) => ({
  mypage: [],
  fetchMyPage: async (user) => {
    const res = await fetch(`${url}/mypage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    set({ mypage: await res.json() });
  },
}));

export const useClickedItem = create((set) => ({
  clickedItem: [],
  setClickedItem: (clickedItem) => set({ clickedItem }),
}));

export const useClickedItemBidList = create((set) => ({
  clickedItemList: [],
  fetchClickedItem: async () => {
    const { data } = await Axios.get(`${url}/auction/click`);
    set({ clickedItemList: await data });
  },
}));

export const useClickedItemGroupList = create((set) => ({
  clickedItemGroupList: [],
  fetchClickedItemGroup: async () => {
    const { data } = await Axios.get(`${url}/auction/multiclick`);
    // console.log('useClickedItemGroupList-store', data);
    set({ clickedItemGroupList: await data });
  },
}));

export const useBidState = create((set) => ({
  bidState: [],
  fetchBidState: async (metadata) => {
    const { data } = await Axios.post(`${url}/auction/:id/AlreadyBid`, {
      metadata,
    });
    // console.log('fetchBidState-data', data);
    set({ bidState: await data });
    //console.log('test-bidState-data', data);
    //console.log('test-bidState-data-length', data.length);
    //console.log('test-bidState-data-isArray', Array.isArray(data));
  },
}));

export const useModalOwnerData = create((set) => ({
  modalOwnerData: [],
  //setModalOwnerData: (modalOwnerData) => set({ modalOwnerData }),
  fetchOwnerData: async (metadata) => {
    // console.log('fetchOwnerData-metadata', metadata);
    const { data } = await Axios.post(`${url}/auction/:id/ownerlist`, {
      metadata,
    });
    // console.log('fetchOwnerData-serverReturn-data', data);
    set({ modalOwnerData: await data });
  },
}));

export const useModalSubmitData = create((set) => ({
  modalSubmitData: [],
  setModalSubmitData: (modalSubmitData) => set({ modalSubmitData }),
}));

export const useModalUpdateData = create((set) => ({
  modalUpdateData: [],
  setModalUpdateData: (modalUpdateData) => set({ modalUpdateData }),
}));

export const useModalDeleteData = create((set) => ({
  modalDeleteData: [],
  setModalDeleteData: (modalDeleteData) => set({ modalDeleteData }),
}));

export const useComments = create((set) => ({
  comments: [],
  fetchComments: async (metadata) => {
    // console.log('fetchComments', metadata);
    const data = await Axios.post(`${url}/comments/normal/fetch`, {
      metadata,
    });
    // console.log('comments data', data);
    set({ comments: await data });
  },
}));

export const useProfileImg = create((set) => ({
  profileImg: '',
  setProfileImg: (profileImg) => set({ profileImg }),
}));
