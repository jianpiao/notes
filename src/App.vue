<template>
  <div id="app">
    <Toolbar></Toolbar>
    <Notelist :style="{ display: display}" ></Notelist>
    <Editor :style="{ display: display}"></Editor>
    <transition name="fade">
       <router-view :style="{ display: dis}"></router-view>
    </transition>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import Notelist from './components/NoteList.vue'
import Editor from './components/Editor.vue'
export default {
  components:{
    Toolbar,
    Notelist,
    Editor
  },
  data(){
    return{
       display : "none",
       dis: 'block'
    }
  },
  mounted() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    console.log(w)
    if(w > 600){
        this.display = "block";
        this.dis = "none";
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
}
html, #app {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  position: relative;
}

.fade-enter-active{
  transition: all .4s ease;
}

.fade-leave-active{
  transition: all 0 ease;
}

.fade-enter, .fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
