// ignore this file, this was the file needed for MERN C
/*
require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/addcard', async (req, res, next) =>
    {
        // incoming: userId, color
        // outgoing: error
        const { userId, card } = req.body;
        const newCard = {Card:card,UserId:userId};
    
        var error = '';
        
        try
        {
            const db = client.db('COP4331Cards');
            const result = db.collection('Cards').insertOne(newCard);
        }
        catch(e)
        {
            error = e.toString();
        }
    
        cardList.push( card );
    
        var ret = { error: error };
        res.status(200).json(ret);
    });
    
    app.post('/api/login', async (req, res, next) =>
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';
    
        const { login, password } = req.body;
        const db = client.db();
    
        const results = await db.collection('Users').find().toArray();//.find({Login:login,Password:password}).toArray();
    
        // Delete this testing part
        const collections = await db.listCollections().toArray();
        const dbs = await client.db().admin().listDatabases();
        console.log('Collections in database:', collections);
        console.log(dbs);
        const dbName = 'COP4331Cards';
        const dbcurr = client.db(dbName);
        const collectionscurr = await dbcurr.listCollections().toArray();
        console.log('Collections in database:', collectionscurr);
        // Answer: So the document link was bad, the Users collection is inside the COP4331Cards database which the link
        // does not correctly link to.
    
        console.log(results);
    
        var id = -1;
        var fn = '';
        var ln = '';
    
        if( results.length > 0 )
        {
            id = results[0].UserId;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        }
    
        var ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    });
    
    app.post('/api/searchcards', async (req, res, next) =>
    {
        // incoming: userId, search
        // outgoing: results[], error
        var error = '';
    
        const { userId, search } = req.body;
    
        var _search = search.trim();
    
        const db = client.db();
        const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
    
        var _ret = [];
    
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i].Card );
        }
    
        var ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });

}
*/