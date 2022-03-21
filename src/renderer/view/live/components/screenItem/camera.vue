<template>
  <video ref="myVideo" class="content-camera" autoplay></video>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: [],
  methods: {
    async UsingMedia() {
      let mydeviecs = await navigator.mediaDevices.enumerateDevices();
      console.log(mydeviecs);
      let stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { max: 800 },
          height: { max: 600 },
        },
        audio: false,
      });
      this.$refs.myVideo.srcObject = stream;
    },
  },
  mounted() {
    this.UsingMedia();
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.content-camera {
  cursor: grab;
  position: absolute;
  // background: red;
  width: 200 / 1920 * 100vw;
  height: 200 / 1920 / 4 * 3 * 100vw;
  z-index: 1;
  //   border: 1px solid rgba($color: #000000, $alpha: 0.0);
  &:hover {
    border: 1px solid #f00;
    cursor: move;
  }
  &:active {
    cursor: grabbing;
  }
}
</style>
