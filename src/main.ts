import { SERVER_URL, WS_SERVER_URL } from "./config";
import "./style/index.css";
import { fetch } from "./axios";

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
    loadUrl: "/api/loadSheetData?gridkey=gridkey_demo",
    updateUrl: `${WS_SERVER_URL}?type=luckysheet&userid=${id}&username=${username}&gridkey=gridkey`, // 协同服务转发服务

    plugins: ["chart"],

    // 处理协同图片上传
    uploadImage: async (file: File) => {
      // 此处拿到的是上传的 file 对象，进行文件上传 ，配合 node 接口实现
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await fetch({
        url: "/api/uploadImage",
        method: "POST",
        data: formData,
      });
      // *** 关键步骤：需要返回一个地址给 luckysheet ，用于显示图片
      if (data.code === 200) return Promise.resolve(data.url);
      else return Promise.resolve("image upload error");
    },
    // 处理上传图片的地址
    imageUrlHandle: (url: string) => {
      // 已经是 // http data 开头则不处理
      if (/^(?:\/\/|(?:http|https|data):)/i.test(url)) {
        return url;
      }
      // 不然拼接服务器路径
      return SERVER_URL + url;
    },
  };

  luckysheet.create(options);
}
