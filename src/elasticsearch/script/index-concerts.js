'use strict';

var fs = require('fs');
var concertsFile = '../data/concerts-full.json';
var elasticsearch=require('elasticsearch');


const client = new elasticsearch.Client( {
  hosts: [
    'http://localhost:9200'  ]
});

function indexConcerts() {
  var content = fs.readFileSync(concertsFile, 'utf8');
  client.bulk({ refresh: true, body: content });
}

function putMapping() {
  client.indices.create({
    index: 'wemaintain'
  },function(err,resp,status){
    if (err) {
      console.log('error: ' + err);
    }
    else {
      console.log('ok: ' + resp);
      client.indices.putMapping({
        index: 'wemaintain',
        type: 'concerts',
        includeTypeName: true,
        body: {
          properties: {
            id: {
              type: 'long'
            },
            bandId: {
              type: 'long'
            },
            bandName: {
              type: 'text'
            },
            venueId: {
              type: 'long'
            },
            venueName: {
              type: 'text'
            },
            concertLocation: {
              type: 'geo_point'
            },
            date: {
              type: 'date'
            }
          }
        }
      },function(err,resp,status){
        if (err) {
          console.log('error: ' + err);
        }
        else {
          console.log('ok: ' + resp);
          indexConcerts();
        }
      });
    }
  });

}

putMapping();