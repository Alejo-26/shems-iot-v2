import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ListDevices from "../views/ListDevices.vue";
import EVRegister from "../views/EvalRegister.vue";
import ConfortParameter from "../views/ConfortParameter.vue";
import ActivityToday from "../views/ActivityToday.vue";
import Summary from "../views/Summary.vue";
import Dashboard from "../views/UserApp.vue";
import Home from "../views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requireAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requireAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requireAuth: true },
    children: [
      {
        path: "list-devices",
        component: ListDevices,
        name: "listDevices",
        meta: { requireAuth: true },
      },
      {
        path: "confort-parameters",
        name: "confortParameters",
        component: ConfortParameter,
        meta: { requireAuth: true },
      },
      {
        path: "ev-registration",
        name: "evregistration",
        component: EVRegister,
        meta: { requireAuth: true },
      },

      {
        path: "activity-today",
        name: "activityToday",
        component: ActivityToday,
        meta: { requireAuth: true },
      },
      {
        path: "summary",
        name: "summary",
        component: Summary,
        meta: { requireAuth: true },
      },
      {
        path: "home-resume",
        name: "home",
        component: Home,
        meta: { requireAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Login" || to.name == "Register") {
    if (localStorage.getItem("auth") == "true") {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (to.meta.requireAuth) {
      if (localStorage.getItem("auth") == "false") {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
