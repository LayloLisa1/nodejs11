const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
let users = [];
app.get('/profile/:identifier', (req, res) => {
    const identifier = req.params.identifier;
    const user = users.find(u => u.username === identifier || u.email === identifier);
    if (!user) {
        return res.status(404).send('User not found.');
    }
    res.json(user);
});
app.put('/profile/:identifier', (req, res) => {
    const identifier = req.params.identifier;
    const { username, password, fullName, age, email, gender } = req.body;
    const index = users.findIndex(u => u.username === identifier || u.email === identifier);
    if (index === -1) {
        return res.status(404).send('User not found.');
    }
    users[index] = { username, password, fullName, age, email, gender };
    res.json(users[index]);
});
app.delete('/profile/:identifier', (req, res) => {
    const identifier = req.params.identifier;
    const index = users.findIndex(u => u.username === identifier || u.email === identifier);
    if (index === -1) {
        return res.status(404).send('User not found.');
    }
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
