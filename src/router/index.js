import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path: '/vip-user',
    component: Layout,
    redirect: '/vip-table/user-table',
    name: 'vip',
    meta: {
      title: '小二工作',
      icon: 'people',
      roles: ['waiter']
    },
    children: [
      {
        path: '/vip-user-import',
        component: () => import('@/views/vip-table/import-vip'),
        name: 'vip-user-import',
        meta: { title: 'VIP用户导入', roles: ['waiter'] }
      },
      {
        path: '/vip-user-lists',
        component: () => import('@/views/vip/user-list'),
        name: 'user-list',
        meta: { title: 'VIP用户总表', roles: ['waiter'] }
      },
      // {
      //   path: '/vip-user-list',
      //   component: () => import('@/views/vip-table/user-table'),
      //   name: 'vip-user-list',
      //   meta: { title: 'VIP用户待联系', roles: ['waiter'] }
      // }
    ]
  },
  {
    path: '/vip-admin-user',
    component: Layout,
    redirect: '/vip-admin-table/user-admin-table',
    name: 'vip',
    meta: {
      title: 'VIP用户管理',
      icon: 'people',
      roles: ['housekeeper']
    },
    children: [
      {
        path: '/vip-user-list',
        component: () => import('@/views/vip/user-list'),
        name: 'user-list',
        meta: { title: 'VIP用户总表', roles: ['housekeeper'] }
      },
      {
        path: '/vip-not-active',
        component: () => import('@/views/vip/vip-not-active'),
        name: 'vip-not-active',
        meta: { title: '未激活VIP用户', roles: ['housekeeper'] }
      },
      {
        path: '/vip-activated',
        component: () => import('@/views/vip/vip-activated'),
        name: 'vip-activated',
        meta: { title: '已激活VIP用户', roles: ['housekeeper'] }
      },
      {
        path: '/vip-abandoned',
        component: () => import('@/views/vip/vip-abandoned'),
        name: 'vip-abandoned',
        meta: { title: '已放弃VIP用户', roles: ['housekeeper'] }
      },
      {
        path: '/vip-finished',
        component: () => import('@/views/vip/vip-finished'),
        name: 'vip-finished',
        meta: { title: '已完成VIP用户', roles: ['housekeeper'] }
      },
    ]
  },
  {
    path: '/housekeeper',
    component: Layout,
    redirect: '/housekeeper/report-list',
    name: 'housekeeper',
    meta: {
      title: '管家工作',
      icon: 'peoples',
      roles: ['housekeeper']
    },
    children: [
      {
        path: '/view-reports',
        component: () => import('@/views/housekeeper/view-reports'),
        name: 'view-reports',
        hidden: true,
        meta: { title: '查看报告', roles: ['housekeeper'] }
      },
      {
        path: '/to-be-contacted',
        component: () => import('@/views/housekeeper/to-be-contacted'),
        name: 'to-be-contacted',
        meta: { title: 'VIP用户待首访', roles: ['housekeeper'] }
      },
      {
        path: '/errUser',
        component: () => import('@/views/housekeeper/errUser'),
        name: 'errUser',
        meta: { title: '手机号不匹配VIP用户', roles: ['housekeeper'] }
      },
      {
        path: '/72hour',
        component: () => import('@/views/housekeeper/72hour'),
        name: '72hour',
        meta: { title: '72小时训练信息收集', roles: ['housekeeper'] }
      },
      {
        path: '/48hour',
        component: () => import('@/views/housekeeper/48hour'),
        name: '48hour',
        meta: { title: '48小时训练排期提醒', roles: ['housekeeper'] }
      },
      // {
      //   path: '/task-tracking',
      //   component: () => import('@/views/housekeeper/task-tracking'),
      //   name: 'task-tracking',
      //   meta: { title: '训练任务追踪', roles: ['housekeeper'] }
      // },
      {
        path: '/report-sending',
        component: () => import('@/views/housekeeper/report-sending'),
        name: 'report-sending',
        meta: { title: '训练报告发送', roles: ['housekeeper'] }
      },
      // {
      //   path: '/user-list',
      //   component: () => import('@/views/housekeeper/user-list'),
      //   name: 'user-list',
      //   meta: { title: 'VIP用户列表', roles: ['housekeeper', 'nurse'] }
      // },
      // {
      //   path: '/to-be-coaching',
      //   component: () => import('@/views/housekeeper/to-be-coaching'),
      //   name: 'to-be-contacted',
      //   meta: { title: 'VIP用户待Coaching', roles: ['housekeeper'] }
      // },
      // {
      //   path: '/report-list',
      //   component: () => import('@/views/housekeeper/report-list'),
      //   name: 'report-list',
      //   meta: { title: 'VIP报告列表', roles: ['housekeeper'] }
      // },
      
      {
        path: '/user-archiving',
        component: () => import('@/views/housekeeper/user-archiving'),
        name: 'user-archiving',
        hidden: true,
        meta: { title: 'VIP用户建档', roles: ['housekeeper'] }
      },
      {
        path: '/bloodSugarInfo',
        component: () => import('@/views/housekeeper/bloodSugarInfo'),
        name: 'bloodSugarInfo',
        hidden: true,
        meta: { title: '记录血糖信息', roles: ['housekeeper'] }
      }

    ]
  },
  {
    path: '/task-table',
    component: Layout,
    meta: { title: '护士工作', icon: 'list', roles: ['nurse'] },
    children: [
      {
        path: '/nurse-user-lists',
        component: () => import('@/views/vip/user-list'),
        name: 'user-list',
        meta: { title: 'VIP用户总表', roles: ['nurse'] }
      },
      {
        path: 'first-task',
        component: () => import('@/views/task/first-task'),
        name: 'first-task',
        meta: { title: '首次训练', roles: ['nurse'] }
      },
      {
        path: 'task-table',
        component: () => import('@/views/task/task-table'),
        name: 'task-table',
        meta: { title: '回访训练', roles: ['nurse'] }
      },
      {
        path: '/task-details',
        component: () => import('@/views/task/task-details'),
        name: 'task-details',
        hidden: true,
        meta: { title: '任务详情', roles: ['nurse'] }
      },
    ]
  },
  {
    path: '/dataAdmin',
    component: Layout,
    meta: { title: '后台管理', icon: 'icon' },
    children: [
      {
        path: 'dataAdmin',
        component: () => import('@/views/dataAdmin/dataAdmin'),
        name: 'dataAdmin',
        meta: { title: '数据维护'}
      },
      {
        path: 'report-download',
        component: () => import('@/views/dataAdmin/report-download'),
        name: 'report-download',
        meta: { title: '报表下载'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
