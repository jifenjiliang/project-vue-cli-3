<template>
  <collapse-transition>
    <div class="el-tree-node__children" :key="tree.name" @click.stop="handleClick(tree)">
      <div class="el-tree-node__content" :style="treestyle">
        <p>{{tree.name}}({{tree.productNum}})</p>
        <Icon class="icon" v-if="showArrow" :type="!tree.expand?'chevron-right':'chevron-down'"></Icon>
        <Icon class="icon" v-if="showRight" type="checkmark-round"></Icon>
      </div>
      <tree v-for="(item,index) in tree.items" :treeClick="treeClick" :parentid="tree.id" :key="item.id" v-show="tree.expand && tree.items.length" :tree="item"/>
    </div>
  </collapse-transition>
</template>

<script type="text/ecmascript-6">
import CollapseTransition from "./collapseTransition";
export default {
  name: "tree",
  components: { CollapseTransition },
  props: {
    tree: {
      type: Object
    },
    treeClick: {
      type: Function
    },
    childrenKey: {
      type: String,
      default: "items"
    }
  },
  data() {
    return {
      expand: false,
      indent: 20
    };
  },
  computed: {
    treestyle(tree) {
      return {
        "padding-left": (this.tree.level - 1) * this.indent + 10 + "px",
        "border-bottom": "1px solid #ececec",
        height: "48px",
        "line-height": "48px"
      };
    },
    showArrow() {
      return this.tree.level == 1 && this.tree.items && this.tree.items.length;
    },
    showRight() {
      return this.tree.level > 1 && this.tree.check;
    }
  },
  methods: {
    handleClick(tree) {
      // parentid
      // level
      // id
      // tree
      tree.expand = !tree.expand;

      let parent = this.$parent;
      let level = 1;
      while (level < tree.level) {
        parent = parent.$parent;
        level++;
      }

      let obj = {
        parentid: this.$attrs.parentid,
        level: tree.level,
        id: tree.id,
        newTree: parent.tree
      };

      this.treeClick(obj);
    }
  }
};
</script>

<style lang="less">
.el-tree-node__content {
  position: relative;
  .icon {
    position: absolute;
    right: 10px;
  }
}
</style>
