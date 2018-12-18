import * as actionTypes from './types';
import {    list , 
            findPeople,getUserById ,
            getDetailApi 
        } from '../compnents/Account/api-user';    
import { Posts , Users } from '../seed.data';


export const getList=(user)=>dispatch=>{
    list(user).then(data=>{
        if(data.error){
            dispatch({
                type:actionTypes.GET_ERRORS,
                payload:data.error
            })
        }else{
            dispatch(setList(data))
        }
    })
}
export const getDetail=(userId)=>dispatch=>{
    getUserById(userId)
        .then(data=>{
            if(data.error){
                dispatch({
                    type:actionTypes.GET_ERRORS,
                    payload:data.error
                })
            }else{
                getDetailApi(data.publicKey)
                .then(data=>{
                    if(data.error){
                        dispatch({
                            type:actionTypes.GET_ERRORS,
                            payload:data.error
                        })
                    }else{
                        dispatch(setDetail(data))
                    }
                })
            }
        })
}
export const getPost= () =>{
    return {
        type: actionTypes.GET_POST,
        currentPosts:Posts
    };
};
export const setList =(data)=>{
    return{
        type:actionTypes.SET_LIST_USER,
        listUser:data,
    }
}
export const setDetail=(data)=>{
    return {
        type:actionTypes.SET_DETAIL,
        detail:data
    }
}