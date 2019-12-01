import { asyncRoutes, constantRoutes } from '@/router'

import store from '../../store'
import Cookies from 'js-cookie'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // console.log(filterAsyncRoutes(asyncRoutes, roles[0]))
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        let arr = []
        let curNum = store.state.user.num != 0?store.state.user.num:Cookies.get('num')
        // if(curNum != 0 ){
          asyncRoutes.forEach((item,index) => {
            if(item.meta && item.meta.roles){ //是否有权限
              if(item.meta.roles.includes(roles[0])){ //第一级
                item.hidden = false
                arr.push(item)
                let secondChild = item.children
                  if(secondChild.length>0){
                    let nowSecond = [];
                    secondChild.forEach((second_item)=>{
                      if(second_item.meta && second_item.meta.roles){
                        if(second_item.meta.roles.includes(roles[0])){ //第二级
                          nowSecond.push(second_item);
                        }
                      }
                    })
                    arr[index].children = nowSecond;
                  }
              }else{
                item.hidden = true
                arr.push(item)
              }
            }
          })
          // console.log(arr)
          accessedRoutes = arr
          // accessedRoutes = [asyncRoutes[curNum - 1]] || []
          // accessedRoutes.push(asyncRoutes[3])
        // }
        // console.log(accessedRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
