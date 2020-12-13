// server.js


console.log('May Node be with you');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
app.options('*', cors())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})


var allowedOrigins = ['http://localhost:4200'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));


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
        _id : String,
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

    //GET TOURS
    app.get('/tours', jsonParser, (req, res) => {
        console.log('getTours')
        var Tour = mongoose.model('Tours');
        Tour.find(function (err, tours) {
            console.log(tours);
            res.send(tours);
        });
    });

    //GET TOUR
    app.get('/tours', jsonParser, (req, res) => {
        console.log('getTours')
        var Tour = mongoose.model('Tours');
        Tour.find(function (err, tours) {
            console.log(tours);
            res.send(tours);
        });
    });

    //GET TOUR by ID
    app.get('/tours/:id', jsonParser, (req, res) => {
        console.log('getTours')
        var Tour = mongoose.model('Tours');
        Tour.findById(req.params.id, function (err, tours) {
            console.log(tours);
            res.send(tours);
        });
    });

    //DELETE TOUR by ID
    app.delete('/tours/:id', jsonParser, (req, res) => {
        console.log('delete');
        console.log(req.params.id);
        var Tour = mongoose.model('Tours');
        Tour.findById(req.params.id, function (err, tours) {
            tours.remove();
            res.send(tours);
        });
    });

    //update TOUR by ID
    app.post('/tours/:id', jsonParser, (req, res) => {
        console.log('update');
        console.log(req.params.id);
        var Tour = mongoose.model('Tours');
        Tour.findById(req.params.id, function (err, tour) {
            console.log(req.body);
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
                console.log(req.body.gallery[i])
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
            console.log(tour);
            res.send(tour);
        });
    });


    //CREATE tour
    app.post('/tours', jsonParser, (req, res) => {
        console.log('getTours')
        console.log(req.body);
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
            console.log(req.body.gallery[i])
            tour.gallery.push(req.body.gallery[i]);
        }

        tour.save();
        console.log(tour);
    });

    //CREATE AppUser
    app.post('/users', jsonParser, (req, res) => {
        console.log('users')
        console.log(req.body);
        var AppUsers = mongoose.model('AppUsers');
        var user = new AppUsers();

        user._id = req.body._id;
        user.email = req.body.email;
        user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.role = req.body.role;
        user.save();
    });

    //GET User by ID
    app.get('/users/:id', jsonParser, (req, res) => {
        var AppUsers = mongoose.model('AppUsers');
        AppUsers.findById(req.params.id, function (err, user) {
            console.log(user);
            res.send(user);
        });
    });


    //UPDATE user

    app.post('/users/:id', jsonParser, (req, res) => {
        console.log('userrrrrrrrrrrrrrrrr')
        var AppUsers = mongoose.model('AppUsers');
        AppUsers.findById(req.params.id, function (err, user) {
            user._id = req.body._id;
            user.email = req.body.email;
            user.password = req.body.password;
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

});

app.listen(5010, function () {
    console.log("server is running on port 5010");
});



