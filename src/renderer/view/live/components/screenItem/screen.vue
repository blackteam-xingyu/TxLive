<template>
  <video ref="myWindow" class="content-main" autoplay ></video>
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
  position: absolute;
  z-index: 1;
}
</style>
