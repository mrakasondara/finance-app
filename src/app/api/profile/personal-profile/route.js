import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { NextResponse } from "next/server";

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
    const userData = await User.findOne({ email }).select("-password -__v");
    return NextResponse.json(
      {
        success: true,
        message: "Personal information successfully fetched",
        data: userData,
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

export async function PUT(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }
  const { email } = token;
  const data = await req.json();
  try {
    await connectDB(mongoURI);
    const userData = await User.findOne({ email }).select("-password -__v");

    userData.first_name = data.first_name;
    userData.last_name = data.last_name;
    userData.email = data.email;
    userData.phone = data.phone;

    await userData.save();

    return NextResponse.json(
      {
        success: true,
        message: "Personal information successfully updated",
        data: userData,
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
