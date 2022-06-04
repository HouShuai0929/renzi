// 封装转化树方法

// 思路
// 1. 方法的参数是什么 返回值是什么 - 参数平铺的数组 返回值树形数组
// 2. 数据处理逻辑(时间复杂度最小的写法)
// 核心处理思路:
// 寻找父节点的过程 通过pid字段去匹配id字段 如果能找到就把当前项放到父节点的children
// 属性里,如果找不到父节点,它自己本身就是最外层的节点 直接放到最终产出的数组中

// 代码逻辑：
// 1. 遍历要处理的数组 把数组中每一项的id作为key，对象本身作为value形成一个map对象结构
// { 1001: {}, 1002:{} }
// 2. 遍历要处理的数组 通过pid去第一步中形成的对象里寻找id进行匹配,如果匹配的上,就push到chilren属性里
// 如果匹配不上,就把当前项 push到最终产出的数组中

function transTree(arr) {
  const targetArr = []
  // 进行数据处理 todo
  // 1.形成map对象结构
  const map = {}
  arr.forEach(item => {
    map[item.id] = item
    map[item.id].children = []
  })
  // 通过pid进行匹配
  arr.forEach(item => {
    if (map[item.pid]) {
      map[item.pid].children.push(item)
    } else {
      targetArr.push(item)
    }
  })
  return targetArr
}

export default transTree
