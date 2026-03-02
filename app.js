// Import the express module
import express from 'express';

// Create an express application
const app = express();

// Define a port number where server will listen
const PORT = 3012;

// Enable static file serving
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');

// "Middleware" that lets express read form data and store in req.body
app.use(express.urlencoded ({ extended: true }));

// Create temp array to store entries
const entries = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.render(`home`);
});

app.get('/guestbook', (req, res) => {
    res.render(`form`);
});

// Confirmation route
app.post('/guestbook', (req, res) => {
    const entry = {
        first_name: req.body['first-name'],
        last_name: req.body['last-name'],
        job_title: req.body['job-title'],
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        comments: req.body.comments,
        timestamp: new Date()
    };

    entries.push(entry);

    res.render(`confirmation`, { entry });
});

// Admin route
app.get('/admin', (req, res) => {
    res.render('admin', { entries });
})

// Start server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});