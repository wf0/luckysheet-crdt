/**
 * Image 图片
 */

import { Model, Sequelize, DataTypes, InferAttributes } from "sequelize";

export class ImageModel extends Model {
  registerModule(sequelize: Sequelize) {
    ImageModel.init(
      {
        image_id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
          comment: "图片ID",
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