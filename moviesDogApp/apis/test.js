import { request } from '../utils/request'

export const testService = (url, methodType, data) => request(url, methodType, data)