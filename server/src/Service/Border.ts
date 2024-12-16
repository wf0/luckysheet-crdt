import {
  BorderInfoModel,
  BorderInfoModelType,
} from "../Sequelize/Models/BorderInfo";
import { logger } from "../Utils/Logger";

// 查找是否存在 range de边框
async function hasConfigBorder(info: BorderInfoModelType) {
  try {
    return await BorderInfoModel.findOne({
      where: info,
    });
  } catch (error) {
    logger.error(error);
  }
}

// 创建新的边框记录
async function createConfigBorder(info: BorderInfoModelType) {
  try {
    return await BorderInfoModel.create(info);
  } catch (error) {
    logger.error(error);
  }
}

// 更新边框记录
async function updateConfigBorder(info: BorderInfoModelType) {
  try {
    return await BorderInfoModel.update(info, {
      where: { config_border_id: info.config_border_id },
    });
  } catch (error) {
    logger.error(error);
  }
}

// 初始化查询全部
async function findAll(worker_sheet_id: string) {
  try {
    return await BorderInfoModel.findAll({ where: { worker_sheet_id } });
  } catch (error) {
    logger.error(error);
  }
}

export const BorderInfoService = {
  hasConfigBorder,
  createConfigBorder,
  updateConfigBorder,
  findAll,
};
