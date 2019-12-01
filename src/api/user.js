import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/User/VipUser/LoginIn',
    // url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//上传
export function upload(data) {
  return request({
    url: '/User/VipUser/ImportUserVipExcel',
    method: 'post',
    data
  })
}

export function fetchData(url, data, type) {
  return request({
    url,
    method: type ? type : 'post',
    data
  })
}
