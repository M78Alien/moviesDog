import request from '../utils/request.js'

export const getUserTable = (date) => {
  if (!date) return request({
    url: '/user',
    method: 'GET',
  })
  else return request({
    url: `/user/${date}`,
    method: 'GET',
  })
}

export const getOrderForUser = id => request({
  url: `/order/user/${id}`,
  method: 'GET',
})
