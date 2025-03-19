import request from '../utils/request.js'

export const addRoom = (data) => request({
  url: '/room/add',
  method: 'POST',
  data: data
})

export const getRoomTable = (data) => {
  if (!data) return request({
    url: '/room/table',
    method: 'GET',
  })
  else return request({
    url: `/room/table/${data}`,
    method: 'GET',
  })
}

export const updateRoom = (data) => request({
  url: '/room/update',
  method: 'PUT',
  data: data
})
