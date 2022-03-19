<template>
  <div class="content">
    <div class="content-title">
      <div class="content-title-name">场景菜单</div>
      <el-tooltip class="item" effect="dark" content="新建" placement="top">
        <i class="el-icon-plus" @click="newScreen"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="top">
        <i class="el-icon-folder-checked"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="清空" placement="top">
        <i class="el-icon-delete" @click="clearTab"></i>
      </el-tooltip>
    </div>
    <div class="content-body">
      <el-tabs v-model="screenTab" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in screenList"
          :key="index"
          :label="item"
          :name="index + ''"
          lazy
        >
          <div
            class="content-body-item"
            v-for="(jtem, jndex) in screenItem[index]"
            :key="jndex"
            :tabindex="jndex"
          >
            <div class="content-body-item-title">{{ jtem.title }}</div>
            <div class="content-body-item-btn">
              <i
                v-if="jtem.isShow"
                class="iconfont icon-xianshi"
                @click="trunShow(index, jndex)"
              ></i>
              <i
                v-else
                class="iconfont icon-yincang"
                @click="trunShow(index, jndex)"
              ></i>
              <i
                v-if="jtem.isLock"
                class="el-icon-lock"
                @click="trunLock(index, jndex)"
              ></i>
              <i
                v-else
                class="el-icon-unlock"
                @click="trunLock(index, jndex)"
              ></i>
              <i class="el-icon-edit"></i>
              <i class="el-icon-delete"></i>
              <i></i>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-foot">
      <div class="content-foot-left" @click="newScreenItem">
        <i class="el-icon-circle-plus-outline"></i>
        <span>&nbsp;添加</span>
      </div>
      <div class="content-foot-right">
        <i class="el-icon-delete"></i>
        <span>&nbsp;清空</span>
      </div>
    </div>

    <!-- 浮窗 -->
    <my-dialog
      ref="dialog"
      :DialogVisible="dialogVisible"
      :title="title"
      :content="content"
      @yes="yes(yesEval)"
      @cancel="cancel(cancelEval)"
    ></my-dialog>
    <!-- 抽屉 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      :destroy-on-close="true"
      :size="drawerSize"
    >
      <!-- <span>请选择需要添加的场景</span> -->
    </el-drawer>
  </div>
</template>
<script>
import myDialog from "@/common/components/myDialog.vue";
export default {
  components: { myDialog },
  name: "screen",
  data() {
    return {
      screenTab: "0",
      screenList: [],
      dialogVisible: false,
      title: "",
      content: "",
      yesEval: "",
      cancelEval: "",
      screenItem: [],
      drawerTitle: "",
      drawer: false,
      drawerSize: 200,
    };
  },
  props: [],
  methods: {
    removeScreen(val) {
      this.screenList.splice(Number(val), 1);
    },
    clearScreen() {
      this.screenList = [];
    },
    removeTab(val) {
      this.dialogVisible = true;
      this.title = "删除场景";
      this.content = "即将删除场景，请确认！";
      this.yesEval = `this.removeScreen(${val})`;
    },
    newScreen() {
      if (this.screenList.length < 10) {
        this.screenList.push(`场景${this.screenList.length + 1}`);
      } else {
        this.$message({
          showClose: true,
          message: "最多只可添加10个场景哦！",
          type: "error",
        });
      }
    },
    clearTab() {
      this.dialogVisible = true;
      this.title = "清空场景";
      this.content = "即将清空场景，请确认！";
      this.yesEval = `this.clearScreen()`;
    },
    newScreenItem() {
      this.drawerTitle="请选择模块添加"
      const win = this.$electron.remote.getCurrentWindow();
      const a = win.getSize()[0];
      if (a > 1500) this.drawerSize = 400;
      else this.drawerSize = 200;
      // console.log(a);
      this.drawer = true;
    },
    trunShow(i, j) {
      this.screenItem[i][j].isShow = !this.screenItem[i][j].isShow;
    },
    trunLock(i, j) {
      this.screenItem[i][j].isLock = !this.screenItem[i][j].isLock;
    },
    yes(val) {
      if (val && val != "") {
        eval(val);
      }
      this.title = "";
      this.content = "";
      this.yesEval = "";
      this.dialogVisible = false;
    },
    cancel(val) {
      if (val && val != "") {
        eval(val);
      }
      this.title = "";
      this.content = "";
      this.cancelEval = "";
      this.dialogVisible = false;
    },
    handleClose() {
      this.drawer = false;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.content {
  flex: 1;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 10px #999;
  overflow: hidden;
  color: #67c23a;
  &-title {
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    &-name {
      flex: 1 1 auto;
    }
    i {
      margin-left: 5px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #67c23a;
      }
    }
  }
  &-body {
    height: calc(100% - 70px);
    /deep/.el-tabs__item {
      font-size: 10px !important;
      padding: 0 10px !important;
      height: 30px !important;
      line-height: 30px !important;
    }
    &-item {
      height: 40px;
      display: flex;
      padding: 0 10px;
      color: #bbb;
      font-size: 14px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #f0f9eb;
        color: #aaa;
      }
      &:focus {
        outline: transparent;
        background-color: #e1f3d8;
        color: #999;
      }
      &-title {
        flex: 1 1 auto;
      }
      &-btn {
        display: flex;
        align-items: center;
        i {
          margin-left: 5px;
          cursor: pointer;

          &:active {
            color: #409eff;
          }
        }
      }
    }
  }
  &-foot {
    height: 40px;
    border-top: 1px solid #ccc;
    display: flex;
    &-left,
    &-right {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #67c23a;
      }
    }
    &-right {
      border-left: 1px solid #ccc;
    }
  }
}
</style>
