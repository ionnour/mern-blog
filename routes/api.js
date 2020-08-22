const express = require('express');

const router = express.Router();
const BlogPost = require('../models/blogPost')


router.get('/', (req, res) => {

  BlogPost.find({})
    .then((data)=>{
      //console.log("Data: ", data);
      res.json(data);
    })
    .catch((error)=>{
      console.log("error: ", error);
    }); 
});

router.get('/name', (req, res) => {
  const data = {
    user: "name",
    age: 50
  };
  res.json(data);
});

router.post('/save', (req, res) => {
  const data = req.body;  
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((error)=> {
    if (error) {
      return res.status(500).json({msg: "server error!!!"})
    } 
    return res.json({msg: "data saved!!!"});
  });
  
})

module.exports= router; 