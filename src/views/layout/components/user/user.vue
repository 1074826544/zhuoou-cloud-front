<template>
  <div class="user-avator-dropdown">
  <Dropdown class="user-panel list-panel" style="color:black">
	 <Avatar icon="md-person" style="background-color: #5c6b77" :src="userAvator"/>
	 <span class="user-name">{{userData.userName}}</span>
	 <Icon size="18" type="md-arrow-dropdown"></Icon>
     <DropdownMenu slot="list">
	   <DropdownItem name="1" @click.native="passwd">修改密码</DropdownItem>
	   <DropdownItem name="2" @click.native="logout">退出登录</DropdownItem>
	 </DropdownMenu>
	</Dropdown>
	<!--弹出式编辑框-->
	<PopupEdit ref="tablePopupEdit"
	           :width="tableRefOptions.width"
	           :dynamic="tableRefOptions.dynamic"
	           :label-width="tableRefOptions.labelWidth">
	</PopupEdit>
  </div>
</template>

<script>
import './user.less'
import DateUtils from 'utils/DateUtils';
import config from '@/config';
import Emitter from '@/utils/mixins/emitter';
import {PopupEdit} from '@/components/';
import { mapActions,mapMutations } from 'vuex'

/**
 * 弹出式表单参数
 */
const tableRefOptions = {
  width: 450,
  labelWidth: 85,
  dynamic: [
    [
      {name: 'id',hidden :true},
      {name: 'userName',hidden :true},
      {name: 'pwd', type: 'text',password:true, span: 24, label: '旧密码', rules: {required: true}},
      {name: 'newpwd', type: 'text',password:true, span: 24, label: '新密码', rules: {required: true, group: 'pwd'}},
      {name: 'newpwd2', type: 'text',password:true, span: 24, label: '确认新密码', rules: {required: true, group: 'pwd'}}
    ]
  ]
};

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableRefOptions,
      userData: OperatorUtils.getUserData()
    };
  },
  methods: {
	...mapMutations([
      'clearAll'
    ]),
    passwd () {
	  this.$refs.tablePopupEdit.dynamic[0][0].value = this.userData.id;
	  this.$refs.tablePopupEdit.dynamic[0][1].value = this.userData.userName;
	  this.$refs.tablePopupEdit.open({
	    title: '修改密码',
	    postUrl: '/sys/sysUser/updatePwd'
	  });
	},
    logout () {
      this.$http.apiPost(config.api.userLogout, null).then((res) => {
        this.loading = false;
        if (res.code!=200) {
          this.$http.handleError(res);
        } else {
          this.clearSys();
          this.$router.push({path: '/login'});
        }
      });
    },
    clearSys(){//清理缓存信息
      this.clearAll();
    }
  },
  components: {
    PopupEdit
  }
}
</script>
