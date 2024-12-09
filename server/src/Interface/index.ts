import { WebSocket } from "ws";
export interface CustomWebSocket extends WebSocket {
  clientInfo: {
    type: string; // 协同服务类型
    userid: string;
    username: string;
    fileid: string;
  };
}
