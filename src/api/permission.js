import request from '@/utils/request'

/**
 * 获取权限点列表数据
 * @returns promise
 */
export function getPermissionList() {
  return request({
    url: '/sys/permission'
  })
}
/**
 * 添加权限点
 * @param {*} data.enVisible 权限是否启用
 * @param {*} data.name 权限名称
 * @param {*} data.code 权限标识
 * @param {*} data.description 权限描述
 * @param {*} data.type 类型 区分当前是添加菜单权限(表格中的一级节点)还是按钮权限(表格中的二级节点)
 * @param {*} data.pid 添加到哪个节点下，父id
 * @returns promise
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
/**
 * 获取权限点详情
 * @param {*} id 权限点id
 * @returns promise
 */
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
/**
 * 编辑权限点提交
 * @param {*} data
 * @returns promise
 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
/**
 * 删除权限点
 * @param {*} id 权限点id
 * @returns promise
 */
export function deletePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
