import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'

export default (posts = [] ,action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        // returns an array of posts, spread the posts so they don't get over written and add new post
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            //if the post id is equal to the updated post's id then return the updated post else just return the post w/o updates
            return posts.map((post)=> post._id === action.payload._id ? action.payload : post)
        case DELETE:
            return posts.filter((post) => post._id != action.payload )
        default:
            return posts
    }
}