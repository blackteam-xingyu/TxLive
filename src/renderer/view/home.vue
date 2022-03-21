<template>
  <div class="home">
    <!-- <audio controls src="../assets/audio/music.mp3"></audio> -->
    <transition name="el-fade-in-linear">
      <el-image
        class="home-title"
        v-show="show.show1"
        :src="require('@/assets/img/title.png')"
      ></el-image>
    </transition>
    <transition name="el-fade-in-linear">
      <div v-show="show.show2" class="home-discribe">
        点击开始，开启一段新的直播之旅
      </div>
    </transition>
    <div class="home-btn">
      <el-button
        v-show="show.show3"
        type="warning"
        icon="el-icon-circle-plus"
        @click="newLive"
        round
        >新直播间</el-button
      >
      <el-button
        v-show="show.show4"
        type="primary"
        icon="el-icon-circle-plus"
        plain
        round
        >打开直播间</el-button
      >
      <el-button
        v-show="show.show5"
        type="info"
        icon="el-icon-s-tools"
        plain
        round
        >直播间管理</el-button
      >
      <el-button
        v-show="show.show6"
        type="danger"
        icon="el-icon-circle-plus"
        plain
        round
        @click="quit"
        >退出</el-button
      >
    </div>
  </div>
</template>
<script>
const remote = require('@electron/remote')
export default {
  name: "name",
  data() {
    return {
      show: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
      },
    };
  },
  props: [],
  methods: {
    quit() {
      remote.app.quit();
    },
    newLive() {
      this.$router.push("/live");
      // this.$router.push()
    },
  },
  mounted() {
    let i = 1;
    let clock = setInterval(() => {
      if (i <= 6) {
        this.show[`show${i}`] = true;
        i++;
      } else clearInterval(clock);
    }, 400);
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-title {
    // height: 50vh;
    margin: 60px 0;
    width: 25vw;
  }
  &-discribe {
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }
  &-btn {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    /deep/.el-button {
      // font-size: 24px;
    }
  }
}
</style>
