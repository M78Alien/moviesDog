import request from '../utils/request.js'

export const addShowcase = (data) => request({
  url: '/showcase/add',
  method: 'POST',
  data: data,
})

export const getShowcaseTable = (cinemaId, roomId) => request({
  url: `/showcase/get/${cinemaId}/${roomId}`,
  method: 'GET',
})

export const deleteShowcase = (data) => request({
  url: `/showcase/del/${data}`,
  method: 'PUT',
})
