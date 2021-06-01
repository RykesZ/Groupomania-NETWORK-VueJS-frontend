import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fil',
    name: 'Fil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Fil.vue'),
    children: [
      {
        path: '/publication/:id',
        component: () => import('@/components/Frames/Publication.vue')
      }
    ]
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('@/views/Profil.vue')
  },
  {
    path: '/create',
    name: 'CreatePublication',
    component: () => import('@/views/CreatePublication.vue')
  },
  {
    path: '/modify',
    name: 'ModifyPublication',
    component: () => import('@/views/ModifyPublication.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
