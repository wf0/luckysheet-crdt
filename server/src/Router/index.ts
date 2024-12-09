import express from "express";
import { WorkerBookService } from "../Service/WorkerBooks";
const routes = express.Router();

routes.post("/loadLuckysheet", (req, res) => {
  const sheetData = [
    // 重点是需要提供初始化的数据celldata
    {
      name: "Cell",
      index: "sheet_01",
      order: 0,
      status: 1,
      celldata: [
        {
          r: 0,
          c: 0,
          v: { v: "默认数据", m: "111", ct: { fa: "General", t: "n" } },
        },
      ],
    },
  ];
  res.json(JSON.stringify(sheetData));
});

routes.post("/demo", async (req, res) => {
  // console.log(req.body);
  const result = await WorkerBookService.create({
    gridKey: "demo",
    title: "demo",
  });
  res.json({
    status: "ok",
    data: result,
    msg: "保存成功",
  });
});
// 模块化的路由，直接调用 routes.use() 即可

export default routes;
