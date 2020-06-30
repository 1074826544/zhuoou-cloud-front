<style scoped>

</style>
<style>
  .oauth-item-modal .ivu-modal-footer {
    display: none !important;
  }

  .oauth-item-modal {
    padding: 5px !important;
  }
  .oauth-item-modal .main-view-full{
    min-height:250px!important;
  }
  .oauth-item-modal .curd-view-full{
  	padding: 5px 5px!important;
  }
  .oauth-item-modal .ivu-modal-body{
  	padding: 0px!important;
  }
  .oauth-item-modal .ivu-form-item-content{
    margin-left: 5px !important;
  }
  .oauth-item-modal .ivu-modal-body {
	    max-height: calc(88vh - 200px);
	    overflow: auto;
  }
</style>
<style lang="less">
    .oauth-item-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>

<template>
  <div class="online-centent">
    <CrudView ref='crudView' :tableOptions='tableOptions'>
      <template slot='toolbar'>
	  	<span style="padding-left: 10px"></span>
	  	  <PermsValid perms-name="sysOauthUsers:listByUsername">
            <i-button @click="showOauths" type='primary' icon='md-clipboard' :disabled='isSingle'>认证信息</i-button>
          </PermsValid>
      </template>
    </CrudView>
  	<Modal class-name="oauth-item-modal" width="1000px;" title="认证信息" v-model="oauthModalVisible">
      <CrudView ref='oauthsCrudView' :tableOptions="oauthItemTableOptions">
	    <template slot='toolbar'>
	      <PermsValid perms-name="sysOauthUsers:removeOauths">
		      <i-button @click="removeOauths" type="warning" icon="ios-trash" :disabled="isOauthMultiple">移除</i-button>
	      </PermsValid>
	    </template>
	  </CrudView>
    </Modal>
  </div>
</template>

<script>


  /**
   * 表格参数
   */
  const oauthItemTableOptions = {
    selection: [],
    labelWidth: 70,
    pageSize: 20,
    title: '认证信息',
    permsPrefix: 'sysUser',
    dataUrl: '/sys/sysOauthUsers/listByUsername',
    param: {username:''},
    showPage:false,
    showSearch:false,
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'username', title: '用户名', width: 120},
      {key: 'clientId', title: 'clientId', width: 120},
	  {key: 'clientSecret', title: 'clientSecret', width: 120},
	  {key: 'scope', title: 'scope', width: 100},
	  {key: 'authorizedGrantTypes', title: 'authorizedGrantTypes', width: 410},
      {key: 'accessToken', title: 'token', width: 300},
      {key: 'refreshToken', title: 'refreshToken', width: 300},
      {key: 'expiration', title: '过期时间expiration', width: 155},
      {key: 'expiresIn', title: '剩余时间expiresIn（秒）', width: 190}
    ]
  };
  
  /**
   * 表格参数
   */
  const tableOptions = {
    selection: [],
    labelWidth: 70,
    pageSize: 20,
    title: '认证用户',
    permsPrefix: 'sysUser',
    dataUrl: '/sys/sysOauthUsers/list',
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'username', title: '用户名'},
      {key: 'name', title: '姓名'},
      {key: 'status', title: '状态', enum: [{value: '正常', id: '1'}, {value: '禁用', id: '0'}]},
      {key: 'email', title: '邮箱'},
      {key: 'mobile', title: '手机号码'},
      {key: 'loginCount', title: '登录次数'},
      {key: 'loginFailureCount', title: '失败次数'}
    ],
    searchDynamic: [
      [
        {name: 'username', label: '用户名', span: 6, type: 'text'},
        {name: 'email', label: '邮箱', span: 6, type: 'text'},
        {name: 'mobile', label: '手机号码', span: 6, type: 'text'}
      ]
    ]
  };

  import {CrudView, PermsValid} from 'components/';

  export default {
    data() {
      return {
        tableOptions,
        oauthItemTableOptions,
        oauthModalVisible: false
      };
    },
    computed: {
      isSingle () {
        return !(this.tableOptions.selection !== null && this.tableOptions.selection.length === 1);
      },
      isMultiple () {
        return !(this.tableOptions.selection != null && this.tableOptions.selection.length > 0);
      },
      isOauthSingle () {
        return !(this.oauthItemTableOptions.selection !== null && this.oauthItemTableOptions.selection.length === 1);
      },
      isOauthMultiple () {
        return !(this.oauthItemTableOptions.selection != null && this.oauthItemTableOptions.selection.length > 0);
      }
    },
    methods: {
      showOauths(){
        let selection = this.tableOptions.selection;
        this.oauthItemTableOptions.param.username = selection[0].username;
        this.oauthModalVisible = true;
      },
      removeOauths(){
      	if(this.oauthItemTableOptions.param.username==='admin'){
      		this.$Message.info('admin账户认证信息不能被移除！');
      	}else{
	        let selection = this.getSelection();
	    	if (selection != null) {
	    		let tokens = [];
	            for (let i = 0; i < selection.length; i++) {
	              let obj = selection[i];
	              tokens.push(obj.accessToken);
	            }
	    		this.$http.apiDelete('/sys/sysOauthUsers/removeOauths/'+tokens.toString(), {}).then((res) => {
	    			this.loading = false;
	    			if (res.code!=200) {
	    				this.$http.handleError(res);
	    			} else {
	    				this.$Message.success('移除成功');
	    				this.$refs['oauthsCrudView'].$refs['crudTable'].refreshTable();
	    				this.$refs['crudView'].$refs['crudTable'].refreshTable();
	    			}
	    		});
	    	}
      	}
      },
      getSelection() {
        if (this.oauthItemTableOptions.selection.length <= 0) {
          this.$Message.error('未选择操作项！');
          return null;
        } else {
          return this.oauthItemTableOptions.selection;
        }
      }
    },
    created() {
    },
    components: {CrudView, PermsValid}
  };
</script>
