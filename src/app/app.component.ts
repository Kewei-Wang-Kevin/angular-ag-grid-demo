import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiDataService} from "./api-data.service";
import {ColDef, ColGroupDef} from "ag-grid-community";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tableRows: any[] = [];
  tableHeaders: (ColDef | ColGroupDef)[] = [];
  isLoading = true;
  dataSubscription!: Subscription;

  constructor(private apiDataService: ApiDataService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.dataSubscription = this.apiDataService.getData().subscribe((data: any) => {
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

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
