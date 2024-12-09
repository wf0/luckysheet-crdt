/**
 * database 重要文件 - 用于 package 初始化数据库表结构
 */

import { Sequelize } from "sequelize";
import { SQL_CONFIG } from "../Config";
import { logger } from "../Meddlewear/Logger";
import { WorkerBookModel } from "./Model/WorkerBook";
import { WorkerSheetModel } from "./Model/WorkerSheet";
import { CellDataModel } from "./Model/CellData";
import { ConfigMergeModel } from "./Model/ConfigMerge";
import { ConfigBorderModel } from "./Model/ConfigBorder";
import { ConfigHiddenModel } from "./Model/ConfigHidden";

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
    ConfigHiddenModel.registerModule(sequelize);

    // 2. 同步模型 (非强制同步)
    await sequelize.sync({ alter: true });

    sequelize.close();
    logger.success("所有模型均已成功同步至最新状态.");
  } catch (error) {
    logger.error(error);
    sequelize.close();
  }
})();
