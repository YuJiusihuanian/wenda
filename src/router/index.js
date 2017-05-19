import Vue from 'vue'
import Router from 'vue-router'
import Index from '../Index'
Vue.use(Router);

// const Index = resolve => require(['../Index.vue'], resolve);
const Home = resolve => require(['../views/Home.vue'], resolve);
const Publish = resolve => require(['../views/Publish.vue'], resolve);
const Message = resolve => require(['../views/Message.vue'], resolve);
const More = resolve => require(['../views/More.vue'], resolve);
const Topic = resolve => require(['../views/Topic.vue'], resolve);

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path:'/topic/:id',
      name:'Topic',
      component: Topic
    },
    {
      path:'*',
      component:Home
    }
  ]
})
