<template>
  <form class="form my-5">

    <div class="form-group">
      <div class="form-check">
        <input 
          class="form-check-input mx-3"
          style="transform:scale(2.0);"
          type="radio"
          :name="'check_job' + index"
          value="0"
          id="check1"
          v-model="result_str"
          @click="save(0)"
        >
        <label class="form-check-label mx-5" for="check1">
          {{ job.content_0 }}
        </label>
      </div>
    </div>

    <div class="form-group">
      <div class="form-check">
        <input 
          class="form-check-input mx-3"
          style="transform:scale(2.0);"
          type="radio"
          :name="'check_job' + index"
          value="1"
          v-model="result_str"
          @click="save(1)"
        >
        <label class="form-check-label mx-5" for="check1">
          {{ job.content_1 }}
        </label>
      </div>
    </div>

  </form>
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
