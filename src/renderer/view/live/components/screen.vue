<template>
  <div class="content">
    <div class="content-title">
      <div class="content-title-name">场景菜单</div>
      <el-tooltip class="item" effect="dark" content="新建" placement="top">
        <i class="el-icon-plus" @click="newScreen"></i>
      </el-tooltip>
      <!-- <el-tooltip class="item" effect="dark" content="打开" placement="top">
        <i class="el-icon-folder-opened" @click="openScreens"></i>
      </el-tooltip> -->
      <el-tooltip class="item" effect="dark" content="保存" placement="top">
        <i class="el-icon-folder-checked" @click="save"></i>
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
              <i class="el-icon-edit" @click="edit(jtem, jndex)"></i>
              <i class="el-icon-delete" @click="removeItem(index, jndex)"></i>
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
      <div class="content-foot-right" @click="renameScrenmItem">
        <i class="el-icon-refresh"></i>
        <span>&nbsp;重命名</span>
      </div>
      <div class="content-foot-right" @click="clearScreenItem">
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
      <el-tooltip
        v-for="(item, index) in screenMenu"
        :key="index"
        effect="dark"
        :content="index > 7 ? '敬请期待' : item.title"
        placement="left"
      >
        <el-card
          :class="index > 7 ? 'drawer-disabled' : 'drawer-item'"
          shadow="hover"
          :body-style="{ padding: '0', height: '100%' }"
          @click.native="index > 7 ? null : chooseScreenItem(item)"
        >
          <div class="drawer-item-img">
            <i :class="`iconfont ${item.icon}`"></i>
          </div>

          <div class="drawer-item-title">{{ item.title }}</div>
        </el-card>
      </el-tooltip>
      <!-- <div
        class="drawer-item"
        v-for="(item, index) in screenMenu"
        :key="index"
      >

      </div> -->
      <!-- <span>请选择需要添加的场景</span> -->
    </el-drawer>
    <form-dialog
      :items="formItems"
      :title="formTitle"
      :dialogVisible="formDialogVisible"
      :defaults="formDefaults"
      @yes="fromYes"
      @cancel="formCancel"
    ></form-dialog>
    <camera-dialog
      :defaults="cameraDefaults"
      :dialogVisible="cameraDialogVisible"
      @yes="cameraYes"
      @cancel="cameraCancel"
    ></camera-dialog>
  </div>
</template>
<script>
import myDialog from "@/common/components/myDialog.vue";
import { screenMenu, screenName, openScreen } from "@/common/js/liveItem.js";
import FormDialog from "../../../common/components/formDialog.vue";
import CameraDialog from "./ItemDialogs/cameraDialog.vue";
const remote = require("@electron/remote");
const fs = require("fs");
export default {
  components: { myDialog, FormDialog, CameraDialog },
  name: "screen",
  data() {
    return {
      screenTab: "0",
      screenList: [],
      screenMenu: screenMenu,
      dialogVisible: false,
      title: "",
      content: "",
      yesEval: "",
      cancelEval: "",
      screenItem: [],
      drawerTitle: "",
      drawer: false,
      drawerSize: 270,
      //*formDialog表单变量
      formItems: [],
      formTitle: "",
      formDialogVisible: false,
      formFunction: "",
      formDefaults: {},
      //*cameraDialog相机变量
      cameraDialogVisible: false,
      cameraDefaults: {},
      itemModelCache: {},
      itemIndexCache: null,
      isNew: false,
    };
  },
  props: [],
  methods: {
    removeScreen(val) {
      this.screenList.splice(Number(val), 1);
      this.screenItem.splice(Number(val), 1);
    },
    clearScreen() {
      this.screenList = [];
      this.screenItem = [];
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
        this.screenItem.push([]);
      } else {
        this.$message.error("最多只可添加10个场景哦！");
      }
    },
    clearTab() {
      this.title = "清空场景";
      this.content = "即将清空场景，请确认！";
      this.yesEval = `this.clearScreen()`;
      this.dialogVisible = true;
    },
    openScreens() {
      this.formTitle = "打开文件";
      this.formFunction = "openMyScreens";
      this.formItems = openScreen;
      this.formDialogVisible = true;
    },
    openMyScreens(val) {
      if (val.filePath.includes(".conf")) {
        if (fs.existsSync(val.filePath)) {
          console.log("该路径已存在", val.filePath);
          fs.readFile(val.filePath, "utf8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
            const param = JSON.parse(data);
            if (param.screenList) {
              this.screenList = param.screenList;
              this.screenItem = param.screenItem;
              fs.writeFile(
                `C:/ProgramData/TxLive/screen.conf`,
                JSON.stringify(params),
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //文件写入成功。
                }
              );
            } else {
              this.$message.error("该文件不是配置场景配置文件哦！");
            }
          });
          const params = {
            screenList: this.screenList,
            screenItem: this.screenItem,
          };
        } else {
          this.$message.error("路径不存在请重新输入哦！");
        }
      } else {
        this.$message.error("该文件不是配置场景配置文件哦！");
      }
    },
    //#region 模块操作部分
    newScreenItem() {
      if (this.screenList.length > 0) {
        this.drawerTitle = "请选择模块添加";
        const win = remote.getCurrentWindow();
        const a = win.getSize()[0];
        if (a > 1500) this.drawerSize = 550;
        else this.drawerSize = 280;
        // console.log(a);
        this.drawer = true;
      } else {
        this.$message.error("请先添加场景再新增模块哦！");
      }
    },
    renameScrenmItem() {
      this.formItems = screenName;
      this.formDefaults = {
        screenName: this.screenList[Number(this.screenTab)],
      };
      this.formFunction = "rename";
      console.log(
        "this.formItems\n",
        this.formItems,
        "\nthis.formDefaults\n",
        this.formDefaults
      );
      this.formDialogVisible = true;
    },
    rename(val) {
      this.screenList[Number(this.screenTab)] = val.screenName;
    },
    clearScreenItem() {
      if (this.screenList.length > 0) {
        this.screenItem[Number(this.screenTab)] = [];
      } else {
        this.$message.error("请先添加场景再清空模块哦！");
      }
    },
    chooseScreenItem(item) {
      this.itemModelCache = item;
      this.isNew = true;
      switch (item.type) {
        case 0:
          this.cameraDialog(item);
          break;
        default:
          this.screenItem[Number(this.screenTab)].push(item);
          this.drawer = false;
          break;
      }
    },
    edit(item, index) {
      this.itemModelCache = { ...item };
      switch (item.type) {
        case 0:
          this.cameraDialog(item);
          break;

        default:
          break;
      }
    },
    //模块dialog配置
    //摄像头
    cameraDialog(item) {
      this.cameraDefaults = item.options;
      this.cameraDialogVisible = true;
    },
    cameraYes(val) {
      this.itemModelCache.options = val;
      if (this.isNew) {
        this.screenItem[Number(this.screenTab)].push(this.itemModelCache);
      } else {
        this.screenItem[Number(this.screenTab)][this.itemIndexCache] = {
          ...this.itemModelCache,
        };
      }

      this.clearItemCache();
      this.cameraDialogVisible = false;
    },
    cameraCancel() {
      this.clearItemCache();
      this.cameraDialogVisible = false;
    },
    //窗口

    clearItemCache() {
      this.isNew = false;
      this.itemModelCache = {};
      this.itemIndexCache = null;
      this.drawer = false;
    },
    //#endregion
    trunShow(i, j) {
      this.screenItem[i][j].isShow = !this.screenItem[i][j].isShow;
    },
    trunLock(i, j) {
      this.screenItem[i][j].isLock = !this.screenItem[i][j].isLock;
    },
    removeItem(i, j) {
      this.screenItem[i].splice(j, 1);
    },
    fromYes(val) {
      let a = JSON.stringify(val);
      eval(`this.${this.formFunction}(${a})`);
      this.formDialogVisible = false;
    },
    formCancel() {
      this.formDialogVisible = false;
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
    //保存文件
    save() {
      if (this.screenList.length > 0) {
        this.dialogVisible = true;
        this.title = "保存场景";
        this.content = "保存场景到本地文件";
        this.yesEval = `this.saveJson()`;
      } else {
        this.$message.error("没有场景可以保存哦");
      }
    },
    saveJson() {
      let param = {
        screenList: this.screenList,
        screenItem: this.screenItem,
      };
      fs.writeFile(
        `C:/ProgramData/TxLive/screen.conf`,
        JSON.stringify(param),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //文件写入成功。
        }
      );
    },
  },
  created() {
    if (fs.existsSync(`C:/ProgramData/TxLive/`)) {
      console.log("该路径已存在");
    } else {
      console.log("该路径不存在");
      fs.mkdirSync(`C:/ProgramData/TxLive/`);
    }
    fs.readFile(`C:/ProgramData/TxLive/screen.conf`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      const param = JSON.parse(data);
      this.screenList = param.screenList;
      this.screenItem = param.screenItem;
    });
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "#fff",
    });
    setTimeout(() => {
      loading.close();
    }, 1000);
  },
  watch: {
    formDialogVisible(newVal) {
      if (newVal == false) {
        this.formItems = [];
        this.formTitle = "";
        this.formFunction = "";
        this.formDefaults = {};
      }
    },
    screenItem: {
      handler(newVal, oldVal) {
        console.log("screenItem Changed\n", newVal);
        this.$emit("screenItemChanged", newVal[Number(this.screenTab)]);
      },
      immediate: true,
      deep: true,
    },
    screenTab: {
      handler(newVal, oldVal) {
        console.log("screenTab Changed\n", newVal);
        this.$emit("screenItemChanged", this.screenItem[Number(newVal)]);
      },
      immediate: true,
    },
  },
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
      padding: 0 15px !important;
      height: 30px !important;
      line-height: 30px !important;
    }
    /deep/.el-tabs__nav-prev,
    /deep/.el-tabs__nav-next {
      font-size: 10px !important;
      // padding: 0 10px !important;
      height: 30px !important;
      line-height: 30px !important;
    }
    &-item {
      height: 40px;
      display: flex;
      padding: 0 10px;
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #f0f9eb;
        color: #666;
      }
      &:focus {
        outline: transparent;
        background-color: #e1f3d8;
        color: #333;
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
      width: 33%;
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
/deep/.el-drawer__body {
  display: flex;
  flex-wrap: wrap;
  .drawer-disabled {
    cursor: not-allowed !important;
    margin: 0 10px 10px 10px;
    width: 250px;
    height: 250px * 9 / 16;
    color: #999;
  }
  .drawer-item {
    margin: 0 10px 10px 10px;
    width: 250px;
    height: 250px * 9 / 16;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #333;
      .iconfont {
        font-size: 55px;
      }
      .drawer-item-title {
        font-weight: 600;
      }
    }
    &:active {
      color: #333;
      .iconfont {
        font-size: 45px;
      }
      .drawer-item-title {
        font-weight: 400;
      }
    }
    // position: relative;
    &-img {
      height: 70%;
      width: 100%;
      // position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 45px;
      }
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  // .drawer-item:nth-child(2n) {
  //   margin: 0 10px 10px 0;
  //   width: 250px;
  //   height: 250px * 9 / 16;
  // }
}
</style>
