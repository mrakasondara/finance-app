import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
import { Transaction } from "@/database/models/transaction";

export async function GET(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  const date = new Date();

  const { email } = token;
  try {
    await connectDB(mongoURI);

    const { _id } = await User.findOne({ email }).select("_id");

    // get last month data
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const today = new Date(currentYear, currentMonth, 1);
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);

    const lastMonthTransaction = await Transaction.find({
      user_id: _id,
      date: {
        $gte: lastMonthDate,
        $lte: new Date(),
      },
    }).select("_id transaction_type amount date");

    // get last week data
    const lastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const lastWeekTransaction = await Transaction.find({
      user_id: _id,
      date: {
        $gte: lastWeekDate,
        $lte: new Date(),
      },
    }).select("_id transaction_type amount date");

    return NextResponse.json(
      {
        success: true,
        message: "Transactions statistic successfully fetched",
        data: {
          lastMonth: lastMonthTransaction,
          lastWeek: lastWeekTransaction,
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
