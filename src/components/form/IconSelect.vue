<style scoped>
</style>

<style>
.icon-select-modal .main-view-full{
  min-height:200px!important;
}
.icon-select-modal .ivu-modal-body {
  max-height: calc(80vh - 200px);
  overflow: auto;
}
.icon-select-show{
  padding-left:12px;
}
</style>

<style lang="less">
    .icon-select-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>

<template>
  <div>
  	<Row>
  	  <i-col span="16">
	    <a href="javascript:void(0)" @click="openIconSelect">
	      <i-input
	         :icon="iconSelected?'ios-close':'ios-search'"
	         :placeholder="placeholder" v-model="value"
	         @on-click.stop="inputIconClick"
	         readonly>
	      </i-input>
	    </a>
  	  </i-col>
  	  <i-col class="icon-select-show" span="8">
  	  	<commonIcon :type="iconSelected" :size='28'/>
  	  </i-col>
  	</Row>
    <Modal class-name="icon-select-modal" width="900px;" title="Icon 图标" v-model="popupIconVisible" @on-ok="ok">
      <PopupIcon ref="popupIcon" v-model="value" @on-icon-dblclick="iconDblclick"> </PopupIcon>
      <div slot="footer">
	   	<Button type="text" @click="closeIconSelect">取消</Button>
	   	<Button type="primary" @click="ok">确定</Button>
	   </div>
    </Modal>
  </div>
</template>

<script>
  import {PopupIcon} from 'components/';
  import commonIcon from '_c/common-icon/common-icon';
  import { isNotBlank } from '@/utils/util';
  
  export default {
    name: 'IconSelect',
    props: {
      placeholder: {
        default: '请选择图标'
      },
      data: {
      },
      value: {}
    },
    data () {
      return {
        popupIconVisible: false,
        iconSelected: ''
      };
    },
    computed: {
    },
    methods: {
      openIconSelect () {
        this.popupIconVisible = true;
      },
      closeIconSelect () {
        this.popupIconVisible = false;
      },
      inputIconClick (e) {
        if(isNotBlank(this.iconSelected)){
	        e.stopPropagation();
        	this.$emit('input', '');
        	this.$refs.popupIcon.iconSelected='';
        }else{
        	this.openIconSelect();
        }
      },
      ok () {
        let iconSelected = this.$refs.popupIcon.iconSelected;
        this.$emit('input', iconSelected);//给父组件赋值
        if(isNotBlank(iconSelected)){//有选择图标，允许确认
          this.closeIconSelect();
        }else{
          this.$Message.error('请选择图标再提交！');
          return false;
        }
      },
      iconDblclick(){
        this.popupIconVisible = false;
        let iconSelected = this.$refs.popupIcon.iconSelected;
        if(isNotBlank(iconSelected)){//有选择图标，允许确认
        	this.$emit('input', iconSelected);
        }
      }
    },
    created () {
    },
    watch: {
      value (newVal, oldVal) {
	    this.iconSelected=newVal;
      }
    },
    components: {PopupIcon,commonIcon}
  };
</script>


