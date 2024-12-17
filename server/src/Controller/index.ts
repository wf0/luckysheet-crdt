import { uploadImage } from "./Luckysheet/uploadImage";
import { loadSheetData } from "./Luckysheet/LoadSheetData";
import { getWorkerBook } from "./Luckysheet/getWorkerBook";

// 统一导出控制层对象
export const Controller = { loadSheetData, uploadImage, getWorkerBook };
