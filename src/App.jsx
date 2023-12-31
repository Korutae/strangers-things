import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const updatePost = async(post)=> {
    post = await api.updatePost(post);
    const updatedPost = post.data;
    setPosts(posts.map(post => post._id !== updatedPost._id ? post : updatedPost))

  }

  return (
    <>
      <h1><Link to='/'>Strangers Things ({ posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              Welcome { auth.username }. You have {auth.posts.length} posts.
              <button onClick={ logout }>Logout</button>
            </h1>
            <div id='navbar'>
            <p><Link to='/posts/create'>Create A Post</Link></p>
            <p><Link to='/about_us'>About Us</Link></p>
            <p><Link to='/contact_us'>Contact Us</Link></p>
            </div>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <div id='navbar'>
            <p><Link to='/about_us'>About Us</Link></p>
            <p><Link to='/contact_us'>Contact Us</Link></p>
            </div>
          </>
        )
      }
      <Posts posts={ posts } auth={ auth } updatePost={updatePost}/>
      <Routes>
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth } updatePost={ updatePost }/>} />
        <Route path ='/posts/:id' element={ <Post updatePost={ updatePost } posts= { posts }/> } />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path='/contact_us' element={ <ContactUs />}></Route>
      </Routes>
    </>
  )
}

export default App
