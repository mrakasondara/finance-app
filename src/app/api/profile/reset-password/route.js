import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import bcrypt from "bcrypt";
import { encryptPassword } from "../../register/route";

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

    const { oldPassword, newPassword } = await req.json();
    const user = await User.findOne({ email }).select("password");

    const isMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isMatched) {
      throw new Error("Old password doesn't match");
    } else {
      const encryptedNewPassword = await encryptPassword(newPassword);
      user.password = encryptedNewPassword;
      await user.save();
    }

    return NextResponse.json(
      { success: true, message: "Password successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
