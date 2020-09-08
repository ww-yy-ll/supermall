<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">YL商城</div></nav-bar>
    <!--顶部-->
    <div class="top">
      <img src="~assets/img/profile/avatar.svg" alt="">
      <div>
        <p>登录/注册</p>
        <div class="top-item">
          <img src="~assets/img/profile/phone.svg">
          <span>暂无绑定手机号</span>
        </div>
      </div>
    </div>
    <!--第一行-->
    <div class="content">
      <div class="content-item">
        <span class="content-item-one">0.00</span>元
        <p class="content-item-two">我的余额</p>
      </div>
      <div class="content-item">
        <span class="content-item-one">0</span>个
        <p class="content-item-two">我的优惠</p>
      </div>
      <div class="content-item">
      <span class="content-item-one">0</span>分
      <p class="content-item-two">我的积分</p>
    </div>
    </div>
    <!--第二行-->
    <div class="center">
      <div class="center-item">
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="center-item">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="center-item">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
    </div>
    <!--第三行-->
    <div class="center">
      <div class="center-item">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="center-item">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
    export default {
        name: "Profile",
      components: {
        NavBar,
        Scroll
      }
    }
</script>

<style scoped>
  #profile {
    background-color: #F2F2F2;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .top {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: var(--color-tint);
    color:  #fff;
  }
  .top img {
    width: 70px;
    height: 70px;
  }
  .top p {
    margin-left: 5px;
  }
  .top-item {
    display: flex;
    align-items: center;
    font-size: 13px;
  }
  .top-item img {
    width: 25px;
    height: 25px;
  }
  .top span {
  }
  .top::after {
    content: ">";
    position: absolute;
    right: 20px;
    font-size: 18px;
  }
  /* 第一行 */
  .content {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    background-color: #fff;
  }
  .content-item {
    flex: 1;
    text-align: center;
    padding: 25px;
  }
  .content-item-one{
    color: orangered;
    font-size: 25px;
    font-weight: 700;
  }
  .content-item-two {
    margin-top: 5px;
  }
  .content-item:nth-child(1){
    border-right: 1px solid #eee;
  }
  .content-item:nth-child(2){
    border-right: 1px solid #eee;
  }
/*第二行*/
  .center {
    display: flex;
    flex-direction: column;

    margin-top: 10px;
    background-color: #fff;
  }
  .center img {
    width: 25px;
    height: 25px;
  }
  .center-item {
    display: flex;
    align-items: center;

    padding: 10px;
  }
  .center-item span {
    margin-left: 10px;
    color: #666;
    font-size: 16px;
  }
  .center-item:nth-child(-n+2) {
    border-bottom: 1px solid #eee;
  }

</style>
