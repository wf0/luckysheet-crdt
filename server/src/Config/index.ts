/**
 * Luckysheet Crdt Server Configuration - 统一配置对象
 */

import path from "path";
import dayjs from "dayjs";

/**
 * server port、ws server port
 * 共用一个端口，通过 ws 创建传入 server 实现
 */
const SERVER_PORT = 9000;

/**
 * 数据库配置对象 - sequelize
 */
const SQL_CONFIG = {
  port: 3306, // 端口号 3306 3309
  host: "127.0.0.1", // localhost or 127.0.0.1
  database: "luckysheet_crdt",
  user: "root",
  password: "root",
  logger: true, // 开启日志
  enable: true, // 是否启用数据库服务
};

/**
 * 日志配置对象
 */
const LOGGER_CONFIG = {
  filepath: path.resolve(__dirname, "../../logs"),
  filename: `luckysheet.${dayjs().format("YYYY-MM-DD")}.log`,
};

/**
 * 导出演示用 Worker Books Info
 */
const WORKER_BOOK_INFO = {
  lang: "zh",
  title: "测试工作簿",
  gridKey: "gridkey_demo",
};

/**
 * 导出文件上传 Multer 配置对象
 */
const MULTER_CONFIG = {
  single: "image", // 这个是前端 new FormData() 对象的 key 值，即上传文件的 key 值
  dest: path.resolve(__dirname, "../../public/uploads"),
};

// 统一导出配置对象
export {
  SERVER_PORT,
  SQL_CONFIG,
  LOGGER_CONFIG,
  WORKER_BOOK_INFO,
  MULTER_CONFIG,
};
