import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import store from '../store'; //追記

Vue.use(VueRouter)

// const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  
// ]

// const router = new VueRouter({
//   routes
// })

// export default router

export default new VueRouter({
  mode: "history",
  routes: [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login, },
  { path: '/register', 
    component: Register,
    beforeEnter(to, from, next) {//追記
      if (store.getters.idToken) {//すでにidTokenがあれば、"/"に飛ばす
        next("/");
      } else {//なければそのまま"/register"に
        next();
      }
    },
   },
  ]
});