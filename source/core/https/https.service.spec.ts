import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../app/app.module';
import { UtilService } from '../util/util.service';
import { HttpsService } from './https.service';

UtilService.describeSilent('UtilService', () => {
  let httpsService: HttpsService;

  beforeEach(async() => {
    const testModule = await Test.createTestingModule({
      imports: [ AppModule ],
      providers: [ HttpsService, UtilService ],
    }).compile();

    httpsService = await testModule.resolve(HttpsService);
  });

  describe('request', () => {

    it('it should GET Google homepage', async() => {
      httpsService.setupInstance({
        baseUrl: 'https://www.google.com',
      });
      const data = await httpsService.get('/');
      expect(data).toMatch(/google/gi);
    });

    it('it should throw a timeout exception', async() => {
      let errorMessage: string;
      httpsService.setupInstance({
        baseUrl: 'https://www.google.com',
        defaultTimeout: 1,
      });
      try {
        await httpsService.get('/');
      }
      catch (e) {
        errorMessage = e.message;
      }
      expect(errorMessage).toMatch(/timed out/gi);
    });

    it('it should throw an internal server error exception', async() => {
      let errorStatus: number;
      httpsService.setupInstance({
        baseUrl: 'https://www.google.com',
      });
      try {
        await httpsService.get('/path-that-certainly-does-not-exist');
      }
      catch (e) {
        errorStatus = e.status;
      }
      expect(errorStatus).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    });

  });

});