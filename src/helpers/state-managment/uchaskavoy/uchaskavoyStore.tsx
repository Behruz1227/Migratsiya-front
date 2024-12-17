import { create } from 'zustand';

export interface Uchaskavoy {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  middleName: string;
  setMiddleName: (middleName: string) => void;
  birthDate: number | string;
  setBirthDate: (birthDate: number) => void;
  homeNumber: number;
  setHomeNumber: (homeNumber: number) => void;
  currentStatus: string;
  setCurrentStatus: (currentStatus: string) => void;
  birthCountry: string;
  setBirthCountry: (birthCountry: string) => void;
  birthRegion: string;
  setBirthRegion: (birthRegion: string) => void;
  birthDistrict: string;
  setBirthDistrict: (birthDistrict: string) => void;
  birthVillage: string;
  setBirthVillage: (birthVillage: string) => void;
  additionalInfo: string;
  setAdditionalInfo: (additionalInfo: string) => void;
  additionalAddress: string;
  setAdditionalAddress: (additionalAddress: string) => void;
  departureCountry: string;
  setDepartureCountry: (departureCountry: string) => void;
  departureRegion: string;
  setDepartureRegion: (departureRegion: string) => void;
  departureDistrict: string;
  setDepartureDistrict: (departureDistrict: string) => void;
  departureArea: string;
  setDepartureArea: (departureArea: string) => void;
  typeOfActivity: string;
  setTypeOfActivity: (typeOfActivity: string) => void;
  leavingCountryDate: number;
  setLeavingCountryDate: (leavingCountryDate: number) => void;
  returningUzbekistanDate: number;
  setReturningUzbekistanDate: (returningUzbekistanDate: number) => void;
  reasonForLeaving: string;
  setReasonForLeaving: (reasonForLeaving: string) => void;
  phoneNumberDeparture: number;
  setPhoneNumberDeparture: (phoneNumberDeparture: number) => void;
  suspiciousCases: string;
  setSuspiciousCases: (suspiciousCases: string) => void;
  disconnectedTime: number;
  setDisconnectedTime: (disconnectedTime: number) => void;
}

const useUchaskavoyStore = create<Uchaskavoy>((set) => ({
  firstName: '',
  setFirstName: (firstName) => set({ firstName }),

  lastName: '',
  setLastName: (lastName) => set({ lastName }),

  middleName: '',
  setMiddleName: (middleName) => set({ middleName }),

  birthDate: 0,
  setBirthDate: (birthDate) => set({ birthDate }),

  homeNumber: 0,
  setHomeNumber: (homeNumber) => set({ homeNumber }),

  currentStatus: '',
  setCurrentStatus: (currentStatus) => set({ currentStatus }),

  birthCountry: '',
  setBirthCountry: (birthCountry) => set({ birthCountry }),

  birthRegion: '',
  setBirthRegion: (birthRegion) => set({ birthRegion }),

  birthDistrict: '',
  setBirthDistrict: (birthDistrict) => set({ birthDistrict }),

  birthVillage: '',
  setBirthVillage: (birthVillage) => set({ birthVillage }),

  additionalInfo: '',
  setAdditionalInfo: (additionalInfo) => set({ additionalInfo }),

  additionalAddress: '',
  setAdditionalAddress: (additionalAddress) => set({ additionalAddress }),

  departureCountry: '',
  setDepartureCountry: (departureCountry) => set({ departureCountry }),

  departureRegion: '',
  setDepartureRegion: (departureRegion) => set({ departureRegion }),

  departureDistrict: '',
  setDepartureDistrict: (departureDistrict) => set({ departureDistrict }),

  departureArea: '',
  setDepartureArea: (departureArea) => set({ departureArea }),

  typeOfActivity: '',
  setTypeOfActivity: (typeOfActivity) => set({ typeOfActivity }),

  leavingCountryDate: 0,
  setLeavingCountryDate: (leavingCountryDate) => set({ leavingCountryDate }),

  returningUzbekistanDate: 0,
  setReturningUzbekistanDate: (returningUzbekistanDate) => set({ returningUzbekistanDate }),

  reasonForLeaving: '',
  setReasonForLeaving: (reasonForLeaving) => set({ reasonForLeaving }),

  phoneNumberDeparture: 0,
  setPhoneNumberDeparture: (phoneNumberDeparture) => set({ phoneNumberDeparture }),

  suspiciousCases: '',
  setSuspiciousCases: (suspiciousCases) => set({ suspiciousCases }),

  disconnectedTime: 0,
  setDisconnectedTime: (disconnectedTime) => set({ disconnectedTime }),
}));

export default useUchaskavoyStore;
