/**
 * 处理协同数据存储: 更多操作请参考：  https://dream-num.github.io/LuckysheetDocs/zh/guide/operate.html
 *  1. 单个单元格刷新 "t": "v",
 *  2. 范围单元格刷新 "t": "rv"
 *  3. config操作 "t": "cg",
 *  4. 通用保存 "t": "all",
 *  5. 函数链操作 "t": "fc",
 *  6. 行列操作
 *      - 删除行或列  "t": "drc",
 *      - 增加行或列  "t": "arc",
 *  7. 筛选操作
 *      - 清除筛选 "t": "fsc",
 *      - 恢复筛选 "t": "fsr",
 *  8. sheet操作
 *      - 新建sheet  "t": "sha",
 *      - 复制sheet  "t": "shc",
 *      - 删除sheet  "t": "shd",
 *      - 删除sheet后恢复操作  "t": "shre",
 *      - 调整sheet位置  "t": "shr",
 *      - 切换到指定sheet  "t": "shs",
 * 9. sheet属性(隐藏或显示)  "t": "sh", ==> "op": "show" / "hide"
 * 10. 表格信息更改
 *      - 修改工作簿名称  "t": "na",
 * 11. 图表(TODO)
 *
 * 注意一点，对象中的i为当前sheet的index值，而不是order
 */

import { CellDataModelType } from "../Sequelize/Models/CellData";
import { ConfigBorderModelType } from "../Sequelize/Models/ConfigBorder";
import { ConfigHiddenAndLenModelType } from "../Sequelize/Models/ConfigHiddenAndLen";
import { CellDataService } from "../Service/CellData";
import { ConfigBorderService } from "../Service/ConfigBorder";
import { configHiddenAndLenService } from "../Service/ConfigHiddenAndLen";
import { isEmpty } from "../Utils";
import { logger } from "../Utils/Logger";

type OperateDataV = {
  ct: {
    //单元格值格式
    fa: string; //格式名称为自动格式
    t: string; //格式类型为数字类型
  };
  v: string; //内容的原始值为 233
  m: string; //内容的显示值为 233
  bg: string; //背景为 "#f6b26b"
  ff: string | number; // 字体为 "Arial"
  fc: string; //字体颜色为 "#990000"
  bl: number | boolean; //字体加粗
  it: number | boolean; //字体斜体
  un: number | boolean;
  fs: number | string; //字体大小为 9px
  cl: number | boolean; //启用删除线
  ht: number; //水平居中
  vt: number; //垂直居中
  tr: number; //文字旋转 -45°
  tb: number; //文本自动换行
  f: string; // 公式为 "=SUM(A1:A5)"
  ps: {
    //批注
    left: number; //批注框左边距
    top: number; //批注框上边距
    width: number; //批注框宽度
    height: number; //批注框高度
    value: string; //批注内容
    isshow: boolean; //批注框为显示状态
  };
};
// 定义协同操作数据类型
type OperateData = {
  t: string; // 操作类型
  i: string; // 当前sheet的index值，而不是order
  r?: number; // 行号
  c?: number; // 列号
  rc?: string; // 行列号
  op?: string; // 操作类型
  name?: string; // 工作簿名称
  order?: number; // sheet的order值
  v?: OperateDataV; // 单元格数据
  range?: {
    row: number[];
    column: number[];
  };
  k?: string;
};

/**
 * 数据库操作
 * @param data
 */
export function databaseHandler(data: string) {
  const { t } = JSON.parse(data);
  if (t === "v") v(data);
  if (t === "rv") rv(data);
  if (t === "cg") cg(data);
  if (t === "all") all(data);
  if (t === "fc") fc(data);
  if (t === "drc") drc(data);
  if (t === "arc") arc(data);
  if (t === "fsc") fsc(data);
  if (t === "fsr") fsr(data);
  if (t === "sha") sha(data);
  if (t === "shc") shc(data);
  if (t === "shd") shd(data);
  if (t === "shre") shre(data);
  if (t === "shr") shr(data);
  //   if (t === "shs") shs(data: OperateData); // 切换到指定 sheet 是前台操作，可不存储数据库
  if (t === "sh") sh(data);
  if (t === "na") na(data);
}

// 单个单元格刷新
async function v(data: string) {
  // 1. 解析 rc 单元格
  const { t, r, c, v, i } = <OperateData>JSON.parse(data);
  logger.info("[CRDT DATA]:", data);

  // 纠错判断
  if (t !== "v") return logger.error("t is not v.");
  if (isEmpty(i)) return logger.error("i is undefined.");
  if (isEmpty(r) || isEmpty(c)) return logger.error("r or c is undefined.");

  // 场景一：单个单元格插入值
  // {"t":"v","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"v":"123","ct":{"fa":"General","t":"n"},"m":"123"},"r":5,"c":0}
  if (v && v.v && v.m) {
    // 取 v m
    const value = <string>v.v;
    const monitor = <string>v.m;
    const ctfa = v.ct.fa;
    const ctt = v.ct.t;

    // 判断表内是否存在当前记录
    const exist = await CellDataService.hasCellData(i, r, c);

    const info: CellDataModelType = {
      worker_sheet_id: i,
      r,
      c,
      f: v.f,
      v: value,
      m: monitor,
      ctfa,
      ctt,
      bg: v.bg,
      bl: <boolean>v.bl,
      cl: <boolean>v.cl,
      fc: v.fc,
      ff: <string>v.ff,
      fs: <number>v.fs,
      ht: v.ht,
      it: <boolean>v.it,
      un: <boolean>v.un,
      vt: v.vt,
    };

    // 如果存在则更新
    if (exist) {
      await CellDataService.updateCellData({
        cell_data_id: exist.cell_data_id,
        ...info,
      });
    } else {
      // 创建新的记录时，当前记录的 cell_data_id 由 sequelize 自动创建
      await CellDataService.createCellData(info);
    }
  }

  // 场景二：设置空单元格的样式数据 加粗、背景、颜色、字号等
  // {"t":"v","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"v":null,"bg":"#ff0000"},"r":3,"c":2}
  else if (v && v.v === null) {
    // 判断 i r c 是否存在
    const exist = await CellDataService.hasCellData(i, r, c);

    const info: CellDataModelType = {
      worker_sheet_id: i,
      r,
      c,
      v: "",
      m: "",
      bg: v.bg,
      bl: <boolean>v.bl,
      cl: <boolean>v.cl,
      fc: v.fc,
      ff: <string>v.ff,
      fs: <number>v.fs,
      ht: v.ht,
      it: <boolean>v.it,
      un: <boolean>v.un,
      vt: v.vt,
    };

    if (exist) {
      // 如果存在则更新 - 注意全量的样式数据
      await CellDataService.updateCellData({
        cell_data_id: exist.cell_data_id,
        ...info,
      });
    } else await CellDataService.createCellData(info);
  }

  // 场景三：剪切/粘贴到某个单元格 - 会触发两次广播（一次是删除，一次是创建）
  // {"t":"v","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":null,"r":9,"c":0}
  // {"t":"v","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"ct":{"fa":"General","t":"n"},"v":"123","m":"123"},"r":13,"c":0}
  else if (v === null) {
    await CellDataService.deleteCellData(i, r, c);
  }

  // 场景四： 删除单元格内容
  // {"t":"v","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"ct":{"fa":"General","t":"n"}},"r":5,"c":0}
  else if (v && !v.v && !v.m) {
    await CellDataService.deleteCellData(i, r, c); // 删除记录
  }
}

// 范围单元格刷新
async function rv(data: string) {
  type OperateRVData = {
    t: string;
    i: string;
    range: {
      row: number[];
      column: number[];
    };
    v: OperateDataV[][];
  };
  /**
   * 范围单元格刷新
   * 需要先取 range 范围行列数，v 的内容是根据 range 循环而来
   */
  const { t, i, v, range } = <OperateRVData>JSON.parse(data);
  if (t !== "rv") return logger.error("t is not rv.");
  if (isEmpty(i)) return logger.error("i is undefined.");
  if (isEmpty(range)) return logger.error("range is undefined.");
  if (isEmpty(v)) return logger.error("v is undefined.");

  logger.info("[CRDT DATA]:", data);

  // 循环列，取 v 的内容，然后创建记录
  for (let index = 0; index < v.length; index++) {
    // 这里面的每一项，都是一条记录
    for (let j = 0; j < v[index].length; j++) {
      // 解析内部的 r c 值
      const item = v[index][j];
      const r = range.row[0] + index;
      const c = range.column[0] + j;
      // i r c 先判断是否存在记录，存在则更新，不存在则创建
      const exist = await CellDataService.hasCellData(i, r, c);
      const info: CellDataModelType = {
        worker_sheet_id: i,
        r,
        c,
        f: item.f || "",
        ctfa: item.ct?.fa,
        ctt: item.ct?.t,
        v: item.v || "",
        m: item.m || "",
        bg: item?.bg,
        bl: <boolean>item?.bl,
        cl: <boolean>item?.cl,
        fc: item?.fc,
        ff: <string>item?.ff,
        fs: <number>item?.fs,
        ht: item?.ht,
        it: <boolean>item?.it,
        un: <boolean>item?.un,
        vt: item?.vt,
      };
      if (exist) {
        // 如果存在则更新 - 注意全量的样式数据
        await CellDataService.updateCellData({
          cell_data_id: exist.cell_data_id,
          ...info,
          bg: item.bg,
          bl: <boolean>item.bl,
          cl: <boolean>item.cl,
          fc: item.fc,
          ff: <string>item.ff,
        });
      } else await CellDataService.createCellData(info);
    }
  }
}

// config操作
async function cg(data: string) {
  logger.info("[CRDT DATA]:", data);
  const { t, i, v, k } = <OperateData>JSON.parse(data);

  if (t !== "cg") return logger.error("t is not cg.");
  if (isEmpty(i)) return logger.error("i is undefined.");

  // k: 操作的key值，边框：'borderInfo' / ：行隐藏：'rowhidden' / 列隐藏：'colhidden' / 行高：'rowlen' / 列宽：'columnlen'

  // 行隐藏/列隐藏 统一处理
  // { "t": "cg", "i": "Sheet_0554kKiKl4M7_1597974810804", "v": { "5": 0, "6": 0, "13": 0, "14": 0 },  "k": "rowhidden"}

  // 修改行高列宽
  // {"t":"cg","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"4":100},"k":"rowlen"}
  if (
    k === "rowhidden" ||
    k === "colhidden" ||
    k === "rowlen" ||
    k === "columnlen"
  ) {
    for (const key in v) {
      if (Object.prototype.hasOwnProperty.call(v, key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = Number(v[key]);
        // 判断具体是 行还是列
        const configInfo: ConfigHiddenAndLenModelType = {
          worker_sheet_id: i,
          config_index: key,
          config_type: k,
          config_value: value,
        };
        //  {"t":"cg","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{"7":0,"8":0,"9":0},"k":"rowhidden"}
        //  {"t":"cg","i":"e73f971d-606f-4b04-bcf1-98550940e8e3","v":{},"k":"rowhidden"}
        // 如果是隐藏的状态，应该先删除全部的 configInfo 再创建，因为 luckysheet 前台的设计就是将当前所有的 hidden 全部传给后台，并不区分是隐藏还是取消隐藏
        if (k === "rowhidden" || k === "colhidden") {
          await configHiddenAndLenService.deleteHidden(i, k, key);
        }
        await configHiddenAndLenService.create(configInfo);
      }
    }
  }

  // k borderInfo 边框处理
  // {"t":"cg","i":"e73f971d606...","v":[{"rangeType":"range","borderType":"border-all","color":"#000","style":"1","range":[{"row":[0,0],"column":[0,0],"row_focus":0,"column_focus":0,"left":0,"width":73,"top":0,"height":19,"left_move":0,"width_move":73,"top_move":0,"height_move":19}]}],"k":"borderInfo"}
  // {"t":"cg","i":"e73f971d......","v":[{"rangeType":"range","borderType":"border-all","color":"#000","style":"1","range":[{"row":[2,7],"column":[1,2],"row_focus":2,"column_focus":1,"left":74,"width":73,"top":40,"height":19,"left_move":74,"width_move":147,"top_move":40,"height_move":119,}]}],"k":"borderInfo"}
  // {"t":"cg","i":"e73f971d......","v":[{"rangeType":"range","borderType":"border-bottom","color":"#000","style":"1","range":[{"left":148,"width":73,"top":260,"height":19,"left_move":148,"width_move":73,"top_move":260,"height_move":19,"row":[13,13],"column":[2,2],"row_focus":13,"column_focus":2}]}],"k":"borderInfo"}
  if (k === "borderInfo") {
    const borderInfo = v as unknown as {
      rangeType: string;
      borderType: string;
      color: string;
      style: string;
      range: {
        row: number[];
        column: number[];
      }[];
    }[];
    // 处理 rangeType
    for (let idx = 0; idx < borderInfo.length; idx++) {
      const border = borderInfo[idx];
      const { rangeType, borderType, color, style, range } = border;
      // 这里能拿到 i range 判断是否存在
      // declare row_start?: number;
      // declare row_end?: number;
      // declare col_start?: number;
      // declare col_end?: number;
      const info: ConfigBorderModelType = {
        worker_sheet_id: i,
        rangeType,
        borderType,
        row_start: range[0].row[0],
        row_end: range[0].row[1],
        col_start: range[0].column[0],
        col_end: range[0].column[1],
      };
      const exist = await ConfigBorderService.hasConfigBorder(info);
      if (exist) {
        // 更新
        await ConfigBorderService.updateConfigBorder({
          config_border_id: exist.config_border_id,
          ...info,
          color,
          style: Number(style),
        });
      } else {
        // 创建新的边框记录
        await ConfigBorderService.createConfigBorder({
          ...info,
          style: Number(style),
          color,
        });
      }
    }
  }
}

// 通用保存
async function all(data: string) {
  console.log("==> all", data);
}

// 函数链操作
async function fc(data: string) {
  console.log("==> fc", data);
}

// 删除行或列
async function drc(data: string) {
  console.log("==> drc", data);
}

// 增加行或列
async function arc(data: string) {
  console.log("==> arc", data);
}

// 清除筛选
async function fsc(data: string) {
  console.log("==> fsc", data);
}

// 恢复筛选
async function fsr(data: string) {
  console.log("==> fsr", data);
}

// 新建sheet
async function sha(data: string) {
  console.log("==> sha", data);
}

// 复制sheet
async function shc(data: string) {
  console.log("==> shc", data);
}

// 删除sheet
async function shd(data: string) {
  console.log("==> shd", data);
}

// 删除sheet后恢复操作
async function shre(data: string) {
  console.log("==> shre", data);
}

// 调整sheet位置
async function shr(data: string) {
  console.log("==> shr", data);
}

// sheet属性(隐藏或显示)
async function sh(data: string) {
  console.log("==> sh", data);
}

// 修改工作簿名称
async function na(data: string) {
  console.log("==> na", data);
}
