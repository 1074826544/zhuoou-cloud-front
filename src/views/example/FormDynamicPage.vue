<template>
  <div class="main-view main-view-full" style="padding-top: 50px">
    <row>
      <i-col span="24">
        <FormDynamic ref="dynamic1" v-model="fromData" :data="dynamic1" :label-width="120">
          <template slot="append">
            FormDynamic-append
          </template>
        </FormDynamic>
      </i-col>
    </row>
    <PopupEdit ref="popupEdit"
               :width="1000"
               :dynamic="dynamic1"
               :postCloseModal="true"
               @on-setfrom-after="()=>{this.$Notice.open({title: 'on-setfrom-after',desc: '设置表单数据前'});}"
               @on-opened="()=>{this.$Notice.open({title: 'on-opened',desc: '打开窗口后'});}"
               @on-submit-before="()=>{this.$Notice.open({title: 'on-submit-before',desc: '提交表单前'});}"
               @on-success="()=>{this.$Notice.open({title: 'on-success',desc: '提交成功'});}"
               :label-width="120">
      <template slot="append">PopupEdit-append</template>
    </PopupEdit>
    <PopupSelect ref="popSelect" :content="userPage">
    </PopupSelect>
  </div>
</template>
<script>
  import {FormDynamic, PopupEdit, PopupSelect} from 'components/';

  let self = null;
  const dynamic1 = [
    [
      {type: 'title', span: 24, text: '普通输入框'}
    ],
    [
      {
        name: 'numberData',
        type: 'number',
        span: 6,
        label: '数字',
        min: 1,
        max: 88888
      },
      {
        name: 'textData',
        type: 'text',
        span: 6,
        label: '普通（必填）',
        value: 'zhuoou',
        rules: {required: true, type: 'string'}
      },
      {
        name: 'passwordData',
        type: 'text',
        span: 6,
        password: true,
        label: '密码框'
      },
      {
        name: 'textarea',
        type: 'text',
        placeholder: '多行文本输入框',
        span: 6,
        label: '多行文本输入框',
        textarea: {minRows: 1, maxRows: 6}
      }
    ], [
      {type: 'title', span: 24, text: '日期选择器'}
    ], [
      {name: 'date1', type: 'date', span: 6, label: '显示年月日'},
      {name: 'date2', type: 'datetime', span: 6, label: '显示年月日时分秒'},
      {name: 'date3', type: 'datetimerange', span: 6, label: '日期范围选择'}
    ], [
      {type: 'title', span: 24, text: '下拉框'}
    ], [
      {
        name: 'selectData',
        type: 'select',
        span: 8,
        value: 0,
        label: '普通下拉框',
        data: [
          {label: '选项1', value: 0}, {label: '选项2', value: 1},
          {label: '选项3', value: 2}, {label: '选项4', value: 3}
        ],
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
        }
      },
      {
        name: 'selectData2',
        type: 'select',
        span: 6,
        value: 0,
        label: 'URL下拉框',
        // value 字段名
        valField: 'itemCode',
        // label 字段名
        textField: 'itemValue',
        // 通过设置数据url地址进行获取
        dataUrl: '/sys/sysDict/getDictListByCode?code=menu_type',
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
        }
      },
      {
        name: 'selectData3',
        type: 'select',
        span: 6,
        value: 0,
        label: '字典下拉框',
        // 直接取字典数据
        dict: 'log_type',
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
        }
      }
    ], [
      {type: 'title', span: 24, text: '单选框'}
    ], [
      {
        name: 'radioData',
        type: 'radio',
        span: 24,
        value: 0,
        label: '单选框',
        data: [
          {label: '选项一', value: 0}, {label: '隐藏复选框', value: 1},
          {label: '选项三', value: 2}, {label: '选项四', value: 3}
        ],
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
          self.$set(data, 'editor', '<h2>Ffast-FE radio onChange ' + val + '</h2>');

          if (val === 1) {
            self.$set(data.checkboxData, 'hidden', true);
          } else {
            self.$set(data.checkboxData, 'hidden', false);
          }

        }
      }
     ], [
         {type: 'title', span: 24, text: '复选框'}
     ], [
      {
        name: 'checkboxData',
        type: 'checkbox',
        span: 24,
        label: '复选框',
        data: [
          {label: '选项1', value: 0}, {label: '选项2', value: 1},
          {label: '选项3', value: 2}, {label: '选项4', value: 3}
        ],
        enableCheckAll: true,
        checkAllLabel: '全选',
        checkAll: true,
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
        }
      }
      ], [
          {type: 'title', span: 24, text: '树选择/弹层选择'}
      ], [
      {
        name: 'treeSelectData',
        type: 'treeSelect',
        span: 8,
        label: '下拉树',
        // 如果是CrudView 支持从左边树绑定数据，select组件同样支持
        dataFromTree: true,
        textField: 'name',
        valField: 'id',
        dataUrl: '/test/testDict/list',
        onChange: (val, from, data) => {
          self.$Message.success('onChange');
        }
      }, 
      {
        name: 'popSelectId',
        span: 8,
        label: '弹层选择',
        type: 'popText',
        textField: 'popSelectName',
        onClick (fromData) {
          self.$refs['popSelect'].open((selection) => {
            console.log(selection[0].id);
            self.$set(fromData, 'popSelectId', selection[0].id);
            self.$set(fromData, 'popSelectName', selection[0].username);
          });
        }
      }
      ], [
          {type: 'title', span: 24, text: '图片上传'}
      ], [
      {
        name: 'imgData',
        // 最多只能上传2张
        max: 2,
        type: 'imgUpload',
        span: 12,
        label: '图片上传'
      },
      {
        name: 'switchData',
        openText: 'on',
        closeText: 'off',
        type: 'switch',
        span: 12,
        label: '开关',
        value: 1,
        trueValue: 1,
        falseValue: 0,
        rules: {required: true, type: 'number'}
      },
      {name: 'editor', type: 'editor', span: 24, label: '富文本编辑器', placeholder: '富文本编辑器'}
    ], [
      {
        name: 'button',
        type: 'buttons',
        span: 24,
        data: [
          {
            label: 'SetData',
            onClick () {
              // 给表单设置数据
              self.$refs.dynamic1.setFormData({passwordData: 10001, textData: 'SetData', editor: '<h1>Fffast-FE</h1>'});
            }
          },
          {
            label: 'GetFormData',
            onClick () {
              self.$refs.dynamic1.submit((param) => {
                console.log(param);
                alert(JSON.stringify(param));
              }, (res) => {
                // 表单验证失败
              });
            }
          },
          {
            // 弹出窗口编辑表单
            label: 'PopupWindow',
            onClick () {
              self.$refs.popupEdit.open({
                title: 'PopupEditWindow',
                // 确认提交url
                postUrl: ''
              }, self.fromData);
            }
          },
          {
            label: 'GotoEditPage',
            onClick () {
              self.editOptions.editSuccess = self.editSuccess;
              let action = {
                // 窗口标题
                title: 'title',
                // 确认提交请求url
                postUrl: ''
              };
              self.$router.push({
                path: self.$router.currentRoute.path + '/edit',
                query: {options: self.editOptions, action: action, data: self.fromData}
              });
            }
          }
        ]
      }
    ]
  ];

  /**
   * 弹出式表单参数
   */
  const editOptions = {
    width: 1200,
    labelWidth: 120,
    dynamic: dynamic1
  };

  export default {
    data () {
      return {
        editOptions,
        dynamic1,
        fromData: {}
      };
    },
    computed: {
      // 弹出选择页面
      userPage () {
        return import('views/sys/sysUser');
      }
    },
    methods: {},
    mounted () {
      self = this;
    },
    components: {
      FormDynamic, PopupEdit, PopupSelect
    }
  };
</script>
