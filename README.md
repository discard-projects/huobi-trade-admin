# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 支持`sass`
```
$ npm install node-sass --save-dev
$ npm install sass-loader --save-dev
$ npm install sass-resources-loader --save-dev
```
需改build/utils.js 查找到
```
scss: generateLoaders('sass'),
```
替换为
```
scss: generateLoaders('sass').concat(
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/assets/stylesheets/mixins/vuiVar.scss')
    }
  }
),
```
js定义scss变量
```
$ npm install @epegzz/sass-vars-loader --save-dev
```
```
scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../src/assets/stylesheets/mixins/_vars.scss')
      }
    }).concat({
      loader: "@epegzz/sass-vars-loader", options: {
        syntax: 'scss',
        files: [
          // Option 3) Load vars from JavaScript file
          path.resolve(__dirname, '../src/assets/javascripts/scss-vars/index.js')
        ]}
    }),
```
# 安装`vue-ext`
```
npm install vue-ext -S
```
