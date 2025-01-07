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
  homeNumber: string;
  setHomeNumber: (homeNumber: string) => void;
  currentStatus: string | null;
  setCurrentStatus: (currentStatus: string | null) => void;
  birthCountry: string | null;
  setBirthCountry: (birthCountry: string | null) => void;
  birthRegion: string | null; 
  setBirthRegion: (birthRegion: string | null) => void;
  birthDistrict: string | null;
  setBirthDistrict: (birthDistrict: string | null) => void;
  birthVillage: string | null;
  setBirthVillage: (birthVillage: string | null) => void;
  additionalInfo: string | null;
  setAdditionalInfo: (additionalInfo: string | null) => void;
  additionalAddress: string | null;
  setAdditionalAddress: (additionalAddress: string | null) => void;
  departureCountry: string | null;
  setDepartureCountry: (departureCountry: string | null) => void;
  departureRegion: string | null;
  setDepartureRegion: (departureRegion: string | null) => void;
  departureDistrict: string | null;
  setDepartureDistrict: (departureDistrict: string | null) => void;
  departureArea: string | null;
  setDepartureArea: (departureArea: string | null) => void;
  typeOfActivity: string | null;
  setTypeOfActivity: (typeOfActivity: string | null) => void;
  leavingCountryDate: number | null;
  setLeavingCountryDate: (leavingCountryDate: number | null) => void;
  returningUzbekistanDate: number | null;
  setReturningUzbekistanDate: (returningUzbekistanDate: number | null) => void;
  reasonForLeaving: string | null;
  setReasonForLeaving: (reasonForLeaving: string | null) => void;
  phoneNumberDeparture: string | null;
  setPhoneNumberDeparture: (phoneNumberDeparture: string | null) => void;
  suspiciousCases: string | null;
  setSuspiciousCases: (suspiciousCases: string | null) => void;
  disconnectedTime: number | null;
  setDisconnectedTime: (disconnectedTime: number | null) => void;
  birthDitrict: string | null;
  setBirthDitrict: (birthDitrict: string | null) => void;
}

const useUchaskavoyStore = create<Uchaskavoy>((set) => ({
  firstName: '',
  setFirstName: (firstName) => set({ firstName }),

  birthDitrict: '',
  setBirthDitrict: (birthDitrict) => set({ birthDitrict }),

  lastName: '',
  setLastName: (lastName) => set({ lastName }),

  middleName: '',
  setMiddleName: (middleName) => set({ middleName }),

  birthDate: 0,
  setBirthDate: (birthDate) => set({ birthDate }),

  homeNumber: "+998",
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

  returningUzbekistanDate: null,
  setReturningUzbekistanDate: (returningUzbekistanDate) => set({ returningUzbekistanDate }),

  reasonForLeaving: '',
  setReasonForLeaving: (reasonForLeaving) => set({ reasonForLeaving }),

  phoneNumberDeparture: "+998",
  setPhoneNumberDeparture: (phoneNumberDeparture) => set({ phoneNumberDeparture }),

  suspiciousCases: '',
  setSuspiciousCases: (suspiciousCases) => set({ suspiciousCases }),

  disconnectedTime: 0,
  setDisconnectedTime: (disconnectedTime) => set({ disconnectedTime }),
}));

export default useUchaskavoyStore;
