<template>
  <div class="dict-content">
    <CrudView ref="crudView" :tableOptions="tableOptions">
      <template slot='toolbar'>
        <PermsValid perms-name="sysDictItem:list">
    	  <i-button @click="batchGenCode" type='info' shape='circle' icon='md-clipboard' :disabled='isMultiple'>生成代码</i-button>
    	</PermsValid>
      </template>
    </CrudView>
  </div>  
</template>
<script>
  /**
   * 数据字典表格参数
   */
  const tableOptions = {
    selection: [],
    pageSize: 20,
    title: '代码生成',
    dataUrl: '/generator/gen/list',
    param: {},
    columns: [
      {type: 'selection', width: 60, align: 'center'},
      {key: 'tableName', title: '表名'},
      {key: 'tableComment', title: '表备注'},
      {key: 'createDate', title: '创建时间'},
    ],
    searchDynamic: [
      [
        {name: 'tableName', label: '表名', span: 6, type: 'text'},
        {name: 'tableComment', label: '表备注', span: 6, type: 'text'}
      ]
    ]
  };
  
  import {CrudView, PermsValid} from 'components/';
  import { isNotBlank } from '@/utils/util'
  export default {
    data () {
      return {
        tableOptions,
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
    	batchGenCode () {
          let selection = this.tableOptions.selection;
          if (selection != null) {
	          let tableNames = "";
	          for (let i = 0; i < selection.length; i++) {
	        	  if(isNotBlank(tableNames)){
	        		  tableNames += ","+selection[i].tableName;
	        	  }else{
	        		  tableNames += selection[i].tableName;
	        	  }
	          }
	          this.$http.apiDownload('/generator/gen/batchGenCode', {tableNames: tableNames},'zhuoou-'+this.getNowDate()+'.zip');
          }
    	},
    	getNowDate (){
    		const d = new Date()
		    const year = d.getFullYear();
		    const month = this.getHandledValue(d.getMonth() + 1);
		    const date = this.getHandledValue(d.getDate());
		    const hours = this.getHandledValue(d.getHours());
		    const minutes = this.getHandledValue(d.getMinutes());
		    const second = this.getHandledValue(d.getSeconds());
		    return year + month + date + hours + minutes + second;
    	},
    	getHandledValue(num){
    		return num < 10 ? '0' + num : num;
		}
    },
    mounted () {
    },
    components: {CrudView,PermsValid}
  };
</script>