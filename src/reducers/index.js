import {combineReducers } from 'redux'

import Posts from "./postsReducers"
import Auth from './auth'

export default combineReducers({
    Posts, Auth
})