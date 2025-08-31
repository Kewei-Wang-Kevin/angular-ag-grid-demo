import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiDataService } from "./api-data.service";
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { Subscription } from "rxjs";
import { HeaderCheckboxComponent } from './header-checkbox/header-checkbox.component';

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
  private gridApi!: GridApi;
  private selectedData: Map<string, Set<number>> = new Map();

  constructor(private apiDataService: ApiDataService) {

  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.tableRows = [
      {Name: "Example API", PhotoFile: "No", Description: "An example API", Auth: "Yes", HTTPS: true, Cors: "yes", Link: "https://example.com", Category: "Examples"},
      {Name: "Another API", PhotoFile: "No", Description: "Another example API", Auth: "Yes", HTTPS: true, Cors: "no", Link: "https://another.com", Category: "Examples"},
      {Name: "Public API", PhotoFile: "Yes", Description: "A public API", Auth: "No", HTTPS: false, Cors: "unknown", Link: "http://publicapi.com", Category: "Public"},
      {Name: "Sample API", PhotoFile: "Yes", Description: "A sample API for testing", Auth: "No", HTTPS: true, Cors: "yes", Link: "https://sampleapi.com", Category: "Testing"},
    ];

    this.tableHeaders = Object.keys(this.tableRows[0]).map((key) => ({
      headerName: key,
      field: key,
      ...(key === 'Link' && {
        cellRenderer: (params: any) => `<a href="${params.value}" target="_blank">${params.value}</a>`
      }),
      ...(key === 'Auth' && {
        headerComponent: HeaderCheckboxComponent,
        headerComponentParams: {
        onHeaderCheckboxChange: (checked: boolean, api: GridApi, colId: string) => {
          api.forEachNode((node, index) => {
            if (node.data[colId] === 'Yes') {
              const element = document.querySelector(
                `[row-index="${node.rowIndex}"] .auth-checkbox`
              ) as HTMLInputElement;
              if (element) {
                element.checked = checked;
                this.updateSelectedData(colId, index, checked);
              }
            }
          });
        }},
        cellRenderer: (params: any) => {
          if (params.value === 'Yes') {
            return `
              <input type="checkbox" 
                class="auth-checkbox" 
                data-row="${params.rowIndex}"
                onclick="document.dispatchEvent(new CustomEvent('checkboxClicked', 
                  {detail: {checked: this.checked, rowIndex: this.dataset.row, colId: '${params.column.colId}'}}
                ))"
              />${params.value}
            `;
          }
          return params.value;
        }
      }),
      ...(key === 'PhotoFile' && {
        headerComponent: HeaderCheckboxComponent,
        headerComponentParams: {
        onHeaderCheckboxChange: (checked: boolean, api: GridApi, colId: string) => {
          api.forEachNode((node, index) => {
            if (node.data[colId] === 'Yes') {
              const element = document.querySelector(
                `[row-index="${node.rowIndex}"] .auth-checkbox-${key}`
              ) as HTMLInputElement;
              if (element) {
                element.checked = checked;
                this.updateSelectedData(colId, index, checked);
              }
            }
          });
        }},
        cellRenderer: (params: any) => {
          if (params.value === 'Yes') {
            return `
              <input type="checkbox" s
                class="auth-checkbox-${key}" 
                data-row="${params.rowIndex}"
                onclick="document.dispatchEvent(new CustomEvent('checkboxClicked', 
                  {detail: {checked: this.checked, rowIndex: this.dataset.row, colId: '${params.column.colId}'}}
                ))"
              />${params.value}
            `;
          }
          return params.value;
        }
      }),
    }));
    
    // Add event listener for checkbox clicks
    document.addEventListener('checkboxClicked', ((event: CustomEvent) => {
      const { checked, rowIndex, colId } = event.detail;
      this.updateSelectedData(colId, parseInt(rowIndex), checked);
    }) as EventListener);

    this.isLoading = false;
  }

  private updateSelectedData(colId: string, rowIndex: number, checked: boolean): void {
    if (!this.selectedData.has(colId)) {
      this.selectedData.set(colId, new Set());
    }
    console.log('Checkbox clicked:', checked, rowIndex, colId);

    const rowSet = this.selectedData.get(colId)!;
    if (checked) {
      rowSet.add(rowIndex);
    } else {
      rowSet.delete(rowIndex);
    }
  }

  getSelectedYesData(): { headerName: string, selectedRows: number[] }[] {
    const result: { headerName: string, selectedRows: number[] }[] = [];
    
    this.selectedData.forEach((rowIndices, colId) => {
      if (rowIndices.size > 0) {
        result.push({
          headerName: colId,
          selectedRows: Array.from(rowIndices)
        });
      }
    });

    console.log(result);
    
    return result;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
