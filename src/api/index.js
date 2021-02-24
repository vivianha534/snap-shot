import axios from 'axios';

//url pointing to backend route
const API = axios.create({baseURL: 'https://snapshot-project.herokuapp.com/'})

//happens before all the requests below
//middleware can't work w/o this
API.interceptors.request.use((req)=>{
    //sends our token to backend so middleware can verify we're logged in
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
//url pointing to backend route
// const url = 'https://snapshot-project.herokuapp.com/posts'

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id, updatedPost) => API.patch(`/posts/${id}/likePost`) 

export const signIn = (formData) => API.post('/user/signIn', formData)
export const signUp = (formData) => API.post('/user/signUp', formData)
