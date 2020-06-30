<style scoped>
  .sys-index {
    padding: 10px;
    width: 100%;
  }

  .backlog li {
    height: 70px;
    cursor: pointer;
    padding: 5px;
    border-bottom: #F5F7F9 1px solid;
    cursor: pointer;
    list-style-type: none;
  }

  .backlog li:last-child {
    border-bottom: none;
  }

  .backlog li:hover {
    background-color: #ebf7ff
  }

  .empty {
    font-size: 16px;
    text-align: center;
    color: #80848f;
    height: 100%;
    width: 100%;
    padding-top: 120px;
  }

  .backlog-parent {
    height: 300px
  }

  .backlog-content {
    color: #657180;
    font-size: 13px
  }
</style>
<style>
  .not-padding .ivu-card-body {
    padding: 0px;
  }

</style>

<template>
  <div class="sys-index">
	<Row :gutter="20">
	  <i-col span="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
	    <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
	      <count-to :end="infor.count" count-class="count-style"/>
	      <p>{{ infor.title }}</p>
	    </infor-card>
	  </i-col>
	</Row>
  
    <Row :gutter="20" style="margin-top: 20px;">
	  <i-col span="8">
	    <Card shadow>
	      <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
	    </Card>
	  </i-col>
	  <i-col span="16">
	    <Card shadow>
	      <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
	    </Card>
	  </i-col>
    </Row>
    <Row style="margin-top: 20px;" :gutter="20">
	  <Card shadow>
	    <example style="height: 310px;"/>
	  </Card>
    </Row>
    <Row style="margin-top: 20px;" :gutter="20">
      <i-col span="24">
        <IndexCharts></IndexCharts>
      </i-col>
    </Row>

    <Row style="margin-top: 30px;padding-top: 20px" :gutter="20">
      <i-col span="6" class="not-padding backlog">
        <Card :bordered="false">
          <h3 slot="title">待办事项</h3>
          <router-link slot="extra" to="/work/backlog">
            更多
            <Icon type="ios-arrow-right"></Icon>
          </router-link>
          <div class="backlog-parent">
            <ul v-if="backlogList">
              <li v-for="item in backlogList" class="curday-backlog-li" @click="backlogItemClick(item)">
                <Tag :color="item.priority==1?'red':'default'">
                  {{item.priority == 0 ? '一般' : item.priority == 1 ? '重要' : ''}}
                </Tag>
                <span style="font-weight: 800;font-size: 14px;padding-top: 5px">
                     {{item.name}}
                  </span>
                <span style="float: right">
                  {{DateUtils.getSimpleDate2(item.startTime)}}
                      <Tag :color="item.status==1?'blue':'green'">{{item.status == 0 ? '未完成' : item.status == 1 ? '已完成' : ''}}</Tag>
                  </span>
                <div class='backlog-content' v-html="item.content"></div>
              </li>
            </ul>
            <div v-if="backlogList.length==0" class="empty">
              <Icon type='information-circled'></Icon>
              暂无待办事项
            </div>
          </div>

          <!--<Button type="dashed" long @click="handleAdd" icon="plus-round">添加待办事项</Button>-->
        </Card>
      </i-col>
      <i-col :span="18">
        <Card :bordered="false" style="padding: 10px">
          <row>
            <i-col :span="6">
              <NumberCircle :endVal="15652" leftText="本周访问量" rightText="人"></NumberCircle>
            </i-col>
            <i-col :span="6">
              <NumberCircle :endVal="15652" leftText="本周访问量" rightText="人"></NumberCircle>
            </i-col>
            <i-col :span="6">
              <NumberCircle :endVal="15652" leftText="本周访问量" rightText="人"></NumberCircle>
            </i-col>
            <i-col :span="6">
              <NumberCircle :endVal="15652" leftText="本周访问量" rightText="人"></NumberCircle>
            </i-col>
          </row>

          <row>
            <div style="height: 160px"></div>
          </row>
        </Card>

      </i-col>
    </Row>
  </div>
</template>
<script>
  import DateUtils from 'utils/DateUtils';
  import {NumberUd, NumberCircle,InforCard,CountTo,ChartPie, ChartBar} from 'components/';
  import IndexCharts from './IndexCharts';
  import Example from './example';

  export default {
    data () {
      return {
        imgUrl: HOST + '/sys/attach/getImg?id=',
        DateUtils,
        activeName: 'third',
        inforCardData: [
	        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
	        { title: '累计点击', icon: 'md-locate', count: 23432, color: '#19be6b' },
	        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
	        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
	        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
	        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
	    ],
	      pieData: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ],
        barData: {
          Mon: 13253,
          Tue: 34235,
          Wed: 26321,
          Thu: 12340,
          Fri: 24643,
          Sat: 1322,
          Sun: 1324
        },
      };
    },
    computed: {
      warningList () {
        return this.$store.state.warning;
      },
      backlogList () {
        return this.$store.state.backlog;
      }
    },
    methods: {
      backlogItemClick (item) {
        this.$router.push({
          path: '/work/backlog',
          name: '待办事项',
          params: {
            backLog: item
          }
        });
      }
    },
    mounted () {

    },
    components: {NumberUd, IndexCharts, NumberCircle,InforCard,CountTo,ChartPie, ChartBar,Example}
  };
</script>
