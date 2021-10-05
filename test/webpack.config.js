const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcss = require("postcss");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                //js代码兼容性的问题
                //package：babel-loader @babel/core @babel/preset-env
                //无法转换promise等高级语法
                //下载@babel/polyfill 并在需转换的js文件中引入该包
                //会将所有的兼容性文件引入，体积太大
                //按需加载 --> code-js 需注释引入的@babel/polyfill
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    //   {
                    //     /* 
                    //       开启多进程打包。 
                    //       进程启动大概为600ms，进程通信也有开销。
                    //       只有工作消耗时间比较长，才需要多进程打包
                    //     */
                    //     // loader: 'thread-loader',
                    //     // options: {
                    //     //   workers: 2 // 进程2个
                    //     // }
                    //   },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        //指定corejs的版本
                                        corejs: {
                                            version: 3,
                                        },
                                        targets: {
                                            chrome: '60',
                                            ie: '9',
                                            edge: '17',
                                        }
                                    }
                                ],
                            ],
                            /*
                             缓存：
                               babel缓存
                                 cacheDirectory: true
                                 --> 让第二次打包构建速度更快
                               文件资源缓存
                                 hash: 每次wepack构建时会生成一个唯一的hash值。
                                   问题: 因为js和css同时使用一个hash值。
                                     如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
                                 chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
                                   问题: js和css的hash值还是一样的
                                     因为css是在js中被引入的，所以同属于一个chunk
                                 contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
                                 --> 让代码上线运行缓存更好使用
                            */
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                ],


            },



            {
                oneOf:
                    [
                        {
                            test: /\.css$/i,
                            use: [MiniCssExtractPlugin.loader, "css-loader",
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                'postcss-preset-env',
                                                {
                                                    // 其他选项
                                                },
                                            ],
                                        ],
                                    },
                                },
                            },
                            ],
                        },
                        {
                            test: /\.s[ac]ss$/i,
                            use: [
                                //将生成的css从js中单独打包为css文件
                                MiniCssExtractPlugin.loader,
                                // 将 CSS 转化成 CommonJS 模块
                                'css-loader',
                                {
                                    //为css进行兼容性处理
                                    loader: 'postcss-loader',
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                [
                                                    'postcss-preset-env',
                                                    {
                                                        // 其他选项
                                                    },
                                                ],
                                            ],
                                        },
                                    },
                                },
                                // 将 Sass 编译成 CSS
                                'sass-loader',
                            ],
                        },
                        {
                            test: /\.html$/,
                            //处理HTML中的Img标签,（负责引入img，从而能被url-loader进行处理）
                            loader: 'html-loader',
                        },
                        {
                            //打包图片资源
                            test: /\.(png|jpg|gif)/,
                            type: 'asset/resource',
                            //将匹配的所有文件输出到指定文件夹
                            //asset module 具有三种资源，
                            //asset/resource将文件输出，并打包注入
                            //  background-image: url(http://127.0.0.1:5500/webpack-code/webpack_firsttest/dist/imgs/14607.jpg);
                            //asset/inline将文件输出为dataURI，不输出文件
                            //   svg、text文件可以使用，jpg不可用
                            //asset/source将文件直接以源码输出


                            generator: {
                                filename: 'imgs/[hash:5][ext][query]'
                            },

                        },
                        {
                            //语法检查 eslint-loader eslint
                            //只检查自己的文件，不检查第三方的库
                            //设置检查规则:
                            //package.json 中的eslintConfig设置
                            //使用airbnb检查 -> eslint-config-airbnb-base -> eslint、eslint-plugin-import
                            //pack age.json中配置
                            // "eslintConfig": {
                            //     "extends": "airbnb-base",
                            //      "globals": {
                            //          "localStorage": true,
                            //          "window": true,
                            //          "document": true
                            //      }
                            //   }


                            test: /\.js$/,
                            exclude: /node_modules|dist/,
                            loader: 'eslint-loader',
                            options: {
                                //自动修复js中的错误
                                fix: true,

                            },
                        },

                    ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new optimizeCssAssetsWebpackPlugin,
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/main.css',
        }),
    ],
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },

}