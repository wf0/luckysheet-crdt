import express from "express";
import { Controller } from "../Controller";

const routes = express.Router();

routes.post("/loadLuckysheet", Controller.loadLuckysheet);

// 用于上传图片 - 先定义 upload name 属性
routes.post("/uploadImage", Controller.uploadImage);

// 模块化的路由，直接调用 routes.use() 即可

export default routes;
