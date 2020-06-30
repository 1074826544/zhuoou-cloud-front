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
                {name: 'name', type: 'text', span: 8, label: '规范名称'},
                {name: 'type', type: 'text', span: 8, label: '规范类型'},
                {name: 'createPerson', type: 'text', span: 8, label: '创建人'},
                {name: 'doer', type: 'text', span: 8, label: '规范执行对象'},
                {name: 'startTime', type: 'text', span: 8, label: '开始时间'},
                {name: 'content', type: 'text', span: 8, label: '规范简介'},
                {name: 'createdAt', type: 'text', span: 8, label: '插入时间'},
                {name: 'updatedAt', type: 'text', span: 8, label: '更新时间'},
                {name: 'updatedBy', type: 'text', span: 8, label: '更新者'},
            ]
        ]
    };
    /**
     * 表格参数
     */
    const tableOptions = {
        title:'',
        pageSize: 20,
        permsPrefix:'safe',
        dataUrl: '/test/safe/list',
        createUrl: '/test/safe/create',
        deleteUrl: '/test/safe/delete',
        updateUrl: '/test/safe/update',
        editOptions:tableEditOptions,
        selection: [],
        param: {},
        columns: [
            {type: 'selection', width: 60, align: 'center'},
			{key: 'name', title: '规范名称'},
			{key: 'type', title: '规范类型'},
			{key: 'createPerson', title: '创建人'},
			{key: 'doer', title: '规范执行对象'},
			{key: 'startTime', title: '开始时间'},
			{key: 'content', title: '规范简介'},
			{key: 'createdAt', title: '插入时间'},
			{key: 'updatedAt', title: '更新时间'},
			{key: 'updatedBy', title: '更新者'},
        ],
        searchDynamic: [
            [
             {name: 'name', label: '规范名称', span: 6 ,type: 'text'},
             {name: 'type', label: '规范类型', span: 6 ,type: 'text'},
             {name: 'createPerson', label: '创建人', span: 6 ,type: 'text'},
             {name: 'doer', label: '规范执行对象', span: 6 ,type: 'text'},
             {name: 'startTime', label: '开始时间', span: 6 ,type: 'text'},
             {name: 'content', label: '规范简介', span: 6 ,type: 'text'},
             {name: 'createdAt', label: '插入时间', span: 6 ,type: 'text'},
             {name: 'updatedAt', label: '更新时间', span: 6 ,type: 'text'},
             {name: 'updatedBy', label: '更新者', span: 6 ,type: 'text'},
            ]
        ]
    };
    // import {CrudView, PermsValid} from 'components/';
    // export default {
    //     data () {
    //         return {
    //             tableOptions
    //     },
    //     computed: {},
    //     methods: {},
    //     mounted () {},
    //     components: {CrudView,PermsValid}
    // };
</script>
