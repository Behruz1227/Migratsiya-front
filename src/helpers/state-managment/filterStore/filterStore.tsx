import {create} from 'zustand';

export interface FilterState {
    filterName: string;
    lastName: string;
    middleName: string;
    departureCountryFilter: string;
    departureRegionFilter: string;
    departureDistrictFilter: string;
    birthStartFilter: string;
    birthFinishFilter: string;
    currentStatusFilter: string;
    departureFinish: any;
    departureStartFilter: any;
    doubleDateList: any[];
    birthDateRange: any;
    setBirthDateRange: (val: any) => void;
    setFilterName: (filterName: string) => void;
    setLastName: (lastName: string) => void;
    setMiddleName: (middleName: string) => void;
    setDepartureCountryFilter: (departureCountryFilter: string) => void;
    setDepartureRegionFilter: (departureRegionFilter: string) => void;
    setDepartureDistrictFilter: (departureDistrictFilter: string) => void;
    setDepartureFinish: (departureFinish: any) => void;
    setBirthStartFilter: (birthStartFilter: string) => void;
    setBirthFinishFilter: (birthFinishFilter: string) => void;
    setCurrentStatusFilter: (currentStatusFilter: string) => void;
    setDepartureStartFilter: (departureStartFilter: any) => void;
    setDoubleDateList: (doubleDateList: any[]) => void;  // Add setter for doubleDateList
    clickHandler: boolean;
    setClickHandler: (clickHandler: boolean) => void;
    workPlace: string;
    setWorkPlace: (workPlace: string) => void;
    liveDistrict: string;
    setLiveDistrict: (liveDistrict: string) => void;
    liveDistrictId: string;
    setLiveDistrictId: (liveDistrictId: string) => void;
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
    departureFinish: [],
    birthStartFilter: '',
    birthFinishFilter: '',
    currentStatusFilter: '',
    departureStartFilter: [],
    doubleDateList: [], // Initialize as an empty array
    birthDateRange: [],
    clickHandler: false,
    workPlace: '',
    setClickHandler: clickHandler => set({clickHandler}),
    setBirthDateRange: (birthDateRange: any) => set({birthDateRange}),
    setFilterName: (filterName) => set({filterName}),
    setLastName: (lastName: string) => set({lastName}),
    setMiddleName: (middleName: string) => set({middleName}),
    setDepartureCountryFilter: (departureCountryFilter) => set({departureCountryFilter}),
    setDepartureRegionFilter: (departureRegionFilter) => set({departureRegionFilter}),
    setDepartureDistrictFilter: (departureDistrictFilter) => set({departureDistrictFilter}),
    setDepartureFinish: (departureFinish) => set({departureFinish}),
    setBirthStartFilter: (birthStartFilter) => set({birthStartFilter}),
    setBirthFinishFilter: (birthFinishFilter) => set({birthFinishFilter}),
    setCurrentStatusFilter: (currentStatusFilter) => set({currentStatusFilter}),
    setDepartureStartFilter: (departureStartFilter) => set({departureStartFilter}),
    setDoubleDateList: (doubleDateList) => set({doubleDateList}),
    setWorkPlace: workPlace => set({workPlace}),
    liveDistrict: "",
    setLiveDistrict: (liveDistrict: string) => set({liveDistrict}),
    liveDistrictId: "",
    setLiveDistrictId: (liveDistrictId: string) => set({liveDistrictId}),
    page: 0,
    setPage: page => set({page}),
    resetFilter: () => set({
        filterName: '',
        lastName: '',
        middleName: '',
        departureCountryFilter: '',
        departureRegionFilter: '',
        departureDistrictFilter: '',
        departureStartFilter: [],
        departureFinish: [],
        birthDateRange: null,
        workPlace: '',
        currentStatusFilter: '',
        liveDistrict: '',
        liveDistrictId: '',
        clickHandler: true,
    }),
}));

export default useFilterStore;
