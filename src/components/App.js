import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

axios.defaults.headers.common['Content-Type'] = 'application/json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:9090/posts')
      .then(res => {
        this.setState({ posts: res.data });
      });
  }

  updatePost(id, text) {
    axios
      .put(`http://localhost:9090/posts/${id}`, {text})
      .then(res => {
        const updatedPost = res.data;
        const updatedPosts = this.state.posts.map(post => {
          if (post.id === updatedPost.id) {
            return { post, ...updatedPost };
          } else {
            return post;
          }
        });
        this.setState({posts: updatedPosts})
        console.log(`http://localhost:9090/posts/${id}`)
      })
  }

  deletePost() {}

  createPost() {}

  render() {
    const { posts } = this.state;
    

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {posts.map(data => (
            <Post 
            key={data.id} 
            text={data.text} 
            date={data.date} 
            id={data.id} 
            updatePostFn={this.updatePost}/>
          ))}
        </section>
      </div>
    );
  }
}

export default App;