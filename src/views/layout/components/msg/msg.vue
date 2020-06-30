<template>
  <div class="msg">
    <Poptip class="msg-list list-panel" placement="bottom-end" trigger="hover" @on-popper-show="tabPopperShow">
	  <Badge :dot="isNewMsg">
	    <Icon type="md-chatboxes" size="28"/>
	  </Badge>
	  <div class="api" slot="content">
	    <Tabs class="tabs" v-model="tabIndex">
	      <TabPane class="msg-tabpane" :label="label1" name="name1">
	        <div class="list">
	          <ul v-if="warningList.length>0">
	            <li>
	            </li>
	          </ul>
	          <div class="empty" v-else>
	            <Icon type="md-information-circle"/>
	            暂无报警
	          </div>
	        </div>
	        <router-link to="/warning/warning" class="more">
	          <Button type="text" long size="large">查看更多</Button>
	        </router-link>
	      </TabPane>
	      <TabPane class="msg-tabpane" :label="label2" name="name2">
	        <div class="list">
	          <ul v-if="backlogList.length>0">
	            <li v-for="item in backlogList" @click="gotoBacklog(item)">
	            <span style="line-height: 24px;font-weight: 800">
	              {{item.name}}
	            </span>
	              <span style="float: right">
	              {{DateUtils.getSimpleDate2(item.startTime)}}
	                <Tag :color="item.priority==1?'red':'default'">
	                {{item.priority == 0 ? '一般' : item.priority == 1 ? '重要' : ''}}
	                </Tag>
	            </span>
	              <div class="backlog-content" v-html="item.content">
	              </div>
	            </li>
	          </ul>
	          <div class="empty" v-else>
	            <Icon type="md-information-circle" />
	            暂无待办事项
	          </div>
	        </div>
	        <router-link to="/work/backlog" class="more">
	          <Button type="text" long size="large">查看更多</Button>
	        </router-link>
	      </TabPane>
	      <TabPane class="msg-tabpane" :label="label3" name="name3">
	        <ul>
	
	        </ul>
	        <!--<router-link>-->
	        <!--<Button type="text" long size="large">查看更多</Button>-->
	        <!--</router-link>-->
	      </TabPane>
	    </Tabs>
	  </div>
	</Poptip>
  </div>
</template>

<script>
import './msg.less'
import { mapActions } from 'vuex'
import DateUtils from 'utils/DateUtils';
import config from '@/config';
import Emitter from '@/utils/mixins/emitter';
import {PopupEdit} from '@/components/';

/**
 * 弹出式表单参数
 */
const tableRefOptions = {
  width: 420,
  labelWidth: 80,
  dynamic: [
    [
      {name: 'userName', hidden: true},
      {name: 'pwd', type: 'text',password:true, span: 24, label: '旧密码', rules: {required: true}},
      {name: 'newpwd', type: 'text',password:true, span: 24, label: '新密码', rules: {required: true, group: 'pwd'}},
      {name: 'newpwd2', type: 'text',password:true, span: 24, label: '再次输入新密码', rules: {required: true, group: 'pwd'}}
    ]
  ]
};

export default {
  name: 'Msg',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      label1: (h) => {
        return h('div', [
          h('Badge', {
            props: {
              dot: this.$store.state.warning.length > 0
            }
          }, [h('span', '报 警')])
        ]);
      },
      label2: (h) => {
        return h('div', [
          h('Badge', {
            props: {
              dot: this.$store.state.backlog.length > 0
            }
          }, [h('span', '待 办')])
        ]);
      },
      label3: (h) => {
        return h('div', [
          h('Badge', {
            props: {
              dot: false
            }
          }, [h('span', '消 息')])
        ]);
      },
      tableRefOptions,
      tabIndex: 0,
      DateUtils,
      levelList: null
    };
  },
  methods: {
	gotoBacklog (item) {
      this.$router.push({
        path: '/work/backlog',
        name: '待办事项',
        params: {
          backLog: item
        }
      });
    },
    gotoWarning (warning) {

    },
    tabPopperShow () {
      if (this.$store.state.warning.length > 0) {
        this.tabIndex = 'name1';
      } else if (this.$store.state.backlog.length > 0) {
        this.tabIndex = 'name2';
      }
    },
    getBreadcrumb () {
      let matched = [];
      let mainUrl = OperatorUtils.getMain();
      matched.push({name: '首 页', url: mainUrl, icon: 'home'});
      let path = this.$route.path;
      let menuData = OperatorUtils.getMenuData();
      let isEditPage = false;
      if (path.indexOf('/edit') > -1) {
        path = path.replace('/edit', '');
        isEditPage = true;
      }
      this.curPath = path;
      for (let i in menuData) {
        if (menuData[i].url === path) {
          if (menuData[i].parentId != null && menuData[i].parentId > 0) {
            for (let j in menuData) {
              if (menuData[i].parentId === menuData[j].id) {
                matched.push({name: menuData[j].name, url: menuData[j].url, icon: menuData[j].icon});
              }
            }
          }
          let md = {name: menuData[i].name, url: menuData[i].url};
          matched.push(md);
          this.addTab(md);
        }
      }
      if (matched.length === 1 && path !== mainUrl) {
        matched.push({name: this.$route.name, url: path});
      }
      if (isEditPage) {
        matched.push({name: this.$route.query.action.title, url: this.$route.path});
      }
      this.levelList = matched;
    },
    addTab (data) {
      if (!this.showTabs || data === null) {
        return;
      }
      for (let i in this.pathList) {
        if (this.pathList[i].url === data.url) {
          return;
        }
      }
      if (this.pathList.length > 8) {
        this.pathList.splice(0, 1);
      }
      this.pathList.push(data);
    }
  },
  components: {
    PopupEdit
  },
 computed: {
   warningList () {
     return this.$store.state.warning;
   },
   backlogList () {
     if (this.$store.state.backlog != null) {
       return this.$store.state.backlog.slice(0, 4);
     }
     return this.$store.state.backlog;
   },
   isNewMsg () {
     if (this.$store.state.backlog.length > 0 || this.$store.state.warning.length > 0) {
       return true;
     } else {
       return false;
     }
   }
 },
 created () {
 	this.getBreadcrumb();
 }
}
</script>
