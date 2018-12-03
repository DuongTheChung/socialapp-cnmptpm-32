import * as actionTypes from '../actions/types';

const initPostState={
    currentPosts:[]
}

const post_reducer=(state=initPostState,action)=>{
    switch(action.type){
        case actionTypes.GET_POST:
            return{
                currentPosts:action.currentPosts
            }
        default:
            return state;
    }
}

export default post_reducer;