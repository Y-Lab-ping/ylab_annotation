<template>
  <div>
    <h1 class="my-5 primary">アノテーションを作成</h1>

    <div v-if="annotation_id" class="alert-success py-3 my-3">SUCCESS</div>
    <div v-if="error && !annotation_id" class="alert-danger py-3 my-3">
      ERROR
    </div>

    <section class="form">
      <div class="form-group row my-3">
        <label for="annotationName" class="col-sm-2 col-form-label"
          >アノテーション名</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="annotationName"
            v-model="annotation_name"
            placeholder="Annotation Name"
          />
        </div>
      </div>

      <div v-if="!isImage">
        <div class="form-group row my-3">
          <label for="csvFile" class="col-sm-2 form-label"
            >CSVファイルの選択</label
          >
          <div class="col-sm-10">
            <input
              class="form-control"
              type="file"
              id="csvFile"
              name=""
              placeholder="CSVファイルを入力してください"
              @change="onFileChange"
            />
          </div>
        </div>
      </div>

      <div v-if="isImage">
        <div class="form-group row my-3">
          <label for="imageFile" class="col-sm-2 form-label"
            >画像ファイルの選択</label
          >
          <div class="col-sm-10">
            <input
              class="form-control"
              type="file"
              accept="application/zip,application/x-zip-compressed"
              id="imageFile"
              name=""
              placeholder="画像ファイルをzip形式で圧縮して入力したください"
              @change="onFileChange"
            />
          </div>
        </div>
      </div>

      <div class="check_image">
        <div class="warn alert-danger py-3 my-3" v-if="isImage">
          ※画像はzipファイルに圧縮してから送信してください
        </div>

        <div class="custom-control custom-checkbox my-3">
          <input
            type="checkbox"
            class="custom-control-input"
            v-model="isImage"
            name=""
            id="imageFlg"
          />
          <label class="checkbox_text custom-control-label" for="imageFlg"
            >画像比較で登録</label
          >
        </div>
      </div>

      <div class="mt-3 d-grid gap-2">
        <button class="btn btn-dark mt-3 fs-3 font-weight-bold" @click="save">
          送信
        </button>
      </div>
    </section>

    <div class="mt-3 d-grid gap-2">
      <button
        class="btn btn-outline-dark fs-3 font-weight-bold"
        @click="backToHome"
        :disabled="isSaving"
      >
        メニューへ戻る
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const base = ""; //+ "http://127.0.0.1:5000";
export default {
  data() {
    return {
      uploaded_file: null,
      uploaded_zip: null,
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
    onZipFileChange(e) {
      let file = e.target.files[0];
      this.file = file;
      this.createZipFile(file);
    },
    async createZipFile(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.uploaded_zip = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async save() {
      this.isSaving = true;
      const params = new FormData();
      params.append("file", this.uploaded_file);
      params.append("title", this.annotation_name);
      if (this.isImage) {
        params.append("image", this.uploaded_zip);
      }
      params.append("isImage", +this.isImage);
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
