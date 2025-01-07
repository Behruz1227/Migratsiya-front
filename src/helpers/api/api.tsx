// const BASE_URL = "http://161.35.214.247:7777/"
const BASE_URL = "http://185.100.55.152:8080/"

export const log_in = `${BASE_URL}api/auth/login`

// Uchaskavoy
export const addManager = `${BASE_URL}api/auth/register`
export const editManager = `${BASE_URL}api/auth/edit/by/admin`
export const deleteManager = `${BASE_URL}api/user`
export const getManager = `${BASE_URL}api/user/users`
// Admin 
export const addUser = `${BASE_URL}api/auth/register`
export const getUser = `${BASE_URL}api/user/admins`
//Uchaskavoy qo'shguncha tuman listi 
export const getTuman = `${BASE_URL}api/district/list-qa`
export const editUchaskavoy = `${BASE_URL}api/auth/update/uchaskavoy`
export const mfyList = `${BASE_URL}api/mfy/list`


// Kichik uchaskavoy qo'shish 
export const getMfy = `${BASE_URL}api/mfy/districtBy`
export const postUchaskavoy = `${BASE_URL}api/auth/add-uchaskavoy`
export const getKichikUchaskavoy = `${BASE_URL}api/user/uchaskavoy-list`


//uchaskavoy migrate qo'shadi
export const addMigrate = `${BASE_URL}api/migrate`
export const getMigrate = `${BASE_URL}api/migrate/search`
export const editMigrate = `${BASE_URL}api/migrate`
export const deleteMigrate = `${BASE_URL}api/migrate`
export const MFYList = `${BASE_URL}mfy/list`

// Dashboard filter 
export const DashboardSearch = `${BASE_URL}api/migrate/search`

// IMG API

export const postImg = `${BASE_URL}api/attachment/upload`
export const imgUpdate = `${BASE_URL}api/attachment/`
export const imgGet = `${BASE_URL}api/attachment/getFile/`

//User API

export const getUserInfo = `${BASE_URL}api/user/getMe`
export const editUserInfo = `${BASE_URL}api/auth/edit/profile`

// diagram 
export const getYear = `${BASE_URL}api/statistic/diagram/gone`
export const getLeave = `${BASE_URL}api/statistic/diagram/gone`
export const getArrive = `${BASE_URL}api/statistic/diagram/arrive`
export const getMigratesStatistic = `${BASE_URL}api/statistic/diagram/by/migrant-count`
export const getStatisByRegion = `${BASE_URL}api/statistic/diagram/by/district`
export const getStatisForBarChartByCountry = `${BASE_URL}api/statistic/ageBy/country`
export const getStatisForBarChartByDistrict = `${BASE_URL}api/statistic/ageBy/district`
export const getStatisticByCountry = `${BASE_URL}api/statistic/statistics/country/by?`



// Dashboard api
export const get_country = `${BASE_URL}api/statistic/migrants/by/country`
export const get_region = `${BASE_URL}api/statistic/migrants/by/country/regions`
export const get_user_by_country = `${BASE_URL}api/migrate/departure/region`
export const all_migrants = `${BASE_URL}api/statistic/all/migrant/count`
export const statistic_by_kashkadarya = `${BASE_URL}api/statistic/by/kashkadarya`
export const migrates_by_kashkadarya = `${BASE_URL}api/migrate/district/migrants`
export const migrates_last_3month = `${BASE_URL}api/migrate/last/three/month`
export const statistic_last_3month = `${BASE_URL}api/statistic/last/three/month`
export const migrates_now_uzb = `${BASE_URL}api/migrate/now/at/uzb`
export const statistic_now_uzb = `${BASE_URL}api/statistic/now/at/uzb`
export const get_brigader = `${BASE_URL}api/statistic/migrants/by/brigaderlar`
export const get_brigader_by_country = `${BASE_URL}api/statistic/brigadir/by/country/regions`
export const get_brigader_users = `${BASE_URL}api/migrate/brigader/region`
export const get_brigader_count = `${BASE_URL}api/statistic/now/at/brigadir`
export const get_searchM_by_country = `${BASE_URL}api/statistic/qidiruv/by/country/regions`
export const get_searchM = `${BASE_URL}api/statistic/migrants/by/qidiruv`
export const get_searchM_count = `${BASE_URL}api/statistic/now/at/qidiruvda`
export const get_searchM_users = `${BASE_URL}api/migrate/qidiruv/region`



// country list 
export const countryList = `${BASE_URL}api/country/list`
export const regionList = `${BASE_URL}api/region/list`
export const distList = `${BASE_URL}api/district/list`
export const distListByQa = `${BASE_URL}api/district/list-qa`