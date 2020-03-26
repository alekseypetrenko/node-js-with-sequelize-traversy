const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./db');

// Test DB
db.authenticate()
  .then(() => console.log('Database is connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// Handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//app.set("views", "views"); // second views - it's our folder in the project

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join('public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is started on port ${PORT}`));