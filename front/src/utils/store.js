import create from 'zustand';

export const useStore = create((set) => ({
  user: null,
  id: null,
  setUser: (user) => set({ user }),
  setId: (input) => set( (state) => ({ id: input }) ),
}));