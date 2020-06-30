<style scoped>

</style>
<style>
</style>

<template>
  <div class="oauth2-div">
    <CrudView :tableOptions="tableOptions"></CrudView>
  </div>
</template>

<script>
    /**
     * 弹出式表单参数
     */
    const tableEditOptions = {
        width: 1000,
        labelWidth: 145,
        dynamic: [
            [
             {name: 'id', hidden: true},
             {name: 'clientId', type: 'text', span: 24, label: 'clientId', rules: {required: true}},
            ],
            [
             {type: 'label', span: 24, data: 'client_id必须输入,且必须唯一; 在实际应用中的另一个名称叫appKey,与client_id是同一个概念.'}
            ],
            [
             {name: 'clientSecret', type: 'text', span: 24, label: 'clientSecret', rules: {required: true}},
            ],
            [
             {type: 'label', span: 24, data: 'client_secret必须输入; 在实际应用中的另一个名称叫appSecret,与client_secret是同一个概念..'}
            ],
            [
             {name: 'scope', type: 'text', span: 24, label: 'scope', rules: {required: true}}
            ],
            [
             {type: 'label', span: 24, data: 'scope必须选择'}
            ],
            [
             {name: 'authorizedGrantTypes', type: 'select', span: 24, label: 'authorizedGrantTypes', dict: 'grant_types',multiple: true},
            ],
            [
             {type: 'label', span: 24, data: '至少勾选一项grant_type(s), 且不能只单独勾选refresh_token, 若需更多帮助请访问 http://andaily.com/blog/?p=103'}
            ],
            [
             {name: 'webServerRedirectUri', type: 'text', span: 24, label: 'webServerRedirectUri'}
            ],
            [
             {type: 'label', span: 24, data: '若grant_type包括authorization_code或implicit, 则必须输入redirect_uri'}
            ],
            [
             {name: 'accessTokenValidity', type: 'number', span: 24, label: 'accessTokenValidity', min: 1,max: 1000000000}
            ],
            [
             {type: 'label', span: 24, data: '设定客户端的access_token的有效时间值(单位:秒),可选, 若不设定值则使用默认的有效时间值(60 * 60 * 12, 12小时); 若设定则必须是大于0的整数值'}
            ],
            [
             {name: 'refreshTokenValidity', type: 'number', span: 24, label: 'refreshTokenValidity', min: 1,max: 1000000000},
            ],
            [
             {type: 'label', span: 24, data: '设定客户端的refresh_token的有效时间值(单位:秒),可选, 若不设定值则使用默认的有效时间值(60 * 60 * 24 * 30, 30天); 若设定则必须是大于0的整数值'}
            ],
            [
             {name: 'additionalInformation', type: 'text', span: 24, label: 'additionalInformation'}
            ],
            [
             {type: 'label', span: 24, data: '这是一个预留的字段,在Oauth的流程中没有实际的使用,可选,但若设置值,必须是JSON格式的数据,如: {"country":"CN","country_code":"086"}'}
            ],
            [
             {name: 'autoapprove',type: 'radio' ,value: 'true', span: 24, label: 'autoapprove',dict: 'auto_approve'},
            ],
            [
             {type: 'label', span: 24, data: '该属性是扩展的, 只适用于grant_type(s)包括authorization_code的情况,当用户登录成功后,若选‘否’,则会跳转到让用户Approve的页面让用户同意授权, 若选‘是’,则在登录后不需要再让用户Approve同意授权(因为是受信任的)'}
            ]
        ]
    };
    /**
     * 表格参数
     */
    const tableOptions = {
        title:'客户端详情',
        pageSize: 20,
        permsPrefix:'oauthClientDetails',
        dataUrl: '/sys/oauthClientDetails/list',
        createUrl: '/sys/oauthClientDetails/create',
        deleteUrl: '/sys/oauthClientDetails/delete',
        updateUrl: '/sys/oauthClientDetails/update',
        editOptions:tableEditOptions,
        selection: [],
        param: {},
        columns: [
            {type: 'selection', width: 60, align: 'center'},
			{key: 'clientId', title: 'clientId', width: 120},
			{key: 'clientSecret', title: 'clientSecret', width: 120},
			{key: 'scope', title: 'scope', width: 100},
			{key: 'authorizedGrantTypes', title: 'authorizedGrantTypes', width: 410},
			{key: 'refreshTokenValidity', title: 'refreshTokenValidity', width: 180},
			{key: 'accessTokenValidity', title: 'accessTokenValidity', width: 180},
			{key: 'webServerRedirectUri', title: 'webServerRedirectUri', width: 400},
			{key: 'autoapprove', title: 'autoapprove', width: 130,dict: 'auto_approve'},
        ],
        searchDynamic: [
            [
             {name: 'clientId', label: 'clientId', span: 6 ,type: 'text'}
            ]
        ]
    };
    import {CrudView, PermsValid} from 'components/';
    export default {
        data () {
            return {
                tableOptions
            }
        },
        computed: {},
        methods: {},
        mounted () {},
        components: {CrudView,PermsValid}
    };
</script>
