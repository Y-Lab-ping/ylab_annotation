<template>
  <h1 class="my-3 primary">アノテーション一覧</h1>

  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>作成日</th>
        <th>名前</th>
        <th>編集</th>
        <th>CSV作成</th>
        <th>CSVダウンロード</th>
        <th>削除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(annotation, index) in annotation_list" :key="index">
        <td>{{ index }}</td>
        <td>{{ annotation.generated_time }}</td>
        <td>{{ annotation.annotation_name }}</td>
        <td>
          <button
            class="btn btn-outline-dark"
            @click="moveToEdit(annotation.annotation_id)"
          >
            編集
          </button>
        </td>
        <td>
          <button
            class="btn btn-outline-dark"
            @click="createResult(annotation.annotation_id)"
          >
            作成
          </button>
        </td>
        <td>
          <button
            class="btn btn-outline-dark"
            @click="getCSV(annotation.annotation_id)"
          >
            ダウンロード
          </button>
        </td>
        <td>
          <button
            class="btn btn-outline-dark"
            @click="deleteAnnotation(annotation.annotation_id, index)"
          >
            削除
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-3 d-grid gap-2">
    <button
      class="btn btn-outline-dark fs-3 font-weight-bold mt-3 mb-5"
      @click="backToHome"
    >
      メニューへ戻る
    </button>
  </div>
</template>

<script>
import axios from "axios";
const base_url = "https://dr832vdhbi.execute-api.us-east-1.amazonaws.com/prod/";
const api_url = ""; //+"http://127.0.0.1:5000";
import FileSaver from "file-saver";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
        toast(e, { autoClose: 1000 });
        this.error = true;
      }
    },
    moveToEdit(id) {
      this.$router.push({ path: "/edit/" + id });
    },
    createResult(annotationId) {
      axios
        .post(base_url + "result", { annotation_id: annotationId })
        .then(() => {})
        .catch((e) => {
          toast(e);
          console.log(e);
        });
    },
    async getCSV(annotationId) {
      try {
        const response = await axios.get(
          api_url + `/api/get_csv?annotationId=${annotationId}`,
          {
            responseType: "blob",
          }
        );
        const mineType = response.headers["content-type"];
        const name = response.headers["content-disposition"];
        const blob = new Blob([response.data], { type: mineType });
        FileSaver.saveAs(blob, name);
      } catch (e) {
        console.log(e);
        toast("csvファイルが存在しません", { autoClose: 1000 });
      }
    },
    backToHome() {
      this.$router.push({ path: "/" });
    },
    removeAnnotationFromList(index) {
      this.annotation_list.splice(index, 1);
    },
    async deleteAnnotation(annotationId, index) {
      const canDelete = confirm(
        "id:" + annotationId + "を削除してもよろしいですか？"
      );
      console.log(!canDelete);
      if (!canDelete) return;
      try {
        const response = await axios.post(
          base_url + "annotation/" + annotationId
        );
        if (response.status != 200)
          throw Error("通信エラーが発生しました\n" + "response: \n" + response);
        this.removeAnnotationFromList(index);
        toast("削除に成功しました");
      } catch (e) {
        console.log(e);
        toast("削除時にエラーが発生しました");
      }
    },
  },
  created() {
    this.getAllAnotation();
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
<!-- <style scoped>
.table {
  display: flex;
  justify-content: center;
}
</style> -->
