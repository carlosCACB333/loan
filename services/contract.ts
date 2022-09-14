import mongoose from 'mongoose';
import { IContract } from '../interfaces';
import { User } from '../models';
import { Contract as ContractModel } from '../models/contract';
import { HttpError } from '../utils';
export class Contract {
  private static model = ContractModel;

  public static async findAll(id: string): Promise<IContract[]> {
    return this.model
      .find({
        $and: [
          {
            $or: [{ lender: id }, { borrower: id }],
          },
          {
            status: { $ne: 'deleted' },
          },
        ],
      })
      .populate('lender')
      .populate('borrower')
      .sort({ createdAt: -1 })
      .exec();
  }

  public static async findById(id: string): Promise<IContract | null> {
    const uid = new mongoose.mongo.ObjectId(id);
    return this.model.findById(uid).populate('lender').populate('borrower').exec();
  }

  public static async create(contract: IContract): Promise<IContract | null> {
    const borrower = await User.findById(contract.borrower).lean();
    if (!borrower) {
      throw new HttpError('El prestatario no existe ', 404);
    }

    contract.status = 'active';
    const operation = contract.operations[0];
    operation.type = 'loan';

    contract.operations = [operation];

    const ct = await this.model.create(contract);
    return await this.findById(ct.id);
  }

  public static async addOperation(
    id: string,
    operation: IContract['operations'][0]
  ): Promise<IContract['operations'][0] | null> {
    const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
    if (!contract) {
      throw new HttpError('El contrato no existe', 404);
    }
    contract.operations.push(operation);
    await contract.save();
    const op = contract.operations[contract.operations.length - 1];
    return op;
  }

  public static async deleteContract(id: string): Promise<string | null> {
    const contract = await this.model.findById(id);
    if (!contract) {
      throw new HttpError('El contrato no existe', 404);
    }
    contract.status = 'deleted';
    await contract.save();
    return contract.id;
  }

  public static async inactivateContract(id: string): Promise<IContract | null> {
    const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
    if (!contract) {
      throw new HttpError('El contrato no existe', 404);
    }
    contract.status = 'inactive';
    await contract.save();
    return contract;
  }

  public static async deleteOperation(id: string, operationId: string): Promise<string | null> {
    const contract = await this.model.findById(id);
    if (!contract) {
      throw new HttpError('El contrato no existe', 404);
    }
    contract.operations = contract.operations.filter((op) => op.id !== operationId);
    await contract.save();
    return contract.id;
  }
}
