import {AUTH, LOGOUT} from '../constants/actionTypes'

const authReducer=(state = {authData: null},action) =>{
    switch(action.type){
        case AUTH:
            //use local storage b/c that way when we refresh, browser will still know we're logged in
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        case LOGOUT:
            //clears local storage so that if you refresh the page, you stay logged out
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state
    }
}

export default authReducer