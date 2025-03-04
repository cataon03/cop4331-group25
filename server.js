const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://root:COP4331@cluster0.a7mcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
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


app.post('/api/signup', async (req, res) => {
    const { LinkedIn, Company, Name, Email, Password } = req.body;

    if (!LinkedIn || !Company || !Name || !Email || !Password ) {
        return res.status(400).json({ error: 'All fields (LinkedIn, Company, Name, Email, and Password ) are required.' });
    }

    try {
        const db = client.db('RecruitmentSystem');
        const recruitersCollection = db.collection('Recruiters');


        const newRecruiter = {
            LinkedIn,
            Company,
            Events: [], 
            Name,
            Email,
            Password
        };

        const result = await recruitersCollection.insertOne(newRecruiter);

        res.status(201).json({
            _id: result.insertedId,
            LinkedIn,
            Company,
            Events: [],
            Name,
            Email,
            Password
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred while signing up.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});