/**
 * config row/col hiddens model 配置行列隐藏
 */

import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import { WorkerSheetModel } from "./WorkerSheet";

export class ConfigHiddenModel extends Model {
  // 类型定义
  declare config_hidden_id: string;
  declare worker_sheet_id: string;
  declare hidden_type: string; /** 隐藏类型 row/col */
  declare hidden_index: string; /** 隐藏的行号/列号  */

  // 注册模型
  static registerModule(sequelize: Sequelize) {
    ConfigHiddenModel.init(
      {
        config_hidden_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "config_hidden_id", // 描述
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4, // 默认使用 uuid 作为 主键ID
        },
        worker_sheet_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "外键：关联 workersheet 的 worker_sheet_id", // 描述
          references: {
            model: WorkerSheetModel,
            key: "worker_sheet_id",
          },
        },
        hidden_type: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "隐藏类型 row/col", // 描述
        },
        /**
         * 根据下列字段，生成 下列配置对象
         * "rowhidden": {
         *      "30": 0,
         *      "31": 0
         *  }
         */
        hidden_index: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "隐藏的行号/列号", // 描述
        },
      },
      {
        sequelize, // 将模型与 Sequelize 实例关联
        tableName: "confighiddens", // 直接式提供数据库表名
      }
    );
  }
}

// 导出类型
export type ConfigHiddenModelType = InferAttributes<ConfigHiddenModel>;
