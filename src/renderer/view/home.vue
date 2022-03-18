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
  </div>
</template>
<script>
export default {
  name: "name",
  data() {
    return {
      show: {
        show1: false,
        show2: false,
      },
    };
  },
  props: [],
  methods: {},
  mounted() {
    let i = 1;
    let clock = setInterval(() => {
      if (i <= 2) {
        this.show[`show${i}`] = true;
        i++;
      } else clearInterval(clock);
    }, 1000);
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
  }
}
</style>
