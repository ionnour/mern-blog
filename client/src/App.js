import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

export default class App extends Component {

  state={
    title: "",
    body: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPosts();
  };

  getBlogPosts = () => {
    axios.get('/api')
      .then((res)=> {
        const data = res.data;
        this.setState({ posts: data});
      })
      .catch(()=>{
        alert('server error!')
      })
  }

  handleChange = ({target}) =>{
    const {name, value} = target
    this.setState({[name]: value})
  }

  resetInputs =() => {
    this.setState({
      title: "",
      body: ""
    })
  }

  submit = (event) => {
    event.preventDefault();

    const payLoad = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      url: '/api/save',
      method: 'POST',
      data: payLoad
    }).then(()=>{
      console.log("data has been sent!");
      this.resetInputs();
      this.getBlogPosts();
    })
    .catch(()=>{
      console.log("server error!");

    })
  }

  displayBlogPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="bp">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <h3>Post  In</h3>
        <form onSubmit={this.submit}>
          <div className="from-input">
            <input 
            type="text"
            name="title"
            placeholder="Enter title..."
            value={this.state.title}
            onChange={this.handleChange}
            />
          </div>
          <div className="from-input">
          <textarea 
            name="body" 
            cols="30" 
            rows="10 " 
            placeholder="Enter text..." 
            value={this.state.body} 
            onChange={this.handleChange}
          ></textarea>
          </div>
          <button>Submit</button>
        </form>


        <div className="blog-posts">
          {this.displayBlogPosts(this.state.posts)}
        </div>
      </div>
    )
  }
}
