<template>
  <div>
    <header class="header">
      <!-- <router-link to="/" class="header--link">Home</router-link> -->
      <!-- <router-link to="/about" class="header--link">About</router-link> -->
      <!-- <router-link to="/register" class="header--link" v-if="!isLoggedIn">新規登録</router-link> -->
        <router-link to="/login" class="header--link" v-if="!isLoggedIn">
        login
        </router-link>
        <div class="header--link" v-if="isLoggedIn">{{ user }}</div>
        <!-- <button class="header--link" type="button" @click="logout()" v-if="isLoggedIn">logout</button> -->
    </header>
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  computed: {
    user(){
      return this.$store.getters.userName;
    },
    localId() {
      return this.$store.getters.localId;
    },
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
.header--link {
  z-index: 999;
  margin-top:0;
  margin-left: 87%;
  display: block;
  background: #660000;
  padding: 5px 10px;
  color: beige;
  font-family: fantasy;
  font-size: 15px;
  border-radius: 45%;
  /* width:100%; */
  /* text-align: right; */
}

</style>
