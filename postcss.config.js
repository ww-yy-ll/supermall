module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            // 一般的都是按照iPhone 6 的尺寸来设计界面 iphone 6 ( 750 x 1334)
            viewportWidth: 375,     // 视窗的宽度，对应的是我们设计稿的宽度（750）
            viewportHeight: 667,    // 视窗的高度，对应的是我们设计稿的高度度（也可以不配置）
            unitPrecision: 5,       // 执行 ~px~转换未视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',     // 执行需要换换成的视窗单位，建议使用vw
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],   // 指定不需要转换的类，后面再讲
            minPixelValue: 1,       // 小于或等于~1px~不转换为视窗单位
            mediaQuery: false,      // 允许在媒体查询中转换~px~
            // exclude: [/^TabBar/]
        }
    }
}