import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/App.vue'
import Main from '../components/main.vue'
import UserList from '../components/userlist.vue'
import Intro from '../components/intro.vue'
import AddUser from '../components/addUser.vue'
import GoodsAdd from '../components/goodsadd.vue'
import GoodsList from '../components/goodslist.vue'
import Echarts from '../components/echarts.vue'
import Echarts1 from '../components/echarts2.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/list',
      children: [
      	{
      		path: '/list',
      		name: 'Main',
      		component: Main,
      		redirect: '/intro',
      		children: [

      			{
      				path: '/intro',
      				name: 'intro',
      				component: Intro
      			},
      			{
      				path: '/userlist',
      				name: 'userlist',
      				component: UserList
      			},
            {
              path: '/adduser',
              name: 'adduser',
              component: AddUser
            },
            {
              path: '/goodsadd',
              name: 'goodsadd',
              component: GoodsAdd
            },
            {
              path: '/goodslist',
              name: 'goodslist',
              component: GoodsList
            },
            {
              path: '/echarts',
              name: 'echarts',
              component: Echarts
           },
            {
              path: '/echarts2',
              name: 'echarts2',
              component: Echarts1
           }
      			
      		]
      	}
      ]
    }
  ]
})
