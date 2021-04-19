<template>
  <div class="test2">页面2</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const data = useStore()
    console.log(data)
    return {}
  },
})
</script>

<style lang="scss" scoped>
.test2 {
  width: 100%;
  height: auto;
}
</style>
