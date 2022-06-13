<template>
  <div class="m-card" :style="width ? { width: width + 'px' } : {}">
    <div
      class="m-card-img"
      :style="imgHeight ? { height: imgHeight + 'px' } : {}"
    >
      <img :src="imgSrc" alt="img" />
    </div>
    <div v-if="summary" class="m-card-summary">{{ summary }}</div>
    <div v-else class="m-card-summary">
      <slot />
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    width: {
      type: Number,
      default: 0,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    imgHeight: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less">
@import './card.less';
</style>
