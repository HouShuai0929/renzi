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
