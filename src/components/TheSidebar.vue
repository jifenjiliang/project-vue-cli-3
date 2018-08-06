<template>
  <section class="sider" hide-trigger :style="{background: '#000', width: '150px', 'min-width': '150px', 'max-width': '150px', flex: '0 0 150px'}">
    <div class="user" @click="goToPC">
      <div class="imgbox">
        <img :src="data.headUrl?data.headUrl:'./static/img/head.png'" alt="logo"/>
      </div>
      <span class="username">{{data.nickName}}</span>
    </div>
    <ul ref="menu" class="menu">
      <li :class="tabCls(item)" v-for="(item, index) in navList" v-if="item.isShow" @click="handleChange(index)">
        <router-link :to="item.router">{{item.name}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
import api from "../api";
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapGetters } = createNamespacedHelpers("common");
export default {
  data() {
    return {
      navList: [
        { name: "在线选购", router: "/onlineShopping", isShow: true },
        { name: "库存管理", router: "/stock", isShow: true },
        { name: "主页管理", router: "/homeManage", isShow: true },
        { name: "搭配管理", router: "/collocation", isShow: true },
        { name: "销售订单", router: "/sales/0", isShow: true },
        { name: "数据分析", router: "/dataAnalysis", isShow: true }
      ],
      data: {}
    };
  },
  computed: {
    ...mapGetters(["activeKey", "userPromise"])
  },
  created () {
    // 库存管理
    this.navList[1].isShow = this.userPromise.isShowStock;
    this.navList[2].isShow = this.userPromise.isShowHomeManage;
    this.navList[3].isShow = this.userPromise.isShowCollocation;
    this.navList[4].isShow = this.userPromise.isShowSalesOrder;
    this.navList[5].isShow = this.userPromise.isShowDataAnalysis;
  },
  mounted() {
    this.$nextTick(function() {
      this.get_user_info();
    });
  },
  methods: {
    get_user_info() {
      // 获取钱包余额
      let that = this;
      that.ajax({
        ajaxParams: {
          url: api.user_info.path,
          method: api.user_info.method
        },
        ajaxSuccess: res => {
          if (res.success) {
            that.data = res.data;
          }
        }
      });
    },
    tabCls(item) {
      return {
        active: item.name === this.activeKey
      };
    },
    handleChange(index) {
      const nav = this.navList[index];
      this.setActiveKey(nav.name);
    },
    goToPC() {
      this.setActiveKey("personalCenter");
      this.$router.push({ path: "/personalCenter" });
    },
    ...mapMutations(["setActiveKey"])
  }
};
</script>

<style lang="less">
.sider {
  width: 150px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  margin-top: 60px;
  font-family: MicrosoftYaHei;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  .user {
    margin: 48px 0;
    text-align: center;
    cursor: pointer;
    .imgbox {
      width: 44px;
      height: 44px;
      margin: 0 53px 13px;
      border-radius: 50%;
      background-color: #d7d7d7;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  ul.menu {
    li {
      text-align: center;
      height: 49px;
      line-height: 49px;
      font-size: 16px;
      a {
        color: #fff;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    li.active {
      background: white;
      font-weight: bold;
      a {
        color: #000;
      }
    }
  }
}
</style>
