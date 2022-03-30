<template>
  <video
    ref="myWindow"
    class="content-window"
    autoplay
    :style="cssVars"
  ></video>
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
    zIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    async UsingMedia() {
      console.log(
        "desktopCapturer\n",
        await desktopCapturer.getSources({ types: ["window", "screen"] })
      );
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.options.windowID,
          },
        },
      });
      // console.log(stream ? true : false);
      this.$refs.myWindow.srcObject = stream;
    },
  },
  mounted() {
    this.UsingMedia();
  },
  computed: {
    cssVars() {
      return {
        "--sizeW": this.options.sizeW + "%",
        "--sizeH": this.options.sizeH + "%",
        "--zIndex": this.zIndex,
      };
    },
  },
  watch: {
    "options.windowID": {
      handler(newVal) {
        this.UsingMedia();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.content-window {
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
