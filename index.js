const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index', {key:process.env.GOOGLE_API_KEY,link:process.env.LINK})
});

app.listen(process.env.PORT || 3000);
