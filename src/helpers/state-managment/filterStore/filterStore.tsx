import { create } from 'zustand';

export interface FilterState {
    filterName: string;
    departureCountryFilter: string;
    departureRegionFilter: string;
    departureDistrictFilter: string;
    departureStartFilter: string;
    departureFinish:string;
    birthStartFilter: string;
    birthFinishFilter: string;
    currentStatusFilter: string;
    setFilterName: (filterName: string) => void;
    setDepartureCountryFilter: (departureCountryFilter: string) => void;
    setDepartureRegionFilter: (departureRegionFilter: string) => void;
    setDepartureDistrictFilter: (departureDistrictFilter: string) => void;
    setDepartureStartFilter: (departureStartFilter: string) => void;
    setDepartureFinish: (departureStartFilter: string) => void;
    setBirthStartFilter: (birthStartFilter: string) => void;
    setBirthFinishFilter: (birthFinishFilter: string) => void;
    setCurrentStatusFilter: (currentStatusFilter: string) => void;
}

const useFilterStore = create<FilterState>((set) => ({
    filterName: '',
    departureCountryFilter: '',
    departureRegionFilter: '',
    departureDistrictFilter: '',
    departureStartFilter: '',
    departureFinish:'',
    birthStartFilter: '',
    birthFinishFilter: '',
    currentStatusFilter: '',
    setFilterName: (filterName) => set({ filterName }),
    setDepartureCountryFilter: (departureCountryFilter) => set({ departureCountryFilter }),
    setDepartureRegionFilter: (departureRegionFilter) => set({ departureRegionFilter }),
    setDepartureDistrictFilter: (departureDistrictFilter) => set({ departureDistrictFilter }),
    setDepartureStartFilter: (departureStartFilter) => set({ departureStartFilter }),
    setDepartureFinish: (departureFinish) => set({ departureFinish }),
    setBirthStartFilter: (birthStartFilter) => set({ birthStartFilter }),
    setBirthFinishFilter: (birthFinishFilter) => set({ birthFinishFilter }),
    setCurrentStatusFilter: (currentStatusFilter) => set({ currentStatusFilter }),
}));

export default useFilterStore;
