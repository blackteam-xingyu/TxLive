<template>
  <video ref="myVideo" class="content-camera" autoplay :style="cssVars"></video>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
      // default: {},
    },
    zIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    async UsingMedia() {
      // console.log(await this.$electron.desktopCapturer.getSources({ types: ['window', 'screen'] }))

      let stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: this.options.dpiWidth, max: this.options.dpiWidth },
          height: { min: this.options.dpiHeight, max: this.options.dpiHeight },
          deviceId: this.options.cameraID ? this.options.cameraID : "default",
        },
        audio: false,
      });
      this.$refs.myVideo.srcObject = stream;
    },
  },
  mounted() {
    this.UsingMedia();
  },
  computed: {
    cssVars() {
      return {
        "--sizeW": (this.options.sizeW / 1920) * 100 + "%",
        "--sizeH": (this.options.sizeH / 1080) * 100 + "%",
        "--zIndex": this.zIndex,
        "--rotate": `rotate(${this.options.angle}deg) rotateY(${
          this.options.isCameraY ? 180 : 0
        }deg) rotateX(${this.options.isCameraX ? 180 : 0}deg)`,
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
.content-camera {
  cursor: grab;
  position: absolute;
  width: var(--sizeW);
  height: var(--sizeH);
  z-index: var(--zIndex);
  transform: var(--rotate);
  background: #333;
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
