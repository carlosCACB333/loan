import { IUser } from '../interfaces';
import { User } from '../models';
import bcrypt from 'bcrypt';
import { consts } from '../consts';
import { HttpError } from '../utils';
import jwt from 'jsonwebtoken';

export class Auth {
  private static generateToken = (id: string) => {
    if (!consts.jwt.secret) {
      throw new HttpError('No se encontro el secreto del jwt', 500);
    }
    return jwt.sign({ id }, consts.jwt.secret, {
      expiresIn: '3h',
    });
  };

  public static verifyToken = (token: string): Promise<string> => {
    if (!token) {
      throw new HttpError('No se envió el token', 400);
    }
    const secrect = consts.jwt.secret;
    if (!secrect) {
      throw new HttpError('No se encontro el secreto del jwt', 500);
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, secrect, (err, decoded) => {
        if (err) {
          reject(new HttpError('Token inválido', 401));
        } else {
          const { id } = decoded as { id: string };
          resolve(id);
        }
      });
    });
  };

  public static findById = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
      throw new HttpError('Usuario no encontrado', 404);
    }
    return user;
  };

  public static signup = async (user: IUser) => {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new User(user);
    await newUser.save();

    const token = this.generateToken(newUser.id);
    return { user: newUser, token };
  };

  public static findByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError('Usuario no encontrado', 404, '', {
        email: 'Usuario no encontrado',
      });
    }
    return user;
  };

  public static login = async (email: string, password: string) => {
    const user = await this.findByEmail(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new HttpError('Contraseña incorrecta', 401, '', {
        password: 'Contraseña incorrecta',
      });
    }
    // generar jwt
    const token = this.generateToken(user.id);
    return { user, token };
  };

  public static renewToken = async (token: string) => {
    const user = await this.findUserByToken(token);
    const newToken = this.generateToken(user.id);
    return { user, token: newToken };
  };

  public static findUserByToken = async (token: string) => {
    const id = await this.verifyToken(token);
    const user = await this.findById(id);
    return user;
  };
}
