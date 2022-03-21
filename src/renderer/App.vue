<template>
  <div id="app" class="app">
    <div class="app-head">
      <div class="app-head-title">
        <el-image
          style="height: 20px; width: 67.6px"
          :src="require('./assets/img/title.png')"
          fit="contain"
        />
        <div class="app-head-text">
          <span class="music-title">糖心直播助手</span>
          <span style="font-size: 10px; padding-left: 10px; color: #333"
            >——您贴心的直播助手</span
          >
        </div>
      </div>
      <el-dropdown trigger="click" @visible-change="dropDown">
        <el-tooltip
          effect="dark"
          content="设置"
          placement="top"
          :disabled="visible || isSetting"
        >
          <el-button
            class="app-head-btn settingbtn"
            size="mini"
            icon="el-icon-s-tools"
          ></el-button>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>主题</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip
        effect="dark"
        content="最小化"
        placement="top"
        :disabled="visible || isSetting"
      >
        <el-button
          class="app-head-btn minusbtn"
          size="mini"
          icon="el-icon-minus"
          @click="minWindow"
        ></el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="最大化"
        placement="top"
        :disabled="visible || isSetting"
      >
        <el-button
          v-if="!isFullScreen"
          class="app-head-btn plusbtn"
          size="mini"
          icon="el-icon-full-screen"
          @click="maxAndReback"
        ></el-button>
        <el-button
          v-if="isFullScreen"
          class="app-head-btn plusbtn"
          size="mini"
          icon="el-icon-arrow-down"
          @click="maxAndReback"
        ></el-button>
      </el-tooltip>
      <el-popover placement="top" width="160" v-model="visible">
        <p>是否关闭TxLive</p>
        <div style="text-align: right; margin: 0">
          <el-button
            @click="visible = false"
            size="mini"
            type="info"
            plain
            round
          >
            取 消
          </el-button>
          <el-button type="danger" @click="stopApp" size="mini" round>
            确 定
          </el-button>
        </div>
        <el-tooltip
          slot="reference"
          effect="dark"
          content="关闭"
          placement="top"
          :disabled="visible || isSetting"
        >
          <el-button
            class="app-head-btn closebtn"
            size="mini"
            icon="el-icon-close"
          ></el-button>
        </el-tooltip>
      </el-popover>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
const remote = require('@electron/remote')
export default {
  name: "txlive",
  data() {
    return {
      isFullScreen: false,
      dialogVisible: false,
      visible: false,
      isSetting: false,
    };
  },
  methods: {
    dialogVisibleShow() {
      this.dialogVisible = true;
    },
    stopApp() {
      console.log("关闭TxLive");
      remote.app.exit();
    },
    maxAndReback() {
      const win = remote.getCurrentWindow();
      console.log(win);
      if (this.isFullScreen == true) {
        this.isFullScreen = false;
        console.log("123");
        win.unmaximize();
      } else {
        console.log("123");
        this.isFullScreen = true;
        win.maximize();
      }
    },
    minWindow() {
      const win = remote.getCurrentWindow();
      win.minimize();
    },
    dropDown(e) {
      if (e == true) {
        this.isSetting = e;
      } else {
        setTimeout(() => {
          this.isSetting = e;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scope></style>
