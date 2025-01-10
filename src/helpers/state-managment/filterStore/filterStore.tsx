import {create} from 'zustand';

export interface FilterState {
    filterName: string;
    departureCountryFilter: string;
    departureRegionFilter: string;
    departureDistrictFilter: string;
    departureStartFilter: string;
    departureFinish: string;
    birthStartFilter: string;
    birthFinishFilter: string;
    currentStatusFilter: string;
    doubleDateList: any[];  // Assuming this is a list of dates or objects.
    birthDateRange: any;  // Assuming this is a list of dates or objects.
    setBirthDateRange: (val: any) => void;
    setFilterName: (filterName: string) => void;
    setDepartureCountryFilter: (departureCountryFilter: string) => void;
    setDepartureRegionFilter: (departureRegionFilter: string) => void;
    setDepartureDistrictFilter: (departureDistrictFilter: string) => void;
    setDepartureStartFilter: (departureStartFilter: string) => void;
    setDepartureFinish: (departureFinish: string) => void;
    setBirthStartFilter: (birthStartFilter: string) => void;
    setBirthFinishFilter: (birthFinishFilter: string) => void;
    setCurrentStatusFilter: (currentStatusFilter: string) => void;
    setDoubleDateList: (doubleDateList: any[]) => void;  // Add setter for doubleDateList
    clickHandler: boolean;
    setClickHandler: (clickHandler: boolean) => void;
}

const useFilterStore = create<FilterState>((set) => ({
    filterName: '',
    departureCountryFilter: '',
    departureRegionFilter: '',
    departureDistrictFilter: '',
    departureStartFilter: '',
    departureFinish: '',
    birthStartFilter: '',
    birthFinishFilter: '',
    currentStatusFilter: '',
    doubleDateList: [], // Initialize as an empty array
    birthDateRange: [],
    clickHandler: false,
    setClickHandler: clickHandler => set({clickHandler}),
    setBirthDateRange: (birthDateRange: any) => set({birthDateRange}),
    setFilterName: (filterName) => set({filterName}),
    setDepartureCountryFilter: (departureCountryFilter) => set({departureCountryFilter}),
    setDepartureRegionFilter: (departureRegionFilter) => set({departureRegionFilter}),
    setDepartureDistrictFilter: (departureDistrictFilter) => set({departureDistrictFilter}),
    setDepartureStartFilter: (departureStartFilter) => set({departureStartFilter}),
    setDepartureFinish: (departureFinish) => set({departureFinish}),
    setBirthStartFilter: (birthStartFilter) => set({birthStartFilter}),
    setBirthFinishFilter: (birthFinishFilter) => set({birthFinishFilter}),
    setCurrentStatusFilter: (currentStatusFilter) => set({currentStatusFilter}),
    setDoubleDateList: (doubleDateList) => set({doubleDateList}), // Add setter for doubleDateList
}));

export default useFilterStore;
