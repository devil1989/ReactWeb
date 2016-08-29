import { createStore, applyMiddleware,bindActionCreators } from 'redux'//redux 基础
import { connect,thunkMiddleware,Provider } from 'react-redux'//用于管理react的state的控件：redux
import thunk from 'redux-thunk' //

import DetailPage from './containers/DetailPage'//该页面包含对应的组件，可以包含多个组件
import store from './store/detail'//该页面对应的store
import * as DetailActions from './actions/detail'//该页面对应的action

ReactDOM.render(
    <Provider store={store}>
        <DetailPage/>
    </Provider>,
    document.getElementById('root')
);

//更新store对应状态：
store.dispatch(DetailActions.toggleWatch(true));