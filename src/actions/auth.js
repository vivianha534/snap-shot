import * as api from '../api'
import {AUTH} from '../constants/actionTypes'

//if action creators are async we have to use redux thunk
export const signIn = (formData, history) => async(dispatch) => {
    try{
        //log in the user after setting up backend endpoints and creating api calls
        const {data} = await api.signIn(formData)

        dispatch({type: AUTH, data})

        history.push('/')
    }catch(error){
        console.log(error)
    }
}

export const signUp = (formData, history) => async(dispatch) => {
    try{
        const {data} = await api.signUp(formData)

        dispatch({type: AUTH, data})
        
        history.push('/')
    }catch(error){
        console.log(error)
    }
}