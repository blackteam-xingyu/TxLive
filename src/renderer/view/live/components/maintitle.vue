<template>
  <div class="content">
    <el-image
      src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      class="content-img"
    ></el-image>
    <div class="content-body">
      <div class="content-body-left">
        <el-input
          class="content-body-left-input"
          placeholder="请输入直播标题"
          v-model="input"
          size="mini"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-finished"
            size="mini"
          ></el-button>
        </el-input>
        <div class="content-body-left-tags">
          <el-tag type="info" size="mini">#&nbsp;&nbsp;分区设置</el-tag
          ><el-tag type="info" size="mini">#&nbsp;&nbsp;推荐话题</el-tag>
        </div>
      </div>
      <div class="content-body-right">
        <el-button
          type="text"
          size="mini"
          icon="el-icon-s-promotion
"
          >分享</el-button
        >
        <div style="margin-top:10px;font-size:12px;line-heght:20px;text-align:center">0人看过</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "maintitle",
  data() {
    return {
      input: "",
    };
  },
  props: [],
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.content {
  background: #fff;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 10px;
  display: flex;
  &-img {
    height: 100%;
    width: 115.55px;
  }
  &-body {
    width: calc(100% - 115.55px);
    display: flex;
    &-left {
      width: calc(100% - 60px);
      padding: 0 10px;

      &-input {
        min-width: 230px;
        max-width: 600px;
      }
      &-tags {
        height: calc(100% - 25px);
        display: flex;
        align-items: center;

        .el-tag + .el-tag {
          margin-left: 10px;
        }
      }
    }
    &-right {
      width: 60px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
