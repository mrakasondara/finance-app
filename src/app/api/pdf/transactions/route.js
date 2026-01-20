import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { Transaction } from "@/database/models/transaction";
import { renderToStream } from "@react-pdf/renderer";
import { TransactionsPDF } from "@/components/PDF/TransactionsPDF";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  const { email } = token;
  const { searchParams } = new URL(req.url);

  const query = {};

  const category = searchParams.get("category");
  const transaction_type = searchParams.get("transaction_type");
  const payment_method = searchParams.get("payment_method");

  if (category) query.category = category;
  if (transaction_type) query.transaction_type = transaction_type;
  if (payment_method) query.payment_method = payment_method;

  await connectDB(mongoURI);
  const { _id } = await User.findOne({ email }).select("_id");

  const userTransactions = await Transaction.find({ user_id: _id, ...query });

  if (userTransactions.length) {
    userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const stream = await renderToStream(
    <TransactionsPDF data={userTransactions} email={email} />
  );

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
