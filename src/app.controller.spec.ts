import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import expect = require('expect.js');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it("should return concerts by bandIds'", async () => {
      const resp = await appController.getConcerts({ bandIds: [1, 5, 6, 7] });
      expect(resp).to.eql([
        {
          band: '7 Year Bitch',
          location: 'Rote Fabrik, Zürich, Switzerland',
          date: '2019-11-22T14:32:43.882Z',
          latitude: 47.3429378,
          longitude: 8.5359445,
        },
        {
          band: '10 Years',
          location: 'Fabryka, Krakow, Poland',
          date: '2019-11-13T20:39:57.062Z',
          latitude: 50.0495905,
          longitude: 19.9604791,
        },
        {
          band: '8stops7',
          location: 'NYCB Theatre at Westbury, New York, NY, US',
          date: '2019-07-18T18:04:06.623Z',
          latitude: 40.7733696,
          longitude: -73.5589498,
        },
        {
          band: '8stops7',
          location: "Atlanta Room, Smith's Olde Bar, Atlanta, GA, US",
          date: '2019-06-29T02:41:25.106Z',
          latitude: 33.797612,
          longitude: -84.36885199999999,
        },
        {
          band: '8stops7',
          location: 'Maria am Ufer, Berlin, Germany',
          date: '2019-03-27T11:53:32.577Z',
          latitude: 52.5102954,
          longitude: 13.4325372,
        },
        {
          band: '10 Years',
          location: 'Northwell Health at Jones Beach Theater, New York, NY, US',
          date: '2019-01-16T19:22:40.309Z',
          latitude: 40.600814,
          longitude: -73.5020923,
        },
        {
          band: '7 Year Bitch',
          location: 'Rockwood Music Hall, New York, NY, US',
          date: '2018-10-17T11:48:10.888Z',
          latitude: 40.7223045,
          longitude: -73.9885815,
        },
        {
          band: '10 Years',
          location: 'Paradiso Kleine Zaal, Amsterdam, Netherlands',
          date: '2018-10-09T07:16:53.455Z',
          latitude: 52.3621516,
          longitude: 4.883806499999999,
        },
        {
          band: '10 Years',
          location: 'Conga Lounge, Oakland, CA, US',
          date: '2018-02-07T15:00:43.520Z',
          latitude: 37.8407267,
          longitude: -122.2511948,
        },
        {
          band: '8stops7',
          location: 'Paradiso, Amsterdam, Netherlands',
          date: '2017-10-09T08:48:22.764Z',
          latitude: 52.3621516,
          longitude: 4.883806499999999,
        },
      ]);
    });

    it("should return concerts by location'", async () => {
      const resp = await appController.getConcerts({
        radius: '200',
        latitude: 48,
        longitude: 2,
      });
      expect(resp).to.eql([
        {
          band: 'McFly',
          location: 'Le Centquatre-Paris (104), Paris, France',
          date: '2019-12-30T16:40:46.681Z',
          latitude: 48.8899821,
          longitude: 2.3714338,
        },
        {
          band: 'The Offspring',
          location: 'Casino De Paris, Paris, France',
          date: '2019-12-17T00:13:25.750Z',
          latitude: 48.87831480000001,
          longitude: 2.3301076,
        },
        {
          band: 'Forest for the Trees',
          location: 'Nouveau Casino, Paris, France',
          date: '2019-12-11T23:04:48.065Z',
          latitude: 48.86587129999999,
          longitude: 2.3778975,
        },
        {
          band: 'Sons of Day',
          location: 'Le Baiser Salé, Paris, France',
          date: '2019-12-04T04:05:25.429Z',
          latitude: 48.8598659,
          longitude: 2.347761,
        },
        {
          band: 'South Cry',
          location: 'Nouveau Casino, Paris, France',
          date: '2019-11-21T04:18:32.404Z',
          latitude: 48.86587129999999,
          longitude: 2.3778975,
        },
        {
          band: 'There For Tomorrow',
          location: 'Le Baiser Salé, Paris, France',
          date: '2019-11-18T09:04:38.567Z',
          latitude: 48.8598659,
          longitude: 2.347761,
        },
        {
          band: 'The Damned',
          location: 'Le Baiser Salé, Paris, France',
          date: '2019-11-15T04:07:09.414Z',
          latitude: 48.8598659,
          longitude: 2.347761,
        },
        {
          band: 'Young Guns',
          location: 'Le Baiser Salé, Paris, France',
          date: '2019-10-31T04:17:58.307Z',
          latitude: 48.8598659,
          longitude: 2.347761,
        },
        {
          band: 'Poor Old Lu',
          location: 'Bercy Arena, Paris, France',
          date: '2019-10-23T12:03:45.995Z',
          latitude: 48.8385379,
          longitude: 2.3785842,
        },
        {
          band: 'Lo-Pro',
          location: 'Le Centquatre-Paris (104), Paris, France',
          date: '2019-10-17T19:47:32.541Z',
          latitude: 48.8899821,
          longitude: 2.3714338,
        },
      ]);
    });

    it("should throw error when bad request'", async () => {
      try {
        await appController.getConcerts({
          latitude: 12,
        });
        expect().fail(' Should throw exception');
      } catch (e) {
        expect(e.response.error).to.eql(
          'Il faut avoir bandIds ou location dans la requete',
        );
        expect(e.response.status).to.eql(400);
      }
    });
  });
});
