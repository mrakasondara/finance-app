import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { Subscription } from "@/database/models/subscription";
import { User } from "@/database/models/user";

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
    const subscriptionsData = await Subscription.findById(id);

    if (!user._id.equals(subscriptionsData.user_id))
      return NextResponse.json(
        { success: false, message: "Unauthorized Access" },
        { status: 401 }
      );

    const subscription = await Subscription.deleteOne({ _id: id });

    return NextResponse.json(
      { success: true, message: "Subscription successfully deleted" },
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

    const { subscription, category, due_date, amount, payment_method, status } =
      await req.json();

    const user = await User.findOne({ email }).select("_id");

    const subscriptionsData = await Subscription.findById(id);

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
