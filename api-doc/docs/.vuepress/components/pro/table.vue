<template>
  <div>
    <a-pagination v-model="current" :total="50" show-less-items />
  </div>
</template>

<script>
export default {
  name: 'pro-table',
  data() {
    return {
      current: 2,
    }
  },
}
</script>
