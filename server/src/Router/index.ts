import express from "express";
import { Controller } from "../Controller";

const routes = express.Router();

routes.post("/loadLuckysheet", Controller.loadLuckysheet);

// 模块化的路由，直接调用 routes.use() 即可

export default routes;
