import {Component, Input, ViewChild} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.css']
})
export class DemoTableComponent {

  @Input() tableRows!: any[];
  @Input() tableHeaders: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 20,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    suppressMenu: true,
    wrapHeaderText: true,
    autoHeaderHeight: true
  };
}
