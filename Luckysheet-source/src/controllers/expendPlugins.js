import { chart } from '../expendPlugins/chart/plugin'
import { print } from '../expendPlugins/print/plugin'
import { vchart } from '../expendPlugins/vchart/plugin'

const pluginsObj = {
    'chart': chart,
    'print': print,
    "vchart": vchart
}

const isDemo = true

/**
 * Register plugins
 */
function initPlugins(plugins, data) {
    if (plugins.length) {
        plugins.forEach(plugin => {
            pluginsObj[plugin](data, isDemo)
        });
    }
}

export {
    initPlugins
}