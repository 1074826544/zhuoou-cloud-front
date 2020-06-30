<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <CrudView ref='crudView' :tableOptions='tableOptions'>
    <template slot='toolbar'>
      <PermsValid perms-name="sysAttach:delete">
        <Poptip confirm title="您确认删除选中的内容吗？" @on-ok="tableDelData()" placement="bottom-start" transfer>
          <i-button icon="ios-trash">删除垃圾文件 </i-button>
        </Poptip>
      </PermsValid>
    </template>
  </CrudView>
</template>
<script>
  /**
   * 表格参数
   */
  const tableOptions = {
    title: '附件列表',
    pageSize: 20,
    labelWidth: 80,
    permsPrefix: 'sysAttach',
    dataUrl: '/sys/sysAttach/list',
    selection: [],
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'name', title: '附件名', width: 300},
      {
        key: 'size',
        title: '文件大小',
        width: 140,
        render (h, params) {
          const row = params.row;
          if (row.size != null && row.size > 0) {
            return h('span', Math.floor(row.size / 1024) + 'KB');
          }
        }
      },
      {key: 'extention', title: '文件后缀', width: 100},
      {key: 'exist', title: '文件是否存在', width: 130},
      {key: 'count', title: '文件是否有使用', width: 140, enum: ['否', '是', '是', '是', '是']},
      {key: 'creatorName', title: '创建人', width: 100},
      {key: 'createTime', title: '创建时间', width: 160},
      {key: 'path', title: '路径', width: 390},
      {key: 'remarks', title: '备注', width: 200}
    ],
    searchDynamic: [
      [
        {name: 'path', label: '路径', span: 4, type: 'text'},
        {name: 'name', label: '附件名', span: 4, type: 'text'},
        {name: 'size', label: '文件大小', span: 4, type: 'text'},
        {name: 'extention', label: '文件后缀', span: 4, type: 'text'},
        {name: 'note', label: '备注', span: 4, type: 'text'}
      ]
    ]
  };
  import {CrudView, PermsValid} from 'components/';

  export default {
    data () {
      return {
        tableOptions
      };
    },
    computed: {},
    methods: {
      tableDelData () {
    	let selection = this.getSelection();
    	if (selection != null) {
    		let ids = [];
            for (let i = 0; i < selection.length; i++) {
              let obj = selection[i];
              ids.push(obj.id);
            }
    		this.$http.apiDelete('/sys/sysAttach/delete', {ids: ids.toString()}).then((res) => {
    			this.loading = false;
    			if (res.code!=200) {
    				this.$http.handleError(res);
    			} else {
    				this.$Message.success('删除成功');
    				this.$refs['crudView'].$refs['crudTable'].refreshTable();
    			}
    		});
    	}
      },
      getSelection() {
        if (this.tableOptions.selection.length <= 0) {
          this.$Message.error('未选择操作项！');
          return null;
        } else {
          return this.tableOptions.selection;
        }
      }
    },
    mounted () {
    },
    components: {CrudView, PermsValid}
  };
</script>
