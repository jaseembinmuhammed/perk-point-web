import { inject, Injectable } from '@angular/core';
import {
  Employee,
  EmployeeRewards,
  Todo,
  TransformedEmployeeRewards,
} from '../model/employee.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);

  getTodod() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<Array<Todo>>(url);
  }

  getEmployeeList() {
    const url = 'http://localhost:8080/perkpoint/api/v1/employeeReward';
    return this.http.get<Array<EmployeeRewards>>(url);
  }

  createEmployee(payload: any) {
    const url = 'http://localhost:8080/perkpoint/api/v1/employee';
    return this.http.post<Employee>(url, payload);
  }

  deleteEmployee(payload: number) {
    const url = `http://localhost:8080/perkpoint/api/v1/employee/${payload}`;
    return this.http.delete<Employee>(url);
  }

  TransformData(
    employeeRewardsList: EmployeeRewards[]
  ): TransformedEmployeeRewards[] {
    return employeeRewardsList.map((item) => ({
      empId: item.employee.id,
      employeeName: item.employee.name,
      department: item.employee.department,
      email: item.employee.email,
      numberOfRewards: item.rewards.length,
      rewards: item.rewards,
    }));
  }
}
