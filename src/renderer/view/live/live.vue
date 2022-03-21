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
          <screen @screenItemChanged="screenItemChanged" />
        </div>
      </div>
    </div>
    <div class="live-main">
      <div class="live-main-title">
        <maintitle></maintitle>
      </div>
      <div class="live-main-body">
        <mainbody
          :screenItemBase="screenItem"
          
        ></mainbody>
      </div>
      <div class="live-main-foot">
        <mainfoot></mainfoot>
      </div>
    </div>
    <div class="live-message">
      <div class="live-message-title">
        <i
          v-if="isMessage"
          class="live-message-icon el-icon-s-unfold"
          @click="closeMessage"
        ></i>
        <i
          v-else
          class="live-message-icon el-icon-s-fold"
          @click="closeMessage"
        ></i>
      </div>
      <div v-show="isMessage" class="live-message-body">
        <div class="live-message-body-info"><info /></div>
        <div class="live-message-body-gift"><gift /></div>
        <div class="live-message-body-danmu"><danmu /></div>
      </div>
    </div>
  </div>
</template>
<script>
import screen from "./components/screen.vue";
import tool from "./components/tool.vue";
import gift from "./components/gift.vue";
import danmu from "./components/danmu.vue";
import Info from "./components/info.vue";
import maintitle from "./components/maintitle.vue";
import Mainbody from "./components/mainbody.vue";
import Mainfoot from "./components/mainfoot.vue";
export default {
  name: "live",
  data() {
    return {
      isTools: true,
      isMessage: true,
      screenItem: [],
    };
  },
  components: {
    screen,
    tool,
    gift,
    danmu,
    Info,
    maintitle,
    Mainbody,
    Mainfoot,
  },
  props: [],
  methods: {
    closeTools() {
      this.isTools = !this.isTools;
    },
    closeMessage() {
      this.isMessage = !this.isMessage;
    },
    screenItemChanged(val) {
      console.log("screenItemChanged触发")
      this.screenItem = val;
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
      if (this.isTools) return "270px";
      else return "30px";
    },
    messageWidth() {
      if (this.isMessage) return "270px";
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
    // border-right: 1px solid #fff;
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
      width: 100%;
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
        overflow: auto;
        height: 60%;
        padding: 0 0 5px 5px;
      }
      &-tool {
        overflow: auto;
        height: 40%;
        padding: 5px 0 5px 5px;
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
    // flex: 1 1 auto;
    height: 100%;
    transition: width 1s;
    width: calc(100% - var(--message_width) - var(--tools_width));
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    background: #ccc;
    &-title {
      height: 90px;
      // background: #ccc;
      padding-bottom: 5px;
    }
    &-body {
      // background: #ccc;
      flex: 1 1 auto;
      height: calc(100% - 240px);
      display: flex;
      align-items: center;
    }
    &-foot {
      padding: 5px 0;
      // background: #ccc;
      min-height: 80px;
      max-height: 160px;
    }
  }
  &-message {
    width: var(--message_width);
    height: 100%;
    // border-left: 1px solid #fff;
    transition: width 1s;
    &-title {
      width: 100%;
      height: 30px;

      border-bottom: 1px solid #ccc;
      // text-align: right;
      background: #fff;
    }
    &-body {
      width: 100%;
      height: calc(100% - 31px);
      display: flex;
      flex-direction: column;

      background: #ccc;
      &-info,
      &-danmu,
      &-gift {
        border-radius: 3px;
        display: flex;
      }
      &-danmu {
        overflow: auto;
        height: calc((100% - 31px) / 9 * 5);
        padding: 0 5px 5px 0;
      }
      &-gift {
        overflow: auto;
        height: calc((100% - 31px) / 9 * 4);
        padding: 0 5px 5px 0;
      }
      &-info {
        height: 80px;
        padding: 5px 5px 5px 0;
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
}
</style>
