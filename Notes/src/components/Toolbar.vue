<template>
  <div id="toolbar" :style="{backgroundColor:activeColor}">
    <router-link to="/notelist/editor" style="color:#767676;">
       <i @click="addOne" class="glyphicon glyphicon-plus"></i>
    </router-link>
    <i @click="toggleFavorite" class="glyphicon glyphicon-heart" :class="{starred:value.favorite}"></i>
    <i @click="deleteAll" class="glyphicon glyphicon-trash"></i>
    <i @click="changeBg ; show = !show" class="glyphicon glyphicon-th changeBg"></i>
    <i @click="showHistory = !showHistory" class="glyphicon glyphicon-time"></i>

    <router-link to="/notelist" :style="{display:display}">
        <i class="glyphicon_color glyphicon glyphicon-home"></i>
    </router-link>


    <transition name="hide">
        <div class="bgColor" v-if="show">
          <p>背景颜色切换</p>
           <div class="bg_li" @click="color_1" ><div class="color_1"></div><span>#f6f5ec</span></div>
           <div class="bg_li" @click="color_2" ><div class="color_2"></div><span>#feeeed</span></div>
           <div class="bg_li" @click="color_3" ><div class="color_3"></div><span>#cde6c7</span></div>
           <div class="bg_li" @click="color_4" ><div class="color_4"></div><span>#E0EEE0</span></div>
           <div class="bg_li" @click="color_5" ><div class="color_5"></div><span>#FFFFFF</span></div>
           <div class="bg_li" @click="color_6" ><div class="color_6"></div><span>#4F4F4F</span></div>
        </div>
    </transition>
    <transition name="hide">
        <div class="history" v-if="showHistory">
          <p>历史删除</p>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show: false,
      showHistory: false,
      activeColor: localStorage.getItem("color"),
      display: "none",
    }
  },
  computed:{
    activeNote(){
      return this.$store.getters.activeNote
    },
    value(){
      return this.$store.getters.value
    }
  },
  methods:{
    addOne(){
      //通过dispatch分发到actions中进行处理
      this.$store.dispatch('addNote')
    },
    toggleFavorite(){
      this.$store.dispatch('toggleFavorite')
    },
    deleteAll(){
      this.$store.dispatch('deleteAll')
    },
    changeBg(){
      this.$store.dispatch('changeBg')
    },
    color_1(e){
      localStorage.setItem("color", "#F5F5F5" )
      this.activeColor = "#F5F5F5"
      this.$store.dispatch('backgroundColor')
      this.show = false
    },
    color_2(){
      localStorage.setItem("color", "#fedcbd  " )
      this.activeColor = "#fedcbd "
      this.$store.dispatch('backgroundColor')
      this.show = false
    },
    color_3(){
      localStorage.setItem("color", "#cde6c7" )
      this.activeColor = "#cde6c7"
      this.$store.dispatch('backgroundColor')
      this.show = false
    },
    color_4(){
      localStorage.setItem("color", "#E0EEE0" )
      this.activeColor = "#E0EEE0"
      this.$store.dispatch('backgroundColor')
      this.show = false
    },
    color_5(){
      localStorage.setItem("color", "#30414a" )
      this.activeColor = "#30414a"
      this.$store.dispatch('backgroundColor')
      this.show = false
    },
    color_6(){
      localStorage.setItem("color", "#2E2E2E" )
      this.activeColor = "#2E2E2E"
      this.$store.dispatch('backgroundColor')
      this.show = false
    }
  },
  watch:{
    $route(to){
        if(to.path == '/notelist/editor'){
            this.display = "block"
        }else if(to.path == '/notelist'){
            this.display = "none"
        }
    }
  }
}
</script>
<style>
#toolbar {
  float: left;
  max-width: 40px;
  height: 100%;
  background-color: #30414a;
  padding: 35px 25px 25px 10px;
  color: #767676;
}

#toolbar i {
  font-size: 20px;
  margin-bottom: 35px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

#toolbar i:hover {
  opacity: 1;
}

#toolbar a:active .#toolbar a :hover{
  text-decoration: none;
  color: #767676;
}

.starred {
  color: #F7AE4F;
}

.bgColor{
  width: 200px;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 40px;
  text-align: center;
  z-index: 100;
  color: #fff;
}

.bgColor p{
  margin-top: 70%;
  font-size: 16px;
  font-weight: 100;
}

.bgColor ul{
  padding: 0;
}

.bg_li{
  border:1px solid #aaa;
  width: 100px;
  margin: 5px 50px;
  padding: 5px 5px;
}

.color_1, .color_6,
.color_2, .color_3,
.color_4, .color_5{
   width: 20px;
   height: 20px;
   margin: 5px 5px 0 0;
   display: inline-table;
}

.color_1{
  background-color: #f6f5ec;
}

.color_2{
  background-color: #fedcbd;
}

.color_3{
  background-color: #cde6c7;
}

.color_4{
  background-color: #E0EEE0;
}

.color_5{
 background-color: #30414a;
}

.color_6{
  background-color: #4F4F4F;
}

.glyphicon_color{
  color: #767676;
  font-size: 20px;
}

.history{
  width: 300px;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 40px;
  text-align: center;
  z-index: 100;
  color: #fff;
}

.hide-enter-active , .hide-leave-active{
  transition: all .4s ease;
}

.hide-enter, .hide-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>