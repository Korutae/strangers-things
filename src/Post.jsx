//i have no idea why it is saying updatePost is not a function

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const Post = ({ posts, auth, updatePost })=> {
  const params = useParams();
  const { id } = useParams();
  const [description, setDescription] = useState('');


  useEffect(()=> {
    const post = posts.find(post => post._id === id);
    if(post){
      setDescription(post.description);
    }
  }, [posts, id]);

  const post = posts.find(post => post._id === id);
  if(!post){
    return null;
  }
  const save = async(ev)=> {
    ev.preventDefault();
    const post = { id, description };
    await updatePost(post);
  }

  return (
    <div>
      <h1>{ post.title }</h1>
      <p>{ post.description }</p>
      { auth._id === post.author._id ? 
      <form onSubmit ={ save }>
        <input value ={ description } onChange={ ev => setDescription(ev.target.value)} />
        <button disabled ={ post.description === description }>Update</button>
      </form>
      : ''}
      { auth._id === post.author._id ? 
      <button>Delete Post</button>
      : ''}
    </div>
  );
};

export default Post;
