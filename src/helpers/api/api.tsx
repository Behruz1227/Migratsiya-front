export const base_url: string = import.meta.env.VITE_BASE_URL;

export const log_in = `${base_url}api/auth/login`

// Uchaskavoy
export const addManager = `${base_url}api/auth/register`
export const editManager = `${base_url}api/auth/edit/by/admin`
export const deleteManager = `${base_url}api/user`
export const getManager = `${base_url}api/user/users`

// Admin 
export const addUser = `${base_url}api/auth/register`
export const getUser = `${base_url}api/user/admins`

//Uchaskavoy qo'shguncha tuman listi 
export const getTuman = `${base_url}api/district/list-qa`
export const editUchaskavoy = `${base_url}api/auth/update/uchaskavoy`
export const mfyList = `${base_url}api/mfy/list`

// Kichik uchaskavoy qo'shish 
export const getMfy = `${base_url}api/mfy/districtBy`
export const postUchaskavoy = `${base_url}api/auth/add-uchaskavoy`
export const getKichikUchaskavoy = `${base_url}api/user/uchaskavoy-list`

//uchaskavoy migrate qo'shadi
export const addMigrate = `${base_url}api/migrate`
export const getMigrate = `${base_url}api/migrate/search`
export const editMigrate = `${base_url}api/migrate`
export const deleteMigrate = `${base_url}api/migrate`

// IMG API
export const postImg = `${base_url}api/attachment/upload`
export const imgUpdate = `${base_url}api/attachment/`
export const imgGet = `${base_url}api/attachment/getFile/`

//User API
export const getUserInfo = `${base_url}api/user/getMe`
export const editUserInfo = `${base_url}api/auth/edit/profile`

// diagram 
export const getYear = `${base_url}api/statistic/diagram/gone`
export const getLeave = `${base_url}api/statistic/diagram/gone`
export const getArrive = `${base_url}api/statistic/diagram/arrive`
export const getMigratesStatistic = `${base_url}api/statistic/diagram/by/migrant-count`
export const getStatisByRegion = `${base_url}api/statistic/diagram/by/district`
export const getStatisForBarChartByCountry = `${base_url}api/statistic/ageBy/country`
export const getStatisForBarChartByDistrict = `${base_url}api/statistic/ageBy/district`
export const getStatisticByCountry = `${base_url}api/statistic/statistics/country/by?`

// Dashboard api
export const get_country = `${base_url}api/statistic/migrants/by/country`
export const get_region = `${base_url}api/statistic/migrants/by/country/regions`
export const get_user_by_country = `${base_url}api/migrate/departure/region`
export const all_migrants = `${base_url}api/statistic/all/migrant/count`
export const statistic_by_kashkadarya = `${base_url}api/statistic/by/kashkadarya`
export const migrates_by_kashkadarya = `${base_url}api/migrate/district/migrants`
export const migrates_last_3month = `${base_url}api/migrate/last/three/month`
export const statistic_last_3month = `${base_url}api/statistic/last/three/month`
export const migrates_now_uzb = `${base_url}api/migrate/now/at/uzb`
export const statistic_now_uzb = `${base_url}api/statistic/now/at/uzb`
export const get_brigader = `${base_url}api/statistic/migrants/by/brigaderlar`
export const get_brigader_by_country = `${base_url}api/statistic/brigadir/by/country/regions`
export const get_brigader_users = `${base_url}api/migrate/brigader/region`
export const get_brigader_count = `${base_url}api/statistic/now/at/brigadir`
export const get_searchM_by_country = `${base_url}api/statistic/qidiruv/by/country/regions`
export const get_searchM = `${base_url}api/statistic/migrants/by/qidiruv`
export const get_searchM_count = `${base_url}api/statistic/now/at/qidiruvda`
export const get_searchM_users = `${base_url}api/migrate/qidiruv/region`

// country list 
export const countryList = `${base_url}api/country/list`
export const regionList = `${base_url}api/region/list`
export const distList = `${base_url}api/district/list`
export const distListByQa = `${base_url}api/district/list-qa`

export const getVillage = `${base_url}api/auth/small/police/village`