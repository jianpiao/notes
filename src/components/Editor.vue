<template>
  <div id="note-editor">
     <input :value="activeNoteText" @input="editNote"  class="title" :maxlength="maxlength" placeholder="标题"></input>
     <textarea  :value="value"  @input="editValue" :style="{fontSize:fontSize}" class="form-control" placeholder="点击左边+添加文本" ></textarea>
  </div>
</template>

<script>
var num = 14;
export default {
  data(){
    return {
        maxlength : 20,
    }
  },
  computed:{
    activeNoteText(){
      return this.$store.getters.activeNote.text
    },
    value(){
      return this.$store.getters.value.value
    },
    fontSize(){
      return this.$store.getters.fontSize
    }
  },
  methods:{
      editNote(e){
          this.$store.dispatch('editNote',e.target.value)
      },
      editValue(e){
          this.$store.dispatch('editValue',e.target.value)
      },
  },
  mounted() {
      let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if(w > 600){
          this.maxlength = 50
    }
  }
}
</script>
<style>  
#note-editor {
  height: 100%;
  width: calc(100% - 40px);
  float: left;
}

.title{
  width: 100%;
  border:0;
  height: 50px;
  text-align: center;
  font-size: 20px;
  line-height: 50px;
  padding: 0;
}

#note-editor textarea {
  width: 100%;
  height: calc(100% - 50px);
  border: 0;
  border-radius: 0;
}

@media only screen and (min-width: 600px){
  #note-editor {
  width: calc(100% - 340px);
  }
}
</style>    