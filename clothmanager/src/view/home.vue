<template>
  <div>
    <Button type="primary" @click="getData">请求接口</Button>
  </div>
</template>

<script>
import api from "../axios/request";
export default {
  data() {
    return {};
  },

  methods: {
    getData() {
      api
        .tidan({
          hz: "060968",
          pageNum: 1,
          pageSize: 10
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
