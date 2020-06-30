<style scoped>

</style>

<template>
  <div class="main-view main-view-full" style="padding-top: 50px">
    <row>
    </row>
  </div>
</template>
<template>
	<div class="menu-content">
	  <CrudView :treeOptions="treeOptions">
	  </CrudView>
	</div>
</template>

<script>
  import {CrudView,PopupIcon} from 'components/';
  
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
  
  export default {
    data () {
      return {
    	  treeOptions,
      };
    },
    computed: {},
    methods: {},
    mounted () {
    },
    components: {CrudView,PopupIcon}
  };
</script>
