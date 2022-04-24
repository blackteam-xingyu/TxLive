<template>
  <div v-resize class="content">
    <camera
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 0"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></camera>
    <windows
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 1"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></windows>
    <process
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 2"
      v-show="item.isShow"
      v-drag="false"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></process>
    <screen
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 3"
      v-show="item.isShow"
      v-drag="false"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></screen>
    <photo
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 4"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></photo>
    <mytext
      :id="`item_${index}`"
      v-for="(item, index) in screenItem"
      v-if="item.type === 5"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    >
    </mytext>
  </div>
</template>
<script>
import Screen from "./screenItem/screen.vue";
import camera from "./screenItem/camera.vue";
import Windows from "./screenItem/windows.vue";
import Process from "./screenItem/process.vue";
import Photo from "./screenItem/photo.vue";
import Mytext from "./screenItem/mytext.vue";
export default {
  components: { camera, Windows, Screen, Process, Photo, Mytext },
  name: "mainbody",
  data() {
    return {
      screenItem: [],
      events: [],
      canvasItem: [],
    };
  },
  props: ["screenItemBase"],
  mounted() {
    setTimeout(() => {
      this.refreshCanvas();
    }, 3000);
  },
  methods: {
    refreshCanvas() {
      this.canvasItem = this.screenItemBase.map((item, index) => {
        let el = document.getElementById(`item_${index}`);
        return {
          ...item,
          ...{
            left: el.offsetLeft,
            top: el.offsetTop,
            index: index,
          },
        };
      }, this);
    },
  },
  watch: {
    screenItemBase: {
      handler(newVal, oldVal) {
        this.screenItem = newVal;
      },
      immediate: true,
      deep: true,
    },
    canvasItem: {
      handler(newVal, oldVal) {},
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  background: #000;
  max-width: 100%;
  // flex: 1 1 auto;
  max-height: 100%;
  aspect-ratio: 16 / 9;
  // border-radius: 3px;
  overflow: hidden;
  &-main {
    height: 100%;
    width: 100%;
  }
}
/deep/.el-drawer__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#pushCanvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
