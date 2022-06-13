import Card from './src/index.vue'

Card.install = Vue => {
  Vue.component(Card.name, Card)
}

export default Card
