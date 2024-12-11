import { getURLQuery } from "../Utils";
import { Request, Response } from "express";
import { WORKER_BOOK_INFO } from "../Config";
import { WorkerSheetService } from "../Service/WorkerSheet";
import { CellDataService } from "../Service/CellData";
import { CellDataModelType } from "../Sequelize/Models/CellData";
import { configHiddenAndLenService } from "../Service/ConfigHiddenAndLen";
import { logger } from "../Utils/Logger";
import { ConfigBorderService } from "../Service/ConfigBorder";
import { ConfigMergeService } from "../Service/ConfigMerge";

/**
 * loadLuckysheet 加载数据 - 协同第一步
 * @param req
 * @param res
 * @returns
 */
async function loadLuckysheet(req: Request, res: Response) {
  try {
    const result = [];
    // 1. 解析用户 URL gridkey 参数 || WORKER_BOOK_INFO gridkey
    const gridKey = getURLQuery(req.url, "gridkey") || WORKER_BOOK_INFO.gridKey;

    // 2. 根据 gridKey 查询相关数据，拼接生成 luckysheet 初始数据，进行 luckysheet 初始化
    const sheets = await WorkerSheetService.findAllByGridKey(gridKey);
    if (!sheets || !sheets.length) return;

    // 一个工作簿可能有多个工作表
    for (let i = 0; i < sheets.length; i++) {
      const item = sheets[i].dataValues;
      // 生成基础数据
      const temp = {
        name: item.name,
        index: item.worker_sheet_id, // 注意此字段
        status: item.status,
        order: item.order,
        celldata: <unknown[]>[],
        config: {
          merge: {}, //合并单元格
          rowhidden: {}, //隐藏行
          colhidden: {}, //隐藏列
          borderInfo: [], //边框
          rowlen: {},
          columnlen: {},
        },
        image: [], //图片
        chart: [], //图表配置
      };

      // 3. 查询 celldata 数据
      const worker_sheet_id = item.worker_sheet_id;
      const cellDatas = await CellDataService.getCellData(worker_sheet_id);
      cellDatas?.forEach((item) => {
        const data = <CellDataModelType>item.dataValues;
        // 移除多余的字段
        delete data.cell_data_id;
        // 解析 cellData 生成 luckysheet 初始数据
        temp.celldata.push({
          r: data.r,
          c: data.c,
          v: data,
        });
      });

      /* eslint-disable */
      // 4. 查询 merge 数据 - 这里不仅要体现在 config 中，还要体现在 celldata.mc 中
      const merges = await ConfigMergeService.findAll(worker_sheet_id);
      merges?.forEach((merge) => {
        // 拼接 r_c 格式
        const { r, c } = merge.dataValues;
        // @ts-ignore
        temp.config.merge[`${r}_${c}`] = merge.dataValues;

        // 配置 celldata mc 属性
        const currentMergeCell = temp.celldata.find(
          // @ts-ignore
          (i) => i.r == r && i.c == c
        );
        // @ts-ignore
        if (currentMergeCell) currentMergeCell.v.mc = merge.dataValues;
      });

      /* eslint-disable */
      // 5. 查新 border 数据
      const borders = await ConfigBorderService.findAll(worker_sheet_id);
      borders?.forEach((border) => {
        const data = border.dataValues;
        // 根据当前数据，生成 config.borderInfo

        // @ts-ignore
        temp.config.borderInfo.push({
          rangeType: data.rangeType,
          borderType: data.borderType,
          style: data.style,
          color: data.color,
          range: [
            {
              row: [data.row_start, data.row_end],
              column: [data.col_start, data.col_end],
            },
          ],
        });
      });

      /* eslint-disable */
      // 6. 查询 hidden/rowlen/collen 数据
      const hiddens = await configHiddenAndLenService.findConfig(
        worker_sheet_id
      );
      hiddens?.forEach((item) => {
        const data = item.dataValues;
        // 移除多余的字段
        // 解析 hidden 数据生成 luckysheet 初始数据
        if (data.config_type === "rowhidden") {
          // @ts-ignore
          temp.config.rowhidden[data.config_index] = 0;
        } else if (data.config_type === "colhidden") {
          // @ts-ignore
          temp.config.colhidden[data.config_index] = 0;
        } else if (data.config_type === "rowlen") {
          // @ts-ignore
          temp.config.rowlen[data.config_index] = Number(data.config_value);
        } else if (data.config_type === "columnlen") {
          // @ts-ignore
          temp.config.columnlen[data.config_index] = Number(data.config_value);
        }
      });

      // 7. 查询 chart 数据

      // 8. 查询 image 数据
      result.push(temp);
    }

    res.json(JSON.stringify(result));
  } catch (error) {
    logger.error(error);
    res.json({ code: 500, msg: "服务异常" });
  }
}

export const Controller = { loadLuckysheet };
