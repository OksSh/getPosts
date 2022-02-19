interface IProps {
  title: string;
  text: string;
  author: string;
}

export const Post = ({ title, text, author }: IProps) => {
  return (
    <div
      style={{
        width: '17%',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
      }}
    >
      <h3>{title}</h3>
      <p>{text}</p>
      <p>{`Author: ${author}`}</p>
    </div>
  );
};
