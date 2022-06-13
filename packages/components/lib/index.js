import Demo from './demo'
import Card from './card'
import ProTable from './pro-table'

const components = {
  Demo,
  Card,
  ProTable,
}

const install = Vue => {
  if (install.installed) return
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

const API = {
  install,
}

export default API
