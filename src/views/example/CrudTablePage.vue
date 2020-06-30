<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
    <CrudView :tableOptions="tableOptions"></CrudView>
</template>

<script>
    /**
     * 弹出式表单参数
     */
    const tableEditOptions = {
        width: 800,
        labelWidth: 100,
        dynamic: [
            [
                {name: 'id', hidden: true},
                {name: 'code', type: 'text', span: 8, label: '编码'},
                {name: 'name', type: 'text', span: 8, label: '名称'},
                {name: 'parentId', type: 'text', span: 8, label: '父节点'},
            ]
        ]
    };
    /**
     * 表格参数
     */
    const tableOptions = {
        title:'',
        pageSize: 20,
        dataUrl: '/test/testDict/list',
        createUrl: '/test/testDict/create',
        deleteUrl: '/test/testDict/delete',
        updateUrl: '/test/testDict/update',
        editOptions:tableEditOptions,
        selection: [],
        param: {},
        columns: [
            {type: 'selection', width: 60, align: 'center'},
			{key: 'code', title: '编码'},
			{key: 'name', title: '名称'},
        ],
        searchDynamic: [
            [
             {name: 'code', label: '编码', span: 6 ,type: 'text'},
             {name: 'name', label: '名称', span: 6 ,type: 'text'},
             {name: 'parentId', label: '父节点', span: 6 ,type: 'text'},
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
