import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录接口
 * @param {*} data.mobile 手机号
 * @param {*} data.password 密码
 * @return {*} promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
