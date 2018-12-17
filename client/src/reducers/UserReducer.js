import * as actionTypes from '../actions/types';
import { stat } from 'fs';

const initUserState={
    listUser:[],
    currentUser:{
        following:[],
        followers:[],
        balance:0,
        name:"",
        publicKey:"",
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
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
               
                currentUser:{
                    following:action.currentUser.following,
                    followers:action.currentUser.followers,
                    balance:action.currentUser.balance,
                    name:action.currentUser.name,
                    publicKey:action.currentUser.publicKey,
                },
            }
        case actionTypes.SET_BALANCE_SEQUENCE:
            var cur=state.currentUser;
            cur.balance=action.currentBalanceAndSequence.balance;
            cur.sequence=action.currentBalanceAndSequence.sequence;
            return {
                ...state,
                currentUser:{
                    following:cur.following,
                    followers:cur.followers,
                    balance:cur.balance,
                    name:cur.name,
                    publicKey:cur.publicKey,
                    sequence:cur.sequence
                },
                    
            }
        case actionTypes.SET_PRIVATE_KEY:
            return{
                ...state,
                currentPrivateKey:action.currentPrivateKey
            }
        default:
            return state;
    }
}

export default user_reducer;