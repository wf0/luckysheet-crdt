<p align="center">
<img src='/public/logo.svg' />
</p>
<h1 align="center">Luckysheet CRDT</h1>

项目为 Luckysheet 协同增强版（全功能实现），意在提供协同实现思路、数据存储服务、后台服务等。


## 项目说明
1. 本项目基于 [Luckysheet](https://github.com/mengshukeji/Luckysheet) 实现，感谢原作者开源。
2. 本项目主要实现协同功能模块，对其他内容无影响。
3. 项目支持 **可选数据库服务**，没有数据库的用户数据无法持久化存储，协同功能并不受影响。
4. 项目使用 **[Sequelize](https://www.sequelize.cn/)** 作为ORM数据服务技术，支持mysql、sqlite、postgres、mssql等数据库，方便用户快速迁移。
5. 项目使用 **Typescript** 作为主要开发语言，提供完整的类型提示，规范代码，提高开发效率。


## 命令说明
```bash
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
     ## 启动服务端
    "server": "cd server && npm run start",
     ## 启动服务端开发环境(这个的核心是 nodemon 监听)
    "server:dev": "cd server && npm run dev",
     ## Eslint 校验
    "lint": "eslint --fix",
     ## 启动源码项目
    "source": "cd Luckysheet-source && npm run dev",
     ## 安装依赖：安装主项目及服务端项目依赖
    "install": "npm install && cd server && npm install"
}
```


## 启动
1. 下载依赖: `npm run install`
2. 启动服务: 
    - 前台服务：`npm run dev`
    - 后台服务：`npm run server`
3. 打开网址：`http://localhost:5000`


## 项目结构说明

```js
- Luckysheet-source // 原作者开源项目源码

- server // 本项目后台服务
    + public // 静态资源
    + src // 项目源码
        + Config // 项目配置文件
        + Interface // 接口文件
        + Meddleware // 中间件
        + Router // 路由文件
        + Sequelize // 数据库服务
            + Models // 数据模型
            + index.ts // 数据库连接
        + Service // 业务逻辑
        + Utils // 工具类
        + WebSocket // websocket服务
        + main.ts // 项目入口文件

- src // 前台服务
    + axios // axios 网络请求
    + config // 前台项目配置文件
    + style // 前台项目样式文件
    + main.ts // 前台项目主程序
```

## WebSocketServer 参数说明

```ts
import { createServer } from 'https';
import { WebSocketServer } from 'ws';

const server = createServer(...)
const wss = new WebSocketServer({ server });

// express 框架中，获取 http server 的形式如下：

import express from "express";
const app = express();
const server = app.listen(...);
const wss = new WebSocketServer({ server });

/**
 * app.listen(...) 的实现原理：
 */
 const http = require('http');
 app.listen = function listen() {
   const server = http.createServer(this);
   return server.listen.apply(server, arguments);
 };
```

## 服务端口说明
1. 前台服务端口：`5000`
2. 后台服务端口：`9000`
3. 数据库服务端口：`3306`

```js
// 得益于 WebSocketServer server 参数，将后台传统 http 服务与 websocket 服务合并，方便端口配置。

// 1. 后台服务端口配置：server/src/Config/index.ts
export const SERVER_PORT = 9000;

// 2. 数据库服务端口配置：server/src/Config/index.ts
export const SQL_CONFIG = {
  port: 3306,
  host: "127.0.0.1", // localhost or 127.0.0.1
  database: "luckysheet_crdt",
  user: "root",
  password: "root",
};

// 3. 前台服务端口配置：src/config/index.ts
// 导出后台服务地址
export const SERVER_URL = "http://localhost:9000";

// 导出协同服务地址
export const WS_SERVER_URL = "ws://127.0.0.1:9000";
```

## 初次连接数据库说明
1. 确保数据库服务已启动，并配置好数据库连接参数。
2. 执行 `npm run db` 命令，将数据库初始化脚本执行，完成数据库初始化。
