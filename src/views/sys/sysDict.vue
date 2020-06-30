<style scoped>

</style>
<style>
  .dict-item-modal .ivu-modal-footer {
    display: none !important;
  }
  .dict-item-modal {
    padding: 5px !important;
  }
  .dict-item-modal .main-view-full{
    min-height:150px!important;
  }
  .dict-item-modal .curd-view-full{
  	padding: 5px 5px!important;
  }
  .dict-item-modal .ivu-modal-body{
  	padding: 0px!important;
  }
  .dict-item-modal .ivu-form-item-content{
    margin-left: 5px !important;
  }
  .dict-item-modal .ivu-modal-body {
    max-height: calc(85vh - 200px);
    overflow: auto;
  }
</style>

<style lang="less">
    .dict-item-modal{
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
    <CrudView ref="crudView" :tableOptions="tableOptions">
      <template slot='toolbar'>
        <PermsValid perms-name="sysDictItem:list">
    	  <i-button @click="showDictItem" type='primary' shape='circle' icon='md-clipboard' :disabled='isSingle'>字典项</i-button>
    	</PermsValid>
      </template>
    </CrudView>
    <Modal class-name="dict-item-modal" width="1000px;" title="字典项" v-model="itemModalVisible">
      <CrudView ref="crudViewItem" :tableOptions="dictItemTableOptions" style="height:560px;overflow-y:auto;overflow-x:hidden;">
      </CrudView>
    </Modal>
  </div>  
</template>

<script>
  /**
   * 弹出式表单参数
   */
  const tableEditOptions = {
    width: 450,
    labelWidth: 80,
    dynamic: [
      [
        {name: 'id', hidden: true},
        {name: 'dictCode', type: 'text', span: 20, label: '字典编码', rules: {required: true}},
        {name: 'dictName', type: 'text', span: 20, label: '字典名称', rules: {required: true}},
        {name: 'showOrder', type: 'number', span: 20, label: '显示顺序', min: 0,max: 100000},
        {name: 'remarks', type: 'text', textarea: {minRows: 2, maxRows: 3}, span: 20, label: '备注'}
      ]
    ]
  };
  /**
   * 数据字典表格参数
   */
  const tableOptions = {
    selection: [],
    pageSize: 20,
    title: '数据字典',
    permsPrefix: 'sysDict',
    editOptions: tableEditOptions,
    dataUrl: '/sys/sysDict/list',
    createUrl: '/sys/sysDict/create',
    deleteUrl: '/sys/sysDict/delete',
    updateUrl: '/sys/sysDict/update',
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'dictCode', title: '字典编码', width: 150},
      {key: 'dictName', title: '字典名称', width: 150},
      {key: 'showOrder', title: '显示顺序', width: 90},
      {key: 'remarks', title: '备注'}
    ],
    searchDynamic: [
      [
        {name: 'dictCode', label: '字典编码', span: 6, type: 'text'},
        {name: 'dictName', label: '字典名称', span: 6, type: 'text'}
      ]
    ]
  };
  /**
   * 字典项编辑参数
   */
  const dictItemTableEditOptions = {
    width: 450,
    labelWidth: 90,
    dynamic: [
      [
        {name: 'id', hidden: true},
        {name: 'dictId',hidden: true},
        {name: 'itemCode', type: 'text', span: 20, label: '字典项编码', rules: {required: true}},
        {name: 'itemValue', type: 'text', span: 20, label: '字典项值', rules: {required: true}},
        {name: 'showOrder', type: 'number', span: 20, label: '显示顺序', min: 0,max: 100000},
        {name: 'remarks', type: 'text', textarea: {minRows: 2, maxRows: 3}, span: 20, label: '备注'}
      ]
    ]
  };
  /**
   * 字典项表格参数
   */
  const dictItemTableOptions = {
    selection: [],
    pageSize: 10,
    title: '字典项',
    height: 412,
    permsPrefix:'sysDictItem',
    editOptions: dictItemTableEditOptions,
    dataUrl: '/sys/sysDictItem/list',
    createUrl: '/sys/sysDictItem/create',
    deleteUrl: '/sys/sysDictItem/delete',
    updateUrl: '/sys/sysDictItem/update',
    param: {dictId:''},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'itemCode', title: '字典项编码', width: 150},
      {key: 'itemValue', title: '字典项值', width: 150},
      {key: 'showOrder', title: '显示顺序', width: 90},
      {key: 'remarks', title: '备注'}
    ],
    searchDynamic: [
      [
        {name: 'itemCode', label: '字典项编码', span: 6, type: 'text'},
        {name: 'itemValue', label: '字典项值', span: 6, type: 'text'}
      ]
    ]
  };
  
  
  import {CrudView, PermsValid} from 'components/';
  
  export default {
    data () {
      return {
        tableOptions,
        itemModalVisible: false,
        dictItemTableOptions,
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
      showDictItem () {
        let selection = this.tableOptions.selection;
        this.dictItemTableOptions.param.dictId = selection[0].id;
        this.itemModalVisible = true;
      },
    },
    mounted () {
    },
    components: {CrudView,PermsValid}
  };
</script>
