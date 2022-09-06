import mongoose from 'mongoose';
import { IContract } from '../interfaces';
import { User } from '../models';
import { Contract as ContractModel } from '../models/contract';
import { HttpError } from '../utils';
export class Contract {
  private static model = ContractModel;

  public static async findAll(): Promise<IContract[]> {
    return this.model.find().populate('lender').populate('borrower').exec();
  }

  public static async findById(id: string): Promise<IContract | null> {
    const uid = new mongoose.mongo.ObjectId(id);
    return this.model.findById(uid).populate('lender').populate('borrower').exec();
  }

  public static async create(contract: IContract): Promise<IContract> {
    const borrower = await User.findById(contract.borrower).lean();
    if (!borrower) {
      throw new HttpError('El prestatario no existe ', 404);
    }

    contract.status = 'active';
    const operation = contract.operations[0];
    operation.type = 'loan';

    contract.operations = [operation];

    return await this.model.create(contract);
  }

  public static async addOperation(id: string, operation: IContract['operations'][0]): Promise<IContract | null> {
    const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
    if (!contract) {
      throw new HttpError('El contrato no existe', 404);
    }

    contract.operations.push(operation);
    return await contract.save();
  }
}
