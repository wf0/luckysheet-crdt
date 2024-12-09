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

export function databaseHandler(data: string) {
  const { t } = JSON.parse(data);
  if (t === "v") v();
  if (t === "rv") rv();
  if (t === "cg") cg();
  if (t === "all") all();
  if (t === "fc") fc();
  if (t === "drc") drc();
  if (t === "arc") arc();
  if (t === "fsc") fsc();
  if (t === "fsr") fsr();
  if (t === "sha") sha();
  if (t === "shc") shc();
  if (t === "shd") shd();
  if (t === "shre") shre();
  if (t === "shr") shr();
  //   if (t === "shs") shs(); // 切换到指定 sheet 是前台操作，可不存储数据库
  if (t === "sh") sh();
  if (t === "na") na();
}

// 单个单元格刷新
function v() {}

// 范围单元格刷新
function rv() {}

// config操作
function cg() {}

// 通用保存
function all() {}

// 函数链操作
function fc() {}

// 删除行或列
function drc() {}

// 增加行或列
function arc() {}

// 清除筛选
function fsc() {}

// 恢复筛选
function fsr() {}

// 新建sheet
function sha() {}

// 复制sheet
function shc() {}

// 删除sheet
function shd() {}

// 删除sheet后恢复操作
function shre() {}

// 调整sheet位置
function shr() {}

// sheet属性(隐藏或显示)
function sh() {}

// 修改工作簿名称
function na() {}
