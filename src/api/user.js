import request from '@/utils/request'

export default {
  login(data) {
    return request({
      url: '/admin/admin/login',
      method: 'post',
      params: data
    })
  }
}

