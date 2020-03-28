import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/common/Main'

import AppHeader from '@/components/common/AppHeader'
import AppMenu from '@/components/common/AppMenu'

import AppFooter from '@/components/common/AppFooter'

import Welcome from '@/components/member/create/Welcome'
import MemberCreate from '@/components/member/create/MemberCreate'
import MemberLogin from '@/components/member/read/MemberLogin'
import ProfileUpdate from '@/components/member/update/ProfileUpdate'

import PostList from '@/components/post/list/PostList'
import PostCreate from '@/components/post/create/PostCreate'
import PostRead from '@/components/post/read/PostRead'
import PostUpdate from '@/components/post/update/PostUpdate'

import GalleryList from '@/components/gallery/list/GalleryList'

// import ArticleList from '@/components/article/list/ArticleList'
// import ArticleCreate from '@/components/article/create/ArticleCreate'
import ArticleRead from '@/components/article/read/ArticleRead'
// import ArticleUpdate from '@/components/article/update/ArticleUpdate'

import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/menu',
      name: 'AppMenu',
      component: AppMenu
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      alias: '/member',
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters

        if (isAuthorized) {
          alert('로그인한 상태에서는 접근할 수 없어요!')

          next({ name: 'Main' })
        }

        next()
      }
    },
    {
      path: '/member/register',
      name: 'MemberCreate',
      component: MemberCreate,
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters

        if (isAuthorized) {
          alert('로그인한 상태에서는 접근할 수 없어요!')

          next({ name: 'Main' })
        }

        next()
      }
    },
    {
      path: '/member/login',
      name: 'MemberLogin',
      component: MemberLogin,
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters

        if (isAuthorized) {
          alert('로그인한 상태에서는 접근할 수 없어요!')

          next({ name: 'Main' })
        }

        next()
      }
    },
    {
      path: '/member/profile',
      name: 'ProfileUpdate',
      component: ProfileUpdate,
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters

        if (!isAuthorized) {
          alert('로그인 안 한 상태에서는 접근할 수 없어요!')

          next({ name: 'MemberLogin' })
        }

        next()
      }
    },
    {
      path: '/article/:service/:number',
      name: 'ArticleRead',
      components: {
        header: AppHeader,
        default: ArticleRead,
        footer: AppFooter
      },
      props: {
        default: true
      }
    },
    {
      path: '/gallery/:service/list/:number',
      name: 'GalleryList',
      components: {
        header: AppHeader,
        default: GalleryList,
        footer: AppFooter
      },
      alias: '/article/:service/list/:number',
      props: {
        default: true
      }
    },
    {
      path: '/board/:service/list/:number',
      name: 'PostList',
      components: {
        header: AppHeader,
        default: PostList,
        footer: AppFooter
      },
      props: {
        default: true
      }
    },
    {
      path: '/board/:service/create',
      name: 'PostCreate',
      components: {
        header: AppHeader,
        default: PostCreate,
        footer: AppFooter
      },
      props: {
        default: true
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters

        if (!isAuthorized) {
          alert('로그인 안 한 상태에서는 접근할 수 없어요!')

          next({ name: 'MemberLogin' })
        }

        next()
      }
    },
    {
      path: '/board/:service/:number',
      name: 'PostRead',
      components: {
        header: AppHeader,
        default: PostRead,
        footer: AppFooter
      },
      props: {
        default: true
      }
    },
    {
      path: '/board/:service/:number/edit',
      name: 'PostUpdate',
      components: {
        header: AppHeader,
        default: PostUpdate,
        footer: AppFooter
      },
      props: {
        default: true
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters
        // console.log('[router/index.js] PostUpdate → store.getters: ', store.getters)

        if (!isAuthorized) {
          alert('로그인이 필요해요!')

          next({ name: 'MemberLogin' })
        }

        // console.log('[router/index.js] PostUpdate → to.params: ', to.params)

        store
          .dispatch('fetchPost', {
            category: to.params.service,
            number: to.params.number
          })
          .then(() => {
            // console.log('[router/index.js] PostUpdate → store.state.post: ', store.state.post)
            // console.log('[router/index.js] PostUpdate → store.state.user.id: ', store.state.user.id)

            const post = store.state.post[0]
            // console.log('[router/index.js] PostUpdate → post: ', post)

            const isAuthor = post.id === store.state.user.id

            if (isAuthor) {
              // console.log('[router/index.js] PostUpdate → 사용자가 일치합니다.')
              // console.log('[router/index.js] PostUpdate → isAuthor: ', isAuthor)

              next()
            } else {
              alert('게시물 작성자만 수정할 수 있어요!')

              next(false)
            }
          })
          .catch((error) => {
            // console.error(error)

            alert(error.response.data.msg)

            next(false)
          })
      }
    },
    {
      path: '/',
      name: 'Main',
      components: {
        header: AppHeader,
        default: Main,
        footer: AppFooter
      }
    }
  ]
})
