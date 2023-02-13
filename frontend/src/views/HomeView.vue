<template>
  <div class="home">
    <div class="home_button">
      <div @click="moveToCreate">アノテーション作成</div>
    </div>
    <div class="home_button">
      <div @click="moveToShow">アノテーション編集</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    moveToCreate() {
      this.$router.push({ path: "/create" });
    },
    moveToShow() {
      this.$router.push({ path: "/show" });
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  & {
    width: 60%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &_button {
    border: solid 1px;
  }
}
</style>
