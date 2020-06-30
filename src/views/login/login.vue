<style lang="less">
@import './login.less';
</style>

<template>
  <div class="layout">
    <div class="layout-login">
      <div class="login-panel">
        <i-form ref="formLogin" :model="formLogin" :rules="ruleInline" @keydown.enter.native="handleSubmit('formLogin')">
          <FormItem class="login-title">
	        <div class="layout-logo"><span class="title"> {{sysTitle}}</span></div>
	      </FormItem>
          <FormItem prop="username">
            <i-input v-model="formLogin.username" type="text" placeholder="用户名" style="width: 100%">
              <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
              </span>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input v-model="formLogin.password" type="password" placeholder="密码" style="width: 100%">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"></Icon>
              </span>
            </i-input>
          </FormItem>

          <FormItem v-if="captchaEnable" prop="captcha" class="captchaItem">
            <i-input v-model="formLogin.captcha" type="text" @change="toUpperCase(val)" :maxlength="4" placeholder="验证码"
                     style="width: 100%;">
              <!--<span slot="append"></span>-->
            </i-input>
            <img class="captchaImage" :src="captchaUrl" @click="changeCaptcha()" title="点击更换验证码">
          </FormItem>
          <FormItem>
            <i-button type="primary" style="width: 100%" @click="handleSubmit('formLogin')" long :loading="loading">
              登 录
            </i-button>
          </FormItem>
          <div style="padding: 0px 6px;">
            <router-link style="float: right;" to="/">忘记密码</router-link>
          </div>
        </i-form>
       </div>
    </div>
    <div class="layout-footer">{{copyText}}</div>
  </div>
</template>
<script>
  import config from '@/config';
  import http from '@/utils/HttpUtils';
  import { mapActions,mapMutations } from 'vuex';
  import common from '@/utils/common';
  import {uuid,getParams} from '@/utils/util';

  export default {
    data () {
      return {
        captchaUrl: this.captchaUrl = HOST + config.api.captcha + "captchaId=" + uuid() +new Date().getTime(),
        captchaEnable: config.captchaEnable,
        loading: false,
        copyText: config.copyText,
        sysTitle: config.sysTitle,
        formLogin: {
          username: '',
          password: '',
          captcha: '',
        },
        ruleInline: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请填写验证码', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {},
    methods: {
      ...mapMutations([
        'clearAll'
      ]),
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let data = {
              userName: this.formLogin.username,
              password: this.formLogin.password,
              captcha: this.formLogin.captcha,
              captchaId: getParams(this.captchaUrl).captchaId,
              logintype: config.logintype
            };
            this.loading = true;
            this.$http.apiPost(config.api.userLogin, data).then((res) => {
              this.loading = false;
              if (res.code!==200) {
                this.$http.handleError(res);
                this.changeCaptcha();
              } else {
                //console.log(JSON.stringify(res));
                this.$Message.success('登录成功');
                //设置用户登录信息
                OperatorUtils.setBaseData(res.datas);
                this.$router.push({path: '/'});
              }
            });
          } else {
            this.$Message.error('请填写正确再提交!');
          }
        });
      },
      changeCaptcha () {
        this.formLogin.captcha = '';
        this.captchaUrl = HOST + config.api.captcha + "captchaId=" + uuid() +new Date().getTime();
      },
      toUpperCase (val) {
        console.log(val);
      }
    },
    created(){
    },
    mounted () {
      this.clearAll();//加载清除缓存
      common.changeColor(3);  
    },
    components: {}
  };
</script>
