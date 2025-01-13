import {create} from 'zustand';

export interface FilterState {
    filterName: string;
    lastName: string;
    middleName: string;
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
    setLastName: (lastName: string) => void;
    setMiddleName: (middleName: string) => void;
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
    page: number,
    setPage: (page: number) => void;
    resetFilter: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
    filterName: '',
    lastName: '',
    middleName: '',
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
    setLastName: (lastName: string) => set({lastName}),
    setMiddleName: (middleName: string) => set({middleName}),
    setDepartureCountryFilter: (departureCountryFilter) => set({departureCountryFilter}),
    setDepartureRegionFilter: (departureRegionFilter) => set({departureRegionFilter}),
    setDepartureDistrictFilter: (departureDistrictFilter) => set({departureDistrictFilter}),
    setDepartureStartFilter: (departureStartFilter) => set({departureStartFilter}),
    setDepartureFinish: (departureFinish) => set({departureFinish}),
    setBirthStartFilter: (birthStartFilter) => set({birthStartFilter}),
    setBirthFinishFilter: (birthFinishFilter) => set({birthFinishFilter}),
    setCurrentStatusFilter: (currentStatusFilter) => set({currentStatusFilter}),
    setDoubleDateList: (doubleDateList) => set({doubleDateList}),
    page: 0,
    setPage: page => set({page}),
    resetFilter: () => set({
        filterName: '',
        lastName: '',
        middleName: '',
        departureCountryFilter: '',
        departureRegionFilter: '',
        departureDistrictFilter: '',
        departureStartFilter: '',
        departureFinish: '',
        birthDateRange: null,
        currentStatusFilter: '',
        clickHandler: true,
    }),
}));

export default useFilterStore;
