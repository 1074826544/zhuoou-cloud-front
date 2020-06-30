import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/utils/tools'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
	debugger;
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item) {
      let obj = {
        icon: item.icon || '',
        name: item.name,
        path: item.path,
        title: item.title
      }
      if (hasChild(item) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.href) obj.href = item.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.name != 'index' && item.name != '_index'
  }).map(item => {
    let obj = {
      icon: item.icon || getIconByName(item.name) || '',
      path: item.path,
      name: item.name,
      title: item.title || getTitleByName(item.name) || '',
    }
    return obj
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

export const showTitle = (item, vm) =>  {
	if(isNotBlank(item.title)){ 
		return item.title 
    }else{
    	return item.name 
    }
} 

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, icon三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}


/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  //debugger;
  const { name, path,icon } = newRoute
  let title= getTitleByName(newRoute.name);
  let newList = [...list]
  if (newList.findIndex(item => (item.path === path && item.name === name)) >= 0) return newList
  else newList.push({ name, path,icon,title})
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
	debugger;
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name) => {
  const routePermissionJudge = (name) => {
	  let itemInfo = getMenuInfoByName(name);
	  if(!isNotBlank(itemInfo) && name !== "index" && name !== "404"){//没有权限的路由跳转到没有权限的页面
		  return false;
	  }else{
		  return true
	  }
  }
  return routePermissionJudge(name)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'index') homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}


/**
 * 判断是否为空
 */
export const isBlank = (value) => {//判断为空
	var type;
    if(value == null) { // 等同于 value === undefined || value === null
        return true;
    }
    type = Object.prototype.toString.call(value).slice(8, -1);
    switch(type) {
    case 'String':
        return !value.trim();
    case 'Array':
        return !value.length;
    case 'Object':
        return isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
    default:
        return false; // 其他对象均视作非空
    }
}
export const isEmptyObject = (value) => {
	let name;
    for ( name in value ) {
        return false;
    }
    return true;
}
export const isNotBlank = (value) => {//判断不为为空
    return !isBlank(value);
}
/**
 * 根据name获取menu信息
 */
export const getMenuInfoByName = (name) => {
	let rtArr = isNotBlank(OperatorUtils.getMenuData()) ? OperatorUtils.getMenuData().filter(item => {
		if(item.name === name){
			return item;
		}
	}) : null
	return isNotBlank(rtArr) ? rtArr[0] : null;
}

/**
 * 根据name获取menu信息
 */
export const getMenuInfoById = (id) => {
	let rtArr=isNotBlank(OperatorUtils.getMenuData()) ? OperatorUtils.getMenuData().filter(item => {
		if(item.id === id){
			return item;
		}
	}) : null
	return isNotBlank(rtArr) ? rtArr[0] : null;
}


/**
 * 根据name获取menu信息
 */
export const getIconByName = (name) => {
	let item = getMenuInfoByName(name);
	return (isNotBlank(item) && isNotBlank(item.icon)) ? item.icon : '';
}

/**
 * 根据name获取menu信息
 */
export const getTitleByName = (name) => {
	let item = getMenuInfoByName(name);
	return (isNotBlank(item) && isNotBlank(item.title)) ? item.title : '';
}

/**
 * 根据name获取menu信息如果为空则返回name
 */
export const getTitleOrNameByName = (name) => {
	let item = getMenuInfoByName(name);
	return (isNotBlank(item) && isNotBlank(item.title)) ? item.title : name;
}

/**
 * 根据name获取打开的按钮
 */
export const getOpenedNames = (name) =>{
	let openedNames=new Array();
	let menuData=OperatorUtils.getMenuData();
	getParentName(menuData, name ,openedNames);
	return openedNames;
}
/**
 * 获取父节点
 */
export const getParentName = (menuData,name,openedNames) =>{
	openedNames.push(name)
	let item = getMenuInfoByName(name);
	if(isNotBlank(item) && isNotBlank(item.parentId) && item.parentId!='0'){
		let parentitem=getMenuInfoById(item.parentId);
		getParentName(menuData,parentitem.name,openedNames);
	}
}

/**
 * 获取uuid
 */
export const uuid = () =>{
	let s = [];
	let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; 
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
}


