<template>
  <div
    v-loading="isLoading"
    :class="[enlarge && 'img-hover', 'img-component-box']"
    :style="divStyle()"
    @click="onClick"
  >
    <img
      :alt="alt"
      :src="defaultSrc || getSrc()"
      :style="{
        'object-fit': fit,
      }"
      @load="loadOver"
      class="image-component"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import defaultImageUrl from '/@/assets/img/default.jpg'
const parseSize = (size: unknown) => (`${size}`.indexOf('%') !== -1 ? size : size + 'px')
export default defineComponent({
  name: 'Pic',
  props: {
    //图片大小[宽度,高度,圆角]
    size: {
      type: Array,
      default: () => [0, 0, 0],
    },
    //最小高度宽度[宽度,高度]
    minSize: {
      type: Array,
      default: () => [0, 0],
    },
    //鼠标移入是否放大
    enlarge: {
      type: Boolean,
      default: false,
    },
    //图片格式
    fit: {
      type: String,
      default: 'cover',
    },
    //图片预览
    preview: {
      type: Array,
      default: (): Array<unknown> => [],
    },
    //路径
    src: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: defaultImageUrl,
    },
    //alt提示
    alt: {
      type: String,
      default: '图片',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isLoading = ref(true)
    const divStyle = () => {
      const { size, minSize } = props
      const width = size[0] === 'auto' ? 'auto' : parseSize(size[0])
      const height = parseSize(size[1])
      return {
        width: width,
        height: height === '-1px' ? width : height,
        'border-radius': parseSize(size[2]),
        'min-width': parseSize(minSize[0]),
        'min-height': parseSize(minSize[1]),
      }
    }
    //图片的imageUrl
    const getSrc = () => {
      const { src, path } = props
      return src || path
    }
    const defaultSrc = ref('')
    //是否加载完毕
    const loadOver = () => {
      isLoading.value = false
    }
    const onClick = () => {
      emit('click')
    }
    return {
      loadOver,
      getSrc,
      divStyle,
      isLoading,
      defaultSrc,
      onClick,
    }
  },
})
</script>

<style scoped lang="scss">
.img-component-box {
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: 0.2s all;

  .image-component {
    width: 100%;
    height: 100%;
    transition: 0.2s all;
  }
}
.img-hover {
  &:hover .image-component {
    transform: scale(1.2);
  }
}
</style>
