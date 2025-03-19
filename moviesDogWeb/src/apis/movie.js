import request from '../utils/request.js'

export const addMovie = (data) => request({
  url: '/movie',
  method: 'POST',
  data: data,
})

export const getMoviesTable = (data) => {
  if (!data) return request({
    url: '/movie/table',
    method: 'GET',
  })
  else return request({
    url: `/movie/table/${data}`,
    method: 'GET',
  })
}

export const updateMovie = (data) => request({
  url: '/movie/update',
  method: 'PUT',
  data: data,
})

export const deleteMovie = (id) => request({
  url: '/movie/update',
  method: 'PUT',
  data: {"id": id, "isDelete": 1},
})
