import request from '@/utils/request'
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/**
 * 给角色分配权限
 * @param {*} data.id 角色id
 * @param {*} data.permIds 分配的权限id组成的数组
 * @returns promise
 */
export function assignPermission(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
