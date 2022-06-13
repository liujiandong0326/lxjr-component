const glob = require('glob')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const list = {}

async function makeList(dirPath, list) {
  const files = glob.sync(`${dirPath}/**/index.js`)

  for (let i = 0; i < files.length; i++) {
    const component = files[i].split(/[/.]/)[2]
    list[component] = `./${files[i]}`
  }
}

makeList('components/lib', list)

module.exports = {
  mode: 'production',
  entry: list,
  output: {
    filename: '[name].umd.js',
    path: path.join(__dirname, 'dist'),
    library: 'lx',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  // externals: {
  //   'ant-design-vue': 'antd',
  // },
}
