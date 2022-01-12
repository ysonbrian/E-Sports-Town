import create from 'zustand';
import { Axios } from './auth';
const url = 'http://localhost:1234';
export const useStore = create((set) => ({
  user: null,
  id: null,
  setUser: (user) => set({ user }),
  setId: (input) => set((state) => ({ id: input })),
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
