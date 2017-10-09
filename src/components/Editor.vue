<template>
  <div id="note-editor">
    <!-- <router-link to="/notelist">返回</router-link> -->
    <input :value="activeNoteText" @input="editNote"  class="title" maxlength="20" placeholder="标题"></input>
     <textarea  :value="value"  @input="editValue" class="form-control" placeholder="点击左边+添加文本" ></textarea>
  </div>
</template>

<script>
export default {
  computed:{
    activeNoteText(){
      return this.$store.getters.activeNote.text
    },
    value(){
      return this.$store.getters.value.value
    }
  },
  methods:{
      editNote(e){
          this.$store.dispatch('editNote',e.target.value)
      },
      editValue(e){
          this.$store.dispatch('editValue',e.target.value)
      }
  },
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

.title:focus{
  outline: none;
}

#note-editor textarea {
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