import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getHomeRoute, routeHasExist } from '@/utils/util'
const state = {
  showLeftMenu: true,
  showLoading: false,
  menus: [],
  user: {},
  warning: [],
  backlog: [],
  remind: {},
  breadCrumbList: [],
  local: '',
  avatorImgPath: '',
  homeRoute: {"id":"0","path":"/index","name":"index","title":"首页","icon":"ios-home"},
  tagNavList: [],
}

export default state
