import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";

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
    const userData = await User.findOne({ email }).select(
      "email first_name last_name bio address"
    );
    return NextResponse.json(
      {
        success: true,
        message: "Short Profile successfully fetched",
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
  try {
    await connectDB(mongoURI);
    const newData = await req.json();
    const { first_name, last_name, bio, address } = newData;

    const userData = await User.findOne({ email }).select(
      "email first_name last_name bio address"
    );

    userData.first_name = first_name;
    userData.last_name = last_name;
    userData.bio = bio;
    userData.address = address;

    await userData.save();

    return NextResponse.json(
      {
        success: true,
        message: "Short Profile successfully updated",
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
