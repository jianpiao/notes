<template>
  <div id="trash-list">
    <div id="list-header">
      <h3>Notes</h3>
        <div class="btn-group" role="group">
          <button  type="button" class="btn btn-default">
             Trash
          </button>
        </div>
	  </div>	
  <div class="container">
    <div class="list-group">
        <p v-for="item in deleteNotes" class="list-group-item" :class="{active:value == item}"  @click="updateActiveNote(item);updateValue(item)">
            <span class="note_time">{{item.time | date}}</span>
            <br/>
            <span class="note_time">{{delTime | delDate}}</span>
            <i class="glyphicon glyphicon-trash deleteNote"  @click="deleteNote"></i>
            <router-link to="/notelist/editor" style="color:#000;">
              <h4 class="list-group-item-heading">
              {{item.text}} -&nbsp;
              {{item.value}}
            </h4>
            </router-link>
      </p>
    </div>
  </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
var _this = ""
export default {
  data(){
    return {
      show:'all',
      delTime: Date()
    }
  },
  computed:mapState({
      deleteNotes(){
            return this.$store.getters.deleteNotes
      },
      activeNote(){
            return this.$store.getters.activeNote
      },
      value(){
            return this.$store.getters.value
      },
      time(){
            return this.$store.getters.time.filter(note=>note.time);
      },
  }),
  methods:{
      updateActiveNote(note){
          this.$store.dispatch('updateActiveNote',note)
      },
      updateValue(note){
          this.$store.dispatch('updateValue',note)
      },
      deleteNote(){
          this.$store.dispatch('deleteNote')
      }
  },
  filters:{
      date(time){
          let oldDate = new Date(time)
          let newDate = new Date()
          var dayNum = "";
          var getTime = (newDate.getTime() - oldDate.getTime())/1000;

          if(getTime < 60*2){
              dayNum = "刚刚";
          }else if(getTime >= 60*2 && getTime < 60*60){
              dayNum = parseInt(getTime / 60) + "分钟前";
          }else if(getTime >= 3600 && getTime < 3600*24){
              dayNum = parseInt(getTime / 3600) + "小时前";
          }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
              dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
          }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
          }else if(time >= 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
          }

          function checkTime(time){
             if(time < 10){
                time = "0" + time
             }
             return time
          }

          let year   = oldDate.getFullYear();
          let month  = oldDate.getMonth()+1;
          let day    = oldDate.getDate();
          let hour   = oldDate.getHours(); 
          let minute = oldDate.getMinutes(); 
          let second = oldDate.getSeconds(); 
          return "编辑于"+""+dayNum+" "+year+"-"+month+"-"+day+" "+checkTime(hour)+":"+checkTime(minute)+":"+checkTime(second);
      },
      delDate(time){
          let oldDate = new Date(time)
          let newDate = new Date()
          var dayNum = "";
          var getTime = (newDate.getTime() - oldDate.getTime())/1000;

          if(getTime < 60*2){
              dayNum = "刚刚";
          }else if(getTime >= 60*2 && getTime < 60*60){
              dayNum = parseInt(getTime / 60) + "分钟前";
          }else if(getTime >= 3600 && getTime < 3600*24){
              dayNum = parseInt(getTime / 3600) + "小时前";
          }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
              dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
          }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
          }else if(time >= 3600 * 24 * 30 * 12){
              dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
          }

          function checkTime(time){
             if(time < 10){
                time = "0" + time
             }
             return time
          }

          let year   = oldDate.getFullYear();
          let month  = oldDate.getMonth()+1;
          let day    = oldDate.getDate();
          let hour   = oldDate.getHours(); 
          let minute = oldDate.getMinutes(); 
          let second = oldDate.getSeconds(); 
          return "删除于"+""+dayNum+" "+year+"-"+month+"-"+day+" "+checkTime(hour)+":"+checkTime(minute)+":"+checkTime(second);
      },
  }
}
</script>
<style>
#trash-list {
  float: left;
  width: calc(100% - 40px);
  height: 100%;
  background-color: #F5F5F5;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

#list-header {
  padding: 5px 25px 25px 25px;
}

#list-header h3 {
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 18px;
}

.list-group{
  margin: 0;
}

#trash-list .container {
  height: calc(100% - 138px);  
  overflow: auto;
  width: 100%;
  padding: 0;
}

#trash-list .container .list-group-item {
  border: 0;
  border-radius: 0;
  margin: 5px 0;
}

.list-group-item{
  padding: 10px 60px 10px 15px;
}

.list-group-item.active, 
.list-group-item.active:focus , 
.list-group-item.active:hover {
  background-color: #E8E8E8;
  box-shadow: 0 0 3px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1) inset; 
  display: block;
}

.list-group-item a:hover{
  text-decoration: none;
}

.list-group-item-heading {
  font-weight: 300;
  font-size: 16px;
  max-height: 35px;
  overflow: hidden;
  margin: 0;
}

.note_time{
  font-size: 12px;
  opacity: .5;
  color: #987111;
}

.deleteNote{
  position: absolute;
  margin-top: 6%;
  float: right;
  right: -35px;
  font-size: 17px;
  color: #767676;
  opacity: .7;
  display: none;
  z-index: 100;
}

.btn-group , 
.btn{
	width: 100%;
	margin: 0 auto;
}

.btn:active,
.btn:hover,
.btn:focus{
  outline: none;
  background-color: #fff;
}

@media only screen and (min-width: 600px){
  #notes-list {
  width: 300px;
  }
  .list-group{
    border-right: 1px solid rgba(0,0,0,.05);
  }
}

</style>
      