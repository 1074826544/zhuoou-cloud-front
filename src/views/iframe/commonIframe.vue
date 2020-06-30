<style scoped>

</style>

<template>
	<iframe name="myiframe" id="myiframe" :src="url" frameborder="0" align="left" width="100%" height="100%">
		<p>你的浏览器不支持iframe标签</p>
	</iframe>
</template>

<script>
import { getMenuInfoByName, isNotBlank } from '@/utils/util'

  export default {
    data() {
      return {
    	  url:'',
      };
    },
    computed: {
    },
    methods: {
      changeUrlByName (name,type) {
    	if(isNotBlank(name) ){
    		let itemInfo = getMenuInfoByName(name);
    		if(isNotBlank(itemInfo)&& itemInfo.outLink==='1'){
    			this.url = itemInfo.url
    		}
    	}
	  }
    },
    created() {
    },
    components: {
    	getMenuInfoByName,
    	isNotBlank
    },
    mounted () {
    	if(isNotBlank(this.$router.history)&&isNotBlank(this.$router.history.current) ){
    		this.changeUrlByName(this.$router.history.current.name,"mounted");
    	}
    },
    watch: {
      '$route' (newRoute) {
        this.changeUrlByName(newRoute.name,"watch");
      }
    }
    
  };
</script>
