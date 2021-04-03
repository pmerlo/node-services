import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../services/customer.service';

import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age'];

  customers$: Observable<Customer[]> = new Observable<Customer[]>();

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }
}
