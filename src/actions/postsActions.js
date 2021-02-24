import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'
//Action creators are functions that return actions
//redux thunk allows us to specify another arrow function
export const getPosts = () => async(dispatch) => {
    try{
        //first get response from api which always has data object
        //data represents the post
        const {data} = await api.fetchPosts()

        const action = {type: FETCH_ALL, payload: data}
        dispatch(action);
    }catch(error){
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch({ type: CREATE, payload: data });
      console.log("create post")
    } catch (error) {
      console.log(error.message);
    }
};

export const updatePost = (id, updatedPost) => async(dispatch) =>{
  try{
    //returns updated post
    const {data} = await api.updatePost(id, updatedPost)

    dispatch({type: UPDATE, payload: data})
  }catch(error){
    console.log(error.message)
  }
}

export const deletePost = (id) => async(dispatch) => {
  try{
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id})
  }catch(error){
    console.log(error.message)
  }
}

export const likePost = (id) => async(dispatch) =>{
  try{
    //returns updated post
    const {data} = await api.likePost(id)

    dispatch({type: LIKE, payload: data})
  }catch(error){
    console.log(error.message)
  }
}