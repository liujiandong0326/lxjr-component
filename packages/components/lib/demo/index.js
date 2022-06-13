import Demo from './src/index.vue'

Demo.install = Vue => {
  Vue.component(Demo.name, Demo)
}

export default Demo
