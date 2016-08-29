
// Reducer 实际上就是一个函数：(previousState, action) => newState
function ScheduleReducer(oldstate, action){
    switch (action.type){
        case 'LOAD_DETAIL_FETCHING':
            return Object.assign({}, oldstate, {
                isFetching: true
            });
        case 'LOAD_DETAIL_SUCCESS':
            return Object.assign({}, oldstate, {
                isLoading:true
            });
        default:
            return oldstate;
    }
}

export default ScheduleReducer

