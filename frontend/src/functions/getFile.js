import axios from "axios";
const execute = async (base_url, id) => {
  const response = await axios.post(base_url + "csv", {
    id,
  });
  return response.blob();
};

export default execute;
