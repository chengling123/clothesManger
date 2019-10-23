import axios from "./index";

export default {
  tidan(params) {
    return axios.get("/h5/store/getThdDetail/", params);
  }
};
