import { IUser } from '../interfaces';
import { User as UserModel } from '../models';
export class User {
  private static model = UserModel;

  public static async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  public static async search(search: string): Promise<IUser[]> {
    if (!search) {
      return await this.findAll();
    }

    return await this.model.find({
      $text: {
        $search: search,
        $caseSensitive: false,
      },
    });
  }
}
