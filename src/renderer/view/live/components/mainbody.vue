<template>
  <div class="content">
    <camera v-drag></camera>
    <windows></windows>
  </div>
</template>
<script>
// var box = document.getElementsByClassName("box")[0]
import camera from "./screenItem/camera.vue";
import Windows from "./screenItem/windows.vue";
export default {
  components: { camera, Windows },
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
  background: #333;
  width: 100%;
  // height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 3px;
  &-main {
    height: 100%;
    width: 100%;
  }
}
</style>
