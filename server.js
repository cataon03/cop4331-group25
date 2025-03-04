const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoURI = ''; 
let client;

async function connectToMongoDB() {
    try {
        client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}


app.post('/api/recruiter/signup', async (req, res) => {
    const { LinkedIn, Company, FirstName, LastName, Email, Password } = req.body;

    if (!LinkedIn || !Company || !FirstName || !LastName || !Email || !Password ) {
        return res.status(400).json({ error: 'All fields (LinkedIn, Company, FirstName, LastName, Email, and Password ) are required.' });
    }

    try {
        const db = client.db('RecruitmentSystem');
        const recruitersCollection = db.collection('Recruiters');

        //check email exists in all database
        const studentsCollection = db.collection('Students');
        const existingRecruiter = await recruitersCollection.findOne({ Email });
        const existingStudent = await studentsCollection.findOne({ Email });

        if (existingRecruiter || existingStudent) {
            return res.status(400).json({ error: 'Email Already Taken.' });
        }

        const newRecruiter = {
            LinkedIn,
            Company,
            Events: [], 
            FirstName,
            LastName,
            Email,
            Password
        };

        const result = await recruitersCollection.insertOne(newRecruiter);

        res.status(201).json({
            ID: result.insertedId,
            LinkedIn,
            Company,
            Events: [],
            FirstName,
            LastName,
            Email,
            Password,
            Error: '' //good practice to return empty string!
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred while signing up.' });
    }
});

app.post('/api/student/signup', async (req, res) => {
    const { School, Grad_Semester, Grad_Year, Bio, FirstName, LastName, Email, Password } = req.body;

    if (!School || !Grad_Semester || !Grad_Year || !FirstName || !LastName || !Email || !Password ) {
        return res.status(400).json({ error: 'All fields (School, Grad_Semester, Grad_Year, FirstName, LastName, Email, and Password ) are required.' });
    }

    try {
        const db = client.db('RecruitmentSystem');
        const studentsCollection = db.collection('Students');

        //check email exists in all database
        const recruitersCollection = db.collection('Recruiters');
        const existingRecruiter = await recruitersCollection.findOne({ Email });
        const existingStudent = await studentsCollection.findOne({ Email });

        if (existingRecruiter || existingStudent) {
            return res.status(400).json({ error: 'Email Already Taken.' });
        }

        const newStudent = {
            School,
            Grad_Semester,
            Grad_Year,
            Bio,
            Job_Performance: [],
            FirstName,
            LastName,
            Email,
            Password
        };

        const result = await studentsCollection.insertOne(newStudent);

        res.status(201).json({
            ID: result.insertedId,
            School,
            Grad_Semester,
            Grad_Year,
            Bio,
            Job_Performance: [],
            FirstName,
            LastName,
            Email,
            Password,
            Error: ''
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred while signing up.' });
    }
});


app.post('/api/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const db = client.db('RecruitmentSystem');

        //search from both collections 
        const [studentResult, recruiterResult] = await Promise.all([
            db.collection('Students').findOne({ Email: email, Password: password }),
            db.collection('Recruiters').findOne({ Email: email, Password: password })
        ]);

        let user = null;
        let role = '';

        if (studentResult) {
            user = studentResult;
            role = 'Student';
        } else if (recruiterResult) {
            user = recruiterResult;
            role = 'Recruiter';
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }

        res.status(200).json({
            ID: user._id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Role: role,
            Error: ''
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});