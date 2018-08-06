<template>
  <header class="clearfix">
    <div class="logo">
      <a href="javascript:;"><img src="@/assets/images/logo-web.jpg"/></a>
    </div>
    <div class="jhd" v-if="this.userPromise.isShowShop">
      <CarList></CarList>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
import CarList from '../ShoppingCar/CarList';
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("common");
export default {
  computed: {
    ...mapGetters(["userPromise"])
  },
  components: { CarList }
}
</script>

<style lang="less">
header{
  width: 100%;
  height: 60px;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .logo{
    float: left;
    margin: 8px 19px 0;
    a{
      display: inline-block;
      width: 60px;
      height: 46px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .jhd{
    float: right;
    margin: 16px 60px 0 0;
  }
  .jhd:hover{
    cursor: pointer;
  }
}
</style>
