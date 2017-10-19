//引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LocalEvent = function(item){      // 定义一个本地存储的构造函数
    this.get = function () {              // 拿数据
    return JSON.parse(localStorage.getItem(item));
    }
    this.set = function (obj) {           // 存数据
    localStorage.setItem(item,JSON.stringify(obj));
    }
    this.remove = function () {           // 删数据
    localStorage.removeItem(item);
    }
}
const local = new LocalEvent('Notes'); // 创建一个本地存储的实例

//数组排序
 function compare(time){
          return function(a,b){
              var value1 = a[time];
              var value2 = b[time];
              return value2 - value1;
            }
          }


//需要维护的状态
const state = local.get() || {
    /*
        notes:存储note项
        activeNote:当前正在编辑的note项
    */
    notes:[],
    deleteNotes:[],
    activeNote:{},
    value:{},
    event: [],
    count: 0,
    favorite:false,
    time:{},
    fontSize:{},
    num:14,
    backgroundColor:{},
    back:{},
    tag:{},
    delNote: {},
}

const mutations = {
    // ADDEVENT，添加新的事件，并存储到localStorage里
    ADDEVENT(state){ 
        local.set(state);
    } ,

    //添加笔记
    ADD_NOTE(state){
        var time = new Date().getTime()
        // alert(time)
        const newNote  = {
            /*
                text:默认文字内容
                favorite:收藏
            */
            value:"",
            text:"",
            favorite:false,
            time: Date(),
            tag:time
        }
        state.count++;
        state.notes.push(newNote)
        state.activeNote = newNote
        state.value = newNote
        state.notes.sort(compare('tag'))
    },

    //编辑笔记
    EDIT_NOTE(state,text){
        state.activeNote.text = text
        for (var i = 0; i < state.notes.length ; i++){
            if (state.notes[i] == state.activeNote){
                let newTag = new Date().getTime()
                state.notes[i].time = Date()
                state.notes[i].tag  =  newTag
                state.notes.sort(compare('tag'))
            }
        }
    },

    EDIT_VALUE(state,value){
        state.value.value = value
        for (var i = 0; i < state.notes.length ; i++){
            if (state.notes[i] == state.activeNote){
                let newTag = new Date().getTime()
                state.notes[i].time = Date()
                state.notes[i].tag  =  newTag
                state.notes.sort(compare('tag'))
            }
        }
    },

    // 设置当前激活的笔记 颜色为激活色
    SET_ACTIVE_NOTE(state,note){
        state.activeNote = note
    },

    SET_VALUE(state,value){
       state.value = value
    },

    // 切换笔记的收藏与取消收藏
    TOGGLE_FAVORITE(state){
        if(state.notes.length > 0){
            state.value.favorite = !state.value.favorite
            local.set(state)
        }else{
            state.value.favorite = false
        }
    },

    //删除笔记
    DELETE_NOTE(state){
        for (var i = 0; i < state.notes.length ; i++){
            if (state.notes[i] == state.activeNote){
                var delNote = state.notes[i]
                state.notes.splice(i, 1)
            }
        }
        //如果没有activeNote就从第0个开始删除
        state.notes[-1] = state.activeNote 
        state.value = ""
        state.activeNote = ""
        local.set(state)
    },

    //全部删除
    DELETE_ALL(state){
        if(state.notes.length != 0){
            var c = confirm("全部删除后无法恢复，是否要删除")
            if(c == true){
                // for(var i = 0; i < state.notes.length; i++){
                //     state.notes.splice(i , state.notes.length)
                //     local.remove(state)
                // }
                local.remove(state)
            }
        }
        local.remove(state)
    },

    //字体大小
    INCREASE(state){
        state.num++;
        let size = state.num + 'px'
        state.fontSize = size
        local.set(state)
    },

    REDUCED(state){
        if(state.num > 12){
            state.num--;
            let size = state.num + 'px'
            state.fontSize = size
            local.set(state)
        }
    },

    //添加时间
    TIME(state){
        state.time = Date()
    },

    //背景颜色
    BACKGROUND_COLOR1(state){
        state.backgroundColor = "#F5F5F5"
        local.set(state)
    },

    BACKGROUND_COLOR2(state){
        state.backgroundColor = "#fedcbd"
        local.set(state)
    },

    BACKGROUND_COLOR3(state){
        state.backgroundColor = "#cde6c7"
        local.set(state)
    },

    BACKGROUND_COLOR4(state){
        state.backgroundColor = "#E0EEE0"
        local.set(state) 
    },

    BACKGROUND_COLOR5(state){
        state.backgroundColor = "#30414a" 
        local.set(state)
    },

    BACKGROUND_COLOR6(state){
        state.backgroundColor = "#2E2E2E"
        state.back = 'rgba(0,0,0,.2)'
        local.set(state)
    },
}


const actions = {
    /*
        actions来处理异步操作 它可以包含任意的异步操作 
        而不像mutation是来同步操作的
        actions处理函数接受一个 context 对象
        {
          state,     // 等同于 store.state, 若在模块中则为局部状态
          rootState, // 等同于 store.state, 只存在于模块中
          commit,    // 等同于 store.commit
          dispatch,  // 等同于 store.dispatch
          getters    // 等同于 store.getters
        }
    */
    addNote({commit}){
        commit('ADD_NOTE')
    },

    editNote({commit},text){
        commit("EDIT_NOTE",text)
        if(state.notes.length < 1){
          commit("ADD_NOTE")
        }
        local.set(state);
    },

    editValue({commit},value){
        commit("EDIT_VALUE",value)
        if(state.notes.length < 1){
          commit("ADD_NOTE")
        }
       local.set(state);
    },

    updateActiveNote({commit},note){
        commit('SET_ACTIVE_NOTE',note)
    },

    updateValue({commit},value){
        commit('SET_VALUE',value)
    },

    toggleFavorite({commit}){
        commit('TOGGLE_FAVORITE')
    },

    deleteNote({commit}){
        commit('DELETE_NOTE')
    },

    deleteAll({commit}){
        commit('DELETE_ALL')
    },

    saveNoet({commit}){
        commit('ADDEVENT')
    },

    increase({commit}){
        commit('INCREASE')
    },


    reduced({commit}){
        commit('REDUCED')
    },

    updateTime({commit}){
        commit('TIME')
    },

    backgroundColor1({commit}){
        commit('BACKGROUND_COLOR1')
    },

    backgroundColor2({commit}){
        commit('BACKGROUND_COLOR2')
    },

    backgroundColor3({commit}){
        commit('BACKGROUND_COLOR3')
    },

    backgroundColor4({commit}){
        commit('BACKGROUND_COLOR4')
    },

    backgroundColor5({commit}){
        commit('BACKGROUND_COLOR5')
    },

    backgroundColor6({commit}){
        commit('BACKGROUND_COLOR6')
    },
}


const getters = {
    /*
        Vuex 允许我们在 store 中定义『getters』
        （可以认为是 store 的计算属性）。
        就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，
        且只有当它的依赖值发生了改变才会被重新计算。
        所以这里的计算放到了需要计算值的组件的cumputer里面
        例如:fontSize每次触发会在mutation中计算,
             而getters就把最后算好的值放到了组件中显示

        Getters 接受 state 作为其第一个参数
        （这是es6语法 ↓）
        state => state.notes为箭头函数等价于：
        function (state){
            return state.notes 
        }
    */
  notes: state => state.notes,
  value:state => state.value,
  activeNote:state => state.activeNote,
  deleteNotes:state => state.deleteNotes,
  fontSize:state => state.fontSize,
  time:state => state.time,
  backgroundColor:state => state.backgroundColor,
  back:state => state.back,
  delNote:state => state.delNote
}



export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})