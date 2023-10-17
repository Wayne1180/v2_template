import Vue from 'vue'

// base library
import {
  Alert,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  message,
  Modal,
  notification,
  PageHeader,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  TreeSelect,
  Upload
} from 'ant-design-vue'

// ext library
import VueCropper from 'vue-cropper'
import Dialog from '@/components/Dialog'

import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/core/permission/permission'
import './directives/action'
import './directives/dot'

Vue.use(Alert)
Vue.use(AutoComplete)
Vue.use(Avatar)
Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Cascader)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(ConfigProvider)
Vue.use(DatePicker)
Vue.use(Descriptions)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Empty)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(PageHeader)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Result)
Vue.use(Row)
Vue.use(Select)
Vue.use(Skeleton)
Vue.use(Space)
Vue.use(Spin)
Vue.use(Statistic)
Vue.use(Steps)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(TreeSelect)
Vue.use(Upload)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$destroyAll = Modal.destroyAll

Vue.use(Dialog) // this.$dialog func
Vue.use(PageLoading)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
