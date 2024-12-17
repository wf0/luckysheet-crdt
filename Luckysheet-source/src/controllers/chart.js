/**
 * 统一处理统计图相关方法 - 调用原生 chartmix 进行操作
 *  1. WARNING 授权使用，请注明来源 https://blog.csdn.net/weixin_47746452
 *  2. 主要涉及的文件有 core.js、chart/plugin.js、server.js、controllers/handler.js、global/api.js
 * @author: pushu（朴树） 
 * @date: 2024-12-14
 */

import chartInfo from '../store'
import { replaceHtml } from '../utils/chartUtil'
import { getSheetIndex, } from '../methods/get'
import { setluckysheet_scroll_status } from '../methods/set'
import { showNeedRangeShow, setChartMoveableEffect, showChartSettingComponent, delChart, hideAllNeedRangeShow } from '../expendPlugins/chart/plugin'
import { mouseposition } from '../global/location'


/**
 * t === "c" && op === "add" 
 * 协同创建统计图
 */
function createChart(sheetIndex, chart_id, chartData, rangeArray, rangeTxt, width, height, top, left) {
    // dom chartData, chart_id, rangeArray, rangeTxt
    let chart_id_c = chart_id + '_c'

    let modelChartShowHTML =
        '<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>'

    let $t = $(
        replaceHtml(modelChartShowHTML, {
            id: chart_id_c,
            addclass: 'luckysheet-data-visualization-chart',
            title: '图表生成',
            content: ''
        })
    ).appendTo($('.luckysheet-cell-main'))

    let container = document.getElementById(chart_id_c)

    let { render, chart_json } = chartInfo.createChart($(`#${chart_id_c}`).children('.luckysheet-modal-dialog-content')[0], chartData, chart_id, rangeArray, rangeTxt)
    // chartInfo.currentChart = chart_json.chartOptions

    width = width ? width : 400
    height = height ? height : 250
    left = left ? left : 0
    top = top ? top : 0
    container.style.width = width + 'px'
    container.style.height = height + 'px'
    container.style.position = 'absolute'
    container.style.background = '#fff'
    container.style.left = left + 'px'
    container.style.top = top + 'px'
    render.style.width = '100%'
    render.style.height = '100%'
    container.style.zIndex = chartInfo.zIndex ? chartInfo.zIndex : 15
    chartInfo.zIndex++

    // insert chartinfo
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)];

    if (!sheetFile.chart) {
        sheetFile.chart = [];
    }
    sheetFile.chart.push({
        chart_id,
        width,
        height,
        left,
        top,
        sheetIndex: sheetFile.index
    })

    //处理区域高亮框参数，当前页中，只有当前的图表的needRangShow为true,其他为false
    showNeedRangeShow(chart_id);

    // delete current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-del`).click(function (e) {
        delChart(chart_id)
    })

    setChartMoveableEffect($t);

    // edit current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-update`).click(function (e) {
        showChartSettingComponent()
    })

    $t.children('.luckysheet-modal-dialog-content').mousedown(function (e) {
        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
        }
        e.stopPropagation()
    })
    $t.mousedown(function (e) {  //move chart

        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
            setluckysheet_scroll_status(true);

            //允许拖动渲染框
            if (
                !$(e.target).is(".luckysheet-modal-dialog-controll") &&
                !$(e.target).is(".luckysheet-modal-controll-btn") &&
                !$(e.target).is("i")
            ) {
                // Debounce
                chartInfo.chartparam.luckysheetCurrentChartMoveTimeout = setTimeout(
                    function () {
                        chartInfo.chartparam.luckysheetCurrentChartMove = true;
                    },
                    100
                );
            }

            var toffset = chartInfo.chartparam.luckysheetCurrentChartMoveObj.offset();
            var tpsition = chartInfo.chartparam.luckysheetCurrentChartMoveObj.position();
            //luckysheetCurrentChartMoveXy: [鼠标点相对chart框的距离X方向，鼠标点相对chart框的距离Y方向，chart框相对cell-main的距离X方向，chart框相对cell-main的距离Y方向，水平滚动条的位置，垂直滚动条的位置]
            chartInfo.chartparam.luckysheetCurrentChartMoveXy = [
                e.pageX - toffset.left,
                e.pageY - toffset.top,
                tpsition.left,
                tpsition.top,
                $("#luckysheet-scrollbar-x").scrollLeft(),
                $("#luckysheet-scrollbar-y").scrollTop()
            ];
            chartInfo.chartparam.luckysheetCurrentChartMoveWinH = $(
                "#luckysheet-cell-main"
            )[0].scrollHeight;
            chartInfo.chartparam.luckysheetCurrentChartMoveWinW = $(
                "#luckysheet-cell-main"
            )[0].scrollWidth;

            if (
                !$(e.target).hasClass("luckysheet-mousedown-cancel") &&
                $(e.target).filter("[class*='sp-palette']").length == 0 &&
                $(e.target).filter("[class*='sp-thumb']").length == 0 &&
                $(e.target).filter("[class*='sp-']").length == 0
            ) {
                $("#luckysheet-rightclick-menu").hide();
                $("#luckysheet-cols-h-hover").hide();
                $("#luckysheet-cols-menu-btn").hide();
                $("#luckysheet-rightclick-menu").hide();
                $(
                    "#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu"
                ).hide();
                $(
                    "body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu"
                ).hide();

            }

            e.stopPropagation();

        }

    }).find(".luckysheet-modal-dialog-resize-item")
        .mousedown(function (e) {
            if (chartInfo.chartparam.luckysheetCurrentChartActive) {
                chartInfo.chartparam.luckysheetCurrentChartResize = $(this).data("type"); //开始状态resize

                var mouse = mouseposition(e.pageX, e.pageY),
                    scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
                    scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;
                var position = chartInfo.chartparam.luckysheetCurrentChartResizeObj.position();
                //参数：x,y:鼠标位置，$t.width(), $t.height(): chart框宽高， position.left + scrollLeft, position.top + scrollTop ：chart框位置 ，scrollLeft, scrollTop：滚动条位置
                chartInfo.chartparam.luckysheetCurrentChartResizeXy = [
                    x,
                    y,
                    $t.width(),
                    $t.height(),
                    position.left + scrollLeft,
                    position.top + scrollTop,
                    scrollLeft,
                    scrollTop
                ];
                chartInfo.chartparam.luckysheetCurrentChartResizeWinH = $(
                    "#luckysheet-cell-main"
                )[0].scrollHeight;
                chartInfo.chartparam.luckysheetCurrentChartResizeWinW = $(
                    "#luckysheet-cell-main"
                )[0].scrollWidth;

                chartInfo.chartparam.luckysheetCurrentChart = chart_id;

                e.stopPropagation();

            }
        })

    return { chart_json }
}


/**
 * 根据 options 创建统计图
 * @param {*} data 
 */
function renderChart(data) {
    console.log("==> renderChart", data);
    const { chart_id, chartData, width, height, left, top } = data
    const chartOptions = JSON.parse(JSON.stringify(data.chartOptions))

    let chart_id_c = chart_id + '_c'
    let modelChartShowHTML =
        '<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>'

    let $t = $(
        replaceHtml(modelChartShowHTML, {
            id: chart_id_c,
            addclass: 'luckysheet-data-visualization-chart',
            title: '图表生成',
            content: ''
        })
    ).appendTo($('.luckysheet-cell-main'))

    // 设置图表可拖动区域高亮效果
    setChartMoveableEffect($t);

    $(`#${chart_id_c}`).children('.luckysheet-modal-dialog-content')[0].id = chart_id

    let container = document.getElementById(chart_id_c)


    chartInfo.chartparam.renderChart({ chart_id, chartOptions })
    chartInfo.currentChart = chartOptions
    chartmix.default.insertToStore({ chart_id, chartOptions })


    //处理区域高亮框参数，当前页中，只有当前的图表的needRangShow为true,其他为false
    showNeedRangeShow(chart_id);

    // delete current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-del`).click(function (e) {
        delChart(chart_id)
    })

    // edit current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-update`).click(function (e) {
        showChartSettingComponent()
    })

    $t.children('.luckysheet-modal-dialog-content').mousedown(function (e) {
        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
        }
        e.stopPropagation()
    })
    $t.mousedown(function (e) {  // move chart
        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
            setluckysheet_scroll_status(true);

            //允许拖动渲染框
            if (
                !$(e.target).is(".luckysheet-modal-dialog-controll") &&
                !$(e.target).is(".luckysheet-modal-controll-btn") &&
                !$(e.target).is("i")
            ) {
                // Debounce
                chartInfo.chartparam.luckysheetCurrentChartMoveTimeout = setTimeout(
                    function () {
                        chartInfo.chartparam.luckysheetCurrentChartMove = true;
                    },
                    100
                );
            }

            var toffset = chartInfo.chartparam.luckysheetCurrentChartMoveObj.offset();
            var tpsition = chartInfo.chartparam.luckysheetCurrentChartMoveObj.position();
            //luckysheetCurrentChartMoveXy: [鼠标点相对chart框的距离X方向，鼠标点相对chart框的距离Y方向，chart框相对cell-main的距离X方向，chart框相对cell-main的距离Y方向，水平滚动条的位置，垂直滚动条的位置]
            chartInfo.chartparam.luckysheetCurrentChartMoveXy = [
                e.pageX - toffset.left,
                e.pageY - toffset.top,
                tpsition.left,
                tpsition.top,
                $("#luckysheet-scrollbar-x").scrollLeft(),
                $("#luckysheet-scrollbar-y").scrollTop()
            ];
            chartInfo.chartparam.luckysheetCurrentChartMoveWinH = $(
                "#luckysheet-cell-main"
            )[0].scrollHeight;
            chartInfo.chartparam.luckysheetCurrentChartMoveWinW = $(
                "#luckysheet-cell-main"
            )[0].scrollWidth;

            if (
                !$(e.target).hasClass("luckysheet-mousedown-cancel") &&
                $(e.target).filter("[class*='sp-palette']").length == 0 &&
                $(e.target).filter("[class*='sp-thumb']").length == 0 &&
                $(e.target).filter("[class*='sp-']").length == 0
            ) {
                $("#luckysheet-rightclick-menu").hide();
                $("#luckysheet-cols-h-hover").hide();
                $("#luckysheet-cols-menu-btn").hide();
                $("#luckysheet-rightclick-menu").hide();
                $(
                    "#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu"
                ).hide();
                $(
                    "body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu"
                ).hide();

            }

            e.stopPropagation();

        }

    }).find(".luckysheet-modal-dialog-resize-item")
        .mousedown(function (e) {
            if (chartInfo.chartparam.luckysheetCurrentChartActive) {
                chartInfo.chartparam.luckysheetCurrentChartResize = $(this).data("type"); //开始状态resize

                var mouse = mouseposition(e.pageX, e.pageY),
                    scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
                    scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;
                var position = chartInfo.chartparam.luckysheetCurrentChartResizeObj.position();
                //参数：x,y:鼠标位置，$t.width(), $t.height(): chart框宽高， position.left + scrollLeft, position.top + scrollTop ：chart框位置 ，scrollLeft, scrollTop：滚动条位置
                chartInfo.chartparam.luckysheetCurrentChartResizeXy = [
                    x,
                    y,
                    $t.width(),
                    $t.height(),
                    position.left + scrollLeft,
                    position.top + scrollTop,
                    scrollLeft,
                    scrollTop
                ];
                chartInfo.chartparam.luckysheetCurrentChartResizeWinH = $(
                    "#luckysheet-cell-main"
                )[0].scrollHeight;
                chartInfo.chartparam.luckysheetCurrentChartResizeWinW = $(
                    "#luckysheet-cell-main"
                )[0].scrollWidth;

                chartInfo.chartparam.luckysheetCurrentChart = chart_id;

                e.stopPropagation();

            }
        })


    container.style.width = width + 'px'
    container.style.height = height + 'px'
    container.style.position = 'absolute'
    container.style.background = '#fff'
    container.style.left = left + 'px'
    container.style.top = top + 'px'
    container.style.zIndex = chartInfo.zIndex ? chartInfo.zIndex : 15
    chartInfo.zIndex++

}


/**
 * t === "c" && op === "xy" || op === "wh" || op === "update" 
 * 协同更新统计图
 */
function updateChart(data) {
    console.log("==> updateChart", data);
    const { chart_id, left, top, width, height, chartOptions } = data

    // 更新 dom 的位置即可
    let chart_id_c = chart_id + '_c'
    let container = document.getElementById(chart_id_c)

    if (left) container.style.left = typeof left === 'number' ? `${left}px` : left
    if (top) container.style.top = typeof top === 'number' ? `${top}px` : top
    if (width) container.style.width = typeof width === 'number' ? `${width}px` : width
    if (height) container.style.height = typeof height === 'number' ? `${height}px` : height

    if (chartOptions) {
        // 更新 options
        chartInfo.chartparam.renderChart({ chart_id, chartOptions })

    }

    // 宽高变化后，需要重绘
    chartInfo.resizeChart(chart_id)
}


/**
 * t === "c" && op === "del" 
 * 协同删除统计图
 */
function deleteChart(chart_id) {
    // delete container
    $(`.luckysheet-cell-main #${chart_id}_c`).remove()

    // Hide selected range
    hideAllNeedRangeShow()

    // delete storage
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)]
    let index = sheetFile.chart.findIndex(item => item.chart_id == chart_id)
    sheetFile.chart.splice(index, 1)
    // api call
    chartInfo.deleteChart(chart_id)
}


export const chartController = {
    createChart,
    updateChart,
    deleteChart,
    renderChart
}

