<template>
  <div class="content">
    <div class="content-title">场景菜单</div>
    <div class="content-body"></div>
  </div>
</template>
<script>
export default {
  name: "screen",
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
  overflow: hidden;
  &-title {
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
