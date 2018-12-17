import * as actionTypes from './types';
import {    list , 
            findPeople,getUserById ,
            getBalanceAndSequenceApi 
        } from '../compnents/Account/api-user';    
import { Posts , Users } from '../seed.data';


export const getUsers=(user)=>dispatch=>{
    list(user).then(data=>{
        if(data.error){
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:data.error
            })
        }else{
            dispatch(setUsers(data))
        }
    })
}


export const getCurrentUser=(userId)=>dispatch=>{
    getUserById(userId)
        .then(data=>{
            if(data.error){
                dispatch({
                    type:actionTypes.GET_ERRORS,
                    payload:data.error
                })
            }else{
                dispatch(setCurrentUser(data))
            }
        })
}

export const getBalanceAndSequence=(userId)=>dispatch=>{
    getUserById(userId)
        .then(data=>{
            if(data.error){
                dispatch({
                    type:actionTypes.GET_ERRORS,
                    payload:data.error
                })
            }else{
                getBalanceAndSequenceApi(data.publicKey)
                .then(data=>{
                    if(data.error){
                        dispatch({
                            type:actionTypes.GET_ERRORS,
                            payload:data.error
                        })
                    }else{
                        dispatch(setBalanceAndSequence(data))
                    }
                })
            }
        })
}

export const getPrivateKey=(key)=>dispatch=>{
    dispatch(setPrivateKey(key))
}


export const getPost= () =>{
    return {
        type: actionTypes.GET_POST,
        currentPosts:Posts
    };
};

export const setUsers =(data)=>{
    return{
        type:actionTypes.SET_LIST_USER,
        listUser:data,
    }
}

export const setCurrentUser=(data)=>{
    return {
        type:actionTypes.SET_CURRENT_USER,
        currentUser:data
    }
}

export const setBalanceAndSequence=(data)=>{
    return {
        type:actionTypes.SET_BALANCE_SEQUENCE,
        currentBalanceAndSequence:data
    }
}

export const setPrivateKey=(key)=>{
    return{
        type:actionTypes.SET_PRIVATE_KEY,
        currentPrivateKey:key
    }
}
