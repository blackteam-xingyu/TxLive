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
    <div class="content-body" :key="contentBodyKey">
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
            v-if="jtem"
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
                v-show="!jtem.forbiddenLock"
                class="el-icon-lock"
                @click="trunLock(index, jndex)"
              ></i>
              <i
                v-else
                v-show="!jtem.forbiddenLock"
                class="el-icon-unlock"
                @click="trunLock(index, jndex)"
              ></i>
              <i
                class="el-icon-edit"
                v-if="jtem.type != 3"
                @click="edit(jtem, jndex)"
              ></i>
              <i class="el-icon-delete" @click="removeItem(index, jndex)"></i>
              <i
                class="el-icon-arrow-up"
                v-show="jndex > 0"
                @click="moveUp(screenItem[index], jndex)"
              ></i>
              <i
                class="el-icon-arrow-down"
                v-show="jndex < screenItem[index].length - 1"
                @click="moveDown(screenItem[index], jndex)"
              ></i>
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
    <!-- 
      DialogVisible 浮窗开关
      title 浮窗标题
      title 文字描述
      yes 确认事件
      cancel 取消事件
     -->
    <my-dialog
      ref="dialog"
      :DialogVisible.sync="dialogVisible"
      :title="title"
      :content="content"
      @yes="yes(yesEval)"
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
    <!-- *表单浮窗
      items 组件对象数组
      title 标题
      dialogVisible 是否显示
      defauls 默认值
      yes 确认事件
      cancel 取消事件
      formFunction 真正触发的方法
      itemModelCache 缓存模型
      itemIndexCache 缓存索引
      clearItemCache() 清空缓存
     -->
    <form-dialog
      :items="formItems"
      :title="formTitle"
      :dialogVisible.sync="formDialogVisible"
      :defaults="formDefaults"
      @yes="fromYes"
    ></form-dialog>
    <camera-dialog
      :defaults="cameraDefaults"
      :dialogVisible.sync="cameraDialogVisible"
      @yes="cameraYes"
    ></camera-dialog>
    <photo-dialog
      :defaults="photoDefaults"
      :dialogVisible.sync="photoDialogVisible"
      @yes="photoYes"
    ></photo-dialog>
    <text-dialog
      :defaults="textDefaults"
      :dialogVisible.sync="textDialogVisible"
      @yes="textYes"
    >
    </text-dialog>
  </div>
</template>
<script>
import myDialog from "@/common/components/myDialog.vue";
import {
  screenMenu,
  screenName,
  openScreen,
  windowsEdit,
  processEdit,
} from "@/common/js/liveItem.js";
import FormDialog from "../../../common/components/formDialog.vue";
import CameraDialog from "./ItemDialogs/cameraDialog.vue";
import PhotoDialog from "./ItemDialogs/photoDialog.vue";
import TextDialog from "./ItemDialogs/textDialog.vue";
const remote = require("@electron/remote");
const fs = require("fs");
export default {
  components: { myDialog, FormDialog, CameraDialog, PhotoDialog, TextDialog },
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
      contentBodyKey: 0,
      //*抽屉
      drawerTitle: "",
      drawer: false,
      drawerSize: 270,
      //*公共表单变量
      itemModelCache: {}, //缓存模型
      itemIndexCache: null, //缓存索引
      isNew: false, //是否新建
      //*formDialog表单变量
      formItems: [],
      formTitle: "",
      formDialogVisible: false,
      formFunction: "",
      formDefaults: {},
      //*cameraDialog相机变量
      cameraDialogVisible: false,
      cameraDefaults: {},
      //*photoDialog图片变量
      photoDefaults: {},
      photoDialogVisible: false,
      textDefaults: {},
      textDialogVisible: false,
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
      this.clearItemCache();
      this.itemModelCache = item;
      this.isNew = true;
      switch (item.type) {
        case 0:
          this.cameraDialog(item);
          break;
        case 1:
          this.windowsDialog(item);
          break;
        case 2:
          this.processDialog(item);
          break;
        case 4:
          this.photoDialog(item);
          break;
        case 5:
          this.textDialog(item);
          break;
        default:
          this.screenItem[Number(this.screenTab)].push(item);
          this.drawer = false;
          break;
      }
    },
    edit(item, index) {
      this.clearItemCache();
      this.itemModelCache = { ...item };
      this.itemIndexCache = index;
      switch (item.type) {
        case 0:
          this.cameraDialog(item);
          break;
        case 1:
          this.windowsDialog(item);
          break;
        case 2:
          this.processDialog(item);
          break;
        case 4:
          this.photoDialog(item);
          break;
        case 5:
          this.textDialog(item);
          break;
        default:
          break;
      }
    },
    moveUp(item, jndex) {
      console.log("上移", item, jndex);
      let a = item[jndex - 1];
      item[jndex - 1] = item[jndex];
      item[jndex] = a;
      this.contentBodyKey++;
      item.push(null);
      item.splice(item.length - 1, 1);
    },
    moveDown(item, jndex) {
      console.log("下移", item, jndex);
      let a = item[jndex + 1];
      item[jndex + 1] = item[jndex];
      item[jndex] = a;
      this.contentBodyKey++;
      item.push(null);
      item.splice(item.length - 1, 1);
    },
    //模块dialog配置
    //!摄像头
    cameraDialog(item) {
      this.cameraDefaults = item.options;
      this.cameraDialogVisible = true;
    },
    cameraYes(val) {
      console.log("this.itemModelCache\n", this.itemModelCache);
      this.$set(this.itemModelCache, "options", val);
      console.log("val\n", val);
      if (this.isNew) {
        console.log("新增摄像头");
        this.screenItem[Number(this.screenTab)].push(this.itemModelCache);
      } else {
        console.log("修改摄像头\n", this.screenItem[Number(this.screenTab)]);
        this.$set(
          this.screenItem[Number(this.screenTab)],
          this.itemIndexCache,
          this.itemModelCache
        );
        // this.screenItem[Number(this.screenTab)][this.itemIndexCache] = {
        //   ...this.itemModelCache,
        // };
      }
      this.clearItemCache();
      this.drawer = false;
    },
    //!窗口
    windowsDialog(item) {
      console.log("windowsDialog");
      this.formDefaults = item.options;
      this.formItems = windowsEdit;
      this.formTitle = "窗口捕捉";
      this.formFunction = "windowsYes";
      this.formDialogVisible = true;
    },

    windowsYes(val) {
      console.log("this.itemModelCache\n", this.itemModelCache);
      this.$set(this.itemModelCache, "options", val);
      console.log("val\n", val);
      if (this.isNew) {
        console.log("新增窗口");
        this.screenItem[Number(this.screenTab)].push(this.itemModelCache);
      } else {
        console.log("修改窗口\n", this.screenItem[Number(this.screenTab)]);
        this.$set(
          this.screenItem[Number(this.screenTab)],
          this.itemIndexCache,
          this.itemModelCache
        );
      }
      this.clearItemCache();
      this.drawer = false;
    },
    //!进程
    processDialog(item) {
      console.log("windowsDialog");
      this.formDefaults = item.options;
      this.formItems = processEdit;
      this.formTitle = "游戏进程";
      this.formFunction = "windowsYes";
      this.formDialogVisible = true;
    },
    clearItemCache() {
      this.isNew = false;
      this.itemModelCache = {};
      this.itemIndexCache = null;
    },
    //!图片
    photoDialog(item) {
      this.photoDefaults = item.options;
      this.photoDialogVisible = true;
    },

    photoYes(val) {
      console.log("this.itemModelCache\n", this.itemModelCache);
      this.$set(this.itemModelCache, "options", val);
      console.log("val\n", val);
      if (this.isNew) {
        console.log("新增图片");
        this.screenItem[Number(this.screenTab)].push(this.itemModelCache);
      } else {
        console.log("修改图片\n", this.screenItem[Number(this.screenTab)]);
        this.$set(
          this.screenItem[Number(this.screenTab)],
          this.itemIndexCache,
          this.itemModelCache
        );
      }
      this.clearItemCache();
      this.drawer = false;
    },
    //!文字
    textDialog(item) {
      this.textDefaults = item.options;
      this.textDialogVisible = true;
    },
    textYes(val) {
      console.log("this.itemModelCache\n", this.itemModelCache);
      this.$set(this.itemModelCache, "options", val);
      console.log("val\n", val);
      if (this.isNew) {
        console.log("新增文字");
        this.screenItem[Number(this.screenTab)].push(this.itemModelCache);
      } else {
        console.log("修改文字\n", this.screenItem[Number(this.screenTab)]);
        this.$set(
          this.screenItem[Number(this.screenTab)],
          this.itemIndexCache,
          this.itemModelCache
        );
      }
      this.clearItemCache();
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
      this.refresh();
    },

    yes(val) {
      if (val && val != "") {
        eval(val);
      }
      this.title = "";
      this.content = "";
      this.yesEval = "";
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
    //初始化
    initialization() {
      if (fs.existsSync(`C:/ProgramData/TxLive/`)) {
        console.log("该路径已存在");
      } else {
        console.log("该路径不存在");
        fs.mkdirSync(`C:/ProgramData/TxLive/`);
        return;
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
    //刷新
    refresh() {
      console.log("刷新");
      this.screenItem[Number(this.screenTab)].push(null);
      this.screenItem[Number(this.screenTab)].splice(
        this.screenItem[Number(this.screenTab)].length - 1,
        1
      );
    },
  },
  created() {
    this.initialization();
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
    // display: flex;
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
