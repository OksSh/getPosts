export interface IPost {
  id: string;
  userId: string;
  body: string;
  title: string;
}

export interface IPostWithAuthor extends IPost {
  author: string;
}

export interface IPostsState {
  posts: IPostWithAuthor[];
}

const defaultState: IPostsState = {
  posts: [],
};

export const postsReducer = (state = defaultState, action: any) => {
  if (action.type === 'ADD_POST') {
    return { posts: action.posts };
  }

  return state;
};
