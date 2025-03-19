import request from '../utils/request.js'

export const register = (data) => request({
  url: '/cinema',
  method: 'POST',
  data: data,
})

export const login = (data) => request({
  url: '/cinema/login',
  method: 'POST',
  data: data,
})
