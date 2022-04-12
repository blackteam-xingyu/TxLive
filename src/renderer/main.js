import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/iconfont/iconfont.css'
const fs = require("fs");
const configs = fs.readFileSync("C:/ProgramData/TxLive/PCoptions.conf", "utf-8");
const config = JSON.parse(configs);
Vue.use(ElementUI);

import 'element-ui/lib/theme-chalk/index.css';
import './common/style/index.scss'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.directive('drag', {
  //1.指令绑定到元素上回立刻执行bind函数，只执行一次
  //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
  bind: function (el) { },
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted: function (el, binding) {
    let odiv = el; //获取当前元素
    console.log("el\n", el)
    console.log("el.parentNode\n", el.parentNode)
    let firstTime = '', lastTime = '';
    let mouseDownEvent = function (e) {
      var disx = e.pageX - el.offsetLeft;
      var disy = e.pageY - el.offsetTop;

      // 给当前元素添加属性，用于元素状态的判断
      odiv.setAttribute('ele-flag', false)
      odiv.setAttribute('draging-flag', true)
      firstTime = new Date().getTime();
      document.onmousemove = function (e) {
        let l = e.pageX - disx;
        let t = e.pageY - disy;
        let r = el.parentNode.offsetWidth - el.offsetWidth;
        let b = el.parentNode.offsetHeight - el.offsetHeight;
        if (l < 0) el.style.left = 0
        else if (l > r) el.style.left = r
        else el.style.left = l / el.parentNode.offsetWidth * 100 + '%';
        if (t < 0) el.style.top = 0
        else if (t > b) el.style.top = b
        else el.style.top = t / el.parentNode.offsetHeight * 100 + '%';

      }
      document.onmouseup = function (event) {
        document.onmousemove = document.onmouseup = null;
        lastTime = new Date().getTime();
        if ((lastTime - firstTime) > 200) {
          odiv.setAttribute('ele-flag', true)
          event.stopPropagation()
        }
        setTimeout(function () {
          odiv.setAttribute('draging-flag', false)
        }, 16.66)
      }
    }
    el.updateonmousedown = function (value) {
      if (value == true || value == null) {
        el.addEventListener('mousedown', mouseDownEvent)
      } else {
        el.removeEventListener('mousedown', mouseDownEvent)
      }
    }
    el.updateonmousedown(binding.value)
  },
  update: function (el, binding) {
    el.updateonmousedown(binding.value)
  }


})
Vue.directive('resize', {
  bind: function (el) {

  },
  inserted: function (el) {
    console.log("v-resize\n", el)
    const parent = el.parentNode
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.offsetWidth >= (entry.target.offsetHeight * 16) / 9) {
          el.style.width = (entry.target.offsetHeight * 16) / 9 + "px";
          el.style.height = "100%"
        }
        else { el.style.width = "100%"; el.style.height = (entry.target.offsetWidth * 9) / 16 + "px" }
      }

    });
    resizeObserver.observe(parent);
  }
})
Vue.directive('refont', {
  bind: function (el) {

  },
  inserted: function (el, binding) {
    console.log("v-refont\n", el)
    const parent = el.parentNode
    el.style.fontSize = Number(binding.value) / config.dpiWidth * parent.offsetWidth + "px";
    console.log("fontSize\n", Number(binding.value) / config.dpiWidth * parent.offsetWidth)
  },
  update: function (el, binding) {
    const parent = el.parentNode
    el.style.fontSize = Number(binding.value) / config.dpiWidth * parent.offsetWidth + "px";
    console.log("fontSizeUpdate\n", Number(binding.value) / config.dpiWidth * parent.offsetWidth)
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
