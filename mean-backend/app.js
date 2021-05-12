const express = require('express');
const connectDB = require('../config/db');

const Post = require('./models/post');

const app = express();
connectDB();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content 
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });

});

app.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post)
        .then(result => {
            res.status(200).json({ message: 'Update successful!'})
        });
})

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({
                message: 'Posts fetched',
                posts: posts
            });
        });

});

app.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post not found."})
        }
    });
})

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json({message: 'Post deleted'});
        })
})

module.exports = app;