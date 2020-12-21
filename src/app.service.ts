'use strict';

import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
});

@Injectable()
export class AppService {
  async getConcerts(request) {
    const body = {
      sort: [{ date: { order: 'desc' } }],
      query: {
        bool: {
          filter: [],
        },
      },
    };
    if (request.bandIds && request.bandIds.length > 0) {
      const bandRequest = { terms: { bandId: request.bandIds } };
      body.query.bool.filter.push(bandRequest);
    }
    if (request.latitude && request.longitude && request.radius) {
      const geoRequest = {
        geo_distance: {
          distance: request.radius + 'km',
          concertLocation: {
            lat: request.latitude,
            lon: request.longitude,
          },
        },
      };
      body.query.bool.filter.push(geoRequest);
    }

    const resp = await client.search({
      index: 'wemaintain',
      type: 'concerts',
      body: body,
    });

    const result = [];

    if (resp.body && resp.body.hits && resp.body.hits.hits) {
      const hits = resp.body.hits.hits;
      for (const idx in hits) {
        const concert = hits[idx]._source;
        const formattedConcert = {
          band: concert.bandName,
          location: concert.venueName,
          date: concert.date,
          latitude: concert.concertLocation.lat,
          longitude: concert.concertLocation.lon,
        };
        result.push(formattedConcert);
      }
    }
    return result;
  }
}
