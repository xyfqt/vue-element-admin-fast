import request from '@/utils/request'

export default {
  getUploadToken(data) {
    return request({
      url: '/getToken',
      method: 'post',
      data
    })
  },
}
