import Vue from 'vue'
import Router from 'vue-router'
import NoteList from '../components/NoteList.vue'
import Editor from '../components/Editor.vue'

Vue.use(Router)

export default new Router({
  routes: [
   	{   path: '/',
        redirect: NoteList
	},
	{
	    path: '/notelist',
	    component: NoteList
	},
	{
	    path: '/notelist/editor',
	    component: Editor
	}
  ]
})
