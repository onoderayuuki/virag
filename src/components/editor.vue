
<template>
  <main id="edit-container">
    <!-- menu ------------------------------------------------------------------------------------->
    <div id="menu">
      <div id="addArea" v-show="isShowAddArea">
        <img   
          v-for="(item, i) in itemList"
          :key="i"
          class="motif"
          :id="i"
          :src="item"
          @click="handleAddClick"
        />
      </div>
      <div id="buttonArea">
        <select v-model="sizeKey" @change="changeSize">
          <option v-for="(value, key) in sizeList" :key="key">
            {{ key }}
          </option>
        </select>
        <button id="toggleAddareaButton" @click="isShowAddArea = !isShowAddArea">+</button>
        <button id="undoButton" v-on:click="undo()">＜</button>
        <button id="redoButton" v-on:click="redo()">＞</button>
        <div>
        <button id="saveButton" v-on:click="save()">保存</button>
        <p id="saveMessage" v-show="isSaveMessage">/保存しました\</p>
        </div>
        <!-- {{ loadKey }} -> {{ saveKey }} -->
        <!-- historyStep: {{historyStep}} -->
      </div>
    </div>
    <!-- tool ------------------------------------------------------------------------------------->
    <div
      id="tool"
      v-show="isShowTool"
      :style="{ top: topValue + 'px', left: leftValue + 'px' }"
    >
      <div>
        <button id="deleteButton" @click="deleteMotif">×</button>
        <button id="inversionButton" @click="reverseMotif">↔︎</button>
        <button id="copyButton" @click="copyMotif">+</button>
        <!-- <button id="changeButton">...</button> -->
      </div>
    </div>
    <!-- canvas ------------------------------------------------------------------------------------->
    <v-stage
      class="stage"
      ref="stage"
      :config="stageConfig"
      @dragstart ="handleDragstart"
      @touchmove ="handleDragstart"
      @mouseup="handleTouchend"
      @touchend="handleTouchend"
    >
      <v-layer ref="layer">
        <v-image
          :config="backImage"
        />
        <v-image
          v-for="(config, index) in motifConfigs"
          :key="index"
          :config="config"
        />
        <v-transformer
          ref="transformer"
          :config="{
            resizeEnabled: false,
            flipEnabled: false,
            anchorSize:20,
            anchorCornerRadius: 1,
          }"
        />
      </v-layer>
    </v-stage>
  </main>
</template>

<script>
export default {
  name: "editor",
  props: {
    loadKey: String,
    saveKey: String,
  },
  data() {
    return {
      isShowAddArea: false,
      strageKey: "test0",
      stageConfig: null,
      // image: null,
      // selectedShapeName: "",
      selectedNode:null,
      isShowTool: false,
      isDragStart:false,
      isSaveMessage:false,
      topValue: 100,
      leftValue: 100,
      motifSrcs: [],
      motifConfigs: [],
      stage: null,
      backImage: null,
      backImageSrc: null,
      sizeKey: "",
      history:[],
      historyStep:0,
      sizeList: {
        はがき: {
          width: 228,
          height: 426,
        },
       '2L' : {
          width: 366,
          height: 513,
        },
        A5: {
          width: 426,
          height: 605,
        },
        B5: {
          width: 524,
          height: 740,
        },
        A4: {
          width: 605,
          height: 855,
        },
      },
      itemList: [
        "img/o1-1.png",
        "img/o1-2.png",
        "img/o1-3.png",
        "img/o1-4.png",
        "img/o1-5.png",
        "img/o1-6.png",
        "img/o2.png",
        "img/o3-1.png",
        "img/o3-2.png",
        "img/o4.png",
        "img/o5.png",
        "img/o6.png",
        "img/o7.png",
        "img/o8.png",
        "img/o9.png",
        "img/o10.png",
        "img/o11.png",
        "img/o12.png",
        "img/o13.png",
        "img/o14.png",
        "img/o15.png",
        "img/v1.png",
        "img/v2.png",
        "img/v3.png",
        "img/v4.png",
        "img/v5.png",
        "img/v6.png",
        "img/v7.png",
        "img/v8.png",
        "img/v9.png",
        "img/v10.png",
        "img/v11.png",
        "img/v12.png",
        "img/v13.png",
        "img/v14.png",
        "img/v15-1.png",
        "img/v15-2.png",
        "img/v15-3.png",
        "img/v15.png",
        "img/v16.png",
        "img/vl1.png",
        "img/vl2.png",
        "img/vl3.png",
        "img/vl4.png",
        "img/vl5.png",
        "img/vl6.png",
        "img/vl7.png",
        "img/vl8.png",
        "img/vl9.png",
        "img/vl10.png",
        "img/mm1-mi.png",
        "img/mm1-sm.png",
        "img/mm2-la.png",
        "img/mm2-mi.png",
        "img/mm2-sm.png",
        "img/mm3-la.png",
        "img/mm3-sm.png",
        "img/mm4-p.png",
        "img/mm4.png",
        "img/mm5-la.png",
        "img/mm5-me.png",
        "img/mm5-mi.png",
        "img/mm5-sm-1.png",
        "img/mm5-sm-2.png",
        "img/mm5-sm-bl.png",
        "img/mm5-sm-r.png",
        "img/mm6-1.png",
        "img/mm6-2.png",
        "img/mm6-3.png",
        "img/mm6-l-1.png",
        "img/mm6-l-2.png",
        "img/mm6-l-3.png",
        "img/mm6-r-1.png",
        "img/mm6-r-2.png",
        "img/mm6-r-3.png",
        "img/mm7-l.png",
        "img/mm7-r.png",
        "img/mm7.png",
        "img/mm8-la-1.png",
        "img/mm8-la-2.png",
        "img/mm8-sm-1.png",
        "img/mm8-sm-2.png",
        "img/mm8-sm-3.png",
        "img/s1.png",
        "img/s2.png",
        "img/s3.png",
        "img/s4.png",
        "img/s5.png",
        "img/s6.png",
        "img/s7.png",
        "img/s8.png",
        "img/s9.png",
      ],
      lastCenter:null,
      lastDist:0,
    };
  },
  created() {
    this.load();
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();
    this.deselectMotif();
  },
  watch: {
    loadKey() {
      this.load();
      this.deselectMotif();
    },
  },
  methods: {
    load() {
      const strageObj = JSON.parse(localStorage.getItem(this.loadKey));
      this.sizeKey = strageObj.sizeKey;
      this.stageConfig = strageObj.stageConfig;
      this.backImageSrc = strageObj.backImageSrc;
      this.setBack();
      this.motifSrcs = strageObj.motifSrcs;
      const json = strageObj.motifConfigs;
      this.motifConfigs = [];
      this.motifSrcs.map((value, i) => {
        const image = new window.Image();
        image.src = value;
        image.onload = () => {
          this.motifConfigs.push({
            image,
            x: json[i].x,
            y: json[i].y,
            rotation: json[i].rotation,
            scaleX:json[i].scaleX,
            name: "test" + this.motifConfigs.length,
            draggable: false,
          });
        };
      });
    },
    save() {
      this.deselectMotif();
      const scale = 1 / 4;
      const saveObj = {
        sizeKey: this.sizeKey,
        stageConfig: this.stageConfig,
        backImageSrc: this.backImageSrc,
        motifConfigs: this.motifConfigs,
        motifSrcs: this.motifSrcs,
        DataURL: this.stage.toDataURL({ pixelRatio: scale }),
      };
      localStorage.setItem(this.saveKey, JSON.stringify(saveObj));
      this.isSaveMessage = true;
      setTimeout(()=>{this.isSaveMessage = false;},1000)
    },
    undo(){
      if(this.historyStep === 0){
        return;
      }
      this.historyStep -= 1
      this.loadHistory(this.historyStep);
    },
    redo(){
      if(this.historyStep === this.history.length-1){
        return;
      }
      this.historyStep += 1
      this.loadHistory(this.historyStep);
    },
    loadHistory(historyStep){
      this.deselectMotif();
      const previous = this.history[historyStep];
      this.motifConfigs = previous;
    },
    recordConfigs(){
      console.log('recordConfigs');
      if(this.history.length > 10){
        this.history.shift(); 
      }
      const nowCnfigs = this.motifConfigs.map((el)=>{
        const addedMotif =  this.stage.findOne("." + el.name);
        return addedMotif.getAttrs();
      });
      this.history.push(nowCnfigs);
      console.log(this.history.length);
      this.historyStep = this.history.length-1;
      this.motifConfigs = nowCnfigs;
    },
    setBack() {
      const image = new window.Image();
      image.src = this.backImageSrc;
      image.onload = () => {
        this.backImage = {
        image,
        name: 'back'
        }
      };
    },
    changeSize() {
      this.stageConfig = this.sizeList[this.sizeKey];
    },
    deleteMotif() {
      this.deselectMotif();
      this.selectedNode.destroy();
    },
    reverseMotif() {
      const direction= this.selectedNode.getAttr('scaleX')
      this.selectedNode.scaleX( direction*-1 );
      const width = this.selectedNode.getAttr('width');
      this.selectedNode.move({x : width*direction , y : 0 }) ;
    },
    copyMotif() {
      const attr = this.selectedNode.getAttrs()
      console.log(attr.image.src);
      this.addMotif(attr.image.src,attr.x+15,attr.y+15,attr.scaleX,attr.rotation);
    },
    addMotif(addSrc, x= 10, y = 10, scaleX=1, rotation =0) {
      this.motifSrcs.push(addSrc);
      const addName = "test" + this.motifConfigs.length;
      const image = new window.Image();
      image.src = addSrc;
      image.onload = () => {
        this.motifConfigs.push({
          image,
          x: x,
          y: y,
          scaleX: scaleX,
          rotation: rotation,
          name: addName,
          draggable: false,
        });
      };
    },
    handleAddClick(e){
      const addSrc = this.itemList[e.target.id];
      this.addMotif(addSrc,Math.random()*100);
      this.recordConfigs();
    },
    handleTouchend(e){
      console.log('handleTouchend');
      //ピンチズームの初期化
      this.lastDist = 0;
      this.lastCenter = null;
      //ドラッグ後であればドラッグ終了
      if(this.isDragStart){
          this.handleDragend();
          return;
      }
      //選択対象がない時も何もしない
      if (e.target === e.target.getStage()) {
        return;
      }
      const name = e.target.name();
      const isMotif = this.motifConfigs.find((r) => r.name === name);
        //モチーフ以外（背景画像）を選んだ場合も何もしない
      if (isMotif == null) {
          return;
      }
      if(this.selectedNode == null ){
        //選択状態のモチーフがなく、タッチ対象がモチーフだった時だけ選択状態にする 
        this.selectedNode = this.stage.findOne("." + name);
        this.selectMotif();
      } else {
        //それ以外は選択解除
        this.deselectMotif();
        this.selectedNode = null;
      }
    },
    selectMotif() {
      const transformerNode = this.$refs.transformer.getNode();
      if (this.selectedNode === transformerNode.node()) {
        return;
      }
      transformerNode.nodes([this.selectedNode]);
      this.selectedNode.draggable(true);
      this.moveTool(this.selectedNode.getAttr('x'),this.selectedNode.getAttr('y'));
      this.isShowTool = true;
    },
    deselectMotif(){
      const transformerNode = this.$refs.transformer.getNode();
      transformerNode.nodes([]);
      if(this.selectedNode != null){
        this.selectedNode.draggable(false);
      }
      this.isShowTool = false;
    },
    handleDragstart(e) {
      // console.log('handleDragstart');
        console.log(e.evt.touches.length);
        e.evt.preventDefault();
      if(e.target.getAttr('draggable')){
        this.isShowTool = false;
        this.isDragStart = true;
      }else if(e.evt.touches.length>=2){
        // console.log(e.target);
        // const touch1 = e.evt.touches[0];
        // let touch2 = e.evt.touches[1];
        this.getMultiTouchOnStage(e.evt.touches[0],e.evt.touches[1]);
      }
    },
    handleDragend() {
      if(this.isDragStart){
        // this.updateMenu(this.selectedNode.x,this.selectedNode.y);
        this.isShowTool = true;
        this.isDragStart = false;
        this.moveTool(this.selectedNode.getAttr('x'),this.selectedNode.getAttr('y'));
        this.recordConfigs();
      }
    },
    moveTool(x,y) {
      //menu point
      this.leftValue = x - 5;
      this.topValue = y + 25;
    },
    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      },
    getCenter(p1, p2) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    },
    getMultiTouchOnStage(touch1,touch2){
        if (touch1 && touch2) {
          // if the stage was under Konva's drag&drop
          // we need to stop it, and implement our own pan logic with two pointers
          if (this.stage.isDragging()) {
            this.stage.stopDrag();
          }
          const P1 = {
            x: touch1.clientX,
            y: touch1.clientY,
          };
          const P2 = {
            x: touch2.clientX,
            y: touch2.clientY,
          };

        // console.log(P1,P2);

          if (!this.lastCenter) {
            this.lastCenter = this.getCenter(P1, P2);
            return;
          }
          const newCenter = this.getCenter(P1, P2);
          const dist = this.getDistance(P1, P2);

          if (!this.lastDist) {
            this.lastDist = dist;
          }

          // local coordinates of center point
          const pointTo = {
            x: (newCenter.x - this.stage.x()) / this.stage.scaleX(),
            y: (newCenter.y - this.stage.y()) / this.stage.scaleX(),
          };

          const scale = this.stage.scaleX() * (dist / this.lastDist);

          this.stage.scaleX(scale);
          this.stage.scaleY(scale);

        // console.log(scale);

          // calculate new position of the stage
          const dx = newCenter.x - this.lastCenter.x;
          const dy = newCenter.y - this.lastCenter.y;

          let newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          this.stage.position(newPos);

          this.lastDist = dist;
          this.lastCenter = newCenter;
        }
    },
  },
};
</script>
<style>

#edit-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  margin: 15px;
  width: 100%;
}
#menu {
  position: sticky;
  /* top:0px; */
  /* left:0px; */
  width: 90%;
  z-index: 99;
}
#addArea {
  /* position: absolute; */
  background-color: beige;
  width: 100%;
  height: 300px;
  overflow: scroll;
  border-radius: 2%;
  /* z-index: 99;   */
}
#addArea>div{
  width:100px;
}
.motif{
  transform: scale(0.5,0.5);
  /* margin-right:-30px; */
  /* margin-right:-80px; */
}

#buttonArea {
  /* position:sticky; */
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
  /* margin-left: 100px; */
  /* z-index: 99; */
}
select{
  height: 30px;
}
#toggleAddareaButton {
  padding: 5px 20px;
  height: 30px;
  color: 660000;
  font-size: 20px;
  background-color: beige;
  border-radius: 5% 5% 25% 25%;
  /* margin: 5px 10px 0px 10px; */
}
#saveButton {
  padding: 0px 10px;
  height: 30px;
  color: beige;
  background-color:#660000;
  border-radius: 5%;
  /* margin: 0px 5px 0px 20px; */
}
#undoButton,#redoButton {
  padding: 0px 5px;
  height: 30px;
  color: 660000;
  /* background-color: cadetblue; */
  border-radius: 5%;
  border:1px solid  #660000;
  /* margin: 0px 5px 0px 20px; */
}
#saveMessage {
  color: #660000;
  font-size: 10px;
  margin-left: -10px;
}
#tool {
  position: absolute;
  z-index: 98;
  width: 30px;
  /* box-shadow: 0 0 5px grey; */
  /* border-radius: 50%; */
}
#tool button {
  width: 100%;
  height: 30px;
  color: white;
  font-size: 18px;
  border: none;
  margin: 2px 0;
  border-radius: 50%;
  text-align: center;
}
#deleteButton {
  background-color: rgb(255, 51, 0, 0.9);
}
#inversionButton {
  background-color: rgba(0, 204, 255, 0.9);
}
#copyButton {
  background-color: rgba(255, 230, 0, 0.9);
}
#changeButton {
  background-color: rgb(0, 255, 98, 0.9);
}
</style>