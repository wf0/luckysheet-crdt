<p align="center">
  <img src='/public/logo.svg' />
</p>
<h1 align="center">Luckysheet CRDT</h1>

项目为 Luckysheet 协同增强版（全功能实现），意在提供协同实现思路、数据存储服务、协同演示等。

<p align="center">
  <img src='/public/result.gif' />
</p>



## 项目说明
1. 本项目基于 [Luckysheet](https://github.com/mengshukeji/Luckysheet) 实现，感谢原作者开源。
2. 本项目主要**实现协同功能**模块，对其他内容无影响，基于源码修改的部分，均体现在`Luckysheet-source` 文件夹下。
3. 项目支持 **可选数据库服务**，没有数据库的用户数据无法持久化存储，协同功能并不受影响。
4. 项目使用 **[Sequelize](https://www.sequelize.cn/)** 作为ORM数据服务技术，支持mysql、sqlite、postgres、mssql等数据库，方便用户快速迁移。
5. 项目使用 **Typescript** 作为主要开发语言，提供完整的类型提示，规范代码，提高开发效率。
6. **项目有 `master` 分支和 `master-alpha` 分支，最新发布的特性，会在 alpha 上进行测试，稳定后会合并到 master 上。**



## 项目启动
1. 克隆项目：
```bash
git clone https://gitee.com/wfeng0/luckysheet-crdt
```

2. 下载依赖: 
```bash
## 安装依赖：安装主项目及服务端项目依赖
## "install": "npm install && cd server && npm install"

npm run install
```

3. 🚫<span style="color:red;font-weight:900">~~如果无数据库服务，请跳过此步骤~~</span>🚫 配置数据库参数：
```ts
// server/src/Config/index.ts
export const SQL_CONFIG = {
  port: 3306,
  host: "127.0.0.1", // localhost or 127.0.0.1
  database: "luckysheet_crdt",
  user: "root",
  password: "root",
};
```
4. 🚫<span style="color:red;font-weight:900">~~如果无数据库服务，请跳过此步骤~~</span>🚫 同步数据库表：
```bash
npm run db
```
**⛔️ 温馨提示：**
```ts
1.  请确保数据库配置正确可用
2.  请确保项目执行同步数据库命令 `npm run db`
3.  项目周期只需要执行一次，确保数据库内存在表结构即可。
```
5. 启动服务: 
    - 前台服务：`npm run dev`
    - 后台服务：`npm run server`
2. 打开网址：`http://localhost:5000` 即可体验协同功能。


## 命令说明
**下列所有命令均在项目根目录执行**
```bash
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint --fix", 

    ## 启动服务端
    "lint": "eslint --fix", 

    ## 启动服务端
    "server": "cd server && npm run start",
    ## 启动服务端开发环境(这个的核心是开发时使用 nodemon 监听文件变化)
    "server:dev": "cd server && npm run dev",

    ## 创建数据库表 - 项目首次执行即可
    "db": "cd server && npm run db",

    ## 安装依赖：安装主项目及服务端项目依赖
    "install": "npm install && cd server && npm install"
}
```


## 项目结构说明

```js
// 原作者开源项目源码
// 修改了源码打包路径，指向项目根路径 public/libs
- Luckysheet-source 

// 本项目后台服务
- server 
    + public // 静态资源 （图片协同存储地址）
    + src 
        + Config // 项目配置文件：端口、SQL、LOG 等配置
        + Interface // 接口类型文件
        + Meddleware // 中间件
        + Router // 路由文件
        + Sequelize // 数据库服务
            + Models // 数据模型
            + index.ts // 数据库连接
            + synchronization.ts // 数据库表同步脚本
        + Service // 业务逻辑
        + Utils // 工具类
        + WebSocket // websocket服务
            + broadcast.ts // 处理广播消息
            + database.ts // 数据库操作
            + index.ts // websocket服务入口文件
        + main.ts // 项目入口文件

// 前台服务
- src 
    + axios // axios 网络请求
    + config // 前台项目配置文件
    + style // 前台项目样式文件
    + main.ts // 前台项目主程序
```

<!-- 
## WebSocketServer 参数说明

```ts
import { createServer } from 'https';
import { WebSocketServer } from 'ws';

// 1. 使用 HTTP Server 创建 websocket 服务
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
``` -->


## 协同功能计划表
**已实现功能 ✅️，未实现功能 ❌️**
- 单元格操作
  - ✅️ 单个单元格操作
  - ✅️ 范围单元格操作

- config操作
  - ✅️ 行隐藏
  - ✅️ 列隐藏
  - ✅️ 修改行高
  - ✅️ 修改列宽

- 通用保存
  - ❌️ 冻结行列
  - ✅️ 修改工作表名称
  - ✅️ 修改工作表颜色
  - ✅️ 合并单元格
  - ❌️ 筛选范围
  - ❌️ 筛选的具体设置
  - ❌️ 交替颜色
  - ❌️ 条件格式
  - ❌️ 数据透视表
  - ❌️ 动态数组

- 函数链操作
  - ❌️ 函数链操作

- 行列操作
  - ❌️ 删除行或列
  - ❌️ 增加行或列

- 筛选操作
  - ❌️ 清除筛选
  - ❌️ 恢复筛选

- sheet操作
  - ✅️ 新建sheet
  - ✅️ 复制sheet
  - ✅️ 删除sheet
  - ✅️ 删除sheet后恢复操作
  - ✅️ 调整sheet位置
  - 切换到指定sheet - 可不实现(开启演示功能时，可以实现该功能，但是仅存在于协同层面即可)


- sheet属性(隐藏或显示)
  - ✅️ 隐藏或显示

- 表格信息更改
  - ✅️ 修改工作簿名称

- 图表
  - ✅️ 新增图表
  - ✅️ 移动图表位置
  - ✅️ 缩放图表
  - ✅️ 修改图表配置


## 服务端口说明
1. 前台服务端口：`5000`
2. 后台服务端口：`9000`
3. 数据库服务端口：`3306`

```js
// 1️⃣ 后台服务端口配置：server/src/Config/index.ts
export const SERVER_PORT = 9000;
```
```js
// 2️⃣ 数据库服务端口配置：server/src/Config/index.ts
export const SQL_CONFIG = {
  port: 3306,
  // ... other config
};

```
```js
// 3️⃣ 前台服务端口配置：src/config/index.ts
// 导出后台服务地址
export const SERVER_URL = "http://localhost:9000";

// 导出协同服务地址
export const WS_SERVER_URL = "ws://127.0.0.1:9000";
```

## 页面UI重构
1. 源码UI重构，请查阅 [Luckysheet-source-recover-style](/Luckysheet-source/src/css/recover.css)
2. UI效果：
<p align="center">
  <img src='/public/example.gif' />
</p>


## 模型修改及同步说明
**详情请查阅[Sequelize](https://www.sequelize.cn/core-concepts/getting-started)**

1. 数据库模型定义
```ts
// 请规范书写模型文件，规范如下

import { Model, Sequelize, DataTypes, InferAttributes } from "sequelize";

export class XxxModel extends Model {
  // 举例哈，不推荐使用 id 作为字段名
  declare chart_id: string;
  declare 模型字段: 类型;

  // 初始化模型 - 需要提供静态注册模型方法
  static registerModule(sequelize: Sequelize) {
    XxxModel.init(
      {
        chart_id: { ... 属性定义},
      },
      {
        sequelize,
        tableName: "xxx", // 请显示定义数据库表名
      }
    );
  }
}

// 导出类型
export type XxxModelType = InferAttributes<XxxModel>;

```
1. 同步模型

```ts
// 方式一:
XxxModel.sync(); // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)

// 方式二:
XxxModel.sync({ force: true }); // 将创建表,如果表已经存在,则将其首先删除

// 方式三:
XxxModel.sync({ alter: true }); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
```

## 数据库表模型结构


ℹ️ 项目将不再提供 fileid 作为关联文件字段，详细介绍请查阅下列说明：

1. luckysheet 数据结构中，并无fileid字段，而是通过 gridKey 关联文件；
2. fileid 字段，是为了用户在系统中关联 excel 文件，实现自定义文件标记；
3. gridkey 字段，是作为官方文件标识，可以自定义文件标识，方便用户查找；
4. 因此，本表设计中，将不再提供 fileid 字段，而是使用 gridKey 字段，实现文件标识关联。

**⛔️ gridKey 作用等价于 fileid**

具体模型表详见：

[WorkerBookModel](/server/src/Sequelize/Models/WorkerBook.ts)

[WorkerSheetModel](/server/src/Sequelize/Models/WorkerSheet.ts)

[CellDataModel](/server/src/Sequelize/Models/CellData.ts)

[MergeModel](/server/src/Sequelize/Models/Merge.ts)

[BorderInfoModel](/server/src/Sequelize/Models/BorderInfo.ts)

[HiddenAndLenModel](/server/src/Sequelize/Models/HiddenAndLen.ts)

[imageModel](/server/src/Sequelize/Models/Image.ts)

[chartModel](/server/src/Sequelize/Models/Chart.ts)



## 开源贡献
1. 提交 [issue](https://gitee.com/wfeng0/luckysheet-crdt/issues/new)
2. fork 本项目，提交 PR
3. 加入交流群：`Q: 522121825`
4. 联系作者：`V: 18276861941`