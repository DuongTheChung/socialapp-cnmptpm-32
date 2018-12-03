import PostReducer from './PostReducer';
import UserReducer from './UserReducer';

import { combineReducers } from 'redux';

const RootReducer=combineReducers({
    post:PostReducer,
    user:UserReducer
});

export default RootReducer;