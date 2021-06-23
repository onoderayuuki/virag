<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <div>selectedKey:{{ selectedKey }}</div> -->
    <list @selectedKey='selectedKey = $event'/>
    <editor :loadKey='selectedKey' :saveKey='saveKey' />
  </div>
</template>

<script>
import list from './components/list.vue'
import editor from './components/editor.vue'
export default {
  name: 'App',
  components: {
    list,
    editor
  },
  data(){
    return{
      initKey:'test0',
      selectedKey:'test0',
      newKey:'',
      keys:[],
    }
  },
  created(){
    this.initStrage();
    this.fitKeys();
    this.createNewKey();
  },
  computed:{
    saveKey: function(){
      if(this.selectedKey==this.initKey){
        return this.newKey;
      }else{
        return this.selectedKey;
      }
    }
  },
  methods:{
    initStrage(){
      const strageKeys = localStorage.getItem('keys');
      if(strageKeys !== null){
        this.keys = JSON.parse(strageKeys);
      }
      if(this.keys.includes(this.initKey)){
        return;
      }else{
        this.keys.push(this.initKey);
        const newObj = {
          "sizeKey":"A5"
          ,"stageConfig":{"width":559,"height":794}
          ,"backImageSrc":"img/back_A3.png"
          ,"motifConfigs":[]
          ,"motifSrcs":[]
          ,"DataURL":""
        };
        localStorage.setItem(this.initKey, JSON.stringify(newObj));
        localStorage.setItem("keys",JSON.stringify(this.keys));
      }
    },
    createNewKey(){
      this.newKey = 'test'+this.keys.length;
      this.keys.push(this.newKey);
      localStorage.setItem("keys",JSON.stringify(this.keys));
    },
    fitKeys(){
      const newKeyList  =[];
      this.keys.map((key)=>{
        const isExist =localStorage.getItem(key);
        // console.log(isExist);
          if(isExist !== null){
            newKeyList.push(key);
          }
      });
      // console.log(newKeyList);
      this.keys = newKeyList;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width:100%;
}
</style>
