import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DemoTableComponent } from './demo-table/demo-table.component';
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import { HeaderCheckboxComponent } from './header-checkbox/header-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoTableComponent,
    HeaderCheckboxComponent
  ],
  imports: [BrowserModule, HttpClientModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
