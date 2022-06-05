// 内部封装操作 cookie 的方法
// 方法的使用跟 localStorage 很像
import Cookies from 'js-cookie'

const TokenKey = 'hr_token'

// 获取 token 的方法
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置 token 方法
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除 token 方法
export function removeToken() {
  return Cookies.remove(TokenKey)
}
