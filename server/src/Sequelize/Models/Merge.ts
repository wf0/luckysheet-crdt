/**
 * Config Merges 合并单元格数据模型
 *
 */

import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import { WorkerSheetModel } from "./WorkerSheet";

export class MergeModel extends Model {
  declare config_merge_id?: string;
  declare worker_sheet_id: string;
  declare r: number;
  declare c: number;
  declare rs: number;
  declare cs: number;

  // 注册模型
  static registerModule(sequelize: Sequelize) {
    MergeModel.init(
      {
        config_merge_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "config merge id", // 描述
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4, // 默认使用 uuid 作为 主键ID
        },
        worker_sheet_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "外键：关联 cell_datas 的 worker_sheet_id", // 描述
          references: {
            model: WorkerSheetModel,
            key: "worker_sheet_id",
          },
        },
        /**
         *
         * 设置一个合并单元格，需要处理两个地方，一是单元格对象中设置mc属性，二是在config中设置merge
         * "r": 0, //主单元格的行号
         * "c": 0, //主单元格的列号
         * "rs": 2, //合并单元格占的行数
         * "cs": 2 //合并单元格占的列数
         *
         *  业务上的处理逻辑是：先查询这个表，如果有字段值，则反馈生成 celldata mc 属性字段
         */
        r: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "r 主单元格的行号",
        },
        c: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "c 主单元格的列号",
        },
        rs: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "rs 合并单元格占的行数",
        },
        cs: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "cs 合并单元格占的列数",
        },
      },
      {
        sequelize, // 将模型与 Sequelize 实例关联
        tableName: "merges", // 直接式提供数据库表名
      }
    );
  }
}

// 导出类型
export type MergeModelType = InferAttributes<MergeModel>;
