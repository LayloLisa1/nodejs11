const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password, fullName, age, email, gender } = req.body;
    if (!username || username.length < 3) {
        return res.status(400).send('Username must be at least 3 characters long.');
    }
    if (!password || password.length < 5) {
        return res.status(400).send('Password must be at least 5 characters long.');
    }
    if (!fullName || fullName.length < 10) {
        return res.status(400).send('Full name must be at least 10 characters long.');
    }
    if (!age || age < 10) {
        return res.status(400).send('Age must be at least 10.');
    }
    if (!email) {
        return res.status(400).send('Email is required.');
    }
    if (gender !== 'male' && gender !== 'female') {
        return res.status(400).send('Gender must be "male" or "female".');
    }
    let users = [];
    try {
        const usersData = fs.readFileSync('users.json', 'utf8');
        users = JSON.parse(usersData);
    } catch (err) {
        console.error('Error reading users data:', err);
        return res.status(500).send('Internal Server Error');
    }
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(400).send('Username or email already exists.');
    }
    const newUser = { username, password, fullName, age, email, gender };
    users.push(newUser);
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing users data:', err);
        return res.status(500).send('Internal Server Error');
    }
    res.status(201).send('User registered successfully.');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
