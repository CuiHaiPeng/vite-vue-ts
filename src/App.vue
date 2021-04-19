<template>
  <!-- <router-view></router-view> -->

  <h1>这是个啥</h1>
  <testsr />
  <a-button type="primary"> {{ result }} </a-button>
  <pic :size="[100, 100]" />
  <a-button type="primary" @click="getData">
    调用接口调用接口调用接口调用接口调用接口调用接口调用接口调用接口
  </a-button>
  <div key="dsa" v-loading="test" trest="sda" class="test">div</div>
  <p>asdsa</p>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import testsr from '/@components/test'
import { test as testApi } from '/@/api/test'
export default defineComponent({
  name: 'App',
  components: {
    testsr,
  },
  setup() {
    const result: Ref<unknown> = ref(null)
    const getData = async () => {
      try {
        const res = await testApi()
        result.value = res.result
      } catch (error) {
        console.log(error)
      }
    }
    const test = ref(true)
    setTimeout(() => {
      test.value = false
    }, 2000)
    return { getData, result, test }
  },
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.img-box {
  width: 100%;
  height: 1000px;
  background: dodgerblue;
}
.test {
  width: 200px;
  height: 200px;
  background: dodgerblue;
}
</style>
