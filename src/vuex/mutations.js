import http from 'utils/HttpUtils'
import DateUtils from 'utils/DateUtils'
import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '@/utils/util'

const mutations = {
  showLeftMenu (state, status) {
    state.showLeftMenu = status
  },
  setMenus (state, menus) {
    state.menus = menus
  },
  setUser (state, user) {
    state.user = user
  },
  showLoading  (state, status) {
    state.showLoading = status
  },
  addRemind (state, obj) {
    if (state.remind[obj.key] == null) {
      state.remind[obj.key] = []
    }
    state.remind[obj.key].push(obj.id)
  },
  removeRemind (state, key) {
    state.remind[key] = null
  },
  queryWarningData (state, callback) {
    let params = {
      warningStatusArray: [0],
      warningStartDate: null,
      warningEndDate: null,
      sortField: 'id',
      sortOrder: 'asc'
    }
    http.http.apiPost('/warning/warning/list', params).then((res) => {
      if (!res.success) {
        // http.http.handleError(res)
      } else {
        let data = res.data.rows
        state.warning = data
        callback(data)
      }
    })
  },
  queryBacklogData (state, callback) {
    let params = {
      afterDate: DateUtils.getDateAmount(new Date(), -1).format('yyyy-MM-dd'),
      pageSize: 8,
      page: 1,
      status: 0
    }
    http.http.apiPost('/work/backlog/list', params).then((res) => {
      if (!res.success) {
        // http.http.handleError(res)
      } else {
        let data = res.data.rows
        state.backlog = data
        callback(data)
      }
    })
  },
  setLocal (state, lang) {
    state.local = lang
  },
  setBreadCrumb (state, routeMetched) {
    state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
  },
  setTagNavList (state, list) {
    if (list) {
      state.tagNavList = [...list]
      setTagNavListInLocalstorage([...list])
    } else state.tagNavList = getTagNavListFromLocalstorage()
  },
  addTag (state, { route, type = 'unshift' }) {
    if (!routeHasExist(state.tagNavList, route)) {
      if (type === 'push') state.tagNavList.push(route)
      else {
        if (route.name === '首页') state.tagNavList.unshift(route)
        else state.tagNavList.splice(1, 0, route)
      }
      setTagNavListInLocalstorage([...state.tagNavList])
    }
  },
  clearAll (state){
	OperatorUtils.clear();
    state.local = '';
    state.avatorImgPath = '';
    setTagNavListInLocalstorage([]);
    state.tagNavList = [];
    state.breadCrumbList = [];
  }
}

export default mutations
