<template>
  <div class="content">
    <el-avatar
      size="medium"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    ></el-avatar>
    <div class="content-info">
      <el-row class="content-info-row">
        <el-col class="content-info-col" :span="12">
          <span class="title">SAN值</span>
          <span class="title">0</span>
        </el-col>
        <el-col class="content-info-col" :span="12">
          <span class="title">粉丝数量</span>
          <span class="title">0</span>
        </el-col>
      </el-row>
      <el-row class="content-info-row">
        <el-col class="content-info-col" :span="12">
          <span class="title">船员数</span>
          <span class="title">0</span>
        </el-col>
        <el-col class="content-info-col" :span="12">
          <span class="title">粉丝团成员</span>
          <span class="title">0</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "info",
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
  display: flex;
  align-items: center;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  &-info {
    flex: 1 1 auto;
    height: 100%;
    padding-left: 10px;
    overflow: hidden;
    &-row {
      height: 35px;
    }
    &-col {
      height: 35px;
      display: flex;
      align-items: center;
      display: flex;
      .title {
        flex: 1 1 auto;
        font-size: 10px;
        font-weight: 600;
      }
    }
  }
}
</style>
