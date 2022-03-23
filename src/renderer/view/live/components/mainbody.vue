<template>
  <div class="content">
    <camera v-drag :options="cameraOptions" :zIndex="10"></camera>
    <windows></windows>
    <screen></screen>
    <process></process>
  </div>
</template>
<script>
import Screen from "./screenItem/screen.vue";
// var box = document.getElementsByClassName("box")[0]
import camera from "./screenItem/camera.vue";
import Windows from "./screenItem/windows.vue";
import Process from "./screenItem/process.vue";
export default {
  components: { camera, Windows, Screen, Process },
  name: "mainbody",
  data() {
    return {
      screenItem: [],
      cameraOptions: {
        mask: {
          light: 128,
          contrast: 32,
          hue: 0,
          Saturation: 64,
        },
        cameraName: "",
        cameraID: "",
        dpiWidth: 1280,
        dpiHeight: 720,
        isCameraX: false,
        isCameraY: true,
        angle: 0,
        sizeW: 360,
        sizeH: 202.5,
        darg: true,
      },
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
  background: #333;
  width: 100%;
  // height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 3px;
  overflow: hidden;
  &-main {
    height: 100%;
    width: 100%;
  }
}
</style>
