module.exports = {
  title: '基于 antdv 的组件库',
  base: '/lxjr-component/',
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Github',
        link: 'https://github.com/liujiandong0326/lxjr-component',
      },
      {
        text: 'Npm',
        link: 'https://www.npmjs.com/package/lxjr-component',
      },
    ],
    sidebar: ['/', '/componentDoc/pro-table'],
  },
  chainWebpack(config) {
    // 处理因为 vuepress 的 cors 和 antd vue 版本不一致的问题
    config.resolve.alias.set('core-js/library/fn', 'core-js/features')
  },
}
