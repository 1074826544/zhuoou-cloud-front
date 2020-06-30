<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div class="dict-content">
    <CrudView ref='crudView' :tableOptions="tableOptions">
      <template slot='toolbar'>
        <Poptip confirm title="您确认清除日志吗？" @on-ok="tableDelData()" placement="bottom-start" transfer>
	  	  <PermsValid perms-name="sysLoginLog:deleteAll">
	  	    <i-button icon="ios-trash">清除日志 </i-button>
	  	  </PermsValid>
	    </Poptip>
	  </template>
	</CrudView>
  </div>
</template>

<script>
    /**
     * 表格参数
     */
    const tableOptions = {
        title:'用户登录日志',
        pageSize: 20,
        permsPrefix:'sysLoginLog',
        dataUrl: '/sys/sysLoginLog/list',
        selection: [],
        param: {},
        columns: [
            {type: 'selection', width: 60, align: 'center'},
            {key: 'logonId', title: '登录帐号', width: 130},
			{key: 'operType', title: '操作类型', dict: 'log_op_type', width: 100},
			{key: 'resultType', title: '结果', dict: 'log_result_type', width: 65},
			{key: 'remoteAddr', title: 'IP地址', width: 130},
			{key: 'operTime', title: '操作时间', width: 160},
			{key: 'browserType', title: '浏览器', width: 90},
			{key: 'userAgent', title: '用户代理', width: 90},
			{key: 'loginType', title: '登录类型', width: 90},
			{key: 'equipment', title: '设备', width: 65},
			{key: 'remarks', title: '备注'}
        ],
        searchDynamic: [
            [
             {name: 'logonId', label: '登录帐号', span: 6 ,type: 'text'},
             {name: 'operType', label: '操作类型', span: 6 ,type: 'select', dict: 'log_op_type'},
             {name: 'resultType', label: '结果', span: 6 ,type: 'select', dict: 'log_result_type'},
             {name: 'opDate', label: '操作时间', span: 4, type: 'datetimerange', format: 'yyyy-MM-dd'}
            ],
            [
             {name: 'loginType', label: '登录类型', span: 6 ,type: 'text'},
             {name: 'equipment', label: '设备', span: 6 ,type: 'text'},
            ]
        ]
    };
    import {CrudView, PermsValid} from 'components/';
    export default {
        data () {
            return {
                tableOptions
            }
        },
        computed: {},
        methods: {
          tableDelData () {
            this.$http.apiDelete('/sys/sysLoginLog/deleteAll').then((res) => {
              this.loading = false;
              if (res.code!=200) {
                this.$http.handleError(res);
              } else {
                this.$Message.success('清除成功');
                this.$refs['crudView'].$refs['crudTable'].refreshTable();
              }
            });
          },
        },
        mounted () {},
        components: {CrudView,PermsValid}
    };
</script>
