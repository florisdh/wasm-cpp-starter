# wasm-cpp-starter
A fundamental **webassambly c++ starter project** using gulp to make your day a bit easier.

## Features
- Full setup for building your wasm module
- Large c++ library support using [response file workaround](https://gcc.gnu.org/wiki/Response_Files)
- Easy to expand build script using gulp
- Simple project hierarchy
- Development build pipeline

## Usage

### Prerequisite
Install the emscripten sdk and all its dependecies on your machine [look here](https://emscripten.org/docs/getting_started/downloads.html), tested on windows and debian with no problems.

### Setup
Clone the starter and install required dependencies. (you've probably done this before)
```
git clone https://github.com/florisdh/wasm-cpp-starter.git AWESOME-PROJECT
cd AWESOME-PROJECT
npm i
```

### Building
Running the build task will collect all ``.cpp`` source files in the ``src`` folder and build a webassambly module from them.
```
npm run build
```
You can browse the resulting ``build.wasm`` file in the ``build`` directory.

### Development
During the development you should run the serve task to make testing a bit easier. This will run the emscripten html build, which will build your sources and setup a basic web app in the build folder. It will also automatically open your default browser with the test app where you can instantly see the output.
```
npm run serve
```
There is also a watcher running on the ``src`` folder, so every time a source file is changed, it will re-build the wasm file.

## About
Made this starter project out of lack (in my pov) for a good starter in webassambly with c++. Please let me know if you're using it or have some feedback. :)

## Continue reading
- [Webassembly c++ into](https://webassembly.org/docs/c-and-c++/)
- [Response file workaround issue in emscripten](https://github.com/emscripten-core/emscripten/issues/4438).

## TODO
- Optimise wasm build size using params
- Add source map support
- Add dependency status to readme
