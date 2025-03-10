import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employee.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http = inject(HttpClient);

  getEmployeeList(){
    const url="https://jsonplaceholder.typicode.com/todos";
    return this.http.get<Array<Employee>>(url)
  }
}
