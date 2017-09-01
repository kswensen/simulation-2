const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    connectionString = require('../config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

massive(connectionString).then(db => {
    app.set('db', db);
});

app.post('/api/properties', (req, res) => {
    const { propertyName, propertyDescription, address, city, state, zip, imgURL, loanAmount, monthlyMortgage, desiredRent } = req.body;
    req.app.get('db').createListing(propertyName, propertyDescription, address, city, state, zip, imgURL, loanAmount, monthlyMortgage, desiredRent).then(post => {
        res.status(200).send();
    })
})

app.get('/api/properties', (req, res) => {
    req.app.get('db').getAllProperties().then(listings => {
        res.status(200).send(listings);
    })
})

app.delete('/api/properties/:id', (req, res) => {
    const id = req.params.id;
    req.app.get('db').deleteProperty(id).then(deleted => {
        res.status(200).send();
    })
})

app.get('/api/properties/filter', (req, res) => {
    const {value} = req.query;
    req.app.get('db').filterListing(value).then(post => {
        res.status(200).send(post);
    })
})

const port = 3021;
app.listen(port, console.log(`It's lit on ${port} fam!`));