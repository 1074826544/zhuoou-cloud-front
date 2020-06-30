<style rel="stylesheet/scss" lang="scss" scoped>

</style>
<style>
.log-item-modal .ivu-modal-footer {
  display: none !important;
}
.log-item-modal .content-div{
    min-height:350px!important;
	max-height:650px!important;
    max-width:650px!important;
}
.log-item-modal .content-div span{
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.log-item-modal {
  padding: 5px !important;
}
.log-item-modal .curd-view-full{
  padding: 5px 5px!important;
}
.log-item-modal .ivu-modal-body{
  padding: 0px!important;
}
.log-item-modal .ivu-form-item-content{
  margin-left: 5px !important;
}
.log-item-modal .ivu-modal-body {
  max-height: calc(80vh - 200px);
  overflow: auto;
}
</style>
<style lang="less">
.log-item-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
</style>
<template>
  <div class="dict-content">
    <CrudView ref='crudView' :tableOptions="tableOptions">
      <template slot='toolbar'>
      <PermsValid perms-name="sysLog:showContent">
      	<i-button @click="showLogContent" type='primary' shape='circle' icon='md-clipboard' :disabled='isSingle'>日志内容</i-button>
      </PermsValid>
  	  <Poptip confirm title="您确认清除日志吗？" @on-ok="tableDelData()" placement="bottom-start" transfer>
  	  	<PermsValid perms-name="sysLog:deleteAll">
  	  	  <i-button icon="ios-trash">清除日志 </i-button>
  	  	</PermsValid>
  	  </Poptip>
  	</template>
    </CrudView>
    <Modal class-name="log-item-modal" width="700px;" title="日志内容" v-model="itemModalVisible">
    	<div class="content-div">
	    	<span>{{logContent}}</span>
    	</div>
    </Modal>
  </div>
</template>

<script>
  /**
   * 表格参数
   */
  const tableOptions = {
    title: '操作日志',
    pageSize: 20,
    labelWidth: 65,
    permsPrefix: 'sysLog',
    dataUrl: '/sys/sysLog/list',
    selection: [],
    param: {},
    columns: [
      {key: 'operation', title: '操作项'},
      {key: 'createDate', title: '操作时间',sortable: true},
      {key: 'creatorName', title: '操作人'},
      {key: 'ip', title: '操作者IP'},
      {key: 'method', title: '提交方式'},
      {key: 'type', title: '日志类型', dict: 'log_type'}
    ],
    searchDynamic: [
      [
        {name: 'operation', label: '操作项', span: 4, type: 'text'},
        {name: 'opDate', label: '操作时间', span: 4, type: 'datetimerange', format: 'yyyy-MM-dd'},
        {name: 'creatorName', label: '操作人', span: 4, type: 'text'},
        {name: 'content', label: '日志内容', span: 4, type: 'text'}
      ]
    ]
  };
  import {CrudView, PermsValid} from 'components/';

  export default {
    data () {
      return {
        tableOptions,
        itemModalVisible: false,
        logContent: ''
      };
    },
    computed: {
      isSingle () {
        return !(this.tableOptions.selection !== null && this.tableOptions.selection.length === 1);
      },
      isMultiple () {
        return !(this.tableOptions.selection != null && this.tableOptions.selection.length > 0);
      }
    },
    methods: {
      tableDelData () {
        this.$http.apiDelete('/sys/sysLog/deleteAll').then((res) => {
          this.loading = false;
          if (res.code!=200) {
            this.$http.handleError(res);
          } else {
            this.$Message.success('清除成功');
            this.$refs['crudView'].$refs['crudTable'].refreshTable();
          }
        });
      },
      showLogContent(){
    	  this.itemModalVisible = true;
    	  let selection = this.tableOptions.selection;
          this.logContent = selection[0].content;
      }
    },
    mounted () {
    },
    components: {CrudView,PermsValid}
  };
</script>
