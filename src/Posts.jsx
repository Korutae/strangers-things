import { Link } from 'react-router-dom';

const Posts = ({ posts, auth })=> {
  return (
    <ul>
      {
        posts.map( post => {
          return (
            <li key={ post._id } className={ post.author._id === auth._id ? 'mine': ''}>
              <Link to={`/posts/${post._id}`}>{ post.title }</Link>  Price: { isNaN(post.price) ? post.price : '$' + post.price}, Seller: { post.author.username }{ post.location === '[On Request]' ? '' : ', Location: ' + post.location}
            </li>
          );
        })
      }
    </ul>
  );
};

export default Posts;

