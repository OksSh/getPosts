import { useEffect, useState } from 'react';
import { Post } from './Post';
import { IPost, IPostWithAuthor } from '../redux/redusers/postsReducer';
import { IState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../redux/actions/postsActions';

export const PostList = () => {
  const state = useSelector((state: IState) => state.postsReducer.posts);
  const dispatch = useDispatch();

  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const POST_PER_PAGE: number = 5;
  const [page, setPage] = useState<number>(1);

  const showMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getNewPosts();
  }, []);

  async function getNewPosts() {
    const results = await Promise.all([fetch(urlPosts), fetch(urlUsers)]);
    const [getPosts, getUsers] = results;
    const users = await getUsers.json();
    const posts = await getPosts.json();

    const newPosts = posts.map((post: IPost) => {
      const authorId = post.userId;
      const author = users.find(
        (author: { id: string }) => author.id === authorId
      );
      return { ...post, author: author.name };
    });

    dispatch(addPosts(newPosts));
  }

  const slicePosts = state.slice(0, POST_PER_PAGE * page);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {slicePosts.map((item: IPostWithAuthor) => {
          return (
            <Post
              title={item.title}
              text={item.body}
              author={item.author}
              key={item.id}
            />
          );
        })}
      </div>
      {slicePosts.length !== state.length ? (
        <button
          style={{
            marginTop: '20px',
            color: 'white',
            backgroundColor: 'grey',
            cursor: 'pointer',
          }}
          onClick={showMore}
        >
          Show more
        </button>
      ) : null}
    </>
  );
};
