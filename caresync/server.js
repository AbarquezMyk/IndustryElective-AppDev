const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Mock in-memory databases
let users = [];
let patients = [];
let cards = [];
let events = [];

// User registration endpoint
app.post(
    '/api/users/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('name').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('phoneNumber').notEmpty().withMessage('Phone number is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
            .matches(/[A-Z]/)
            .withMessage('Password must contain an uppercase letter'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, name, email, phoneNumber, password } = req.body;

        // Check if the user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            userId: uuidv4(),
            username,
            name,
            email,
            phoneNumber,
            password: hashedPassword
        };

        // Save new user
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
);

/// User login endpoint
app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Respond with a success message and user info
    res.status(200).json({
        message: 'Login successful',
        id: user.userId, // Include userId for the frontend
        username: user.username, 
        token: uuidv4(), // Generate a mock token
    });
});

// Mock in-memory database for departments
let departments = [];

// Create a new department
app.post('/api/departments', (req, res) => {
    const { departmentName, description } = req.body;

    if (!departmentName || !description) {
        return res.status(400).json({ message: 'Department name and description are required' });
    }

    const newDepartment = {
        departmentId: uuidv4(),
        departmentName,
        description,
    };

    departments.push(newDepartment);
    res.status(201).json({ message: 'Department created successfully', department: newDepartment });
});

// Get all departments
app.get('/api/departments', (req, res) => {
    res.json(departments);
});

// Update a department
app.put('/api/departments/:id', (req, res) => {
    const { id } = req.params;
    const { departmentName, description } = req.body;

    const departmentIndex = departments.findIndex((dept) => dept.departmentId === id);
    if (departmentIndex === -1) {
        return res.status(404).json({ message: 'Department not found' });
    }

    if (!departmentName || !description) {
        return res.status(400).json({ message: 'Department name and description are required' });
    }

    departments[departmentIndex] = { ...departments[departmentIndex], departmentName, description };
    res.json({ message: 'Department updated successfully', department: departments[departmentIndex] });
});

// Delete a department
app.delete('/api/departments/:id', (req, res) => {
    const { id } = req.params;

    const departmentIndex = departments.findIndex((dept) => dept.departmentId === id);
    if (departmentIndex === -1) {
        return res.status(404).json({ message: 'Department not found' });
    }

    departments.splice(departmentIndex, 1);
    res.json({ message: 'Department deleted successfully' });
});


// Get all users endpoint
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Patient CRUD operations
app.post('/api/patients/create', upload.single('profilePicture'), (req, res) => {
    const { firstName, lastName } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    const newPatient = { patientId: uuidv4(), firstName, lastName, profilePicture };
    patients.push(newPatient);

    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
});

app.get('/api/patients/all', (req, res) => {
    res.json(patients);
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred' });
});

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
