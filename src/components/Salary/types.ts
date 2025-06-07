// components/Salary/types.ts

export interface Salary {
  id: string;
  country: string;
  role: string;
  stack: string[];
  contract: string;
  seniority: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface SeniorityDist {
  name: string;
  value: number;
}