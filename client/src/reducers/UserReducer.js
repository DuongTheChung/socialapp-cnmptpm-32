import * as actionTypes from '../actions/types';

const initUserState={
    listUser:[],
    currentUser:{
        following:[],
        followers:[],
        balance:0,
        name:"",
        sequence:0
    },
    currentPrivateKey:""
}

const user_reducer=(state=initUserState,action)=>{
    switch(action.type){
        case actionTypes.SET_LIST_USER:
            return{
                ...state,
                listUser:action.listUser,
            }
        case actionTypes.SET_DETAIL:
            return {
                ...state,
                currentUser:{
                    following:action.detail.following,
                    followers:action.detail.followers,
                    balance:action.detail.balance,
                    name:action.detail.name,
                    sequence:action.detail.sequence
                },
            }
        default:
            return state;
    }
}

export default user_reducer;