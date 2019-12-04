import Vue from 'vue';
import Router from 'vue-router';
import Ping from './components/Ping.vue';
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Game from './components/Game.vue'
import Play from './components/Play.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    }    
  ],
});