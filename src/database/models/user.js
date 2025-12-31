import { models, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: {
        value: true,
        message: "Email should not empty",
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: "Email should not empty",
      },
    },
    short_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models.Users || model("Users", userSchema);
