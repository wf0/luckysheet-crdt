import { WebSocket } from "ws";
import { BASE_CELL_DATA_TYPE } from "./luckysheet";

interface CustomWebSocket extends WebSocket {
  clientInfo: {
    type: string; // 协同服务类型
    userid: string;
    username: string;
    gridkey: string;
  };
}

// 协同数据类型定义在这里 - 不同的操作类型会传递不同的 数据结构，这里都需要兼容
type CRDTDataType<T> = {
  t: string; // 操作类型
  i: string; // 当前sheet的index值，而不是order
  r: number; // 行号
  c: number; // 列号
  v: T;

  // RV
  range?: {
    row: [number, number];
    column: [number, number];
  };

  // cg
  k?: string;
};

// 1. v
type V = {
  v: string | number | null | undefined;
  m: string | number | null | undefined;
} & BASE_CELL_DATA_TYPE;

// 2. rv
type RV = BASE_CELL_DATA_TYPE[][];

// 3. cg
type CG = {
  rangeType: string;
  borderType: string;
  style: string;
  color: string;
  range: [
    {
      row: [number, number];
      column: [number, number];
    }
  ];
}[];

export { CustomWebSocket, type CRDTDataType, type V, type RV, type CG };