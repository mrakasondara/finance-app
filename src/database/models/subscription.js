import { models, Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscription: {
      type: String,
      required: {
        value: true,
        message: "Subscription should not empty",
      },
    },
    category: {
      type: String,
      required: {
        value: true,
        message: "Category should not empty",
      },
    },
    due_date: {
      type: Date,
      required: {
        value: true,
        message: "Due Date should not empty",
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
    status: {
      type: String,
      required: {
        value: true,
        message: "Status should not empty",
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

export const Subscription =
  models.Subscriptions || model("Subscriptions", subscriptionSchema);
