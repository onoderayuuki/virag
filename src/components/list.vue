
<template>
  <div>
    <button id="list-bar"  @click="clickButton">■ ■<br>■ ■</button>
  <div id="list-container" v-show="showList">
    <a href="#" class="plusBox" @click="selectItem" id="test0">+</a>
    <a
      href="#"
      v-for="(item, key) in originalList"
      :key="key"
      @click="selectItem"
    >
      <img :id="key" :src="item" />
    </a>
  </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      showList:true,
      keys:[],
      originalList: {},
    };
  },
  created() {
    this.loadStrage();
  },
  methods: {
    clickButton(){
      this.showList = !this.showList; 
      this.loadStrage();
    },
    loadStrage(){
      this.keys = JSON.parse(localStorage.getItem('keys'));
      // console.log(this.keys);
      //base64の読み込み
      this.keys.map((strageKey) => {
      const strageObj = JSON.parse(localStorage.getItem(strageKey));
      if(strageObj!==null){
        this.originalList[strageKey] = strageObj.DataURL;
      }
    });
    },
    selectItem(event){
      this.showList=false;
      console.log(event.target.id);
      this.$emit("selectedKey", event.target.id);
    },
    copy(){
      //createKey and copyObj
      // this.keys.push('test0');
      localStorage.setItem("keys",JSON.stringify(this.keys));
    },
  }
};
</script>
<style>
#list-wrapper{
  /* text-align: left; */
  /* height:5000px; */
  /* width:100%; */
  /* background-color: beige; */
}
#list-container {
  position:absolute;
  top:0;
  left:0;
  z-index: 100;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: beige;
  color: burlywood;
  font-family: fantasy;
  width:100%;
  height:100%;
  padding-top:40px;
}
a {
  text-decoration: none;
  margin: 5px;
}
.plusBox {
  background-color: rgb(113, 155, 156);
  color: #fff9b0;
  font-size: 32px;
  font-weight: bold;
  width: 139px;
  height: 118px;
  padding-top:80px;
}
/* メニューバー */
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

#list-bar {
  position:absolute;
  top:3px;
  left:3px;
  z-index: 101;
  background-color: cadetblue;
  color: aliceblue;
  width:35px;
  height:40px;
  /* border-radius: 50%; */
  font-size: 15px;
  line-height: 15px;
  /* padding-left: 10px; */
}
</style>