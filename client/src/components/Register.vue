<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <div class="form-group">
            <label for="username">Email Address</label>
            <input type="email" v-model="username" class="form-control" name="username" placeholder="Enter Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
          </div>
          <button class="btn btn-lg btn-primary btn-block">Register</button>
        </form>
        <p>
          If you are already registered
          <router-link :to="{ path: '/login' }">Sign in</router-link>
        </p>
        
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('https://minesweeper-api-cristian.herokuapp.com/register', {
        username: this.username,
        password: this.password
      }).then((res) => {
        res
        router.push({ name: 'Login' })
      }).catch((err) => {
        err
      })
    }
  }
}
</script>