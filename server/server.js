const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const MongoClient = require('mongodb').MongoClient; 

const ObjectId = require('mongodb').ObjectID;

var connectionString = "mongodb://Admin:Admin1@ds113003.mlab.com:13003/darbas_db";

const port = process.env.PORT || 5000;

const routes = require('./routes/index');

const app = express();
 
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', routes);

// create a GET route

app.get('/get_square_grid', (req, res) => {
	(async () => {
		let client = await MongoClient.connect(connectionString,{ useNewUrlParser: true });
		let db = client.db('darbas_db');
		try {
			const result = await db.collection("squareGrid").find().toArray();
			client.close();
            res.json(result);
		}
		catch (error){
			console.log(error)
		}
	})().catch(err => console.error("Klaida:" + err));
});

app.listen(port, () => console.log(`Listening on port ${port}`));