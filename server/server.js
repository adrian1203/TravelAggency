// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
app.options('*', cors())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const admin = require('firebase-admin')

admin.initializeApp({ projectId: 'ztwprojekt' });


async function decodeIDToken(req, res, next) {
	if (req.headers?.authorization != undefined) {
		const idToken = req.headers.authorization;
		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req['currentUser'] = decodedToken;
		} catch (err) {
			console.log(err);
		}
	}
	next();
}

app.use(decodeIDToken);


var allowedOrigins = ['http://localhost:4200'];
app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			var msg = 'The CORS policy for this site does not ' +
				'allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));

const http = require('http').Server(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:4200",
		methods: ["GET", "POST"]
	}
});
http.listen('5010')

app.get('/hello', (req, res) => {

	const user = req['currentUser'];

	if (!user) {
		res.status(403).send('You must be logged in!');
	} else {
		res.send('zalogowany');
	}
})

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:adminadmin@cluster0.5e5h3.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {


	//mongo db models
	const Schema = mongoose.Schema;

	const Votes = new Schema({
		userId: String,
		vote: Number
	});
	mongoose.model('Votes', Votes);

	const Comments = new Schema({
		userId: String,
		text: String,
	});
	mongoose.model('Comments', Comments);

	const Tours = new Schema({
		id: Number,
		name: String,
		country: String,
		startDate: Date,
		endDate: Date,
		price: Number,
		places: Number,
		description: String,
		pictureLink: String,
		reservePlaces: Number,
		category: String,
		opinion: Number,
		gallery: [String],
		votes: [Votes],
		comments: [Comments]

	});

	mongoose.model('Tours', Tours);


	const Reservations = new Schema({
		tourId: String,
		places: Number
	})

	mongoose.model('Reservations', Reservations);


	const AppUsers = new Schema({
		_id: String,
		string: Number,
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		token: String,
		role: String,
		reservation: [Reservations]
	})

	mongoose.model('AppUsers', AppUsers);


	//REST API

	//GET TOUR
	app.get('/tours', jsonParser, (req, res) => {
		var Tour = mongoose.model('Tours');
		Tour.find(function (err, tours) {
			res.send(tours);
		});
	});

	//GET TOUR by ID
	app.get('/tours/:id', jsonParser, (req, res) => {
		var Tour = mongoose.model('Tours');
		Tour.findById(req.params.id, function (err, tours) {
			res.send(tours);
		});
	});

	//DELETE TOUR by ID
	app.delete('/tours/:id', jsonParser, (req, res) => {
		const user = req['currentUser'];
		if (!user) {
			res.status(403).send('You must be logged in!');
		}
		var Tour = mongoose.model('Tours');
		Tour.findById(req.params.id, function (err, tours) {
			tours.remove();
			res.send(tours);
		});
	});

	//update TOUR by ID
	app.post('/tours/:id', jsonParser, (req, res) => {
		const user = req['currentUser'];
		if (!user) {
			res.status(403).send('You must be logged in!');
		}
		var Tour = mongoose.model('Tours');
		Tour.findById(req.params.id, function (err, tour) {
			tour.name = req.body.name;
			tour.reservePlaces = req.body.reservePlaces;
			tour.opinion = req.body.opinion;
			tour.votes = req.body.votes;
			tour.country = req.body.country;
			tour.description = req.body.description;
			tour.startDate = req.body.startDate;
			tour.endDate = req.body.endDate;
			tour.price = req.body.price;
			tour.places = req.body.places;
			tour.pictureLink = req.body.pictureLink;
			tour.category = req.body.category;


			tour.gallery = new Array();
			for (var i = 0; i < req.body.gallery.length; i++) {
				tour.gallery.push(req.body.gallery[i]);
			}

			tour.votes = new Array();
			for (var i = 0; i < req.body.votes.length; i++) {
				var Votes = mongoose.model('Votes');
				var vote = new Votes();
				vote.vote = req.body.votes[i].vote;
				vote.userId = req.body.votes[i].userId;
				tour.votes.push(vote);
			}

			tour.comments = new Array();
			for (var i = 0; i < req.body.comments.length; i++) {
				var Comments = mongoose.model('Comments');
				var comment = new Comments();
				comment.text = req.body.comments[i].text;
				comment.userId = req.body.comments[i].userId;
				tour.comments.push(comment);
			}

			tour.save()
			res.send(tour);
		});
	});


	//CREATE tour
	app.post('/tours', jsonParser, (req, res) => {
		const user = req['currentUser'];
		if (!user) {
			res.status(403).send('You must be logged in!');
		}
		var Tour = mongoose.model('Tours');
		var tour = new Tour();
		tour.name = req.body.name;
		tour.reservePlaces = req.body.reservePlaces;
		tour.opinion = req.body.opinion;
		tour.votes = req.body.votes;
		tour.country = req.body.country;
		tour.description = req.body.description;
		tour.startDate = req.body.startDate;
		tour.endDate = req.body.endDate;
		tour.price = req.body.price;
		tour.places = req.body.places;
		tour.pictureLink = req.body.pictureLink;
		tour.category = req.body.category;
		tour.gallery = new Array();
		for (var i = 0; i < req.body.gallery.length; i++) {
			tour.gallery.push(req.body.gallery[i]);
		}

		tour.save();
	});

	//CREATE AppUser
	app.post('/users', jsonParser, (req, res) => {
		var AppUsers = mongoose.model('AppUsers');
		var user = new AppUsers();

		user._id = req.body._id;
		user.email = req.body.email;
		user.password = req.body.password;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.role = req.body.role;
		user.save();
		res.send(user);
	});

	//GET User by ID
	app.get('/users/:id', jsonParser, (req, res) => {
		const user = req['currentUser'];
		if (!user) {
			res.status(403).send('You must be logged in!');
		}
		var AppUsers = mongoose.model('AppUsers');
		AppUsers.findById(req.params.id, function (err, user) {
			res.send(user);
		});
	});


	//UPDATE user

	app.post('/users/:id', jsonParser, (req, res) => {
		const user = req['currentUser'];
		if (!user) {
			res.status(403).send('You must be logged in!');
		}
		var AppUsers = mongoose.model('AppUsers');
		AppUsers.findById(req.params.id, function (err, user) {
			user._id = req.body._id;
			user.email = req.body.email;
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.role = req.body.role;

			user.reservation = new Array();
			for (var i = 0; i < req.body.reservation.length; i++) {
				var Reservations = mongoose.model('Reservations');
				var reservation = new Reservations();
				reservation.tourId = req.body.reservation[i].tourId;
				reservation.places = req.body.reservation[i].places;
				user.reservation.push(reservation);
			}
			user.save();
			res.send(user);
		});
	});

	io.on('connection', function (client) {
		app.get('/sale', (req, res) => {
			client.emit('startSale', 'start');
			io.emit('startSale', 'start');
			res.send(req.body)
			// setTimeout(function() {
			// 	client.emit('endSale', req.body);
			// 	io.emit('endSale', req.body);
			// }, 180000)
		});

		app.get('/sale-stop', (req, res) => {
			client.emit('endSale', req.body);
			io.emit('endSale', req.body);
			res.send(req.body)
		});
	});

});





