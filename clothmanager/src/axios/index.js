import axios from "axios";
import router from "../router";
import { Toast } from "vant";
import store from "../store";
import base from "./base"; // 导入接口域名列表
//使用create方法创建axios实例

axios.defaults.baseURL = base;
axios.defaults.timeout = 7000;
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
};

/**
 * 跳转登录页
 *  router.currentRoute.fullPath:携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};
/**
 * 请求失败后的错误统一处理
 *  请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    case 500:
      tip("服务器错误");
      break;
    default:
      console.log(other);
  }
};

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    console.log("已请求");
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应器拦截
axios.interceptors.response.use(
  res => {
    return res;
  },

  error => {
    const { response } = error;
    // 请求已发出，但不是200的情况
    if (response) {
      errorHandle(response.status, response.data.msg);
      //   这里面return，方便其他函数可以直接.catch调用
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);
export default axios;
