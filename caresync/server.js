const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// In-memory storage
let users = [];
let patients = [];
let cards = [];
let events = []; // Initialize the events array
let calendarSyncs = []; // Array to store calendar syncs

// User registration endpoint
app.post('/api/users/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { first_name, last_name, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// User login endpoint
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// Get all users endpoint
app.get('/users', (req, res) => {
    res.json(users);
});

// Add new patient with optional profile picture
app.post('/api/patients/create', upload.single('profilePicture'), (req, res) => {
    const { firstName, lastName } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    const newPatient = { firstName, lastName, profilePicture };
    patients.push(newPatient);

    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
});

// Get all patients endpoint
app.get('/api/patients/all', (req, res) => {
    res.json(patients);
});

// Add new card endpoint
app.post('/api/add_card', (req, res) => {
    const { cardholderName, cardNumber, expirationDate, cvc } = req.body;

    const newCard = {
        id: uuidv4(),
        cardholderName,
        cardNumber,
        expirationDate,
        cvc,
        maskedCardNumber: '**** **** **** ' + cardNumber.slice(-4)
    };

    cards.push(newCard);

    res.status(201).json(newCard);
});

// Edit card endpoint
app.post('/api/edit_card/:id', (req, res) => {
    const cardId = req.params.id;
    const { cardholderName, cardNumber, expirationDate, cvc } = req.body;

    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }

    cards[cardIndex] = {
        ...cards[cardIndex],
        cardholderName,
        cardNumber,
        expirationDate,
        cvc,
        maskedCardNumber: '**** **** **** ' + cardNumber.slice(-4)
    };

    res.status(200).json(cards[cardIndex]);
});

// Delete card endpoint
app.delete('/api/delete_card/:id', (req, res) => {
    const cardId = req.params.id;

    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }

    cards.splice(cardIndex, 1);

    res.status(204).end();
});

// Get all cards endpoint
app.get('/api/cards', (req, res) => {
    res.json(cards);
});

// CRUD Endpoints for CalendarSync
// Create a new event
app.post('/api/events', (req, res) => {
    const { title, year, month, day } = req.body;
    // Validate the incoming data
    if (!title || !year || !month || !day) {
        return res.status(400).json({ message: 'Invalid event data' });
    }
    const newEvent = { id: uuidv4(), title, year, month, day };
    events.push(newEvent); // Assuming 'events' is your in-memory storage
    res.status(201).json(newEvent);
});


// Fetch events for a specific month and year
app.get('/api/events/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() == year && eventDate.getMonth() + 1 == month;
    });
    res.json(filteredEvents);
});

// Update an existing event
app.put('/api/events/:id', (req, res) => {
    const eventId = req.params.id;
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Event not found' });
    }

    events[eventIndex] = { ...events[eventIndex], ...req.body };
    res.status(200).json(events[eventIndex]);
});

// Delete an event
app.delete('/api/events/:id', (req, res) => {
    const eventId = req.params.id;
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Event not found' });
    }

    events.splice(eventIndex, 1);
    res.status(204).end();
});

// Server setup
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
