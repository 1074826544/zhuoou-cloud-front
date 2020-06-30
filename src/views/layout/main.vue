<template>
  <Layout style="height: 100%" class="main main-lo">
    <Sider hide-trigger collapsible :width="215" :collapsed-width="53" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden', background: backgroundTheme}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout class="content-lo">
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avator="userAvator" slot="user"/>
          <msg slot="msg"/>
    	  <language @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local" slot="language"/>
    	  <fullscreen v-model="isFullscreen" style="margin-right: 10px;" slot="fullscreen"/>
    	  /*<Dropdown>
		   <a href="javascript:void(0)" style="margin-right: 10px;" rel="external nofollow" >
		     下拉菜单
		     <Icon type="arrow-down-b"></Icon>
		   </a>
		   <DropdownMenu slot="list">
		     <DropdownItem @click.native="changeColor(1)">摇滚主题</DropdownItem>
		     <DropdownItem @click.native="changeColor(2)">新时代主题</DropdownItem>
		     <DropdownItem @click.native="changeColor(3)">基础主题</DropdownItem>
		   </DropdownMenu>
		 </Dropdown>*/
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import Msg from './components/msg'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual, canTurnTo, isNotBlank, getMenuInfoByName } from '@/utils/util'
import minLogo from '@/assets/images/logo_min.png'
import maxLogo from '@/assets/images/logo.png'
import './main.less'
import common from '@/utils/common';
import axios from 'axios';
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    User,
    Msg,
    getMenuInfoByName
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  props: {
	backgroundTheme: {
      type: String,
      default: 'dark'
    }
  },
  computed: {
    tagNavList () {
    	//console.info("=======tagNavList=======:"+JSON.stringify(this.$store.state.tagNavList))
      return this.$store.state.tagNavList
    },
    tagRouter () {
      //console.info("=======tagRouter=======:"+JSON.stringify(this.$store.state.tagRouter))
      return this.$store.state.tagRouter
    },
    userAvator () {
      //console.info("=======userAvator=======:"+JSON.stringify(OperatorUtils.getUserData().avator))
      //return OperatorUtils.getUserData().avator
      return "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png";
    },
    cacheList () {
      //return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      //console.info("=======menuList=======:"+JSON.stringify(common.constructTree(OperatorUtils.getMenuData(), 'title')))
      return common.constructTree(OperatorUtils.getMenuData(), 'title');
    },
    local () {
      return this.$store.state.local
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      
      if(!canTurnTo(name)){//没有权限的路由跳转到没有权限的页面
    	name="404";
      }
      
      let itemInfo = getMenuInfoByName(name);
      if(isNotBlank(itemInfo) && itemInfo.displayMode === '2'){ //0，普通内嵌，1，内嵌iframe，2，外窗口
    	  window.open(itemInfo.url);
          return
      }
      
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.turnToPage('index')
        openName = 'index'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  created(){
  },
  mounted () {
	  common.changeColor(3);  
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.homeRoute
    })
    this.setBreadCrumb(this.$route.matched)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)

  }
}
</script>
