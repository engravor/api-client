<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                        <label for="email">Username</label>
                        <input type="email" v-model="username" class="form-control" name="email" placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block">Sign in</button>
                </form>
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
    login () {
      axios.post('https://minesweeper-api-cristian.herokuapp.com/auth', {
        username: this.username,
        password: this.password
      }).then((res) => {
        var token = 'JWT ' + res.data.access_token
        localStorage.setItem('usertoken', token)
        this.username = ''
        this.password = ''
        router.push({ name: 'Game' })
      }).catch((err) => {
        err
      })
    }
  }
}
</script>