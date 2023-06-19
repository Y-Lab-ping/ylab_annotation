<template>
  <div>
    <div class="form">
      <input
        type="radio"
        :name="'check_job' + index"
        value="0"
        v-model="result_str"
        @click="save(0)"
      />
      <div class="image_container">
        <img class="image" :src="job.content_0" alt="" />
      </div>

      <input
        type="radio"
        :name="'check_job' + index"
        v-model="result_str"
        value="1"
        @click="save(1)"
      />
      <div class="image_container">
        <img class="image" :src="job.content_1" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: null,
    },
    job: {
      type: Object,
      default: () => {
        return {};
      },
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
    unselected(value) {
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
.image_container {
  width: 300px;
  height: 300px;
}

.image {
  max-width: 300px;
  max-height: 300px;
}
</style>
