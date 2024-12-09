import express from "express";
import routes from "./Router";
import { listen } from "./Utils";
import { DB } from "./Sequelize/index"; // 导入 DB
import { logger } from "./Meddlewear/Logger";
import { createWebSocketServer } from "./WebSocket/index"; // 导入 ws

logger.info("✨ Server is starting, wait a moment please... ");

/** 创建http服务 */
const app = express();

// 连接数据库 DB
DB.connect();

/** 初始化路由 */
app.use(routes);

/** 监听端口 */
const server = listen(app);

/** 初始化 WebSocket - 传入端口 */
createWebSocketServer(server);
