<template>
  <video ref="myScreen" class="content-main" autoplay :style="cssVars"></video>
</template>
<script>
const { desktopCapturer } = require("electron");
export default {
  name: "screen",
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
    },
    zIndex: {
      type: Number,
    },
  },
  methods: {
    async UsingMedia() {
      console.log(
        "desktopCapturer\n",
        await desktopCapturer.getSources({ types: ["window", "screen"] })
      );

      let stream = await navigator.mediaDevices.getUserMedia({
        // audio: {
        //   mandatory: {
        //     chromeMediaSource: "desktop",
        //   },
        // },
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            minWidth: 1920,
            maxWidth: 1920,
            minHeight: 1080,
            maxHeight: 1080,
          },
        },
      });
      console.log(stream ? true : false);
      this.$refs.myScreen.srcObject = stream;
    },
  },
  mounted() {
    this.UsingMedia();
  },
  computed: {
    cssVars() {
      return {
        "--zIndex": this.zIndex,
      };
    },
  },
  watch: {
    cssVars(newVal) {
      console.log("cssVars", newVal);
    },
    options: {
      handler(newVal) {
        console.log("options changed", newVal);
        this.UsingMedia();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.content-main {
  position: absolute;
  z-index: var(--zIndex);
}
</style>
