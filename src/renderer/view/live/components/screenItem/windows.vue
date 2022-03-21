<template>
  <video ref="myWindow" class="content-main" autoplay></video>
</template>
<script>
const { desktopCapturer } = require("electron");
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    windowId: {
      type: String,
      default: "",
    },
  },
  methods: {
    async UsingMedia() {
      //   let mydeviecs = await navigator.mediaDevices.enumerateDevices();
      //   console.log(mydeviecs);
      console.log(
        await desktopCapturer.getSources({ types: ["window", "screen"] })
      );
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.windowId,
          },
        },
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.windowId,
            minWidth: 1920,
            maxWidth: 1920,
            minHeight: 1080,
            maxHeight: 1080,
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
};
</script>
<style lang="scss" scoped>
.content-main {
  //   position: absolute;
  z-index: -1;
}
</style>
