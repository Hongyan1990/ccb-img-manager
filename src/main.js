import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import {
  Button, Container, Header, Main, Row, Col,
  Table, TableColumn, Dialog, Input, Form, FormItem,
  Tooltip, Upload, Loading, Message, Tabs, TabPane, Avatar,
    Card, Pagination, DatePicker, Select, Option, Menu, MenuItem,
  Drawer, Image, Aside, Submenu, MenuItemGroup, Breadcrumb, BreadcrumbItem,
  Link, InputNumber, Radio
} from 'element-ui'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'

// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import App from './app.vue'
// /home/hongyan/Desktop/hongyan/my-order/dist
import router from './routes/router.js'
import cookie from './util/cookie.js'
import './style.css'
import createStore from './store/store.js'

Vue.use(Vuex)
Vue.use(Router)

Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Drawer)
Vue.use(Image)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Link)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.prototype.$message = Message

// Vue.use(VueQuillEditor)

const store = createStore()

new Vue({
	router,
  store,
	render: h => h(App)
}).$mount('#root')