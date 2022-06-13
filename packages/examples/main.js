import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import '../components/css/demo.less'
import '../components/css/card.less'
import '../components/css/pro-table-card.less'
import Demo from '../components/lib/demo'
import Card from '../components/lib/card'
import ProTable from '../components/lib/pro-table'

Vue.use(Antd)
Vue.use(Demo)
Vue.use(Card)
Vue.use(ProTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
