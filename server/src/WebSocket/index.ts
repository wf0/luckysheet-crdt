import { DB } from "../Sequelize";
import { IncomingMessage, Server } from "http";
import { databaseHandler } from "./database";
import { getURLQuery, unzip } from "../Utils";
import { logger } from "../Meddlewear/Logger";
import { CustomWebSocket } from "../Interface";
import { RawData, WebSocketServer } from "ws";
import { broadcastOtherClients } from "./broadcast";

/**
 * 创建 Web Socket 服务
 * @param port 服务端口
 *  1. new WebSocketServer({ port }).on("connection", connection)
 *  2. connection(currentClient: CustomWebSocket)
 *  3. onmessage(data: RawData, client: CustomWebSocket)
 *  4. onclose(client: CustomWebSocket)
 */
export function createWebSocketServer(server: Server) {
  /** 创建WebSocketServer 实例，并监听 connection 事件 */
  const wss = new WebSocketServer({ server }).on("connection", connection);

  /** 监听 websocket 连接事件 */
  function connection(client: CustomWebSocket, req: IncomingMessage) {
    /**  解析 request url 的参数，识别当前连接用户的 userid username 属性 */
    const type = getURLQuery(req.url, "type");
    const userid = getURLQuery(req.url, "userid");
    const fileid = getURLQuery(req.url, "gridkey");
    const username = getURLQuery(req.url, "username");

    logger.info(`luckysheet 协同用户连接成功 [ID: ${userid}].`);

    /** 将 url 参数添加到 client 上，方便后续使用 */
    client.clientInfo = { userid, username, type, fileid };

    /** 监听消息 */
    client.on("message", (d) => onmessage(d, client));

    /** 监听错误 */
    client.on("error", console.error);

    /** 监听关闭 code = 1000 正常关闭 */
    client.on("close", () => onclose(client));
  }

  /**
   * 监听 websocket 消息
   * @param data
   * @param client
   */
  function onmessage(data: RawData, client: CustomWebSocket) {
    try {
      const data_str = unzip(data.toString());
      // 1. 用户每次编辑，都会触发 message 事件，因此，在这里实现协同数据存储
      const db_connected = DB.getConnected();
      if (db_connected) databaseHandler(data_str);

      // 2. 广播给 wss.clients 所有的客户端
      broadcastOtherClients(wss, client, data_str);
    } catch (error) {
      // 3. 捕获异常 判断是否为心跳包消息,心跳不处理，异常信息则记录日志
      if (data.toString() !== "rub") logger.error(error);
    }
  }

  /**
   * 监听 websocket 的 close 事件
   * @param client
   */
  function onclose(client: CustomWebSocket) {
    broadcastOtherClients(wss, client, "exit");
    logger.warn("luckysheet 协同用户关闭连接");
  }
}
