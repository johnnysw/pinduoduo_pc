import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    categary: [{
      id: '1',
      typename: '服装-T恤',
      level: '一级',
      operation: ' ',
      ison: false,
      nextlevel: [{
        id: '4',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }, {
        id: '5',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }, {
        id: '6',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }, {
        id: '7',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }]
    }, {
      id: '2',
      typename: '服装-T恤',
      level: '一级',
      operation: ' ',
      ison: false,
      nextlevel: [{
        id: '5',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }]
    }, {
      id: '3',
      typename: '服装-T恤',
      level: '一级',
      operation: ' ',
      ison: false,
      nextlevel: [{
        id: '6',
        typename: '服装-T恤',
        level: '二级',
        operation: ' '
      }]
    }],
    categaryflag: 0,
    categaryaddnum: 0,
    categaryregion: ' ',
    categarynextregion: ' '
  },
  mutations: {
    addgoods(state,atypename) {
      state.categary.push({
        typename: atypename,
        level: state.categaryregion
      }) 
    },
    addnextgoods(state,atypename){
      state.categary[state.categaryaddnum].nextlevel.push({
          typename: atypename,
          level: state.categarynextregion
      })
    },
    addnextnum(state,num){
      state.categaryaddnum = num
    },
    addgoodsregion(state,alevel){
      state.categaryregion = alevel
    },
    addnextregion(state,alevel){
      state.categarynextregion = alevel
    },
    changeflag(state,flag){
      state.categaryflag = flag
    }
  },
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
