'use strict';

import {
  Controller,
  Get,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getConcerts(@Req() request) {
    if (
      !request['bandIds'] &&
      !(request['latitude'] && request['longitude'] && request['radius'])
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Il faut avoir bandIds ou location dans la requete',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.getConcerts(request);
  }
}
