import { IUser } from '../interfaces';
import { User as UserModel } from '../models';
export class User {
  private static model = UserModel;

  public static async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }
}
