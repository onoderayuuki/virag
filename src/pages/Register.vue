<template>
<div class="container">
  <h2>新規登録</h2>
  <form class="login-form">
    <div class="input-group">
      <label for="email">メールアドレス</label>
      <input type="email" id="email" v-model="email">
    </div>
    <div class="input-group">
      <label for="password">パスワード</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div class="input-group">
      <button type="button" @click="register()">新規登録</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from '../axios-for-auth.js';//axiosのインスタンスをインポート
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    register() {//axiosでapiを叩くメソッドを定義
      axios.post(
        '/accounts:signUp?key=AIzaSyA9YS-8VeXyZhvCob4-z5IhT1rUYOXXWIM',
        {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        }
      ).then((response) => {
        this.$store.commit('updateIdToken',response.data.idToken)
        this.$router.push('/');
        console.log(response);//返ってきたレスポンスをログに表示
      });
      this.email = "";
      this.password = "";
    }
  }
}
</script>