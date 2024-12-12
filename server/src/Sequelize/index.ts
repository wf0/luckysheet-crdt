/**
 * 使用 sequelzie 操作数据库
 *  导出唯一实例，需要提供判断数据库连接是否正常的方法
 */

import { Sequelize } from "sequelize";
import { SQL_CONFIG } from "../Config/index";
import { logger } from "../Utils/Logger";
import { WorkerBookModel } from "./Models/WorkerBook";
import { CellDataModel } from "./Models/CellData";
import { ConfigBorderModel } from "./Models/ConfigBorder";
import { ConfigHiddenAndLenModel } from "./Models/ConfigHiddenAndLen";
import { ConfigMergeModel } from "./Models/ConfigMerge";
import { WorkerSheetModel } from "./Models/WorkerSheet";
import { ImageModel } from "./Models/Image";

class DataBase {
  private _connected: boolean = false; // 连接状态
  private _sequelize: Sequelize | null = null; // 连接对象

  constructor() {
    this._connected = false;
  }

  /**
   * 初始化数据库
   */
  public async connect() {
    const { host, database, user, password } = SQL_CONFIG;

    // 创建连接
    this._sequelize = new Sequelize(database, user, password, {
      host,
      dialect: "mysql",
      logging: (sql: string) => logger.debug(sql),
      logQueryParameters: true,
    });

    // 测试连接
    try {
      await this._sequelize.authenticate();
      logger.info("✅️ Successfully connected to the database!");
      this._connected = true;

      /** 连接成功后，进行模型注册 */
      this.registerModule();
    } catch (error) {
      logger.error(error);
      this._connected = false;
    }
  }

  /**
   * 提供原始查询方法
   */
  public async query(sql: string) {
    if (!this._sequelize || !this._connected) return;
    return await this._sequelize.query(sql);
  }

  /**
   * 同步表结构
   */
  private registerModule() {
    if (!this._sequelize || !this._connected) return;
    // 初始化数据库表
    WorkerBookModel.registerModule(this._sequelize);
    WorkerSheetModel.registerModule(this._sequelize);
    CellDataModel.registerModule(this._sequelize);
    ConfigMergeModel.registerModule(this._sequelize);
    ConfigBorderModel.registerModule(this._sequelize);
    ConfigHiddenAndLenModel.registerModule(this._sequelize);
    ImageModel.registerModule(this._sequelize);
  }

  /**
   * 关闭数据库连接
   */
  public close() {
    if (this._sequelize) {
      this._sequelize.close();
    }
  }

  /**
   * 获取连接状态
   */
  public getConnected(): boolean {
    return this._connected;
  }
}

export const DB = new DataBase();
