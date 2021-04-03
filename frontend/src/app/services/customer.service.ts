import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Customer } from '../models/customer';

const BASE_URL = 'http://localhost:8080/customers/';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(BASE_URL);
  }

  add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(BASE_URL, customer);
  }
}
