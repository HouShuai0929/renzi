import request from '@/utils/request'

// 查询
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

// 添加
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 删除
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 批量导入
export function batchEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
