import {create} from 'zustand';

export interface Global {
    region: RegionOrDistricts[] | null;
    setRegion: (region: RegionOrDistricts[] | null) => void;
    district: RegionOrDistricts[] | null;
    setDistrict: (district: RegionOrDistricts[] | null) => void;
    getMeData: null | any;
    setGetMeData: (data: any | null) => void;
    imgUpload: any | number | null
    setImgUpload: (val: any | number | null) => void;
    notificationCounts: number | null
    setNotificationCounts: (count: number | null) => void
    meData: null | any
    setMeData: (data: any | null) => void
}

export interface RegionOrDistricts {
    id: number
    name: string
}

export interface IStudentData {
    studentId: number;
    attendance: boolean;
    date: string
}


const globalStore = create<Global>((set) => ({
    region: null,
    setRegion: (val: RegionOrDistricts[] | null) => set({region: val}),
    district: null,
    setDistrict: (val: RegionOrDistricts[] | null) => set({district: val}),
    getMeData: null,
    setGetMeData: (val: any | null) => set({getMeData: val}),
    imgUpload: null,
    setImgUpload: (val: any) => set({imgUpload: val}),
    notificationCounts: null,
    setNotificationCounts: (counts: number | null) => set({notificationCounts: counts}),
    meData: null,
    setMeData: (val: any | null) => set({meData: val}),
}));

export default globalStore;
