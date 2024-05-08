const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
let blogPosts = [];
app.post('/posts', (req, res) => {
    const newPost = req.body;
    newPost.id = generateId();
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});
app.get('/posts', (req, res) => {
    res.json(blogPosts);
});
app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).send('Post not found.');
    }
    res.json(post);
});
app.put('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    const index = blogPosts.findIndex(post => post.id === postId);
    if (index === -1) {
        return res.status(404).send('Post not found.');
    }
    blogPosts[index] = { ...blogPosts[index], ...updatedPost };
    res.json(blogPosts[index]);
});
app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const index = blogPosts.findIndex(post => post.id === postId);
    if (index === -1) {
        return res.status(404).send('Post not found.');
    }
    const deletedPost = blogPosts.splice(index, 1);
    res.json(deletedPost);
});
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
