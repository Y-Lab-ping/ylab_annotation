<template>
  <div class="edit_area" v-if="jobList">
    <div v-for="(job, i) in jobList" :key="i" class="form">
      <EditJob
        v-if="!job.isImage"
        :index="i"
        :job="job"
        @save="getResult(job, $event)"
      />
      <EditImageJob
        v-else
        :index="i"
        :job="job"
        @save="getResult(job, $event)"
      />
    </div>
    <button @click="sendJob" :disabled="isSending">送信</button>
  </div>
</template>

<script>
import axios from "axios";
import EditJob from "@/components/EditJob.vue";
import EditImageJob from "@/components/EditImageJob.vue";
const base_url = "https://dr832vdhbi.execute-api.us-east-1.amazonaws.com/prod/";
export default {
  components: {
    EditJob,
    EditImageJob,
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
      console.log(response);
      this.jobList = [this.jobList, ...response.data.response_list];
      this.jobList = [
        {
          image_0:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-o0ymJgCRAFoRFnYD4VQlmP-yzwNalhZiQ&usqp=CAU",
          image_1:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKKIJO9G9u8ep7On4R4WmdrlKs5epE-7ulWS-sz0dhjuDzdID9N1WHAJUjF8NCCe2SSo&usqp=CAU",
          isImage: true,
        },
        {
          image_0:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKKIJO9G9u8ep7On4R4WmdrlKs5epE-7ulWS-sz0dhjuDzdID9N1WHAJUjF8NCCe2SSo&usqp=CAU",
          image_1:
            "https://sorae.info/wp-content/uploads/2021/12/over70-freefloatingplanet-found-1.jpg",
          isImage: true,
        },
      ];
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
