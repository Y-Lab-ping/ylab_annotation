import axios from "axios";

const base = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production" ? "http://127.0.0.1:5000" : "/",
});

export default base;
