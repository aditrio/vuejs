import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from "../views/FoodDetail.vue"
import Keranjang from "../views/Keranjang.vue"
import Sukses from "../views/Sukses.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sukses',
    name: 'sukses',
    component: Sukses
  },
  {
    path: '/foods',
    name: 'Foods',
    component : Foods,
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component : Keranjang,
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component : FoodDetail,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // linkActiveClass: "active",
  linkExactActiveClass: "active",
 
  routes
})

export default router
