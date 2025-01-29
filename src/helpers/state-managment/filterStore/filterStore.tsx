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
    disconnectDateList: any;
    setDisconnectDateList: (disconnectDateList: any) => void;
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
    genderFilter: string;
    setGenderFilter: (genderFilter: string) => void;
    disconnect: string;
    setDisconnect: (disconnect: string) => void;
    reasonReturning: string;
    setReasonReturning: (reasonReturning: string) => void;
    page: number,
    setPage: (page: number) => void;
    knowForeignLanguage: string;
    setKnowForeignLanguage: (knowForeignLanguage: string) => void;
    currentStatusRet: string;
    setCurrentStatusRet: (currentStatusRet: string) => void;
    resetFilter: () => void;
    resetFilterAdmin: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
    filterName: '',
    setFilterName: filterName => set({filterName}),
    lastName: '',
    setLastName: lastName => set({lastName}),
    middleName: '',
    setMiddleName: middleName => set({middleName}),
    departureCountryFilter: '',
    setDepartureCountryFilter: departureCountryFilter => set({departureCountryFilter}),
    departureRegionFilter: '',
    setDepartureRegionFilter: departureRegionFilter => set({departureRegionFilter}),
    departureDistrictFilter: '',
    setDepartureDistrictFilter: departureDistrictFilter => set({departureDistrictFilter}),
    departureFinish: [],
    setDepartureFinish: departureFinish => set({departureFinish}),
    birthStartFilter: '',
    setBirthStartFilter: birthStartFilter => set({birthStartFilter}),
    birthFinishFilter: '',
    setBirthFinishFilter: birthFinishFilter => set({birthFinishFilter}),
    currentStatusFilter: '',
    setCurrentStatusFilter: currentStatusFilter => set({currentStatusFilter}),
    departureStartFilter: [],
    setDepartureStartFilter: departureStartFilter => set({departureStartFilter}),
    doubleDateList: [],
    setDoubleDateList: doubleDateList => set({doubleDateList}),
    birthDateRange: [],
    setBirthDateRange: birthDateRange => set({birthDateRange}),
    clickHandler: false,
    setClickHandler: clickHandler => set({clickHandler}),
    workPlace: '',
    setWorkPlace: workPlace => set({workPlace}),
    genderFilter: "",
    setGenderFilter: genderFilter => set({genderFilter}),
    disconnect: "",
    setDisconnect: disconnect => set({disconnect}),
    reasonReturning: "",
    setReasonReturning: reasonReturning => set({reasonReturning}),
    disconnectDateList: [],
    setDisconnectDateList: disconnectDateList => set({disconnectDateList}),
    liveDistrict: "",
    setLiveDistrict: liveDistrict => set({liveDistrict}),
    liveDistrictId: "",
    setLiveDistrictId: liveDistrictId => set({liveDistrictId}),
    page: 0,
    setPage: page => set({page}),
    knowForeignLanguage: "",
    setKnowForeignLanguage: knowForeignLanguage => set({knowForeignLanguage}),
    currentStatusRet: "",
    setCurrentStatusRet: currentStatusRet => set({currentStatusRet}),
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
        genderFilter: '',
        disconnect: "",
        disconnectDateList: [],
        reasonReturning: "",
        knowForeignLanguage: "",
        currentStatusRet: ""
    }),
    resetFilterAdmin: () => set({
        filterName: '',
        lastName: '',
        middleName: '',
        departureCountryFilter: '',
        departureRegionFilter: '',
        departureDistrictFilter: '',
        currentStatusFilter: '',
        genderFilter: '',
        disconnect: "",
        disconnectDateList: [],
        reasonReturning: "",
        knowForeignLanguage: "",
        currentStatusRet: ""
    })
}));

export default useFilterStore;
