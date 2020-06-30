<style scoped>
</style>
<style>

</style>
<template>
	<div class="menu-content">
	  <CrudView :tableOptions="tableOptions" :treeOptions="treeOptions">
	  </CrudView>
	</div>
</template>
<script>
  /**
   * 弹出式表单参数
   */
  const tableEditOptions = {
    width: 600,
    labelWidth: 80,
    dynamic: [
      [
        {name: 'id', hidden: true},
        {
          name: 'name',
          type: 'text',
          span: 12,
          label: '资源名',
          rules: {required: true}
        },
        {name: 'parentId', type: 'treeSelect', dataFromTree: true, span: 12, label: '父资源'}
      ],
      [
        {name: 'url', type: 'text', span: 24, label: '菜单Url'}
      ],
      [
        {name: 'identity', type: 'text', span: 12, label: '标识符'},
        {name: 'icon', type: 'iconSelect', span: 12, label: '图标', readonly :true}
      ],
      [
        {name: 'weight', type: 'number', span: 12, label: '显示顺序', min: 0,max: 100000},
        {
     	  name: 'outLink',
     	  openText: '是',
     	  closeText: '否',
     	  type: 'switch',
     	  span: 12,
     	  label: '外部链接',
     	  value: '0',
     	  trueValue: '1',
     	  falseValue: '0'
        }
      ],
      [
        {
         name: 'status',
         openText: '显示',
         closeText: '隐藏',
         type: 'switch',
         span: 12,
         label: '状态',
         value: '1',
         trueValue: '1',
         falseValue: '0'
        },
        {
         name: 'menuType',
         type: 'radio',
         span: 12,
         label: '类型',
         value: '1',
         dict: 'menu_type',
         rules: {required: true, type: 'string'}
        }
      ],
      [
       {
    	 name: 'displayMode',
    	 type: 'radio',
    	 span: 24,
    	 label: '显示方式',
    	 value: '0',
    	 dict: 'display_mode',
    	 rules: {required: true, type: 'string'}
       }
      ]
    ]
  };
  
  /**
   * 树参数
   */
  const treeOptions = {
    title: '菜单配置',
    dataUrl: '/sys/sysMenu/listAll',
    createUrl: '/sys/sysMenu/create',
    deleteUrl: '/sys/sysMenu/delete',
    updateUrl: '/sys/sysMenu/update',
    showToolbar: true,
    editOptions: tableEditOptions
  };
  /**
   * 表格参数
   */
  const tableOptions = {
    editOptions: tableEditOptions,
    selection: [],
    pageSize: 20,
    title: '菜单配置',
    permsPrefix: 'sysMenu',
    dataUrl: '/sys/sysMenu/list',
    createUrl: '/sys/sysMenu/create',
    deleteUrl: '/sys/sysMenu/delete',
    updateUrl: '/sys/sysMenu/update',
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'name', title: '资源名', minWidth: 160, maxWidth: 280},
      {key: 'menuType',width: 80,title: '类型',dict: 'menu_type'},
      {key: 'identity', title: '标识符', width: 210},
      {key: 'url', title: '菜单Url', minWidth: 240, maxWidth: 400},
      {key: 'parentId', title: '父资源', width: 160, dataFromTree: true},
      {
        key: 'icon',
        width: 90,
        title: '菜单图标',
        render: (h, params) => {
          const row = params.row;
          return h('Icon', {
            props: {
              type: row.icon,
              size: 18
            }
          });
        }
      },
      {key: 'weight', title: '权重', width: 80},
      {key: 'status',width: 80, title: '状态',dict:'menu_status'},
      {key: 'outLink',width: 90,title: '外部链接',dict: 'out_link'},
      {key: 'displayMode',  width: 100, title: '显示方式',dict: 'display_mode'}
    ],
    searchDynamic: [
      [
        {name: 'name', label: '资源名', span: 4, type: 'text'},
        {name: 'identity', label: '标识符', span: 4, type: 'text'},
        {name: 'url', label: 'Url', span: 4, type: 'text'},
        {name: 'status',type: 'select',dict: 'menu_status',span: 4,label: '状态'},
        {name: 'menuType',type: 'select',dict: 'menu_type',span: 4,label: '类型'}
      ]
    ]
  };

  import {CrudView,PopupIcon} from 'components/';

  export default {
    data () {
      return {
        tableOptions,
        treeOptions,
        popupIconVisible: false,
      };
    },
    computed: {},
    methods: {},
    mounted () {
    },
    components: {CrudView,PopupIcon}
  };
</script>
