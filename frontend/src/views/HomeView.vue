<template>
    
    <h1 class="my-5 primary">Annotation App</h1>

    <div class="mt-3 d-grid gap-2">
      <div class="btn btn-outline-dark p-5 my-3 fs-3 font-weight-bold" @click="moveToCreate">アノテーション作成</div>
      <div class="btn btn-outline-dark p-5 my-3 fs-3 font-weight-bold" @click="moveToShow">アノテーション編集・ダウンロード</div>
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

<!-- <style scoped lang="scss">
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
</style> -->
