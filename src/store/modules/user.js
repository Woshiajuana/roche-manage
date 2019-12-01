import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, removeNum } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  num: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NUM: (state, num) => {
    state.num = num
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { Data } = response
        commit('SET_TOKEN', Data)
        commit('SET_NUM', response.GroupId)
        Cookies.set('num', response.GroupId)
        setToken(Data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   debugger
      //   const { data } = response
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { roles, name, avatar, introduction } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_INTRODUCTION', introduction)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      // 小二 waiter 1
      // 管家 housekeeper 2
      // 护士 nurse 3
      // 管理员 admin 4
      // VIP用户管理 vip 5
      const num = state.num ? state.num : Cookies.get('num')
      
      let rolsStr = ''
      let name = '';
      if(num == 1){
        rolsStr = 'waiter'
        name = '小二'
      }else if(num == 2){
        rolsStr = 'housekeeper'
        name = '管家'
      }else if(num == 3){
        rolsStr = 'nurse'
        name = '护士'
      }else if(num == 4){
        rolsStr = 'admin'
        name = '管理员'
      }else if(num == 5){
        rolsStr = 'vip'
        name = 'VIP用户管理'
      }
      let datas = {
        roles: [rolsStr],
        introduction: '我是' + name + '角色',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: name
      }
      commit('SET_ROLES', datas.roles)
      commit('SET_NAME', datas.name)
      commit('SET_AVATAR', datas.avatar)
      commit('SET_INTRODUCTION', datas.introduction)
      resolve(datas)
    })
  },

  getNum({ commit, state }) {
    return new Promise((resolve, reject) => {
      let data = {num:state.num}
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeNum()
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeNum()
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
