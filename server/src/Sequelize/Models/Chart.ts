/**
 * 统计图
 */

import { Model, Sequelize, DataTypes, InferAttributes } from "sequelize";
import { WorkerSheetModel } from "./WorkerSheet";

export class ChartModel extends Model {
  declare chart_id: string;
  declare worker_sheet_id: string;
  declare width?: number | string;
  declare height?: number | string;
  declare left?: number | string;
  declare top?: number | string;
  declare needRangeShow?: boolean;
  declare chartOptions?: string;

  static registerModule(sequelize: Sequelize) {
    ChartModel.init(
      {
        chart_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
          comment: "表ID",
        },
        worker_sheet_id: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "所属工作表ID",
          references: {
            model: WorkerSheetModel,
            key: "worker_sheet_id",
          },
        },
        width: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "width",
        },
        height: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "height",
        },
        left: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "left",
        },
        top: {
          type: DataTypes.STRING,
          allowNull: true,
          comment: "top",
        },
        needRangeShow: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
          comment: "needRangeShow",
        },
        chartOptions: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "chartOptions",
        },
      },
      {
        sequelize,
        tableName: "charts",
      }
    );
  }
}

// 导出类型
export type ChartModelType = InferAttributes<ChartModel>;
