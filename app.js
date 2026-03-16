// Import the express module
import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

// Create an express application
const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.get('/db-test', async (req, res) => {
    try {
        const contacts = await pool.query('SELECT * FROM contacts');
        res.send(contacts[0]);
    } catch (err) {
       console.error('Database error:', err);
       res.status(500).send('Database error: ' + err.message);
    }
});

// Define a port number where server will listen
const PORT = 3012;

// Enable static file serving
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');

// "Middleware" that lets express read form data and store in req.body
app.use(express.urlencoded ({ extended: true }));

// Create temp array to store entries
const contacts = [];

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.render(`home`);
});

app.get('/portfolio', (req, res) => {
    res.render(`portfolio`);
})

app.get('/guestbook', (req, res) => {
    res.render(`form`);
});

// Confirmation route
app.post('/guestbook', async (req, res) => {
    try {
        const contact = req.body;

        console.log('New post submitted: ', contact);

        const sql = `insert into contacts(first_name, last_name, job_title, company, 
            linkedin, email, meet, other, comments)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const params = [
            contact['first-name'],
            contact['last-name'],
            contact['job-title'] || null,
            contact.company || null,
            contact.linkedin || null,
            contact.email || null,
            contact.meet,
            contact.other || null,
            contact.comments || null
        ];

        const result = await pool.execute(sql, params);
        console.log('Contact saved with ID:', result[0].insertId);

        res.render(`confirmation`, { contact });
    } catch (err) {
        console.error('Error saving post:', err);
        res.status(500).send('Sorry, there was an error processing your post. Please try again.');
    }
});

// Admin route
app.get('/admin', async (req, res) => {
    try {
        // Fetch all orders from database, newest first
        const [contacts] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');  

        // Render the admin page
        res.render('admin', { contacts });        

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading contacts: ' + err.message);
    }
});

// Start server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});