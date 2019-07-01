const fs = require('fs');
const path = require('path');
const gulp = require("gulp");
const clean = require("gulp-clean");
const child_process = require('child_process');
const through2 = require('through2');
const Vinyl = require('vinyl');

const prepare = (cb) => {
    if (!fs.existsSync('build')) {
        fs.mkdirSync('build');
    }
    cb();
};

const empty = () =>
    gulp.src('build/**.*', { read: false })
    .pipe(clean());

const writeFileNames = (name) => {
    const files = [];

    const collectFileNames = (file, enc, cb) => {
        files.push(path.relative(file.cwd, file.path).replace(/\\/g, '/'));
        cb();
    };

    const writeBuildFile = (cb) => {
        const file = new Vinyl({ path: name });
        file.contents = Buffer.from(files.join(' '));
        cb(null, file);
    };

    return through2.obj(collectFileNames, writeBuildFile);
};

const collect = () =>
    gulp.src('src/**/*.cpp', { read: false })
    .pipe(writeFileNames('build.rsp'))
    .pipe(gulp.dest('./'));

const compile = (cb) => {
    child_process.exec('em++ "@build.rsp" -o build/build.wasm', cb);
};

const compileHtml = (cb) => {
    child_process.exec('em++ "@build.rsp" -o build/build.html', cb);
};

const runHtml = (cb) => {
    child_process.exec('emrun build/build.html', cb);
};

const watch = () => gulp.watch(
    ['src/**/*.cpp'],
    gulp.series([ collect, compile ])
);

/**
 * Distribution build
 */
exports.default = exports.build =
    gulp.series([ prepare, empty, collect, compile ]);

/**
 * Development build
 */
exports.serve =
    gulp.series([ prepare, empty, collect, compileHtml, gulp.parallel([ runHtml, watch ]) ]);
