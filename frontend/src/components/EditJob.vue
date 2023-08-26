<template>
  <div class="form">
    <input
      type="radio"
      :name="'check_job' + index"
      value="0"
      v-model="result_str"
      @click="save(0)"
    />
    <div>{{ job.content_0 }}</div>
    <input
      type="radio"
      :name="'check_job' + index"
      value="1"
      v-model="result_str"
      @click="save(1)"
    />
    <div>{{ job.content_1 }}</div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
    },
    job: {
      type: Object,
    },
  },
  data() {
    return {
      result_str: null,
    };
  },
  methods: {
    save(value) {
      const output = this.result === value ? null : value;
      this.unSelected(value);
      this.$emit("save", output);
    },
    //選択を外す処理
    unSelected(value) {
      if (this.result_str && this.result_str === `${value}`) {
        this.result_str = null;
      }
    },
  },
  computed: {
    result() {
      return this.result_str ? +this.result_str : null;
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
}
</style>
