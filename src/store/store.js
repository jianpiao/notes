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





//需要维护的状态
const state = local.get() || {
    /*
        notes:存储note项
        activeNote:当前正在编辑的note项
    */
    notes:[],
    activeNote:{},
    value:{},
    event: [],
    count: 0,
    backgroundColor:{},
    favorite:false,
    time:{}
}

const mutations = {
    // ADDEVENT，添加新的事件，并存储到localStorage里
    ADDEVENT(state){ 
        local.set(state);
    } ,
    //添加笔记
    ADD_NOTE(state){
        const newNote  = {
            /*
                text:默认文字内容
                favorite:收藏
            */
            value:"",
            text:"",
            favorite:false,
            time: Date()
        }
        state.count++;
        console.log(state.count)
        state.notes.push(newNote)
        state.activeNote = newNote
        state.value = newNote
    },
    //编辑笔记
    EDIT_NOTE(state,text){
        state.activeNote.text = text
    },
    EDIT_VALUE(state,value){
        state.value.value = value
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
            // local.set(state.value.favorite)
        }else{
            state.value.favorite = false
        }
    },
    //删除笔记
    DELETE_NOTE(state){
        for (var i = 0; i < state.notes.length ; i++){
            if (state.notes[i] == state.activeNote){
                state.notes.splice(i, 1)
            }
        }
        //如果没有activeNote就从第0个开始删除
        state.notes[-1] = state.activeNote 
    },
    //全部删除
    DELETE_ALL(state){
        if(state.notes.length != 0){
            var c = confirm("全部删除后无法恢复，是否要删除")
            if(c == true){
                for(var i = 0; i < state.notes.length; i++){
                    state.notes[i] = state.activeNote
                    state.notes.splice(i , state.notes.length)
                    local.remove(state)
                }
            }
        }
    },
    BACK_COLOR(state){
        state.backgroundColor = localStorage.getItem("color")
    }
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
        if(state.activeNote == ""){
           commit("ADD_NOTE")
        }
    },

    updateValue({commit},value){
        commit('SET_VALUE',value)
        if(state.value == ""){
           commit("ADD_NOTE")
        }
    },

    toggleFavorite({commit}){
        commit('TOGGLE_FAVORITE')
    },

    deleteNote({commit}){
        commit('DELETE_NOTE')
        local.set(state);
    },

    deleteAll({commit}){
        commit('DELETE_ALL')
    },
    saveNoet({commit}){
        commit('ADDEVENT')
    },
    backgroundColor({commit}){
        commit('BACK_COLOR')
        local.set(state)
    },
}


const getters = {
    /*
        Vuex 允许我们在 store 中定义『getters』
        （可以认为是 store 的计算属性）。
        就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，
        且只有当它的依赖值发生了改变才会被重新计算。
        所以这里的计算放到了Editor.vue的cumputer里面

        Getters 接受 state 作为其第一个参数
        state => state.notes为箭头函数等价于：
        function (state){
            return state.notes 
        }
    */
  notes: state => state.notes,
  value:state => state.value,
  activeNote:state => state.activeNote,
}



export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})