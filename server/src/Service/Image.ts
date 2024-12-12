import { ImageModel, ImageModelType } from "../Sequelize/Models/Image";
import { logger } from "../Utils/Logger";

/**
 * 先删除当前 sheet 的所有图片
 */
async function deleteImage(worker_sheet_id: string) {
  try {
    return await ImageModel.destroy({ where: { worker_sheet_id } });
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 创建 image 记录
 */
async function createImage(data: ImageModelType) {
  try {
    return await ImageModel.create(data);
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 查询当前 workersheetid 的图片
 */
async function findAll(worker_sheet_id: string) {
  try {
    return await ImageModel.findAll({ where: { worker_sheet_id } });
  } catch (error) {
    logger.error(error);
  }
}
export const ImageService = { deleteImage, createImage, findAll };
