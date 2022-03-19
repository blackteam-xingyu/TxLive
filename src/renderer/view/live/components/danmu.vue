<template>
  <div class="content">
    <div class="content-title">实时弹幕</div>
  </div>
</template>
<script>
export default {
  name: "danmu",
  data() {
    return {};
  },
  props: [],
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.content {
  flex: 1;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 10px #999;
  white-space: nowrap;
  overflow: hidden;
  color: #409EFF;
  &-title {
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-left: 10px;
    overflow: hidden;
  }
}
</style>
