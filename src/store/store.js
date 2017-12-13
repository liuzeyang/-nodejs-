import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	onelist:'',
	twolist:''
}


const getters = {


}

const mutations = {
	changeOneList(state, one ){
		console.log(one);
		if(one === 1.1){
			state.onelist = "用户管理"
			state.twolist = "用户列表"
		}else if(one === 1.2){
			state.onelist = "用户管理"
			state.twolist = "添加用户"
		}else if(one === 2.1){
			state.onelist = "商品管理"
			state.twolist = "商品列表"
		}else if(one === 2.2){
			state.onelist = "商品管理"
			state.twolist = "添加商品"
		}else if(one === 3.1){
			state.onelist = "图片管理"
			state.twolist = "图片列表"
		}else if(one === 3.2){
			state.onelist = "图片管理"
			state.twolist = "添加图片"
		}
	}
}

const actions = {


}




export default new Vuex.Store({
	state, getters, mutations ,actions
})