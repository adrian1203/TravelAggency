// server.js
console.log('May Node be with you');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:adminadmin@cluster0.5e5h3.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  const Schema = mongoose.Schema;

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
    gallery: [[String]],
    tourInstances: [[{
      startDate: Date,
      endDate: Date,
      reservedPlace: Number}]],
    longInDay: Number,
  });
  mongoose.model('Tours', Tours);

  var Tour = mongoose.model('Tours');
  var tour = new Tour();
  tour.id = 123453333;
  tour.gallery[0] = 'siemka';
  tour.gallery[1] = 'siemkagggggggg';
  tour.tourInstances[0] = {reservedPlace : 123, startDate : new Date()}


  tour.save(e => {
    console.log(e);
  })

  app.get('/tours', (req, res) => {
    console.log('getTours')
    var Tour = mongoose.model('Tours');
    Tour.find( function(err, tours) {
      for (var i = 0; i < tours.length; i++) {
        console.log('ID:' + tours[i]._id);
        console.log(tours[i]);
        res.send(tours);
      }
    });
   // res.sendFile(__dirname + '/index.html');
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
