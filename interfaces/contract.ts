import { IUser } from './user';
export type IContractStatus = 'active' | 'inactive' | 'pending' | 'expired' | 'deleted';

export type IOperationType = 'payment' | 'loan';

export const OperationTypes: IOperationType[] = ['payment', 'loan'];
export const ContractStatuses: IContractStatus[] = ['active', 'inactive', 'pending', 'expired', 'deleted'];

export interface IOperation {
  id: string;
  amount: number;
  description?: string;
  type: IOperationType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContract {
  id: string;
  name: string;
  status: IContractStatus;
  createdAt: Date;
  updatedAt: Date;
  lender: string | IUser;
  borrower: string | IUser;
  interest?: number;
  term?: Date;
  operations: IOperation[];
}
