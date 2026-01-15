import { connectDB } from "@/database";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../constant";
import { User } from "@/database/models/user";
import { getToken } from "next-auth/jwt";
import { getUserImageProfile } from "@/supabase/storage/client";

export async function GET(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized Access" },
      { status: 401 }
    );
  }
  const { email } = token;
  try {
    await connectDB(mongoURI);
    const user = await User.findOne({ email }).select("-password -__v");
    const imageThumb = user.image_thumb;

    if (imageThumb) {
      const { data, error } = await getUserImageProfile(imageThumb);
      user.image_thumb = data.publicUrl;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile successfully fetched",
        data: user,
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
