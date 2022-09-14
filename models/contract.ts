import mongoose, { Model, Schema } from 'mongoose';
import { ContractStatuses, IContract } from '../interfaces';
import { OperationTypes } from '../interfaces';

const ContractSchema = new Schema<IContract>(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ContractStatuses,
      default: 'active',
    },

    lender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    borrower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    interest: {
      type: Number,
    },
    term: {
      type: Date,
    },
    operations: [
      {
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: OperationTypes,
        },
        description: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Contract: Model<IContract> = mongoose.models.Contract || mongoose.model('Contract', ContractSchema);
