import {debounce} from './utils'

export const itemListenerMixin = {
    components: {

    },
    methods: {

    },
    data(){
      return {
          itemImgListener: null
      }
    },
    mounted() {
        const newFefresh = debounce(this.$refs.scroll.refresh, 500)
        this.itemImgListener =  ()=> {
            newFefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        // console.log('我是混入中的内容');
    }
}
