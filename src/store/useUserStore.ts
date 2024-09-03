import create from 'zustand';

type TUser = {
  id: string;
  nickname: string;
  email?: string;
  profile_image?: string;
  location: string;
}

interface IUserStore {
  user: TUser;
  setUser: (userData: TUser) => void;
  clearUser: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: {
    id: '10',
    nickname: '동현',
    email: 'jangdonghyun@example.com',
    profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86TTBL73hNgcKUa_zEJOO_i232oUYg5NKAA&s',
    location: '16'
  },
  setUser: (userData:  TUser) => set({ user: { ...userData } }),
  clearUser: () => set({ user: { id: '', nickname: '', email: '', profile_image: '', location: '' } })
}));

export default useUserStore;