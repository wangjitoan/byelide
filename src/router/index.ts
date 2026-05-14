import { createRouter, createWebHistory  } from 'vue-router'

import { defineAsyncComponent   } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/dataSource'
    },

    {
      path:'/app/dataSource',
      name:'dataSource',
      component:defineAsyncComponent(() => import('../views/dataSourceView.vue'))
    },
    {
      path:'/app/actions',
      name:'actions',
      component:defineAsyncComponent(() => import('../views/actionsView.vue'))
    },
    {
      path:"/app/layout",
      name:'layout',
      component:defineAsyncComponent(() => import('../views/layoutView.vue'))
    }
  ],
})

export default router
