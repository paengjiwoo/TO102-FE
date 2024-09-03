import create from 'zustand';

interface IUserStore {
  user: any;
  setUser: (userData: any) => void;
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
  setUser: (userData: any) => set({ user: { ...userData } }),
  clearUser: () => set({ user: { id: '', nickname: '', email: '', profile_image: '', location: '' } })
}));

export default useUserStore;