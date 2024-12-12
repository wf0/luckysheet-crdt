/**
 * Image 图片
 */

import { Model, Sequelize, DataTypes, InferAttributes } from "sequelize";
import { WorkerSheetModel } from "./WorkerSheet";
/**
 * {
 *  "type":"3",
 *  "src":"/uploads/36399c90241d782399d05acd9dfb1d9d.png",
 *  "originWidth":685,
 *  "originHeight":490,
 *  "default":{
 *    "width":400,
 *    "height":286,
 *    "left":18,
 *    "top":229
 *   },
 *    "crop":{
 *      "width":400,
 *      "height":286,
 *      "offsetLeft":0,
 *      "offsetTop":0
 *    },
 *    "isFixedPos":false,
 *    "fixedLeft":46,
 *    "fixedTop":90,
 *    "border":{
 *      "width":0,
 *      "radius":0,
 *      "style":"solid",
 *      "color":"#000"
 *    }
 * }
 */
export class ImageModel extends Model {
  declare image_id?: string;
  declare worker_sheet_id: string; // 外键
  declare image_type: string; // type 1移动并调整单元格大小 2移动并且不调整单元格的大小 3不要移动单元格并调整其大小
  declare image_src: string; // 图片地址

  declare image_originWidth: number; // 原始宽度
  declare image_originHeight: number; // 原始高度

  declare image_default_width: number; // 默认宽度
  declare image_default_height: number; // 默认高度
  declare image_default_left: number; // 默认左边距
  declare image_default_top: number; // 默认上边距

  declare image_crop_width: number; // 裁剪宽度
  declare image_crop_height: number; // 裁剪高度
  declare image_crop_offsetLeft: number; // 裁剪左边距
  declare image_crop_offsetTop: number; // 裁剪上边距

  declare image_isFixedPos: boolean; // 是否固定位置
  declare image_fixedLeft: number; // 固定左边距
  declare image_fixedTop: number; // 固定上边距

  declare image_border_width: number; // 边框宽度
  declare image_border_radius: number; // 圆角
  declare image_border_style: string; // 边框样式
  declare image_border_color: string; // 边框颜色

  static registerModule(sequelize: Sequelize) {
    ImageModel.init(
      {
        image_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
          comment: "图片ID",
          defaultValue: DataTypes.UUIDV4,
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
        image_type: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "图片类型",
        },
        image_src: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "图片地址",
        },
        image_originWidth: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "原始宽度",
        },
        image_originHeight: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "原始高度",
        },
        image_default_width: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "默认宽度",
        },
        image_default_height: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image_default_left: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "默认左边距",
        },
        image_default_top: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "默认上边距",
        },
        image_crop_width: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "裁剪宽度",
        },
        image_crop_height: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "裁剪高度",
        },
        image_crop_offsetLeft: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "裁剪左边距",
        },
        image_crop_offsetTop: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "裁剪上边距",
        },
        image_isFixedPos: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          comment: "是否固定位置",
        },
        image_fixedLeft: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "固定左边距",
        },
        image_fixedTop: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image_border_width: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "边框宽度",
        },
        image_border_radius: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "圆角",
        },
        image_border_style: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image_border_color: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "边框颜色",
        },
      },
      {
        sequelize,
        tableName: "images",
      }
    );
  }
}

// 导出类型
export type ImageModelType = InferAttributes<ImageModel>;
