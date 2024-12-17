import { create } from "zustand";


interface Nav {
  name: string;
  path: string;
}
interface StoreState {
  navigation: Nav[];
  setNavigation: (newNavigation: Nav[]) => void;
  updateModal: boolean;
  setUpdateModal: (status: boolean) => void;
  formData: {
    fullName: string;
    phoneNumber: string;
    password: string;
  };
  setFormData: (key: string, value: string) => void;
  resetFormData: () => void;
  imageId: string | number | null;
  setImageId: (id: string | number | null) => void;
}

const useStore = create<StoreState>((set) => ({
  navigation: [],  
  setNavigation: (newNavigation) => set({ navigation: newNavigation }),
  updateModal: false,
  setUpdateModal: (status) => set({ updateModal: status }),
  formData: {
    fullName: "",
    phoneNumber: "+998",
    password: "",
  },
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
  resetFormData: () =>
    set({
      formData: {
        fullName: "",
        phoneNumber: "+998",
        password: "",
      },
    }),
    imageId: 0,
    setImageId: (id) => set({ imageId: id }),
}));

export default useStore;


