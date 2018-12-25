import * as actionTypes from '../actions/types';

const initUserState={
    listUser:[],
    currentUser:{
        followings:[],
        balance:0,
        name:"",
        sequence:0,
        transactions:[],
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
                    followings:action.detail.followings,
                    balance:action.detail.balance,
                    name:action.detail.name,
                    sequence:action.detail.sequence,
                    transactions:action.detail.transactions
                },
            }
        default:
            return state;
    }
}

export default user_reducer;