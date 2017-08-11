var express = require('express');
var jwt = require('express-jwt');
var cors = require('cors');
var jwks = require('jwks-rsa');
var bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Middle-ware 
const authCheck = jwt({
	secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://ram1990.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'https://ram1990.auth0.com/api/v2/',
    issuer: 'https://ram1990.auth0.com/',
    algorithms: ['RS256']
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
app.get('/api/jedis', authCheck, function(req, res) {
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