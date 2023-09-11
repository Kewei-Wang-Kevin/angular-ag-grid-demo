import {Component, OnInit} from '@angular/core';
import {ApiDataService} from "./api-data.service";
import {ColDef, ColGroupDef} from "ag-grid-community";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tableRows: any[] = [];
  tableHeaders: (ColDef | ColGroupDef)[] = [];
  isLoading = true;

  constructor(private apiDataService: ApiDataService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.apiDataService.getData().subscribe((data: any) => {
      this.tableHeaders = Object.keys(data.entries[0]).map((key) => ({
        headerName: key,
        field: key,
        ...(key === 'Link' && {
          cellRenderer: (params: any) => `<a href="${params.value}" target="_blank">${params.value}</a>`,
        }),
      }));
      this.tableRows = data.entries;
      this.isLoading = false;
    });
  }
}
