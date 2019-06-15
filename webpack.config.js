const TerserJsPlugin = require('terser-webpack-plugin');

function createConfig(minimize) {
    const config = {
        mode: 'production',
        entry: './index.client.js',
        target: 'web',
        module: {
            rules: [{
                use: {
                    loader: 'ifdef-loader',
                    options: {target: 'web'}
                }
            }]
        },
        output: {
            filename: minimize ? 'twig.min.js' : 'twig.js',
            library: 'twig',
            libraryTarget: 'amd'
        },
        optimization: {
            minimize,
            minimizer: [new TerserJsPlugin()]
        }
    };

    return config;
}

module.exports = [createConfig(false), createConfig(true)];
