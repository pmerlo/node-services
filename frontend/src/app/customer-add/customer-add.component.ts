import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
  name: string = '';
  age: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {}

  add(): void {
    this.customerService.add({ name: this.name, age: this.age }).subscribe();
  }
}
