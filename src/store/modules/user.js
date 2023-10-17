import storage from 'store'
import { login, logout, getPermission } from '@/api/login'
// import { getUser } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            if (response.code === 200) {
              const result = response
              storage.set(ACCESS_TOKEN, result.data, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.data)
              commit('SET_ROLES', [])
              resolve()
            } else {
              reject(response)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    GetPermission ({ commit }) {
      return new Promise((resolve, reject) => {
        getPermission()
          .then((response) => {
            const result = response
            // TODO: 登录
            const data = result.data
            const role = {}
            if (data && data.length > 0) {
              const pList = []
              // 提供展示->树转换
              const pListForTree = []
              for (const permission of data) {
                if (permission.type && permission.status === 'ENABLED' && permission.permExpression) {
                  pList.push(permission.permExpression.replace(/:/g, '-'))
                  pListForTree.push({
                    title: permission.name.replace(/:/g, '-'),
                    key: permission.permExpression.replace(/:/g, '-')
                  })
                  const actionList = []
                  data.forEach((per) => {
                    if (per.type === 'API' && per.permExpression.split(':')[0] === permission.permExpression) {
                      actionList.push(per.permExpression.replace(/:/g, '-'))
                    }
                  })
                  permission.actionList = actionList
                } else {
                  continue
                }
              }
              role.permissionList = pList
              role.permissionListForTree = pListForTree
              role.permissions = data.filter((item) => item.type === 'PAGE')
              commit('SET_ROLES', role)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            resolve(role)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // GetUserInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getUser()
    //       .then((res) => {
    //         //
    //         if (res.code === 200 && res.data) {
    //           commit('SET_NAME', { name: res.data.username, welcome: welcome() })
    //           commit('SET_AVATAR', res.data.avatar)
    //           commit('SET_INFO', res.data)
    //           resolve(res)
    //         } else {
    //           reject(new Error('getUser: fail'))
    //         }
    //       })
    //       .catch((err) => {
    //         reject(err)
    //       })
    //   })
    // },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token)
          .then(() => {
            storage.remove(ACCESS_TOKEN)
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            resolve()
          })
          .catch(() => {
            storage.remove(ACCESS_TOKEN)
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            resolve()
          })
          .finally(() => {})
      })
    }
  }
}

export default user
