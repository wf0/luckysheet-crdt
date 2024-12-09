/**
 * 使用 sequelzie 操作数据库
 *  导出唯一实例，需要提供判断数据库连接是否正常的方法
 */

import { Sequelize } from "sequelize";
import { SQL_CONFIG } from "../Config/index";
import { logger } from "../Meddlewear/Logger";

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
    });

    // 测试连接
    try {
      await this._sequelize.authenticate();
      logger.info("✅️ Connection has been established successfully.");
      this._connected = true;
    } catch (error) {
      logger.error(error);
      this._connected = false;
    }
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
