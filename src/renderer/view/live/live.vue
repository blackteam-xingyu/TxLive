<template>
  <div class="live" :style="cssVars">
    <div class="live-tools">
      <div class="live-tools-title">
        <i class="live-tools-icon el-icon-s-operation" @click="closeTools"></i>
      </div>
      <div v-show="isTools" class="live-tools-body">
        <div class="live-tools-body-tool">
          <tool />
        </div>
        <div class="live-tools-body-screen">
          <screen />
        </div>
      </div>
    </div>
    <div class="live-main"></div>
    <div class="live-message"></div>
  </div>
</template>
<script>
import screen from "./components/screen.vue";
import tool from "./components/tool.vue";
export default {
  name: "live",
  data() {
    return {
      isTools: true,

      messageWidth: "250px",
    };
  },
  components: {
    screen,
    tool,
  },
  props: [],
  methods: {
    closeTools() {
      this.isTools = !this.isTools;
    },
  },
  mounted() {},
  computed: {
    cssVars() {
      return {
        "--tools_width": this.toolsWidth,
        "--message_width": this.messageWidth,
      };
    },
    toolsWidth() {
      if (this.isTools) return "250px";
      else return "30px";
    },
  },
};
</script>
<style lang="scss" scoped>
.live {
  height: calc(100% - 30px);
  width: 100%;
  display: flex;
  &-tools {
    width: var(--tools_width);
    height: 100%;
    // border-right: 3px solid #ccc;
    // white-space: nowrap;
    transition: width 1s;
    background: #fff;
    border-right: 1px solid #ccc;
    .tip {
      width: 30px;
      margin-left: 6px;
    }
    &-title {
      width: 100%;
      height: 30px;

      border-bottom: 1px solid #ccc;
      text-align: right;
      background: #fff;
    }
    &-body {
      width: calc(100% + 1px);
      height: calc(100% - 31px);
      display: flex;
      flex-direction: column;

      background: #ccc;
      &-screen,
      &-tool {
        border-radius: 3px;
        display: flex;
      }
      &-screen {
        flex: 5 1 auto;
        padding: 0 5px 5px 5px;
      }
      &-tool {
        flex: 4 1 auto;
        padding: 5px;
      }
    }
    &-icon {
      color: #333;
      margin: 0 7px;
      cursor: pointer;
      line-height: 30px;
      &:hover {
        color: #409eff;
      }
    }
  }
  &-main {
    flex: 1 1 auto;
    // transition: width 2s;
  }
  &-message {
    width: var(--message_width);
    height: 100%;
    border-left: 1px solid #ccc;
    transition: width 2s;
  }
}
</style>
