<template>
  <div id="category">
    <!--顶部导航栏-->
    <nav-bar  class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <!--    -->
    <div class="content">
      <!--菜单栏-->
      <tab-menu :categories="categories" @menuClick="menuClick"/>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>

  </div>
</template>

<script>
  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'
  import TabContent from './childComps/TabContent'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import { getCategory, getSubcategory, getCategoryDetail } from 'network/category'

    export default {
      name: "Category",
      components:{
        TabMenu,
        TabContentCategory,
        TabContentDetail,
        TabContent,
        NavBar,
        Scroll,
        TabControl
      },
      data(){
        return {
          categories: [],
          currentIndex: -1,
          categoryData: {},
          currentType: 'pop'
        }
      },
      computed: {
        showSubcategory() {
          if (this.currentIndex === -1) return {}
          return this.categoryData[this.currentIndex].subcategories
        },
        showCategoryDetail() {
          if (this.currentIndex === -1) return []
          return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
        }
      },
      // 组件创建完后调用 created()，但是模板没有挂载
      created() {
        // 一进入分类页就请求分类接口菜单栏数据
        this.getCategory()
      },
      mounted() {
      },
      methods: {
        // 菜单栏点击
        menuClick(index){
          // 点击菜单跳到对应的接口数据
          this.getSubcategories(index)
        },
        tabClick(index) {
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          console.log(this.currentType);
        },
        // 网络请求方法
        // 获取分类页面的菜单信息
        getCategory(){
          getCategory().then(res => {
            console.log(res);
            // 1.获取分类数据
            this.categories = res.data.category.list
            // 2.初始化每个类别的子数据
            for (let i = 0; i < this.categories.length; i++) {
              this.categoryData[i] = {
                subcategories: {},
                categoryDetail: {
                  'pop': [],
                  'new': [],
                  'sell': []
                }
              }
            }
            // 3.请求第一个分类的数据
            this.getSubcategory(0)
          })
        },
        getSubcategories(index) {
          this.currentIndex = index;
          const mailKey = this.categories[index].maitKey;
          // console.log(mailKey);
          getSubcategory(mailKey).then(res => {
            this.categoryData[index].subcategories = res.data
            this.categoryData = {...this.categoryData}
            this.getCategoryDetail('pop')
            this.getCategoryDetail('sell')
            this.getCategoryDetail('new')
          })
        },
        getSubcategory(index){
          this.currentIndex = index;
          const menuKey =this.categories[0].maitKey
          getSubcategory(menuKey).then(res => {
            // console.log(res);
            this.categoryData[index].subcategories = res.data;
            this.categoryData ={...this.categoryData}
            this.getCategoryDetail('pop')
            this.getCategoryDetail('sell')
            this.getCategoryDetail('new')
          })
        },
        getCategoryDetail(type) {
          // 1.获取请求的miniWallkey
          const miniWallkey = this.categories[this.currentIndex].miniWallkey;
          // 2.发送请求,传入miniWallkey和type
          getCategoryDetail(miniWallkey, type).then(res => {
            // 3.将获取的数据保存下来
            this.categoryData[this.currentIndex].categoryDetail[type] = res
            this.categoryData = {...this.categoryData}
          })
        }
      }
    }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  /*
  .content {
    height: 150px;
    background-color: pink;

    原生实现滚动
    超出 height=150px 范围的自动隐藏。必须有高度
    overflow-y: scroll;

  }*/
  /*.wrapper {
    height: 150px;
    /*background-color: pink;
    overflow: hidden;
  }*/
</style>
