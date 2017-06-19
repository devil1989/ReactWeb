import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as DetailActions from '../actions/detail'
import SideModal from '../components/SideModal';
import DModal from '../components/DModal';
import PullToRefresh from '../components/PullToRefresh';

const DetailPage = React.createClass({

    goHongqiao: function(){
        
    },

    render: function(){

        return (
            <div className={`${combineClass}`} style={{"background": "#07A0E0", "height": "100%"}}>
                <PullToRefresh ref="pulltorefresh" styleList={'no-padding'} showLoading={this.props.stateTree.isFetching} triggerDistance={20} refresh={(container) => { this.onPullRefresh.call(this, container, this.props.stateTree.isFetching); }}>
                    <div style={{"background": "#efeff4", "height": "100%"}}>
                        <div className="container-head">
                            {headResult}
                        </div>
                        <div className="fboard-info">
                            <XProductList buttonData={stateTree.buttonData} stateTree={stateTree}/>
                            {bodyResult}
                            { (stateTree.Adlink && stateTree.isHongqiao) &&
                                <div className="hongqiao" onClick={this.goHongqiao}>
                                    <img src="//pic.c-jeffreytrip.com/h5/flight/hqbanner.png" />
                                </div>
                            }
                            <FioBoard key="G" fioData={stateTree.fioData}/>
                            <section className="data-provider"><span>航班动态数据由</span><a href={stateTree.vzurl} className="link">飞常准</a><span>提供支持</span></section>
                        </div>
                    </div>
                </PullToRefresh>
                <SideModal isNoticeModalOpen={stateTree.isNoticeModalOpen} from={stateTree.from} hideModal={actions.showNotices} data={stateTree.airInfoList} />
                <DModal show={stateTree.showModal} data={stateTree} toggleModal={actions.toggleModal} />
            </div>
        );
    }
});

//把 state 保定到组件的props上去，stateTree就是对应的state，可以直接从this.props.stateTree获取，在组件中，可以直接写stateTree，不需要this.props这个前缀
function mapStateToProps(state) {
    return {
        stateTree: state
    }
}

//把组件的actionCreater绑定到组件的props上去，actions就是对应的actions，可以直接从this.props.actions获取
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(DetailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);//返回最终可以使用的组件，该组件修改state，或者执行
