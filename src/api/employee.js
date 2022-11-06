import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {*} params.page 当前页
 * @param {*} params.size 每页多少条
 * @returns promise
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
