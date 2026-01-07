import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
import { Transaction } from "@/database/models/transaction";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  const { email } = token;
  try {
    await connectDB(mongoURI);

    const { _id } = await User.findOne({ email }).select("_id");

    const transactions = await Transaction.find({ user_id: _id });

    return NextResponse.json(
      {
        success: true,
        message: `${
          transactions.length
            ? "Transactions successfully fetched"
            : "You don't have any transaction"
        }`,
        data: transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const token = await getToken({ req, access: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  const { email } = token;

  try {
    await connectDB(mongoURI);
    const { _id } = await User.findOne({ email }).select("_id");

    const data = await req.json();

    const newTransaction = new Transaction({
      ...data,
      user_id: _id,
    });

    await newTransaction.save();

    return NextResponse.json(
      {
        success: true,
        message: "Transaction successfully added",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "false", message: error.message },
      { status: 500 }
    );
  }
}
