import { WorkerSheetModel } from "../Sequelize/Models/WorkerSheet";

/**
 * @description: 工作表服务
 */
function findAll() {
  try {
    return WorkerSheetModel.findAll();
  } catch (error) {
    console.error(error);
  }
}

/**
 * 通过 gridkey 查找记录
 */
function findAllByGridKey(gridKey: string) {
  try {
    return WorkerSheetModel.findAll({ where: { gridKey } });
  } catch (error) {
    console.error(error);
  }
}

export const WorkerSheetService = { findAll, findAllByGridKey };
