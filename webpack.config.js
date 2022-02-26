module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'esbuild-loader'
            }
        ]
    },
    output: {
        path: require("path").resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    target: 'web',
    mode: 'production'
}