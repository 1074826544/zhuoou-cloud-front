<style scoped>
  .sd {
    display: block;
  }
</style>

<template>
  <CrudView ref='crudView' :tableOptions='tableOptions'>
    <template slot='toolbar'>
      <Modal title='角色资源' v-model='editVisible'
             class-name='vertical-center-modal'
             width='400'
             :loading='editLoading'
             @on-ok='roleResEditOk'>

        <DataTree v-model='menuIds'
                  ref='menuTree'
                  style='height:400px;overflow: auto'
                  dataUrl='/sys/sysRoleMenu/getRoleMenu'
                  @on-data-loaded='treeLoaded'
                  show-checkbox
                  lazy>

        </DataTree>
      </Modal>
      <i-button icon='ios-person' @click='roleResEdit()' :disabled='isSingle'>角色资源
      </i-button>
    </template>
  </CrudView>
</template>
<script>
  /**
   * 弹出式表单参数
   */
  const tableEditOptions = {
    tabsEditPage: true,
    width: 900,
    labelWidth: 80,
    title: '角色',
    dynamic: [
      [
        {name: 'id', hidden: true},
        {name: 'name', type: 'text', span: 8, label: '角色名', rules: {required: true}},
        {name: 'role', type: 'text', span: 8, label: '角色标识', rules: {required: true}},
        {
        	name: 'status',
        	openText: '启用',
        	closeText: '禁用',
        	type: 'switch',
        	span: 8,
        	label: '角色状态',
        	value: '1',
        	trueValue: '1',
        	falseValue: '0',
        	rules: {required: true, type: 'string'}
        },
        {name: 'description', type: 'editor', textarea: {minRows: 2, maxRows: 3}, span: 24, label: '角色描述'}
      ]
    ]
  };
  /**
   * 树参数
   */
  const treeOptions = {
    dataUrl: '/sys/sysRole/list'
  };
  /**
   * 表格参数
   */

  const tableOptions = {
    selection: [],
    pageSize: 20,
    labelWidth: 70,
    title: '角色管理',
    permsPrefix: 'sysRole',
    editOptions: tableEditOptions, 
    dataUrl: '/sys/sysRole/list',
    createUrl: '/sys/sysRole/create',
    deleteUrl: '/sys/sysRole/delete',
    updateUrl: '/sys/sysRole/update',
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'name', title: '角色名', align: 'center', width: 180, sortable: true},
      {key: 'role', title: '角色标识', align: 'center', width: 240, sortable: true},
      {key: 'status',title: '角色状态',align: 'center',width: 180, sortable: true,dict: 'role_status'},
      {key: 'description', title: '角色描述', align: 'center',sortable: true}
    ],
    searchDynamic: [
      [
        {name: 'name', type: 'text', span: 6, label: '角色名'},
        {name: 'description', label: '角色描述', span: 6, type: 'text'},
        {name: 'status',label: '角色状态',span: 6,type: 'select',dict: 'role_status'}
      ]
    ]
  };

  import {CrudView, DataTree} from 'components/';
  import utils from '@/utils/common';

  export default {
    data () {
      return {
        tableOptions,
        treeOptions,
        editVisible: false,
        editLoading: true,
        menuIds: []
      };
    },
    computed: {
      isSingle () {
        return !(this.tableOptions.selection != null && this.tableOptions.selection.length === 1);
      }
    },
    methods: {
      treeLoaded (rows, res) {
        for (let i = 0; i < rows.length; i++) {
          if ((rows[i].menuType === 2 || !utils.isNotChilden(rows, rows[i].id)) && res.datas.selected != null && res.datas.selected.contains(rows[i].id)) {
            //console.log(rows[i]);
            this.$set(rows[i], 'checked', true);
          }
        }
      },
      roleResEdit () {
        let selection = this.$refs.crudView.getSelection();
        if (selection != null) {
          this.$refs.menuTree.queryData({roleId: selection[0].id});
          this.editVisible = true;
        }
      },
      roleResEditOk () {
        let selection = this.$refs.crudView.getSelection();
        let checkedNodes = this.$refs.menuTree.getCheckedNodes(true);
        let ids = [];
        for (let i = 0; i < checkedNodes.length; i++) {
          ids.push(checkedNodes[i].id);
        }
        let param = {
          ids: ids.toString(),
          roleId: selection[0].id
        };
        this.$http.apiPost('/sys/sysRoleMenu/saveRoleMenu', param).then((res) => {
          this.editLoading = false;
          if (res.code!=200) {
            this.$http.handleError(res);
            setTimeout(() => {
              this.editLoading = true;
            }, 100);
          } else {
            this.$Message.success('提交成功');
            this.editVisible = false;
          }
        });
      }
    },
    mounted () {
    },
    components: {CrudView, DataTree}
  };
</script>
