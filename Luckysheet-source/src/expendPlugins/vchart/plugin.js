/**
 * 拓展 VChart 统计图
 */
import { seriesLoadScripts, loadLinks, } from '../../utils/util'

const dependScripts = ['https://unpkg.com/@visactor/vchart/build/index.min.js']

const dependLinks = []

/**
 * 注册 vchart
 * @param {*} data 整个 worker books data 
 * @param {*} isDemo 
 */
function vchart(data, isDemo) {
    console.log("==> Step1: init vchart plugin.",);
    // 加载 css
    loadLinks(dependLinks);

    // 加载 js 依赖
    seriesLoadScripts(dependScripts, null, () => {

    })
}

export { vchart }