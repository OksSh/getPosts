import { useEffect, useState } from 'react';
import { Post } from './Post';

export interface IPost {
  id: string;
  userId: string;
  body: string;
  title: string;
}

export interface IPostWithAuthor extends IPost {
  author: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<IPostWithAuthor[]>([]);
  const [authors, setAuthors] = useState([]);
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const POST_PER_PAGE: number = 5;
  const [page, setPage] = useState<number>(1);

  const showMore = () => {
    setPage(page + 1);
  };

  async function getNewPosts() {
    const results = await Promise.all([fetch(urlPosts), fetch(urlUsers)]);
    const [getPosts, getUsers] = results;

    await getUsers.json().then((data) => {
      setAuthors(data);
    });

    await getPosts.json().then((data) => {
      setPosts(data);
    });

    const newPosts = posts.map((post: IPost) => {
      const authorId = post.userId;
      const author = authors.find(
        (author: { id: string }) => author.id === authorId
      );
      return { ...post, author: author.name };
    });
    setPosts(newPosts);
  }

  useEffect(() => {
    getNewPosts();
  }, []);

  const slicePosts = posts.slice(0, POST_PER_PAGE * page);

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
      {slicePosts.length !== posts.length ? (
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
