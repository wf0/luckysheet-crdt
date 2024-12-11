/**
 * database 重要文件 - 用于 package 初始化数据库表结构
 */

import { Sequelize } from "sequelize";
import { SQL_CONFIG } from "../Config";
import { logger } from "../Utils/Logger";
import { WorkerBookModel } from "./Models/WorkerBook";
import { WorkerSheetModel } from "./Models/WorkerSheet";
import { CellDataModel } from "./Models/CellData";
import { ConfigMergeModel } from "./Models/ConfigMerge";
import { ConfigBorderModel } from "./Models/ConfigBorder";
import { ConfigHiddenAndLenModel } from "./Models/ConfigHiddenAndLen";

(async () => {
  const { host, database, user, password } = SQL_CONFIG;
  const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    logger.success("Connection has been established successfully.");

    // 初始化数据库表
    WorkerBookModel.registerModule(sequelize);
    WorkerSheetModel.registerModule(sequelize);
    CellDataModel.registerModule(sequelize);
    ConfigMergeModel.registerModule(sequelize);
    ConfigBorderModel.registerModule(sequelize);
    ConfigHiddenAndLenModel.registerModule(sequelize);

    // 2. 同步模型 (非强制同步)
    await sequelize.sync({ alter: true });

    sequelize.close();
    logger.success("所有模型均已成功同步至最新状态.");
  } catch (error) {
    logger.error(error);
    sequelize.close();
  }
})();
