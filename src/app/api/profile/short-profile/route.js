import { connectDB } from "@/database";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { mongoURI } from "../../../../../constant";
import { User } from "@/database/models/user";
import { updateUserImageProfile } from "@/supabase/storage/client";

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
    const newData = await req.formData();
    const { first_name, last_name, bio, address, image_thumb } =
      Object.fromEntries(newData.entries());

    const userData = await User.findOne({ email }).select("_id image_thumb");

    if (typeof image_thumb != "object") {
      await User.updateOne(
        { _id: userData._id },
        {
          first_name,
          last_name,
          bio,
          address,
        }
      );
      return NextResponse.json(
        {
          success: true,
          message: "Short Profile successfully updated",
        },
        { status: 200 }
      );
    } else {
      const fileName = image_thumb.name;
      const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
      const newImage = `${userData._id}.${fileExtension}`;
      const path = `user/${newImage}`;

      const isOldImage = userData.image_thumb;

      const { data, error } = await updateUserImageProfile({
        path,
        file: image_thumb,
        isOldImage,
      });

      if (error) {
        return new Error("Image update failed");
      }

      await User.updateOne(
        { _id: userData._id },
        {
          first_name,
          last_name,
          bio,
          address,
          image_thumb: newImage,
        }
      );
      return NextResponse.json(
        {
          success: true,
          message: "Short Profile successfully updated",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
