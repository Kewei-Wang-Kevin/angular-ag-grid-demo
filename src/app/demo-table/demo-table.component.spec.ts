import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { DemoTableComponent } from './demo-table.component';

describe('DemoTableComponent', () => {
  let fixture: ComponentFixture<DemoTableComponent>;
  let component: DemoTableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoTableComponent],
      imports: [AgGridModule],
    });

    fixture = TestBed.createComponent(DemoTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default column definitions', () => {
    expect(component.defaultColDef).toEqual({
      flex: 1,
      minWidth: 20,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      suppressMenu: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    });
  });

  it('should have inputs for tableRows and tableHeaders', () => {
    expect(component.tableRows).toBeUndefined();
    expect(component.tableHeaders).toEqual([]);
  });
});
