<template>
  <div>
    <h3>アノテーションを作成</h3>
    <section class="form">
      <div>
        <div>アノテーション名</div>
        <input type="text" v-model="annotation_name" />
      </div>
      <div>
        <div>CSVファイルの選択</div>
        <input type="file" name="" id="" @change="onFileChange" />
      </div>
      <div v-if="isImage">
        <div>画像ファイルの選択</div>
        <input
          type="file"
          accept="application/zip,application/x-zip-compressed"
          name=""
          id=""
        />
      </div>
      <div class="check_image">
        <input type="checkbox" v-model="isImage" name="" id="" />
        <span class="checkbox_text">画像比較で登録</span>
        <div class="warn" v-if="isImage">
          ※画像はzipファイルに圧縮してから送信してください
        </div>
      </div>
      <button @click="save">送信</button>
    </section>
    <div v-if="annotation_id">
      あなたのアノテーションIDは{{ annotation_id }}
    </div>
    <button @click="backToHome" :disabled="isSaving">メニューへ戻る</button>
    <div v-if="error">エラー</div>
  </div>
</template>

<script>
import axios from "axios";
const base = ""; // + "http://127.0.0.1:5000";
export default {
  data() {
    return {
      uploaded_file: null,
      annotation_name: "",
      file: null,
      isSaving: false,
      annotation_id: null,
      error: false,
      error_msg: "",
      isImage: false,
    };
  },
  methods: {
    async onFileChange(e) {
      let file = e.target.files[0];
      this.file = file;
      this.createFile(file);
    },
    async createFile(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.uploaded_file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async save() {
      this.isSaving = true;
      const params = new FormData();
      params.append("file", this.uploaded_file);
      params.append("title", this.annotation_name);
      try {
        const response = await axios.post(base + "/api/reg_file", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.annotation_id = response.data;
      } catch (e) {
        this.error = true;
      } finally {
        this.isSaving = false;
      }
    },
    backToHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
