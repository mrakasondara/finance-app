import ReactPDF, { renderToStream } from "@react-pdf/renderer";
import { SubscriptionsPDF } from "@/components/PDF/SubscriptionsPDF";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/database";
import { User } from "@/database/models/user";
import { Subscription } from "@/database/models/subscription";
import { mongoURI } from "../../../../constant";

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
  const payment_method = searchParams.get("payment_method");
  const status = searchParams.get("status");

  if (category) query.category = category;
  if (payment_method) query.payment_method = payment_method;
  if (status) query.status = status;

  await connectDB(mongoURI);
  const { _id } = await User.findOne({ email }).select("_id");

  const userSubscriptions = await Subscription.find({
    user_id: _id,
    ...query,
  }).sort({ due_date: -1 });

  const stream = await renderToStream(
    <SubscriptionsPDF data={userSubscriptions} email={email} />
  );
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
