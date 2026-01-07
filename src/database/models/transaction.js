import { models, Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    purpose: {
      type: String,
      required: {
        value: true,
        message: "Purpose should not empty",
      },
    },
    transaction_type: {
      type: String,
      required: {
        value: true,
        message: "Transactions Type should not empty",
      },
    },
    category: {
      type: String,
      required: {
        value: true,
        message: "Category should not empty",
      },
    },
    date: {
      type: Date,
      required: {
        value: true,
        message: "Date should not empty",
      },
    },
    amount: {
      type: Number,
      required: {
        value: true,
        message: "Amount should not empty",
      },
    },
    payment_method: {
      type: String,
      required: {
        value: true,
        message: "Payment Method should not empty",
      },
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: {
        value: true,
        message: "User Id should not empty",
      },
    },
  },
  { timestamps: true }
);

export const Transaction =
  models.Transactions || model("Transactions", transactionSchema);
