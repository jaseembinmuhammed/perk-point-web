import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AssignRewardResponse, KeyValue, Reward } from '../model/employee.type';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  http = inject(HttpClient);

  assignReward(payload: any) {
    const url = 'http://localhost:8080/perkpoint/api/v1/employeeReward';
    return this.http.post<AssignRewardResponse>(url, payload);
  }

  getRewards() {
    const url = 'http://localhost:8080/perkpoint/api/v1/reward/keyValues';
    return this.http.get<Array<KeyValue>>(url);
  }

  getRewardsWithDetails() {
    const url = 'http://localhost:8080/perkpoint/api/v1/reward';
    return this.http.get<Array<Reward>>(url);
  }

  createReward(payload: any) {
    const url = 'http://localhost:8080/perkpoint/api/v1/reward';
    return this.http.post<Reward>(url, payload);
  }

  deleteReward(payload: number) {
    const url = 'http://localhost:8080/perkpoint/api/v1/reward/' + payload;
    return this.http.delete<Reward>(url);
  }
}
