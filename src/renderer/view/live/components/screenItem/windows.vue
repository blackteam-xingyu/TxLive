<template>
  <video ref="myWindow" class="content-main" autoplay :style="cssVars"></video>
</template>
<script>
const { desktopCapturer } = require("electron");
export default {
  name: "windows",
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    async UsingMedia() {
      //   let mydeviecs = await navigator.mediaDevices.enumerateDevices();
      //   console.log(mydeviecs);
      console.log(
        "desktopCapturer\n",
        await desktopCapturer.getSources({ types: ["window", "screen"] })
      );

      let stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.options.windowID,
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.options.windowID,
            minWidth: this.options.dpiWidth,
            maxWidth: this.options.dpiWidth,
            minHeight: this.options.dpiHeight,
            maxHeight: this.options.dpiHeight,
          },
        },
      });
      console.log(stream ? true : false);
      this.$refs.myWindow.srcObject = stream;
    },
  },
  mounted() {
    this.UsingMedia();
  },
  computed: {
    cssVars() {
      return {
        "--sizeW": (this.options.sizeW / this.options.dpiWidth) * 100 + "%",
        "--sizeH": (this.options.sizeH / this.options.dpiHeight) * 100 + "%",
        "--zIndex": this.zIndex,
        // "--rotate": `rotate(${this.options.angle}deg) rotateY(${
        //   this.options.isCameraY ? 180 : 0
        // }deg) rotateX(${this.options.isCameraX ? 180 : 0}deg)`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.content-main {
  cursor: grab;
  position: absolute;
  width: var(--sizeW);
  height: var(--sizeH);
  z-index: var(--zIndex);
  // transform: var(--rotate);
  &:hover {
    border: 1px solid #ff000080;
    cursor: move;
  }
  &:active {
    cursor: grabbing;
    border: 1px solid #ff0000;
  }
}
</style>
