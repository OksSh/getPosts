import { IPostWithAuthor } from '../redusers/postsReducer';
import { ACTIONS } from '../redusers/constans';

export const addPosts = (posts: IPostWithAuthor) => {
  return { type: ACTIONS.ADD_POST, posts: posts };
};
