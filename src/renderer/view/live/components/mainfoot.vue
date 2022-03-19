<template>
  <div class="content">
    <div class="content-left">
      <el-button
        v-if="isMicrophone"
        class="content-left-btn"
        type="info"
        plain
        icon="el-icon-microphone"
        @click="turnMicrophone"
        size="mini"
        circle
      ></el-button>
      <el-button
        v-else
        type="danger"
        class="content-left-btn"
        plain
        icon="el-icon-turn-off-microphone"
        @click="turnMicrophone"
        size="mini"
        circle
      ></el-button>
      <el-slider
        class="content-left-slider"
        v-model="microphone"
        :format-tooltip="formatTooltip"
      ></el-slider>
      <el-button
        v-if="isMusic"
        class="content-left-btn"
        type="info"
        plain
        icon="icon-Earphones"
        @click="turnMusic"
        size="mini"
        circle
      ></el-button>
      <el-button
        v-else
        type="danger"
        class="content-left-btn"
        plain
        icon="icon-Earphones-off"
        @click="turnMusic"
        size="mini"
        circle
      ></el-button>
      <el-slider
        class="content-left-slider"
        v-model="music"
        :format-tooltip="formatTooltip"
      ></el-slider>
    </div>
    <div class="content-right">
      <el-button type="warning" plain round><i style="content:'';width"></i>录制</el-button>
      <el-button type="danger" round>开始直播</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainfoot",
  data() {
    return {
      microphone: 50,
      music: 50,
      isMicrophone: true,
      isMusic: true,
    };
  },
  props: [],
  methods: {
    formatTooltip(val) {
      return `${val}%`;
    },
    turnMicrophone() {
      this.isMicrophone = !this.isMicrophone;
    },
    turnMusic(){
      this.isMusic=!this.isMusic
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.content {
  background: #fff;
  min-height: 80px;
  max-height: 160px;
  width: 100%;
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  &-left {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    // max-width: 1300px;
    // width: 40px;
    &-btn + &-slider{
      margin:0 20px;
    }
    &-slider {
      min-width: 150px;
      max-width: 300px;
    }
  }
  &-right {
    display: flex;
    align-items: center;
    // width: 40px;
    // justify-content: flex-end;
    flex: 0 1 auto;
  }
}
</style>
