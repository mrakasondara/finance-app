import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { Transaction } from "@/database/models/transaction";

export async function PUT(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { id } = await params;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }
  const { email } = token;
  try {
    await connectDB(mongoURI);

    const {
      purpose,
      date,
      amount,
      transaction_type,
      category,
      payment_method,
    } = await req.json();

    const user = await User.findOne({ email }).select("_id");
    const transactionData = await Transaction.findById(id);

    if (!user._id.equals(transactionData.user_id))
      return NextResponse.json(
        { success: false, message: "Unauthorized Access" },
        { status: 401 }
      );

    transactionData.purpose = purpose;
    transactionData.date = date;
    transactionData.amount = amount;
    transactionData.transaction_type = transaction_type;
    transactionData.category = category;
    transactionData.payment_method = payment_method;

    await transactionData.save();

    return NextResponse.json(
      { success: true, message: "Transaction successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: "resource error",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "false", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { id } = await params;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }
  const { email } = token;
  try {
    await connectDB(mongoURI);

    const user = await User.findOne({ email }).select("_id");
    const transaction = await Transaction.findById(id);

    if (!user._id.equals(transaction.user_id))
      return NextResponse.json(
        { success: false, message: "Unauthorized Access" },
        { status: 401 }
      );

    await Transaction.deleteOne({ _id: id });

    return NextResponse.json(
      { success: true, message: "Transaction successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: "resource error",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
