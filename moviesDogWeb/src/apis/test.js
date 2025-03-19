import request from '../utils/request.js'

export const testService = (data) => request({
  url: '/student',
  method: 'POST',
  data: data,
})
