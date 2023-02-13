<template>
  <div>
    <div>
      <h3>アノテーション一覧</h3>
      <div class="table">
        <table border="1">
          <tr>
            <td></td>
            <td>作成日</td>
            <td>名前</td>
            <td>
              <div>編集</div>
            </td>
          </tr>
          <tr v-for="(annotation, index) in annotation_list" :key="index">
            <td>{{ index }}</td>
            <td>{{ annotation.generated_time }}</td>
            <td>{{ annotation.annotation_name }}</td>
            <td>
              <button @click="moveToEdit(annotation.annotation_id)">
                編集
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const base_url = "https://dr832vdhbi.execute-api.us-east-1.amazonaws.com/prod/";
export default {
  data() {
    return {
      annotation_list: [],
      error: false,
    };
  },
  methods: {
    async getAllAnotation() {
      try {
        const response = await axios.get(base_url + "annotation");
        this.annotation_list = JSON.parse(response.data.annotation_table_data);
      } catch (e) {
        console.log(e);
        this.error = true;
      }
    },
    moveToEdit(id) {
      this.$router.push({ path: "/edit/" + id });
    },
  },
  async created() {
    await this.getAllAnotation();
    console.log(typeof this.annotation_list);
  },
  computed: {
    showArray() {
      const last =
        this.annotation_list.length > 50 ? 50 : this.annotation_list.length - 1;
      const showArray = this.annotation_list.slice(0, last);
      return showArray;
    },
  },
};
</script>
