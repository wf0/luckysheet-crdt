<p align="center">
  <img src='/public/logo.svg' />
</p>
<h1 align="center">Luckysheet CRDT</h1>


简体中文 | [English](./README.md)


<p style="border-bottom:solid rgba(85, 187, 138, 0.5) 1px"></p>

<p align="center">
  <img src='/public/result.gif' />
</p>


## 项目说明
1. 项目为 **Luckysheet 协同增强版（全功能实现）**，意在提供协同实现思路、数据存储服务、协同演示等，项目基于 [Luckysheet](https://github.com/mengshukeji/Luckysheet) 实现，感谢原作者开源。
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
npm run install
```

**⛔️ 温馨提示：**

```js
1. 项目依赖分为前台依赖、后台依赖（独立的项目哈）；
2. 推荐大家使用 `npm install` 安装依赖，避免出现版本冲突问题；
3. 如果依赖下载报错，可以尝试删除 `package-lock.json` 文件，重新执行依赖安装。
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
6. 打开网址：`http://localhost:5000` 即可体验协同功能。


## 项目结构说明

```js
// 源码
- 🗂️Luckysheet-source 

// 后台服务
- 🗂️server 
    + 📂public // 静态资源 
    + 📂src 
        + 📂Config // 项目配置文件：端口、SQL、LOG 等配置
        + 📂Controller // 控制层
        + 📂Interface // 接口类型文件
        + 📂Meddleware // 中间件
        + 📂Router // 路由文件
        + 📂Sequelize // 数据库服务
            + 📂Models // 数据模型
            + 🗒️index.ts // 数据库连接
            + 🗒️synchronization.ts // 数据库表同步脚本
        + 📂Service // 业务逻辑
        + 📂Utils // 工具类
        + 📂WebSocket // websocket服务
            + 🗒️broadcast.ts // 处理广播消息
            + 🗒️database.ts // 数据库操作
            + 🗒️index.ts // websocket服务入口文件
        + 🗒️main.ts // 项目入口文件

// 前台服务
- 🗂️src 
    + 📂axios // axios 网络请求
    + 📂config // 前台项目配置文件
    + 📂style // 前台项目样式文件
    + 🗒️main.ts // 前台项目主程序
```

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


## 开源贡献
1. 提交 [issue](https://gitee.com/wfeng0/luckysheet-crdt/issues/new)
2. fork 本项目，提交 PR
3. 加入交流群：`Q: 522121825`
4. 联系作者：`V: 18276861941`