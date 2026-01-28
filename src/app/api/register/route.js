import { connectDB } from "@/database";
import { mongoURI } from "../../../../constant";
import { NextResponse } from "next/server";
import { User } from "@/database/models/user";
import bcrypt from "bcrypt";

export async function encryptPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 11);
  return hashedPassword;
}

export async function GET(req) {
  try {
    await connectDB(mongoURI);
    return NextResponse.json({ message: "Conecting Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Conecting Failed" });
  }
}

export async function POST(req) {
  try {
    await connectDB(mongoURI);
    const userData = await req.json();
    let { email, password } = userData;

    const hashedPassword = await encryptPassword(password);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return NextResponse.json(
        { success: false, message: "Email has been registered" },
        { status: 400 }
      );
    }

    const user = newUser.save();

    return NextResponse.json(
      { success: true, message: "User Register Successfully", data: email },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
