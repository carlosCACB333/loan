import mongoose from 'mongoose';
import { consts } from '../consts';

const conexion = async () => {
  try {
    await mongoose.connect(consts.mongoUrl, {});
    console.log('🚀 Connected to database');
  } catch (error) {
    console.log(error);
    throw new Error('🟠 Error connecting to database');
  }
};

export { conexion };
