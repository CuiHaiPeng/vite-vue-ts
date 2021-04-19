import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
export default defineComponent({
  setup() {
    return () => (
      <div>
        <h1>你好 vite </h1>
        <Button type="primary">Primary</Button>
      </div>
    );
  },
});
