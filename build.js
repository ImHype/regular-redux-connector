const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const chokidar = require('chokidar');
const argv = process.argv;
const moduleName = 'regularRedux';
let bundles = [
    {
        format: 'umd', ext: '.js', plugins: [],
        moduleName,
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: []
    },
    {
        format: 'umd', ext: '.min.js', plugins: [uglify()],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
        moduleName, minify: true
    }
];

function build(bundles) {
    let promise = Promise.resolve();

    promise = promise.then(() => del(['dist/*']));

    for (const config of bundles) {
        promise = promise.then(() => rollup.rollup({
            entry: 'src/index.js',
            plugins: [
                babel({
                    babelrc: false,
                    exclude: 'node_modules/**',
                    presets: config.babelPresets,
                    plugins: config.babelPlugins,
                })
            ].concat(config.plugins),
        }).then(bundle => {
            bundle.write({
                dest: `dist/${config.moduleName || 'main'}${config.ext}`,
                format: config.format,
                sourceMap: !config.minify,
                moduleName: config.moduleName,
            });
            console.log('> build successfully');
        }));
    }

    promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
}

const actionMap = {
    build: ['--build', '-b'],
    watch: ['--watch', '-w']
};

if (~actionMap.build.indexOf(argv[2])) {
    bundles = bundles.slice(0, 1);
    build(bundles);
} else if (~actionMap.watch.indexOf(argv[2])) {
    bundles = bundles.slice(0, 1);
    build(bundles);
    chokidar.watch('./src', {
        ignored: /(^|[\/\\])\../,
        persistent: true
    }).on('change', () => {
        build(bundles.slice(0, 1));
    });
}