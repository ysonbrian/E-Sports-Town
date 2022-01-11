import create from 'zustand';
import { Axios } from './auth';

export const useStore = create((set) => ({
  user: null,
  id: null,
  setUser: (user) => set({ user }),
  setId: (input) => set((state) => ({ id: input })),
}));

export const useGallery = create((set) => ({
  gallery: [],
  fetchData: async (url) => {
    const res = await fetch(url);
    set({ gallery: await res.json() });
  },
}));

export const useMypage = create((set) => ({
  mypage: [],
  fetchMyPage: async (url, user) => {
    const res = await fetch(url, {
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
