import request from '../utils/request.js'

export const getOrderTable = text => {
  if (text) {
    return request({
      url: `/order/table/${text}`,
      method: 'GET'
    })
  } else {
    return request({
      url: `/order/table`,
      method: 'GET'
    })
  }
}

export const getSaleRank = () => request({
  url: `/rank/sales`,
  method: 'GET'
})
