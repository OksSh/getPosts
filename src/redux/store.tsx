import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { postsReducer } from '../redux/redusers/postsReducer';
import { IPostsState } from '../redux/redusers/postsReducer';

export interface IState {
  postsReducer: IPostsState;
}

export const store = createStore(
  combineReducers({ postsReducer }),
  composeWithDevTools()
);
