import * as actionTypes from './types';
import { Posts ,  Users } from '../seed.data';

export const getPost= () =>{
    return {
        type: actionTypes.GET_POST,
        currentPosts:Posts
    };
};

export const getUser=()=>{
    return{
        type:actionTypes.GET_USER,
        currentUsers:Users,
    }
}