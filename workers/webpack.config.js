const path = require('path');

module.exports = {
    entry: './workers.js',
    output: {
        filename: 'workers.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'workers',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: { 
                    loader: 'worker-loader',
                    options: {inline: 'fallback'}
                },
            },
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        ],
    },
};