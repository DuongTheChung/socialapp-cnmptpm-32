import * as actionTypes from '../actions/types';

const initUserState={
    currentUsers:[]
}

const user_reducer=(state=initUserState,action)=>{
    switch(action.type){
        case actionTypes.GET_USER:
            return{
                currentUsers:action.currentUsers
            }
        default:
            return state;
    }
}

export default user_reducer;