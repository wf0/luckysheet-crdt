import { WS_SERVER_URL } from "./config";
import "./style/index.css";

window.onload = initLuckysheet;

/**
 * 初始化前台 Luckysheet
 */
function initLuckysheet() {
  const luckysheet = Reflect.get(window, "luckysheet");

  const options = {
    showinfobar: false, // 隐藏顶部的信息栏
    allowUpdate: true, // 配置协同功能
    loadUrl: "/api/loadLuckysheet", // 初始化 celldata 数据
    updateUrl: `${WS_SERVER_URL}?type=luckysheet&userid=1&username=userA&fileid=fileid`, // 协同服务转发服务
    container: "luckysheetContainer",
  };

  luckysheet.create(options);
}
