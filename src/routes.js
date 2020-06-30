import {Main} from 'views/layout/';

const Err404Page = resolve => require(['views/error/404'], resolve);
const LoginPage = resolve => require(['views/login/login'], resolve);
const IndexPage = resolve => require(['views/index/index'], resolve);

const sysDictPage = resolve => require(['views/sys/sysDict'], resolve);
const sysUserPage = resolve => require(['views/sys/sysUser'], resolve);
const sysOauthUsersPage = resolve => require(['views/sys/sysOauthUsers'], resolve);
const sysRolePage = resolve => require(['views/sys/sysRole'], resolve);
const sysMenuPage = resolve => require(['views/sys/sysMenu'], resolve);
const sysLogPage = resolve => require(['views/sys/sysLog'], resolve);
const sysAttachPage = resolve => require(['views/sys/sysAttach'], resolve);
const sysGeneratorPage = resolve => require(['views/sys/sysGenerator'], resolve);
const sysLoginLogPage = resolve => require(['views/sys/sysLoginLog'], resolve);
const oauthClientDetailsPage = resolve => require(['views/sys/oauthClientDetails'], resolve);

const scheduleJobPage = resolve => require(['views/quartz/scheduleJob'], resolve);

const sysBacklogPage = resolve => require(['views/work/sysBacklog'], resolve);

const FormDynamicPage = resolve => require(['views/example/FormDynamicPage'], resolve);
const CrudTreeViewPage = resolve => require(['views/example/CrudTreeViewPage'], resolve);
const CrudTablePage = resolve => require(['views/example/CrudTablePage'], resolve);
const CrudTreePage = resolve => require(['views/example/CrudTreePage'], resolve);
const PermsValidPage = resolve => require(['views/example/PermsValidPage'], resolve)
const DataSelectPage = resolve => require(['views/example/DataSelectPage'], resolve);
const CrudViewPage = resolve => require(['views/example/CrudViewPage'], resolve);

const commonIframePage = resolve => require(['views/iframe/commonIframe'], resolve);

const safePage = resolve => require(['views/test/safe'], resolve);

const routes = [
  {
    path: '/',
    component: Main,
    hidden: false,
    name: '_index',
    children: [
      {path: '/index', component: IndexPage, name: 'index'},//首页
      {path: '/404', component: Err404Page, hidden: true, name: '404'},
      /**
       * 系统日志管理
       */
      {path: '/sysLog', component: sysLogPage, name: 'sysLog'},//系统日志
      /**
 	   * 系统管理
 	   */
       {path: '/sysMenu', component: sysMenuPage, name: 'sysMenu'},//权限菜单
       {path: '/sysRole', component: sysRolePage, name: 'sysRole'},//角色管理
       {path: '/sysUser', component: sysUserPage, name: 'sysUser'},//用户管理
       {path: '/sysOauthUsers', component: sysOauthUsersPage, name: 'sysOauthUsers'},//用户认证
       {path: '/sysDict', component: sysDictPage, name: 'sysDict'},//基础字典
       {path: '/sysAttach', component: sysAttachPage, name: 'sysAttach'},//附件管理
       {path: '/sysGenerator', component: sysGeneratorPage, name: 'generator'},//代码生成
       {path: '/sysLoginLog', component: sysLoginLogPage, name: 'sysLoginLog'},//登录日志
       {path: '/oauthClientDetails', component: oauthClientDetailsPage, name: 'oauthClientDetails'},//oauth2客户端
      /**
  	   * 定时任务
  	   */
       {path: '/scheduleJob', component: scheduleJobPage, name: 'scheduleJob'},//定时任务
       /**
        * 办公
        */
       {path: '/work/backlog', component: sysBacklogPage, name: '待办事项'},//待办事项
       /**
        * 组件
        */
       {path: '/example/formDynamic', component: FormDynamicPage, name: 'FormDynamic'},
       {path: '/example/crudTreeView', component: CrudTreeViewPage, name: 'CrudTreeViewPage'},
       {path: '/example/crudTable', component: CrudTablePage, name: 'CrudTablePage'},
       {path: '/example/crudTree', component: CrudTreePage, name: 'CrudTreePage'},
       {path: '/example/permsValid', component: PermsValidPage, name: 'PermsValidPage'},
       {path: '/example/dataSelect', component: DataSelectPage, name: 'DataSelectPage'},
       {path: '/example/crudViewPage', component: CrudViewPage, name: 'CrudViewPage'},
       
       /**
        * 通用iframe，用于页面内嵌外链接
        */
       {path: '/iframe/vue', component: commonIframePage, name: 'vue'},
       {path: '/iframe/swagger', component: commonIframePage, name: 'swagger'},
      
       {path: '/test/safe', component: safePage, name: 'safe'},
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: LoginPage
  },
  {path: '*', redirect: '/404', hidden: true}
];

export default routes;
