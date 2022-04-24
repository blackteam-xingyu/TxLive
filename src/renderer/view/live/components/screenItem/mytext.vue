<template>
  <div v-refont="options.fontSize" class="content-text" :style="cssVar">
    {{ options.text }}
  </div>
</template>
<script>
export default {
  name: "my-text",
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
  methods: {},
  mounted() {},
  computed: {
    cssVar() {
      return {
        "--zIndex": this.zIndex,
        "--Color": this.options.color,
        "--Background": this.options.background,
        "--fontFamily": this.options.fontFamily,
        "--textShadow": this.options.textShadow,
        "--fontWeight": this.options.fontWeight,
        "--zIndex": this.zIndex,
      };
    },
  },
  watch: {
    // "options.fontSize": {
    //   handler(newVal, oldVal) {
    //     this.textKey++;
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
};
</script>
<style lang="scss" scoped>
.content-text {
  cursor: grab;
  position: absolute;
  z-index: var(--zIndex);
  background-color: var(--Background);
  color: var(--Color);
  font-family: var(--fontFamily);
  font-weight: var(--fontWeight);
  text-shadow: var(--textShadow);
  user-select: none;
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
