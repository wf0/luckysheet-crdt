import { WS_SERVER_URL } from "./config";
import "./style/index.css";

window.onload = initLuckysheet;

/**
 * 初始化前台 Luckysheet
 */
function initLuckysheet() {
  const luckysheet = Reflect.get(window, "luckysheet");
  const id = Math.random().toString(16).slice(2, 8);
  const username = `user_${id}`;
  /**
   * 请注意，目前前台仅为展示，并无其他能力，因此加载的是默认协同演示 worker books 数据，gridkey = gridkey_demo
   * 常理来说，当前工作簿的数据，都应该通过 fileid （gridkey） 请求得来
   */
  const options = {
    lang: "zh",
    container: "luckysheetContainer",
    showinfobar: false, // 隐藏顶部的信息栏
    allowUpdate: true, // 配置协同功能
    loadUrl: "/api/loadLuckysheet?gridkey=gridkey_demo",
    updateUrl: `${WS_SERVER_URL}?type=luckysheet&userid=${id}&username=${username}&gridkey=gridkey`, // 协同服务转发服务
  };

  luckysheet.create(options);

  console.group("协同客户端用户信息");
  console.log("==> userid", id);
  console.log("==> username", username);
  console.groupEnd();
}
