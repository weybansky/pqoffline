import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Course from "../views/Course.vue";
import Exam from "../views/Exam.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/courses/:course",
    name: "Course",
    component: Course
  },
  {
    path: "/courses/:course/exams/:exam",
    name: "Exam",
    component: Exam
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path == "/login" && localStorage.getItem("token") !== null) {
    return next({ name: "Home" });
  }

  if (to.name !== "Login" && localStorage.getItem("token") === null) {
    return next({ name: "Login" });
  } else {
    return next();
  }
});

export default router;
