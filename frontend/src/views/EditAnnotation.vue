<template>
  <div></div>
</template>

<script>
import axios from "axios";
const base_url = "https://dr832vdhbi.execute-api.us-east-1.amazonaws.com/prod/";
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
export default {
  data() {
    return { id: "", jobList: [] };
  },
  methods: {
    async getJob(id) {
      const response = await axios.get(base_url + "job/?annotation_id=" + id);
      this.jobList = JSON.parse(response);
    },
  },
  async created() {
    const id = this.$route.params.annotation_id;
    await this.getJob(id);
  },
};
</script>
