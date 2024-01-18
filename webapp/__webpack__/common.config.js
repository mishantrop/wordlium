const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '..', 'build')
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')
const STATIC_DIR = path.resolve(__dirname, '..', 'static')

const plugins = [
    new FileManagerPlugin({
        events: {
            // Remove build dir
            onStart: {
                delete: [BUILD_DIR],
            },
            onEnd: {
                // Copy static files
                copy: [
                    {
                        source: STATIC_DIR,
                        destination: BUILD_DIR,
                    },
                ],
            },
        },
    }),
    new HtmlWebpackPlugin({
        template: path.join(PUBLIC_DIR, 'index.html'),
        filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // For page reloading
]

const devServer = {
    historyApiFallback: true,
    open: false,
    compress: true,
    allowedHosts: 'all',
    hot: true,
    client: {
        overlay: {
            errors: true,
            warnings: true,
        },
        progress: true,
    },

    port: 3000,
    devMiddleware: {
        writeToDisk: true,
    },
    static: [
        {
            directory: path.join(BUILD_DIR, 'favicons'),
        },
    ],
}

module.exports = {
    devServer,
    plugins,
    entry: path.join(__dirname, '..', 'src', 'index.tsx'),
    output: {
        path: BUILD_DIR,
        publicPath: 'auto',
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            // --- HTML
            { test: /\.(html)$/, use: ['html-loader'] },
            // --- S/A/C/SS
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                namedExport: true,
                                auto: true,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {},
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            // --- S/A/SS
            {
                test: /\.(s[ac])ss$/i,
                use: ['postcss-loader'],
            },
            // --- IMG
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[hash][ext]',
                },
            },
        ],
    },
}
