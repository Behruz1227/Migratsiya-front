const BASE_URL = "http://161.35.214.247:7777/"

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

// Kichik uchaskavoy qo'shish 
export const getMfy = `${BASE_URL}mfy/districtBy`
export const postUchaskavoy = `${BASE_URL}api/auth/add-uchaskavoy`
export const getKichikUchaskavoy = `${BASE_URL}api/user/uchaskavoy-list`


//uchaskavoy migrate qo'shadi
export const addMigrate = `${BASE_URL}api/migrate`
export const getMigrate = `${BASE_URL}api/migrate`
export const editMigrate = `${BASE_URL}api/migrate`
export const deleteMigrate = `${BASE_URL}api/migrate`


// IMG API

export const postImg = `${BASE_URL}api/attachment/upload`
export const imgUpdate = `${BASE_URL}api/attachment/`
export const imgGet = `${BASE_URL}api/attachment/getFile/`

//User API

export const getUserInfo = `${BASE_URL}api/user/getMe`
export const editUserInfo = `${BASE_URL}api/auth/edit/profile`

// diagram 
export const getYear = `${BASE_URL}statistic/diagram/gone`
export const getLeave = `${BASE_URL}statistic/diagram/gone`
export const getArrive = `${BASE_URL}statistic/diagram/arrive`
export const getMigratesStatistic = `${BASE_URL}statistic/diagram/by/migrant-count`
export const getStatisByRegion = `${BASE_URL}statistic/diagram/by/district`



// Dashboard api
export const get_country = `${BASE_URL}statistic/migrants/by/country`
export const get_region = `${BASE_URL}statistic/migrants/by/country/regions`
export const get_user_by_country = `${BASE_URL}api/migrate/departure/region`
export const all_migrants = `${BASE_URL}statistic/all/migrant/count`
export const statistic_by_kashkadarya = `${BASE_URL}statistic/by/kashkadarya`
export const migrates_by_kashkadarya = `${BASE_URL}api/migrate/district/migrants`
export const migrates_last_3month = `${BASE_URL}api/migrate/last/three/month`
export const statistic_last_3month = `${BASE_URL}statistic/last/three/month`
export const migrates_now_uzb = `${BASE_URL}api/migrate/now/at/uzb`
export const statistic_now_uzb = `${BASE_URL}statistic/now/at/uzb`
export const get_brigader = `${BASE_URL}statistic/migrants/by/brigaderlar`
export const get_brigader_by_country = `${BASE_URL}statistic/brigadir/by/country/regions`
export const get_brigader_users = `${BASE_URL}api/migrate/brigader/region`
export const get_brigader_count = `${BASE_URL}statistic/now/at/brigadir`
export const get_searchM_by_country = `${BASE_URL}statistic/qidiruv/by/country/regions`
export const get_searchM = `${BASE_URL}statistic/migrants/by/qidiruv`
export const get_searchM_count = `${BASE_URL}statistic/now/at/qidiruvda`
export const get_searchM_users = `${BASE_URL}api/migrate/qidiruv/region`



// country list 
export const countryList = `${BASE_URL}api/country/list`
export const regionList = `${BASE_URL}api/region/list`
export const distList = `${BASE_URL}api/district/list`




