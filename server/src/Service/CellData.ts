import { CellDataModel, CellDataModelType } from "../Sequelize/Models/CellData";
import { logger } from "../Utils/Logger";

/**
 * 通过 sheetid 查找当前数据表的单元格数据
 */
async function getCellData(worker_sheet_id: string) {
  try {
    return await CellDataModel.findAll({ where: { worker_sheet_id } });
  } catch (error) {
    logger.error(error);
    return null;
  }
}

/**
 * 根据传入的 sheetid rc 判断是否存在记录
 */
async function hasCellData(worker_sheet_id: string, r: number, c: number) {
  try {
    return await CellDataModel.findOne({
      where: { worker_sheet_id, r, c },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
}

async function updateCellData(info: CellDataModelType) {
  try {
    return await CellDataModel.update(info, {
      where: { cell_data_id: info.cell_data_id },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
}
async function createCellData(info: CellDataModelType) {
  try {
    return await CellDataModel.create(info);
  } catch (error) {
    logger.error(error);
    return null;
  }
}

async function deleteCellData(worker_sheet_id: string, r: number, c: number) {
  try {
    return await CellDataModel.destroy({
      where: { worker_sheet_id, r, c },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export const CellDataService = {
  getCellData,
  hasCellData,
  updateCellData,
  createCellData,
  deleteCellData,
};
