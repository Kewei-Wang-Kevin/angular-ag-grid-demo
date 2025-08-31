import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { GridApi, IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-header-checkbox',
  template: `
    <div class="ag-header-cell-label" style="display: flex; align-items: center; gap: 4px;">
      <input
        type="checkbox"
        [checked]="allChecked"
        (change)="onCheckboxChange($event)"
      />
      <span>{{params.displayName}}</span>
    </div>
  `
})
export class HeaderCheckboxComponent implements IHeaderAngularComp {
  params: any;
  allChecked = false;

  agInit(params: any): void {
    this.params = params;
  }

  onCheckboxChange(event: Event): void {
    this.allChecked = (event.target as HTMLInputElement).checked;
    if (this.params.onHeaderCheckboxChange) {
      this.params.onHeaderCheckboxChange(this.allChecked, this.params.api, this.params.column.colId);
    }
  }

  refresh(): boolean {
    return false;
  }
}