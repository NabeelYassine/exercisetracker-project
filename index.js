// index.js
// Exercise Tracker Microservice - Backend Implementation

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// In-memory storage for users and exercises 
let users = [];
let exercises = [];
let currentUserId = 1;
let currentExerciseId = 1;

// Route handler for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to create a new user
app.post("/api/users", (req, res) => {
  const username = req.body.username;
  
  if (!username) {
    return res.json({ error: 'username is required' });
  }
  
  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  
  if (existingUser) {
    return res.json(existingUser);
  }
  
  // Create new user
  const newUser = {
    username: username,
    _id: currentUserId.toString()
  };
  
  users.push(newUser);
  currentUserId++;
  
  res.json(newUser);
});

// API endpoint to get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// API endpoint to add an exercise
app.post("/api/users/:_id/exercises", (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  let date = req.body.date;
  
  // Validate required fields
  if (!description || !duration) {
    return res.json({ error: 'description and duration are required' });
  }
  
  // Find user
  const user = users.find(u => u._id === userId);
  
  if (!user) {
    return res.json({ error: 'user not found' });
  }
  
  // Validate duration is a number
  if (isNaN(duration)) {
    return res.json({ error: 'duration must be a number' });
  }
  
  // Set date to current date if not provided
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  
  // Create exercise object
  const exercise = {
    _id: currentExerciseId.toString(),
    userId: userId,
    description: description,
    duration: duration,
    date: date.toDateString()
  };
  
  exercises.push(exercise);
  currentExerciseId++;
  
  // Return user object with exercise fields
  res.json({
    _id: user._id,
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date
  });
});

// API endpoint to get exercise log
app.get("/api/users/:_id/logs", (req, res) => {
  const userId = req.params._id;
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  
  // Find user
  const user = users.find(u => u._id === userId);
  
  if (!user) {
    return res.json({ error: 'user not found' });
  }
  
  // Get user's exercises
  let userExercises = exercises.filter(ex => ex.userId === userId);
  
  // Apply date filters if provided
  if (from) {
    userExercises = userExercises.filter(ex => new Date(ex.date) >= from);
  }
  
  if (to) {
    userExercises = userExercises.filter(ex => new Date(ex.date) <= to);
  }
  
  // Apply limit if provided
  if (limit) {
    userExercises = userExercises.slice(0, limit);
  }
  
  // Format response
  const log = userExercises.map(ex => ({
    description: ex.description,
    duration: ex.duration,
    date: ex.date
  }));
  
  res.json({
    _id: user._id,
    username: user.username,
    count: log.length,
    log: log
  });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Exercise Tracker Microservice is running on port ' + listener.address().port);
});

module.exports = app;