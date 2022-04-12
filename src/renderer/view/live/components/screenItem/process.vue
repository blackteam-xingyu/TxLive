<template>
  <video
    ref="myProcess"
    class="content-process"
    autoplay
    :style="cssVars"
  ></video>
</template>
<script>
export default {
  name: "process",
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
      let stream = await navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: this.options.gameID,
            minWidth: this.options.dpiWidth,
            maxWidth: this.options.dpiWidth,
            minHeight: this.options.dpiHeight,
            maxHeight: this.options.dpiHeight,
          },
        },
      });
      console.log(stream ? true : false);
      this.$refs.myProcess.srcObject = stream;
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
    "options.gameID": {
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
.content-process {
  position: absolute;
  z-index: var(--zIndex);
  width: 100%;
  height: 100%;
}
</style>
