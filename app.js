var express = require('express');
var jwt = require('express-jwt');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

// Middle-ware 
const authCheck = jwt({
	secret: 'AUTH0_SECRET',
	audience: 'AUTH0_CLIENT_ID'
});

var jedis = [
  {
    id: 1,
    name: 'Luke Skywalker',
    image: 'http://localhost:7000/images/luke-skywalker.jpg'
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    image: 'http://localhost:7000/images/anakin-skywalker.png'
  },
  {
    id: 3,
    name: 'Yoda',
    image: 'http://localhost:7000/images/yoda.png'
  },
  {
    id: 4,
    name: 'Obi-Wan Kenobi',
    image: 'http://localhost:7000/images/obi-wan-kenobi.jpg'
  },
  {
    id: 5,
    name: 'Mace Windu',
    image: 'http://localhost:7000/images/mace-windu.jpg'
  }
];
//Get All
app.get('/api/jedis', function(req, res) {
	res.json(jedis);
});

app.get('/api/jedis/:id', authCheck, function(req, res) {
	jedis.filter(function(jedi) {
		if(jedi.id == req.params.id) {
			res.json(jedi);
		}
	});
});

app.listen(7000);
console.log("Server running at port 7000");