/**
 * Worker Books Service
 */

import { logger } from "../Meddlewear/Logger";
import {
  WorkerBookModel,
  WorkerBookModelType,
} from "../Sequelize/Model/WorkerBook";

// 提供 增删改查接口
async function create(info: WorkerBookModelType) {
  try {
    const result = await WorkerBookModel.create(info);
    return result;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

function update() {}

function del() {}

function findOne() {}

function findAll() {}

export const WorkerBookService = {
  create,
  update,
  delete: del,
  findOne,
  findAll,
};
