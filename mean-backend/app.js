const express = require('express');

const Post = require('./models/post');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content 
    });
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'sdfahie34', 
            title: 'First server post', 
            content: "Server content"
        },
        {
            id: 'aekruvjhe43', 
            title: 'Second server post', 
            content: "Server content 2"
        }
    ];
    
    return res.status(200).json({
        message: 'Posts fetched',
        posts: posts
    });
});

module.exports = app;