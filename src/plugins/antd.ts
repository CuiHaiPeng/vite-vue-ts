import {
  Button,
  Input,
  Steps,
  Form,
  Select,
  Row,
  Radio,
  DatePicker,
  Col,
  Icon,
  Checkbox,
  Switch,
} from 'ant-design-vue'
import { App } from 'vue'

const ComponentList = [
  Button,
  Input,
  Steps,
  Form,
  Select,
  Row,
  Radio,
  DatePicker,
  Col,
  Icon,
  Checkbox,
  Switch,
]
export default {
  install(app: App) {
    //按需加载
    ComponentList.forEach(item => {
      app.component(item.name, item)
    })
  },
}
