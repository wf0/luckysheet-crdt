/**
 * config border info model 边框数据模型
 */

import { WorkerSheetModel } from "./WorkerSheet";
import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";

export class BorderInfoModel extends Model {
  // 类型定义
  declare config_border_id?: string;
  declare worker_sheet_id: string;

  declare rangeType: string; /** rangeType 合并单元格类型 range | cell */
  declare borderType: string; /** borderType 边框类型 */
  declare style?: number; /** style 边框粗细  */
  declare color?: string; /** color 边框颜色 */

  // 范围
  declare row_start?: number;
  declare row_end?: number;
  declare col_start?: number;
  declare col_end?: number;

  // 注册模型
  static registerModule(sequelize: Sequelize) {
    BorderInfoModel.init(
      {
        config_border_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "config_border_id 边框配置表唯一ID", // 描述
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4, // 默认使用 uuid 作为 主键ID
        },
        worker_sheet_id: {
          type: DataTypes.STRING, // 类型
          allowNull: false, // 非空
          comment: "外键：关联 workersheets 的 worker_sheet_id", // 描述
          references: {
            model: WorkerSheetModel,
            key: "worker_sheet_id",
          },
        },

        rangeType: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "rangeType 合并单元格类型 range | cell",
        },
        //   因此，下列属性需要兼容 range cell 不同类型的合并属性
        borderType: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "borderType 边框类型",
        },
        style: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "style 边框粗细",
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "color 边框颜色",
        },
        /**
         * range 行列信息数组
         *  "range": [{
         *        "row": [row_start, roe_end],
         *        "column": [col_start, col_end]
         *    }]
         */
        row_start: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "row_start 行号",
        },
        row_end: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "row_end 行号",
        },
        col_start: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "col_start 列号",
        },
        col_end: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "col_end 列号",
        },
      },
      {
        sequelize, // 将模型与 Sequelize 实例关联
        tableName: "borders", // 直接式提供数据库表名
      }
    );
  }
}

// 导出类型
export type BorderInfoModelType = InferAttributes<BorderInfoModel>;
