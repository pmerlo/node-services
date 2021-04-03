import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer';

const CUSTOMERS: Customer[] = [
  {
    name: 'Sara',
    age: 31
  },
  {
    name: "Pedro",
    age: 30
  }
];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age'];
  dataSource = CUSTOMERS;

  constructor() {}

  ngOnInit(): void {}
}
