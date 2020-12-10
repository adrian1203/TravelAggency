// server.js

console.log('May Node be with you');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
app.options('*', cors())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var allowedOrigins = ['http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
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
    user : Number,
    vote : Number
  });
  mongoose.model('Votes', Votes);

  const Comments = new Schema({
    user: Number,
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
    votes : [Votes],
    comments : [Comments]

  });

  mongoose.model('Tours', Tours);





  //REST API

  app.get('/tours', jsonParser, (req, res) => {
    console.log('getTours')
    var Tour = mongoose.model('Tours');
    Tour.find( function(err, tours) {
      console.log(tours);
        res.send(tours);
    });
  });


  app.post('/tours', jsonParser, (req, res) => {
    console.log('getTours')
    console.log(req.body);
    var Tour = mongoose.model('Tours');
    var tour = new Tour();
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




    //console.log(res);
  });


});



// const { ObjectId } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient

app.listen(5010,function(){
  console.log("server is running on port 5010");
});


// MongoClient.connect('mongodb+srv://admin:adminadmin@cluster0.5e5h3.mongodb.net/test?retryWrites=true&w=majority', {
//     useUnifiedTopology: true
//   })
//   .then(client => {
//     console.log('Connected to Database')

//     const db = client.db('star-wars-quotes');
//     const quotesCollection = db.collection('quotes');

//     app.listen(3000, function () {
//       console.log('listening on 3000')
//     })

//     app.use(bodyParser.urlencoded({
//       extended: true
//     }))
//     app.use(bodyParser.json())


//     app.get('/', (req, res) => {
//       res.sendFile(__dirname + '/index.html');

//       db.collection('quotes').find().toArray()
//       .then(results => {
//         console.log(results)
//       })
//       .catch(error => console.error(error));


//       quotesCollection.findOneAndUpdate(
//         { _id: '5fc92c5baa63a552543a5cc0' },
//         {
//           $set: {
//             name: 'maciek',
//             quote: 'tewwwwwwwwwwwwst'
//           }
//         },
//         {        upsert: true
//         }
//       )
//         .then(result => {/* ... */})
//         .catch(error => console.error(error))


//         quotesCollection.findOne(ObjectId('5fc92ccbaa63a552543a5cc2'))
//         .then(result => {console.log(result)} )



//     });



//     app.post('/quotes', (req, res) => {
//       console.log(req.body)
//       quotesCollection.insertOne(req.body)
//         .then(result => {
//           console.log(result)
//           res.redirect('/')

//         })
//         .catch(error => console.error(error))
//     })

//   })
//   .catch(error => console.error(error))
