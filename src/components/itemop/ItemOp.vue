<style rel="stylesheet/scss" lang="scss" scoped>
  .edit-row {
    padding-bottom: 45px;
  }
</style>

<template>
  <div class="main-view main-view-full edit-page" style="padding-top: 20px">
    <row class="edit-row" type="flex" justify="center">
      <i-col span="22">

        <formDynamic ref="dataFrom" 
        		:data="dynamic" 
        		:label-width="labelWidth">
        </formDynamic>
        <slot name="append">
        </slot>
        <div :style="{marginLeft: labelWidth+'px'}">
          <i-button type='primary' icon='md-folder' @click='ok' :loading="loading">
          {{okText}}
          </i-button>
        </div>

      </i-col>
    </row>

  </div>
</template>

<script>
  import {FormDynamic} from 'components/';
  import { isNotBlank } from '@/utils/util'
  
  export default {
    props: {
      dynamic: {},
      labelWidth: {
        default: 60
      },
      okText: {
	    default: '保存'
	  },
	  postUrl:{
	    default: ''
	  }
    },
    data () {
      return {
        options: {},
        action: {},
        data: {},
        loading: false
      };
    },
    created () {
    },
    methods: {
	  open (fromData) {
        this.$nextTick(() => {
          this.$refs.dataFrom.setFormData(fromData);
          this.$emit('on-setfrom-after', this.dynamic, this.$refs.dataFrom.getData());
        });
      },
      getFromData () {
        return this.$refs.dataFrom.getData();
      },
      setFromData (fromData) {
        let data = this.$refs.dataFrom.getData();
        for (let key in fromData) {
          this.$set(data, key, fromData[key]);
        }
      },
      ok () {
        this.$refs.dataFrom.submit((param) => {
          //console.log(param);
          //debugger;
          this.$emit('on-submit-before', param);
          // 发送请求
          if (this.postUrl !== null) {
            this.loading = true;
            if(isNotBlank(param.id)){
            	this.$http.apiPut(this.postUrl, param).then((res) => {
            		this.saveResult(res, param);
            	});
            }else{
            	this.$http.apiPost(this.postUrl, param).then((res) => {
            		this.saveResult(res, param);
            	});
            }
          }
        }, (res) => {
          // 表单验证失败
          this.$Message.error('请填写正确再提交！');
        });
      },
      saveResult(res, param){
    	  this.loading = false;
          if (res.code!=200) {
            this.$http.handleError(res);
          } else {
            this.$Message.success('提交成功');
            if (res.datas.id != null) {
              param.id = res.datas.id;
            }
            this.$emit('on-success', res, param);
            this.$emit('on-submit-totableList');
          }  
      }
    },
    components: {FormDynamic}
  };
</script>
