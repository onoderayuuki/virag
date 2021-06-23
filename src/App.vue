<template>
  <div>
    <header class="header">
      <!-- <router-link to="/" class="header--link">Home</router-link> -->
      <!-- <router-link to="/about" class="header--link">About</router-link> -->
      <!-- <router-link to="/register" class="header--link" v-if="!isLoggedIn">新規登録</router-link> -->
        <router-link to="/login" class="header--link" v-if="!isLoggedIn">ログイン</router-link>
        <button type="button" @click="logout()" v-if="isLoggedIn">ログアウトする</button>
    </header>
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.commit('updateIdToken', null);
      this.$router.push('/login');
    }
  }
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: right;
}
.header a {
  width:100%;
  text-align: right;
}
.header--link {
  padding: 10px;
}
</style>
