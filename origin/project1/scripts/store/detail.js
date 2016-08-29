import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ScheduleReducer from '../reducers/detail'



const middlerWare = applyMiddleware(
    thunkMiddleware // 让dispatch的参数支持函数，遮掩就能满足dispatch的异步调用了
)(createStore)

const store = middlerWare(ScheduleReducer)//创建store时候，执行力store和对应的reduce的绑定
// Store
//const store = createStore();//这个是通用的store创建方法，但是有的时候需要有特殊功能的store

export default store;


//thunkMiddleware的源码：（作用：让dispatch接受function作为参数，而不仅仅只能接受action对象;这样做是为了处理dispatch的异步请求，dispatch(action)是同步的）
// export default function thunkMiddleware({ dispatch, getState }) {
//   return next => action =>
//     typeof action === 'function' ?
//       action(dispatch, getState) :
//       next(action);
// }
//thunkMiddleware的es5源码：
// function thunkMiddleware ({ dispatch, getState }){
// 	return function (next){
// 		function(action){
// 			typeof action === 'function' ? action(dispatch, getState) : next(action);
// 		}
// 	}
// }
	


//applyMiddleware源码：（作用：来自redux可以包装 store 的 dispatch()【该方法可以生成对应的store】）
// import compose from './compose';
// export default function applyMiddleware(...middlewares) {
//   return (next) => (reducer, initialState) => {
//     var store = next(reducer, initialState);
//     var dispatch = store.dispatch;
//     var chain = [];

//     var middlewareAPI = {
//       getState: store.getState,
//       dispatch: (action) => dispatch(action)
//     };
//     chain = middlewares.map(middleware => middleware(middlewareAPI));
//     dispatch = compose(...chain)(store.dispatch);

//     return {
//       ...store,
//       dispatch
//     };
//   };
// }