const path = require('path');
const gulp = require("gulp");
const clean = require("gulp-clean");
const exec = require('child_process').exec;
const through2 = require('through2');
const Vinyl = require('vinyl');

const prepare = () =>
    gulp.src('build/**.*', { read: false, allowEmpty: true })
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

const compile = () =>
    exec('em++ "@build.rsp" -o build/build.wasm', function (err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    });

exports.default = gulp.series([ prepare, collect, compile ]);
