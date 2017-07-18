const webpack = require('webpack');
const path = require('path');

const VENDOR_LIBS = [
    'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = { //bundle.js code for project, vendor.js for node_modules (dependencies)
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js' //chunkhash for cache busting
    },
    module: { //css and babel loader
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ //Checking for the vendor.js making sure if its updated or not
            names: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({ //For when NODE_ENV is set to production, it will minify the bundle.js files 
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};