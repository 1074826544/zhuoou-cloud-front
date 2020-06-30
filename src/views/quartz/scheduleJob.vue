<style scoped>

</style>
<style>
  .cron-modal {
    z-index: 8058 !important;
  }

  .cron-modal .ivu-modal-body {
    padding: 10px 0px 0px 0px;
  }

  .cron-modal .ivu-modal-close, .log-modal .ivu-modal-footer {
    display: none !important;
  }

  .log-modal .ivu-modal-body {
    padding: 5px !important;
  }
</style>

<style lang="less">
.log-modal, .cron-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
        top: 0;
    }
}
</style>

<template>
  <div class="schedule-centent">
    <CrudView ref='crudView' :tableOptions='tableOptions'>
      <template slot='toolbar'>
        <span style="padding-left: 10px"></span>
        <i-button @click="runClick" type='primary' shape='circle' icon='md-hammer' :disabled='isMultiple'>执行
        </i-button>
        <i-button @click="resumeClick" type='primary' shape='circle' icon='md-play' :disabled='isMultiple'>运行
        </i-button>
        <i-button @click="pauseClick" type='primary' shape='circle' icon='md-pause' :disabled='isMultiple'>暂停
        </i-button>
        <span style="padding-left: 10px"></span>
        <i-button @click="logClick" type='primary' shape='circle' icon='md-clipboard' :disabled='isSingle'>执行日志
        </i-button>
      </template>
    </CrudView>
    <Modal class-name="vertical-center-modal cron-modal" width="400" v-model="cronSelect" @on-ok="changeCron">
      <Cron ref='cron'></Cron>
    </Modal>

    <Modal class-name="log-modal" width="80%" title="定时任务执行日志" v-model="logModalVisible">
      <DataTable lazy :param="{scheduleJobId:jobId}" :height="450" :columns="logColumns"
                 dataUrl="/quartz/scheduleLog/list"></DataTable>
      <span slot="footer">
      </span>
    </Modal>


  </div>

</template>

<script>
  import Spin from 'iview/src/components/spin/spin';

  let self = null;

  const logColumns = [
    {type: 'selection', width: 60, align: 'center'},
    {key: 'jobName', title: '任务名称', minWidth: 150},
    {key: 'jobClass', title: 'Bean名', minWidth: 150},
    {key: 'jobMethod', title: '任务执行的方法', minWidth: 100},
	{key: 'execTime', title: '执行时间', minWidth: 120},
	{key: 'endTime', title: '执行结束时间', minWidth: 120},
	{key: 'status', title: '状态', minWidth: 80,dict:'qrt_log_status'},
	{key: 'exceptionStackTrace', title: '异常文本', minWidth: 250}
  ];

  /**
   * 弹出式表单参数
   */
  const tableEditOptions = {
    width: 680,
    labelWidth: 90,
    opened () {
      self.$refs['cron'].reset();
    },
    dynamic: [
      [
        {name: 'id', hidden: true},
        {name: 'jobName', type: 'text', span: 24, label: '任务名称', rules: {required: true}},
        {name: 'jobClass', type: 'text', span: 24, label: 'Bean名', rules: {required: true}},
        {name: 'jobMethod', type: 'text', span: 24, label: '方法名', rules: {required: true}},
        {
        	name: 'cronExpression',
        	type: 'popText',
        	span: 24,
        	label: 'cron表达式',
        	rules: {required: true},
        	textField: 'cronExpression',
        	onClick (fromData) {
        		self.cronSelect = true;
        		self.fromData = fromData;
        		self.cronVal = '';
        	}
        },
        {
          name: 'status',
          span: 24,
          label: '执行状态',
          type: 'switch',
          openText: '正常',
          closeText: '暂停',
          value: '0',
          trueValue: '0',
          falseValue: '1',
          rules: {required: true}
        },
        /*{
        	name: 'jobStatus',
        	span: 24,
        	label: '状态',
        	type: 'switch',
        	openText: '启用',
        	closeText: '禁用',
        	value: '1',
        	trueValue: '1',
        	falseValue: '0',
        	rules: {required: true}
        },*/
        {name: 'note', type: 'text', textarea: {minRows: 3, maxRows: 8}, span: 24, label: '备注'}
      ]
    ]
  };
  

  /**
   * 表格参数
   */
  const tableOptions = {
    editOptions: tableEditOptions,
    selection: [],
    labelWidth: 70,
    pageSize: 20,
    title: '定时任务',
    permsPrefix: 'scheduleJob',
    dataUrl: '/quartz/scheduleJob/list',
    createUrl: '/quartz/scheduleJob/create',
    deleteUrl: '/quartz/scheduleJob/delete',
    updateUrl: '/quartz/scheduleJob/update',
    param: {},
    columns: [
	  {type: 'selection', width: 60, align: 'center'},
      {key: 'jobName', title: '任务名称', width: 200},
      {key: 'jobClass', title: 'Bean名', width: 250},
      {key: 'jobMethod', title: '执行方法', width: 200},
      {key: 'cronExpression', title: 'cron表达式', width: 200},
      {
    	  align: 'center',
    	  key: 'status',
    	  title: '执行状态',
    	  width: 150,
    	  sortable: true,
    	  render: (h, params) => {
    		  const row = params.row;
    		  return h('i-switch', {
    			  props: {size: 'large', falseValue: '1', trueValue: '0', value: row.status},
    			  on: {
    				  'on-change': (value) => {
    					  let url="/quartz/scheduleJob/";
    					  if(value==='0'){
    						  url=url+'resume';
    					  }else{
    						  url=url+'pause';
    					  }
    					  let ids = [];
    					  ids[0]=row.id;
    					  self.$http.apiPost( url , {ids: ids}).then((res) => {
    						  if (res.code!=200) {
    							  self.$http.handleError(res);
    						  } else {
    							  self.$refs['crudView'].$refs['crudTable'].refreshTable();
    						  }
    					  });
    				  }
    			  }
    		  }, [
    		      h('span', {
    		    	  slot: 'open'
    		      }, '正常'),
    		      h('span', {
    		    	  slot: 'close'
    		      }, '暂停')
    		      ]);
    	  }
      },
      {key: 'jobStatus', title: '状态', width: 250 ,dict: 'qrt_job_status'},
      {key: 'jobExecCount', title: '执行总数', width: 200},
      {key: 'jobUsedTime', title: '执行耗时(毫秒)', width: 200},
      {key: 'jobExceptionCount', title: '异常总数', width: 200},
      {key: 'lastExecTime', title: '最后执行时间', width: 200},
      {key: 'nextExecTime', title: '下次执行时间', width: 200},
      {key: 'lastExceptionTime', title: '最后异常时间', width: 200}
    ],
    searchDynamic: [
      [
        {name: 'name', label: '任务名称', span: 5, type: 'text'},
        {name: 'note', label: '备注', span: 5, type: 'text'},
        {name: 'status', label: '执行状态', span: 5, type: 'select',dict:'qrt_execution_state'},
        {name: 'createTime', label: '创建时间', span: 5, type: 'date'}
      ]
    ]
  };

  import {CrudView, DataTable} from 'components/';
  import Cron from 'components/form/Cron';

  export default {
    data () {
      return {
        tableOptions,
        cronSelect: false,
        cronVal: '',
        fromData: null,
        logModalVisible: false,
        logColumns,
        jobId: 0
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
      logClick () {
        let selection = this.tableOptions.selection;
        this.jobId = selection[0].id;
        this.logModalVisible = true;
      },
      changeCron () {
        this.$nextTick(() => {
          this.fromData.cronExpression = this.$refs['cron'].getValue();
        });
      },
      resumeClick () {
        let selection = this.tableOptions.selection;
        if (selection != null) {
          let ids = [];
          for (let i = 0; i < selection.length; i++) {
            ids.push(selection[i].id);
          }
          this.$http.apiPost('/quartz/scheduleJob/resume', {ids: ids}).then((res) => {
            this.loading = false;
            if (res.code!=200) {
              this.$http.handleError(res);
            } else {
              this.$Message.success('运行成功');
              this.$refs['crudView'].$refs['crudTable'].refreshTable();
            }
          });
        }
      },
      pauseClick () {
        let selection = this.tableOptions.selection;
        if (selection != null) {
          let ids = [];
          for (let i = 0; i < selection.length; i++) {
            ids.push(selection[i].id);
          }
          console.log(ids);
          this.$http.apiPost('/quartz/scheduleJob/pause', {ids: ids}).then((res) => {
            this.loading = false;
            if (res.code!=200) {
              this.$http.handleError(res);
            } else {
              this.$Message.success('暂停成功');
              this.$refs['crudView'].$refs['crudTable'].refreshTable();
            }
          });
        }
      },
      runClick () {
        let selection = this.tableOptions.selection;
        if (selection != null) {
          let ids = [];
          for (let i = 0; i < selection.length; i++) {
            ids.push(selection[i].id);
          }
          this.$http.apiPost('/quartz/scheduleJob/run', {ids: ids}).then((res) => {
            this.loading = false;
            if (res.code!=200) {
              this.$http.handleError(res);
            } else {
              this.$Message.success('执行成功');
              this.$refs['crudView'].$refs['crudTable'].refreshTable();
            }
          });
        }
      }
    },
    created () {
      self = this;
    },
    components: {
      Spin,
      CrudView, Cron, DataTable
    }
  };
</script>
