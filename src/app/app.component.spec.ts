import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppComponent} from './app.component';
import {ApiDataService} from './api-data.service';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiDataService: ApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiDataService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiDataService = TestBed.inject(ApiDataService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isLoading as true', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should load data from ApiDataService and set tableRows and tableHeaders', () => {
    const mockData = {
      entries: [
        {Name: 'API 1', Description: 'Description 1', Link: 'https://api1.com'},
        {Name: 'API 2', Description: 'Description 2', Link: 'https://api2.com'},
      ],
    };

    spyOn(apiDataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.isLoading).toBeFalse();

    expect(component.tableRows).toEqual(mockData.entries);
    expect(component.tableHeaders.length).toBeGreaterThan(0);
  });
});
