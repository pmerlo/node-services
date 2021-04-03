import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerService } from './services/customer.service';

import { CustomersComponent } from './customers/customers.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    AppRoutingModule,
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
