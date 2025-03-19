import { request } from '../utils/request'

export const getAllMovieApi = (text, type, language, country) => request(`/movie/all?text=${text}&type=${type}&language=${language}&country=${country}`, 'GET', '')

export const loginApi = (userName, phoneNumber, password) => request('/user/login', 'POST', {
    'name': userName,
    'phoneNumber': phoneNumber,
    'password': password
})

export const getMovieDetailApi = id => request(`/movie/detail/${id}`, "GET", '')

export const addComment = (data) => request('/order/comment', 'POST', data)

export const getDetailComment = (userId, movieId) => request(`/order/comment?userId=${userId}&movieId=${movieId}`, 'GET', '')

export const getUserComment = userId => request(`/order/comment/${userId}`, 'GET', '')

export const getRateRank = () => request('/movie/rate', 'GET', '')

export const updateProfile = (id, profile) => request('/user/profile', 'PUT', {
    "id": id,
    "userProfile": profile
})

export const findCinema = (date, cinemaId) => request(`/cinema/movie/${date}/${cinemaId}`, 'GET', '')

export const getCinemaDetail = id => request(`/cinema/${id}`, 'GET', '')

export const getShowcaseList = (cinemaId, movieId, date) => request(`/showcase/list?cinemaId=${cinemaId}&movieId=${movieId}&date=${date}`)

export const getShowcaseDetail = id => request(`/showcase/detail/${id}`, 'GET', '')

export const getRoomDetail = id => request(`/room/detail/${id}`, 'GET', '')

export const addOrder = data => request('/order/add', 'POST', data)

export const getOrderList = id => request(`/order/list/${id}`, 'GET', '')

export const addCommentToOrder = (id, rate, comment) => request(`/order/comment?id=${id}&rate=${rate}&comment=${comment}`, 'PUT', '')

export const getSaleRank = () => request('/movie/sale', 'GET', '')

export const getChampion = () => request('/movie/champion', 'GET', '')

export const getSelectedCase = id => request(`/showcase/case/${id}`, 'GET', '')

export const getOrderDetail = id => request(`/order/${id}`, 'GET', '')