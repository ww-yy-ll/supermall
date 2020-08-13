module.exports = {
    configureWebpack: {
        resolve: {
            // 文件的后缀名
            // extensions: [],
            // alias：别名
            alias: {
                // '@': 'src', // 默认配置@就是src文件夹路径
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network'
            }
        }
    }
}
