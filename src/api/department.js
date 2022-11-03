import request from '@/utils/request'

/**
 * 获取组织架构列表数据
 * @returns promise
 */
export function getDepartmentList() {
  return request({
    url: '/company/department'
  })
}

/**
 * 获取部门负责人列表数据
 * @returns promise
 */
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 添加子部门
 * @param {*} data.code 部门编码
 * @param {*} data.introduce 部门介绍
 * @param {*} data.manager 部门负责人
 * @param {*} data.name 部门名称
 * @param {*} data.pid 父级部门id
 * @returns promise
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
/**
 * 获取部门详情
 * @param {*} id 部门id
 * @returns promise
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * 编辑部门
 * @param {*} data
 * @returns promise
 */
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
