// 封装转化树形数据方法

export function transTree(list) {
  // 入参 list：后端返回的扁平化数据
  const treeList = []

  // 创建一个 id 与 item 的映射关系，目的就是为方便寻找 id
  const map = {}
  list.forEach(item => {
    map[item.id] = item
  })
  // 转换数据：寻找父节点的过程，如果找到，就把该数据放入父节点的 children 里面
  list.forEach(item => {
    if (map[item.pid]) {
      // 找到父节点
      // item.pid 是父节点的 id
      // map[item.pid] 是父节点本身
      // 如果父节点没有 children 属性，需要给父节点创建一个 children 属性，值为 []
      if (!map[item.pid].children) map[item.pid].children = []
      // 将 item 放入 父节点的 children 里面
      map[item.pid].children.push(item)
    } else {
      // 找不到父节点，说明它是顶层节点，直接给它 push 到 treeList 里面
      treeList.push(item)
    }
  })
  // console.log(map);
  // 返回值 treeList：转换后的树形结构数据
  return treeList
}

// 递归
export function recurTransTree(list, pid) {
  // 入参 list：后端返回的扁平化数据
  // 入参 pid：父id

  // 返回值 child：本次递归找到的所有孩子
  const child = []

  // 数据转换：遍历扁平化数组，找到 pid 的的孩子，放入 child 里面
  list.forEach(item => {
    if (item.pid === pid) {
      // 找到孩子，把孩子放入本地递归收集孩子的数组 child 中
      child.push(item)
      // 递归，寻找孩子的孩子
      const children = recurTransTree(list, item.id)
      // 找到孩子，再给它的 children 属性赋值
      if (children.length) item.children = children
    }
  })
  return child
}
