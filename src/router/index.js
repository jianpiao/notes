import Vue from 'vue'
import Router from 'vue-router'
import NoteList from '../components/NoteList.vue'
import Editor from '../components/Editor.vue'
import DeleteNote from '../components/DeleteNote.vue'

Vue.use(Router)

export default new Router({
  routes: [
   	{   path: '/',
        redirect: '/notelist'
	},
	{   path: '*',
        redirect: '/notelist'
	},
	{
	    path: '/notelist',
	    component: NoteList
	},
	{
	    path: '/notelist/editor',
	    component: Editor
	},
	{
		path: '/notelist/deletenote',
		component: DeleteNote
	}
  ]
})
