import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "bootstrap";

import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.baseURL = "http://exams-project.local/api";
axios.defaults.baseURL = "https://exams.weybanskytech.com.ng/api";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let token = localStorage.getItem("token");
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
