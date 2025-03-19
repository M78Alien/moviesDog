import request from '../utils/request.js'

export const getCinemaTable = (data) => {
  if (!data) return request({
    url: '/cinema/table',
    method: 'GET',
  })
  else return request({
    url: `/cinema/table/${data}`,
    method: 'GET',
  })
}

export const updateCinema = (data) => request({
  url: `/cinema/update`,
  method: 'POST',
  data,
})

export const deleteCinema = (id) => request({
  url: `/cinema/update`,
  method: 'POST',
  data: {"id": id, "isDelete": 1},
})

export const setStatus = (id, status) => request({
  url: `/cinema/update`,
  method: 'POST',
  data: {"id": id, "isOpen": status === '经营中' ? 0 : 1},
})
