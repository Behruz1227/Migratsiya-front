const BASE_URL = "http://161.35.214.247:7777/"

export const log_in = `${BASE_URL}api/auth/login`

// Uchaskavoy qo'shish 
export const addManager = `${BASE_URL}api/auth/register`
export const editManager = `${BASE_URL}api/auth/edit/by/admin`
export const deleteManager = `${BASE_URL}api/user`
export const getManager = `${BASE_URL}api/user/admins`
// Admin 
export const addUser = `${BASE_URL}api/auth/register`
export const getUser = `${BASE_URL}api/user/users`

//uchaskavoy migrate 
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

// Dashboard api
export const get_country = `${BASE_URL}statistic/migrants/by/country`
export const get_region = `${BASE_URL}statistic/migrants/by/country/regions`
export const get_user_by_country = `${BASE_URL}api/migrate/departure/region`
export const all_migrants = `${BASE_URL}statistic/all/migrant/count`
export const statistic_by_kashkadarya = `${BASE_URL}statistic/by/kashkadarya`



