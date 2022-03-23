<template>
  <div class="content-photo" :src="this.options.srcUrl" :style="cssVar"></div>
</template>
<script>
export default {
  name: "text",
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
    },
  },
  methods: {},
  mounted() {},
  computed: {
    cssVar() {
      return {
        "--sizeW": (this.options.sizeW / this.options.dpiWidth) * 100 + "%",
        "--sizeH": (this.options.sizeH / this.options.dpiHeight) * 100 + "%",
        "--zIndex": this.zIndex,
        ...this.options.textStyle,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.content-photo {
  cursor: grab;
  position: absolute;
  width: var(--sizeW);
  height: var(--sizeH);
  z-index: var(--zIndex);
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
