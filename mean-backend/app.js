const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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
        msg: 'Posts fetched',
        posts: posts
    });
});

module.exports = app;