import CommonIcon from '_c/common-icon'
import config from '@/config';
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return config.useI18n ? this.$t(item.title) : item.title || item.name
    },
    showChildren (item) {
      return item.children && (item.children.length > 0) //有子节点的时候显示父节点
      //return item.children && (item.children.length > 1) //子节点大于一个的时候开始显示父节点
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
