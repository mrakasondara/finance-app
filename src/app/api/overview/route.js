import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
import { Transaction } from "@/database/models/transaction";
import { Subscription } from "@/database/models/subscription";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  const { email } = token;
  const searchParams = req.nextUrl.searchParams;
  const section = searchParams.get("section");
  try {
    await connectDB(mongoURI);
    const { _id } = await User.findOne({ email }).select("_id");

    switch (section) {
      case "transactions":
        const overviewTransactions = await Transaction.find({ user_id: _id })
          .sort({ date: -1 })
          .limit(5);
        return NextResponse.json(
          {
            success: true,
            message: "Data overview fetched",
            data: overviewTransactions,
          },
          { status: 200 }
        );
      case "subscriptions":
        const overviewSubscriptions = await Subscription.find({ user_id: _id })
          .sort({ due_date: -1 })
          .limit(5);
        return NextResponse.json(
          {
            success: true,
            message: "Data overview fetched",
            data: overviewSubscriptions,
          },
          { status: 200 }
        );
      default:
        const transactions = await Transaction.find({ user_id: _id }).select(
          "transaction_type amount"
        );
        const subscriptions = await Subscription.find({ user_id: _id }).select(
          "status amount"
        );

        const totalIncome = transactions
          .filter((transaction) => transaction.transaction_type == "income")
          .reduce((sum, item) => sum + item.amount, 0);

        const totalExpense = transactions
          .filter((transaction) => transaction.transaction_type == "expense")
          .reduce((sum, item) => sum + item.amount, 0);

        const totalDue = subscriptions
          .filter((subscription) => subscription.status == "unpaid")
          .reduce((sum, item) => sum + item.amount, 0);

        return NextResponse.json(
          {
            success: true,
            message: "Data overview fetched",
            data: [
              {
                title: "Total Income",
                value: totalIncome,
              },
              {
                title: "Total Expense",
                value: totalExpense,
              },
              {
                title: "Total Due",
                value: totalDue,
              },
              {
                title: "Total Saving",
                value: totalIncome - totalExpense,
              },
            ],
          },
          { status: 200 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
