import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { Subscription } from "@/database/models/subscription";

export async function DELETE(req, { params }) {
  const token = getToken({ req, secret: process.env.NEXTAUTH_SECRET });
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
