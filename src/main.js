import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap";

import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = "http://exams-project.local/api";
// axios.defaults.baseURL = "https://exams.weybanskytech.com.ng/api";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let token = localStorage.getItem("token");
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
window.axios = axios;

// let numberOfAjaxCallPending = 0;
// window.axios.interceptors.request.use(function (config) {
//     numberOfAjaxCallPending++;
//     Pace.restart();
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
// window.axios.interceptors.response.use(function (response) {
//     numberOfAjaxCallPending--;
//     if (numberOfAjaxCallPending == 0) Pace.stop();
//     return response;
// }, function (error) {
//     numberOfAjaxCallPending--;
//     if (numberOfAjaxCallPending == 0) Pace.stop();
//     return Promise.reject(error);
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
