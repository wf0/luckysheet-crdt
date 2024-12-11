import express from "express";
import routes from "./Router";
import { DB } from "./Sequelize/index"; // 导入 DB
import { logger } from "./Utils/Logger";
import { SERVER_PORT, WORKER_BOOK_INFO } from "./Config";
import { createWebSocketServer } from "./WebSocket/index"; // 导入 ws
import { WorkerBookService } from "./Service/WorkerBook";

(async () => {
  logger.info("✨ ");
  logger.info("✨ Server is starting, wait a moment please... ");
  logger.info("✨ ");

  /** 创建http服务 */
  const app = express();

  // 连接数据库 DB
  await DB.connect();

  /** 初始化路由 */
  app.use(routes);

  /** 监听端口 https://emoji6.com/emojiall/ */
  const server = app.listen(SERVER_PORT);
  logger.info(`✅️ Server is started at http://localhost:${SERVER_PORT} !`);

  /** 初始化 WebSocket - 传入 server 对象 */
  createWebSocketServer(server);

  /**
   * ⛔️ 注意：
   *  目前前台没有按钮创建工作簿，因此，需要提供一个默认的文件初始化， 也就是需要初始化一个 workerbooks 记录
   *  如果前台能通过 router 调用 WorkerBooksService.create 时，会直接返回一个默认文件，则应该注释下列代码
   *  **下列代码仅作演示使用**
   */
  await WorkerBookService.create(WORKER_BOOK_INFO);

  /** 启动测试用例 */
  // WorkerBookService.create({ gridKey: "11111", title: "测试修改888" });
  /** 启动测试用例 */
})();
