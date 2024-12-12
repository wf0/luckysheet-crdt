/**
 * Luckysheet Crdt Server Configuration
 */

import dayjs from "dayjs";
import path from "path";

// server port、ws server port 共用一个端口，通过 ws 创建传入 server 实现
export const SERVER_PORT = 9000;

// 数据库配置对象 - sequelize
export const SQL_CONFIG = {
  port: 3306,
  host: "127.0.0.1", // localhost or 127.0.0.1
  database: "luckysheet_crdt",
  user: "root",
  password: "root",
};

// 日志配置对象
export const LOGGER_CONFIG = {
  filepath: path.resolve(__dirname, "../../logs"),
  filename: `luckysheet.${dayjs().format("YYYY-MM-DD")}.log`,
};

/**
 * 导出演示用 Worker Books Info
 */
export const WORKER_BOOK_INFO = {
  gridKey: "gridkey_demo",
  title: "测试工作簿",
  lang: "zh",
};


/**
 * 导出文件上传 Multer 配置对象
 */
export const MULTER_CONFIG = {
  dest: path.resolve(__dirname, "../../public/uploads"),
};