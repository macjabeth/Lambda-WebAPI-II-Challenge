import { FETCH_POSTS_SUCCESS, ADD_POST_SUCCESS, EDIT_POST_SUCCESS, DELETE_POST_SUCCESS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload;
    case ADD_POST_SUCCESS:
      return [...state, action.payload];
    case EDIT_POST_SUCCESS:
      return state.map(post => post.id === action.payload.id ? action.payload : post);
    case DELETE_POST_SUCCESS:
      return state.filter(post => post.id !== action.payload.id);
    default:
      return state;
  }
};
