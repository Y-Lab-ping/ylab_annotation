<template>
  <div class="edit_area" v-if="jobList">
    <div v-for="(job, i) in jobList" :key="i" class="form">
      <EditJob :index="i" :job="job" @save="getResult(job, $event)" />
    </div>
    <button @click="sendJob" :disabled="isSending">送信</button>
  </div>
</template>

<script>
import axios from "axios";
import EditJob from "@/components/EditJob.vue";
const base_url = "https://dr832vdhbi.execute-api.us-east-1.amazonaws.com/prod/";
export default {
  components: {
    EditJob,
  },
  data() {
    return { jobList: [], isSending: false };
  },
  methods: {
    getResult(job, result) {
      job.result = result;
    },
    async getJob(id) {
      const response = await axios.get(base_url + "job?annotation_id=" + id);
      this.jobList = response.data.response_list;
    },
    async sendJob() {
      this.isSending = true;
      try {
        const response = await axios.patch(base_url + "job", {
          response_list: this.jobList,
        });
        console.log(response);
      } catch (e) {
        alert("エラーが発生しました");
      } finally {
        this.isSending = false;
      }
    },
  },
  async created() {
    const id = this.$route.params.annotation_id;
    await this.getJob(id);
    this.$nextTick(function () {
      // DOM が更新された
    });
  },
};
</script>
