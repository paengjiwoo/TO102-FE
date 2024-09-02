import create from 'zustand';

type TUser = {
  id: string;
  nickname: string;
  email?: string;
  profile_image?: string;
}

interface IUserStore {
  user: TUser;
  setUser: (userData: TUser) => void;
  clearUser: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: {
    id: '',
    nickname: '',
    email: '',
    profile_image: ''
  },
  setUser: (userData:  TUser) => set({ user: { ...userData } }),
  clearUser: () => set({ user: { id: '', nickname: '', email: '', profile_image: '' } })
}));

export default useUserStore;