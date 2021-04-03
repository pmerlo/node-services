import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../services/customer.service';

import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age'];

  customers$: Observable<Customer[]> = new Observable<Customer[]>();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }
}
