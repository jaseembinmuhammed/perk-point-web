import { inject, Injectable } from '@angular/core';
import {
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
