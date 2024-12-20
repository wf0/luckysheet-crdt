<p align="center">
  <img src='/public/logo.svg' />
</p>
<h1 align="center">Luckysheet CRDT</h1>


[简体中文](./README-zh.md) | English


<p style="border-bottom:solid rgba(85, 187, 138, 0.5) 1px"></p>

<p align="center">
  <img src='/public/result.gif' alt='result' />
</p>


## DESCRIPTION
1. The project is **Luckysheet Collaborative Enhanced Edition (fully functional implementation)**, aiming to provide collaborative implementation ideas, data storage services, collaborative demonstrations, etc. The project is based on [Luckysheet](https://github.com/mengshukeji/Luckysheet) Implemented, thank you to the original author for open-source.
2. This project mainly implements the collaborative function module, which has no impact on other content. The parts modified based on the source code are all reflected in the `Luckysheet source` folder.
3. The project supports **optional database services**. User data without a database cannot be persistently stored, and collaborative functionality is not affected.
4. Project Use **[Sequelize](https://www.sequelize.cn/)** As an ORM data service technology, it supports databases such as MySQL, SQLite, PostgreSQL, and MSSQL, making it easy for users to quickly migrate.
5. The project uses **Typescript** as the main development language, providing complete type prompts, standardizing code, and improving development efficiency.
6. **The project has a `master` branch and a `master-alpha` branch. The latest released features will be tested on alpha and will be merged into master after stabilization**



## START
1. Clone project：
```bash
git clone https://gitee.com/wfeng0/luckysheet-crdt
```

1. Download dependencies: 
```bash
npm run install
```

**⛔️ Tips：**

```js
1. Project dependencies are divided into front-end dependencies and back-end dependencies (independent projects)；
2. We recommend using `npm install` to install dependencies and avoid version conflicts；
3. If the dependency download error occurs, you can try deleting the `package lock. json` file and re executing the dependency installation。
```

3. 🚫<span style="color:red;font-weight:900">~~If there is no database service, please skip this step~~</span>🚫 Configure database parameters：
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
4. 🚫<span style="color:red;font-weight:900">~~If there is no database service, please skip this step~~</span>🚫 Synchronize database tables：
```bash
npm run db
```

**⛔️ Tips：**
```ts
1.  Please ensure that the database configuration is correct and available
2.  Please ensure that the project executes synchronized database commands `npm run db`
3.  The project cycle only needs to be executed once to ensure the existence of table structures in the database。
```
1. Start Service: 
    - Front-desk service：`npm run dev`
    - Back-up services：`npm run server`
2. Open the URL：`http://localhost:5000`, You can experience the collaborative function.


## Project Structure Description

```js
// srource code
- 🗂️Luckysheet-source 

// back-up services
- 🗂️server 
    + 📂public // Static resources 
    + 📂src 
        + 📂Config // Project configuration file：Port、SQL、LOG etc.
        + 📂Controller // Controller
        + 📂Interface // Interface
        + 📂Meddleware // Meddleware
        + 📂Router // Routers
        + 📂Sequelize // Database service
            + 📂Models // Models
            + 🗒️index.ts // Database connection
            + 🗒️synchronization.ts // Database table synchronization script
        + 📂Service // Service
        + 📂Utils // Utils
        + 📂WebSocket // websocket
            + 🗒️broadcast.ts // broadcast
            + 🗒️database.ts // database
            + 🗒️index.ts // websocket server entry file.
        + 🗒️main.ts // Server entry file.

// Front desk service
- 🗂️src 
    + 📂axios // axios 
    + 📂config // Config
    + 📂style // Style
    + 🗒️main.ts // Entry file.
```

## Collaborative Function Plan Table
**Implemented  ✅️ Unrealized  ❌️**
- Cell operation
  - ✅️ Single cell operation
  - ✅️ Range cell operation

- Config operation
  - ✅️ Line hidden
  - ✅️ Column hidden
  - ✅️ Modify row height
  - ✅️ Modify column width

- Universal save
  - ❌️ Freeze rows and columns
  - ✅️ Change worksheet name
  - ✅️ Change worksheet color
  - ✅️ Merge cell
  - ❌️ Filter scope
  - ❌️ Specific settings for filtering
  - ❌️ Alternating colors
  - ❌️ Conditional formatting
  - ❌️ PivotTable
  - ❌️ Dynamic array

- Function chain operation
  - ❌️ Function chain operation

- Row and column operation
  - ❌️ Delete rows or columns
  - ❌️ Add rows or columns

- Filter operations
  - ❌️ Clear filter
  - ❌️ Restore filter

- Sheet operations
  - ✅️ Add sheet
  - ✅️ Copy sheet
  - ✅️ Delete sheet
  - ✅️ Restore sheet
  - ✅️ Adjust the position of the sheet
  - Switch to the specified sheet 

- Sheet attribute 
  - ✅️ Hidden or displayed

- Table information change
  - ✅️ Change workbook name

- Chart operation
  - ✅️ Add chart
  - ✅️ Move chart
  - ✅️ Zoom chart
  - ✅️ Update chart options


## Service Port Description
1. Front desk service port：`5000`
2. Back up service port：`9000`
3. Database service port：`3306`

```js
// 1️⃣ Backend service port configuration：server/src/Config/index.ts
export const SERVER_PORT = 9000;
```
```js
// 2️⃣ Database service port configuration：server/src/Config/index.ts
export const SQL_CONFIG = {
  port: 3306,
  // ... other config
};

```
```js
// 3️⃣ Front desk service port configuration：src/config/index.ts
// Export backend service address
export const SERVER_URL = "http://localhost:9000";

// Export collaborative service address
export const WS_SERVER_URL = "ws://127.0.0.1:9000";
```

## Page UI Refactoring
1. Source Code UI Refactoring，see [Luckysheet-source-recover-style](/Luckysheet-source/src/css/recover.css)
2. UI effect：
<p align="center">
  <img src='/public/example.gif' />
</p>


## Open source contribution
1. Submit an [issue](https://gitee.com/wfeng0/luckysheet-crdt/issues/new)
2. Fork this project and submit a PR
3. Join the communication group:`Q: 522121825`
4. Contact the author:`V: 18276861941`