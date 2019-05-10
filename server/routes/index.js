var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var connectionString = "mongodb://Admin:admin123@ds113003.mlab.com:13003/darbas_db";


// Get Homepage
router.get('/', function(req, res){
	var testas
	(async () => {
		let client = await MongoClient.connect(connectionString,{ useNewUrlParser: true });

		let db = client.db('darbas_db');
		try {
			const result = await db.collection("users").find().toArray();
			testas = result;
			client.close();
			res.render('index', {testas});
		}
		catch (error){
			console.log(error)
		}
	})().catch(err => console.error("Klaida:" + err));
});


//FAQ
router.get('/FAQ', function(req, res){
	res.render('faq');
});


module.exports = router;