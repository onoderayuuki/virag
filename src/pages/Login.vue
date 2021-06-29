<template>
<div class="container">
  <h2>ログイン</h2>
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
      <button type="button" @click="login()">送信</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from '../axios-for-auth.js'; //axiosのインスタンスをインポート
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  }, 
  methods: {
    login() {//axiosでログイン用のインスタンスにアクセスするメソッドを定義
      axios.post( //エンドポイントのURLがログイン用のものを使う
        '/accounts:signInWithPassword?key=AIzaSyA9YS-8VeXyZhvCob4-z5IhT1rUYOXXWIM',
        {
          email: this.email,//送る情報は新規登録と同じ
          password: this.password,
          returnSecureToken: true
        }
      ).then((response) => {
        this.$store.commit('updateIdToken',response.data.idToken);
        this.$store.commit('updateLocalId',response.data.localId);
         
        let str =  response.data.email;
        let userName= str.substring(0, str.indexOf('@'));
        // console.log(userName);
        this.$store.commit('updateUserName',userName);
        this.$router.push('/');
        // console.log(r/sponse); 
      });
      this.email = "";
      this.password = "";
    }
  }
}
</script>

<style>
.input-group {
  margin: 5px;
}
</style>