import {
  ConfigHiddenAndLenModel,
  ConfigHiddenAndLenModelType,
} from "../Sequelize/Models/ConfigHiddenAndLen";
import { logger } from "../Utils/Logger";

// 创建隐藏记录
async function create(data: ConfigHiddenAndLenModelType) {
  try {
    return await ConfigHiddenAndLenModel.create(data);
  } catch (error) {
    logger.error(error);
  }
}

// 查询 worker_sheet_id 下所有隐藏记录 - 用于初始化时查询
async function findConfig(worker_sheet_id: string) {
  try {
    return await ConfigHiddenAndLenModel.findAll({
      where: { worker_sheet_id },
    });
  } catch (error) {
    logger.error(error);
  }
}

// 删除 hidden 记录
async function deleteHidden(
  worker_sheet_id: string,
  config_type: string,
  config_index: string
) {
  try {
    return await ConfigHiddenAndLenModel.destroy({
      where: { worker_sheet_id, config_type, config_index },
    });
  } catch (error) {
    logger.error(error);
  }
}

export const configHiddenAndLenService = { create, findConfig, deleteHidden };