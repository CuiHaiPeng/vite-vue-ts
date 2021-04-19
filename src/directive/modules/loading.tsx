import { createVNode, defineComponent, Directive, ref, render, Transition } from 'vue'
import { Spin } from 'ant-design-vue'
const createdLoadingComponent = (parent: HTMLElement, config?: any) => {
  const visible = ref(false)

  //关闭loging
  const close = () => {
    visible.value = false
  }
  //打开loading
  const open = () => {
    parent.className += ' loading-relative'
    visible.value = true
  }
  const change = (type: boolean) => {
    if (type) {
      open()
    } else {
      close()
    }
  }
  //loading 组件
  const Loading = defineComponent({
    render() {
      const visibleValue = visible.value
      //   key={visibleValue ? 0 : 1}
      // style={{ display: visibleValue ? "block" : "none" }}
      return (
        <Transition name="slide-fade">
          <div
            class="v-loading-box centerR"
            key={visibleValue ? 0 : 1}
            style={{ display: visibleValue ? 'flex' : 'none' }}
          >
            <Spin size="default" />
          </div>
        </Transition>
      )
    },
  })
  //创建实例
  const vm = createVNode(Loading)
  render(vm, document.createElement('div'))

  return {
    el: vm.el,
    close,
    open,
    change,
  }
}

const vLoading: Directive = {
  mounted(el, { value }) {
    const vm = createdLoadingComponent(el)
    el.instance = vm
    el.appendChild(vm.el)
    vm.change(Boolean(value))
  },
  updated(el, binding) {
    const { instance } = el
    const { value, oldValue } = binding
    if (oldValue !== value) {
      //如果数值切换
      instance.change(Boolean(value))
    }
  },
}
export default vLoading
