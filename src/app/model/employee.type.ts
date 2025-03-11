export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

export interface Reward {
  id: number;
  name: string;
  createdAt: string;
}

export interface EmployeeRewards {
  employee: Employee;
  rewards: Reward[];
}

export interface TransformedEmployeeRewards {
  empId: number;
  employeeName: string;
  department: string;
  email: string;
  numberOfRewards: number;
  rewards: Reward[];
}

export interface AssignRewardResponse {
  reward: Reward;
  employee: Employee;
  rewardedOn: Date;
}

export interface KeyValue {
  key: number;
  value: string;
}
