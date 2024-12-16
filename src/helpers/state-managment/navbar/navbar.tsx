import { create } from "zustand";


interface Nav {
  name: string;
  path: string;
}

interface StoreState {
  navigation: Nav[];
  setNavigation: (newNavigation: Nav[]) => void;
}

const useStore = create<StoreState>((set) => ({
  navigation: [],  
  setNavigation: (newNavigation) => set({ navigation: newNavigation }),
 
}));

export default useStore;


