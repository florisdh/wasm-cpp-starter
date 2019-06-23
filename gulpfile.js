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
    /**
     * Due to issues with nodejs exec errors this is the best way of showing errors for now.
     */
    child_process.execSync('em++ "@build.rsp" -o build/build.wasm');
    cb();
};
    
exports.default = gulp.series([ prepare, empty, collect, compile ]);
