/**
 * 接口域名的管理
 */

let base = "";
switch (process.env.NODE_ENV) {
  case "development":
    console.log("开发环境");
    base = "https://uat.bsteel.com.cn/xhbauth/forward/newexchange"; // 测试环境url
    break;
  case "test":
    console.log("测试环境");
    base = "https://weixin.bsteel.com.cn/xhbauth/forward/newexchange"; // 预上线环境url
    break;
  case "production":
    console.log("生产环境");
    base = "https://weixin.bsteel.com.cn/xhbauth/forward/newexchange"; // 生产环境url
    break;
}
export default base;
