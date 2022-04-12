<template>
  <div v-resize class="content">
    <camera
      v-for="(item, index) in screenItem"
      v-if="item.type === 0"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></camera>
    <windows
      v-for="(item, index) in screenItem"
      v-if="item.type === 1"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></windows>
    <process
      v-for="(item, index) in screenItem"
      v-if="item.type === 2"
      v-show="item.isShow"
      v-drag="false"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></process>
    <screen
      v-for="(item, index) in screenItem"
      v-if="item.type === 3"
      v-show="item.isShow"
      v-drag="false"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></screen>
    <photo
      v-for="(item, index) in screenItem"
      v-if="item.type === 4"
      v-show="item.isShow"
      v-drag="!item.isLock"
      :options="item.options"
      :zIndex="screenItem.length - index"
      :key="index"
    ></photo>
    <mytext
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
// var box = document.getElementsByClassName("box")[0]
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
    };
  },
  props: ["screenItemBase"],
  methods: {},
  mounted() {},
  watch: {
    screenItemBase: {
      handler(newVal, oldVal) {
        this.screenItem = newVal;
        console.log(this.screenItem);
      },
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
</style>
