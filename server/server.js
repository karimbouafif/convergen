require('dotenv').config({ path: 'env.txt' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const http =require('http');
let mongoUrl = keys.mongoURI;
const server = http.createServer(app);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log('Connected to Local MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit();
  });


// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/boards', require('./routes/api/boards'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/cards', require('./routes/api/cards'));
app.use('/api/checklists', require('./routes/api/checklists'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.set('port', process.env.SERVER_PORT || 5000);

server.listen(app.get('port'), error => {
  if (error) {
    //console.error(`\n${error}`);
    server.close();
    process.exit(1);
  }
  console.log(`Server Listening at http://localhost:${app.get('port')}/`);
});