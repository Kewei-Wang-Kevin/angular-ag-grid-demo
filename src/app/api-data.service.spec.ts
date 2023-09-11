import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiDataService } from './api-data.service';

describe('ApiDataService', () => {
  let apiDataService: ApiDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiDataService],
    });
    apiDataService = TestBed.inject(ApiDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiDataService).toBeTruthy();
  });

  it('should fetch data from the API', () => {
    const mockData = {
      entries: [
        { Name: 'API 1', Description: 'Description 1', Link: 'https://api1.com' },
        { Name: 'API 2', Description: 'Description 2', Link: 'https://api2.com' },
      ],
    };

    apiDataService.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('https://api.publicapis.org/entries');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });
});
