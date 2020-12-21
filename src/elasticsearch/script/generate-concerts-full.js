'use strict';

var bandsFile = '../data/bands.json';
var concertsFile = '../data/concerts.json';
var concertsFullFile = '../data/concerts-full.json';
var venuesFile = '../data/venues.json';
var fs = require('fs');
var bands = {};
var venues = {};

function getBandsAndsVenues() {
  var jsonBandsContent = JSON.parse(fs.readFileSync(bandsFile, 'utf8'));

  for(var object in jsonBandsContent)
  {
    var json = jsonBandsContent[object];
    bands[json.id] = json.name;
  }

  var jsonVenuesContent = JSON.parse(fs.readFileSync(venuesFile, 'utf8'));

  for(var object in jsonVenuesContent)
  {
    var json = jsonVenuesContent[object];
    venues[json.id] = {
      name: json.name,
      latitude: json.latitude,
      longitude: json.longitude
    };
  }
}

function generateConcertsFull() {

  var jsonConcertsContent = JSON.parse(fs.readFileSync(concertsFile, 'utf8'));
  var concerts = [];
  for(var object in jsonConcertsContent)
  {
    var json = jsonConcertsContent[object];
    var concert ={
      id: parseInt(object, 10),
      bandId : json.bandId,
      venueId: json.venueId,
      date: new Date(json.date),
      concertLocation:  {
        lat: venues[json.venueId].latitude,
        lon: venues[json.venueId].longitude
      },
      bandName : bands[json.bandId],
      venueName : venues[json.venueId].name
    };
    concerts.push(concert);
  }

  var stream = fs.createWriteStream(concertsFullFile);

  stream.once('open', function(fd) {

    for(var object in concerts)
    {
      stream.write("{ \"index\" : { \"_index\" : \"wemaintain\", \"_type\" : \"concerts\", \"_id\" : \""+concerts[object].id+"\" } }\n");
      stream.write(JSON.stringify(concerts[object])+"\n");
    }

    stream.end();
  });
}

getBandsAndsVenues();
setImmediate(generateConcertsFull);