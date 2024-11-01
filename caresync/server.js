const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

let users = [];
let patients = [];

app.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { first_name, last_name, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/api/patients/create', upload.single('profilePicture'), (req, res) => {
    const { firstName, lastName } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    const newPatient = { firstName, lastName, profilePicture };
    patients.push(newPatient);

    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
});

app.get('/api/patients/all', (req, res) => {
    res.json(patients);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});