import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
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
  try {
    await connectDB(mongoURI);
    const { _id } = await User.findOne({ email }).select("_id");
    const userSubscriptions = await Subscription.find({ user_id: _id });
    return NextResponse.json(
      {
        success: true,
        data: userSubscriptions,
        message: `${
          userSubscriptions.length
            ? "Subscriptions successfully fetched"
            : "You don't have any subscription"
        }`,
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

    const data = await req.json();

    const newSubscription = new Subscription({
      ...data,
      user_id: _id,
    });

    await newSubscription.save();

    return NextResponse.json(
      {
        success: true,
        message: "Subscriptions successfully added",
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

export async function PUT(req) {
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

    const {
      subscription,
      category,
      due_date,
      amount,
      payment_method,
      status,
      _id,
    } = await req.json();

    const user = await User.findOne({ email }).select("_id");

    const subscriptionsData = await Subscription.findById(_id);

    if (!user._id.equals(subscriptionsData.user_id))
      return NextResponse.json(
        { success: false, message: "Unauthorized Access" },
        { status: 401 }
      );

    subscriptionsData.subscription = subscription;
    subscriptionsData.category = category;
    subscriptionsData.due_date = due_date;
    subscriptionsData.amount = amount;
    subscriptionsData.payment_method = payment_method;
    subscriptionsData.status = status;

    await subscriptionsData.save();

    return NextResponse.json(
      {
        success: true,
        message: "Subscriptions successfully updated",
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
